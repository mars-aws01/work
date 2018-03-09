/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble;

import com.newegg.edi.x12engine.schema.SchemaFinder;
import com.newegg.edi.x12engine.parsing.X12StreamReader;
import com.newegg.edi.x12engine.common.*;
import com.newegg.edi.x12engine.disassemble.edixml.EdiXmlGenerator;
import com.newegg.edi.x12engine.disassemble.events.*;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntryProvider;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.exceptions.validation.X12SchemaValidationException;
import com.newegg.edi.x12engine.exceptions.X12StructualException;
import com.newegg.edi.x12engine.exceptions.validation.DataElementValidationException; 
import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import com.newegg.edi.x12engine.schema.Loop;
import com.newegg.edi.x12engine.schema.SchemaVisitor;
import com.newegg.edi.x12engine.schema.SchemaVisitorFactory;
import com.newegg.edi.x12engine.schema.X12Restriction;
import com.newegg.edi.x12engine.schema.X12SegmentDefinition;
import com.newegg.edi.x12engine.schema.events.IterationCompletedEvent;
import com.newegg.edi.x12engine.util.StringExtension;
import java.io.Closeable;
import java.io.IOException;  
import java.util.function.Supplier;
import com.newegg.edi.x12engine.schema.events.BeforeLoopStartEvent;
import java.util.ArrayDeque;
import java.util.Deque;
import com.newegg.edi.x12engine.validators.ValidationContext;
import com.newegg.edi.x12engine.validators.Validator;
import com.newegg.edi.x12engine.validators.ValidatorFactory;
import java.util.Optional;
import com.newegg.edi.x12engine.schema.X12SchemaProvider;
import com.newegg.edi.x12engine.validators.ReferenceCodeCache;

/**
 *
 * @author mm67
 */
public class X12Disassembler implements Closeable, Disassembler{
    
    private static final boolean MOVE_THE_SCHEMA_VISITOR_TO_NEXT_DEF = false;
    private static final boolean MOVE_THE_X12_READER_TO_NEXT_SEG = true;
    
    private final Supplier<X12StreamReader> x12StreamReaderProvider;
    private final Supplier<EdiXmlGenerator> ediXmlGeneratorProvider;
    private final Supplier<X12SchemaProvider> x12SchemaSearcherProvider;
    private final SchemaVisitorFactory schemaVisitorFactory; 
    private final ValidatorFactory validatorFactory;
    
    private final X12DisassemblerSetting setting;
    private final DisassembleContext ctx;
    private X12StreamReader x12Reader;        
    private SchemaVisitor visitor;    
    
    private final Deque<String> elementStack = new ArrayDeque<>();
        
    private EdiXmlGenerator ediXmlGenerator;
    
    private DisassembleEventHandler<DisassembleResultReportEvent> 
        resultReportEventHanlder;
       
    public X12Disassembler(
            X12DisassemblerSetting setting,
            SchemaVisitorFactory schemaVisitorFactory,
            ValidatorFactory validatorFactory,
            Supplier<X12StreamReader> x12StreamReaderProvider,
            Supplier<EdiXmlGenerator> ediXmlGeneratorProvider,
            Supplier<X12SchemaProvider> x12SchemaSearcherProvider){
        
        this.setting = setting;
        this.ctx = new DisassembleContext();
        
        this.x12StreamReaderProvider = x12StreamReaderProvider;
        this.ediXmlGeneratorProvider = ediXmlGeneratorProvider;
        this.x12SchemaSearcherProvider = x12SchemaSearcherProvider;
        this.schemaVisitorFactory = schemaVisitorFactory;
        this.validatorFactory = validatorFactory;
    }

    /**
     * @return the setting
     */
    public X12DisassemblerSetting getSetting() {
        return setting;
    }

    /**
     * @return the context
     */
    public DisassembleContext getCtx() {
        return ctx;
    }
    
    @Override
    public void initialize(){
          
        this.x12Reader = x12StreamReaderProvider.get();
        wireUpReaderEvents();
    }     

    private void wireUpReaderEvents() {
        // Wire up events
        this.x12Reader.setMetaDataExtractedEventHandler(this::onMetaDataExtracted);

        this.x12Reader.setInterchangeStartedEventHandler(this::onInterchangeStarted);
        this.x12Reader.setInterchangeClosedEventHandler(this::onInterchangeClosed);

        this.x12Reader.setGroupStartedEventHandler(this::onGroupStarted);
        this.x12Reader.setGroupClosedEventHandler(this::onGroupClosed);

        this.x12Reader.setTransactionSetStartedEventHandler(this::onTransactionSetStarted);
        this.x12Reader.setTransactionSetClosedEventHandler(this::onTransactionSetClosed);
    }
    
    @Override
    public void close() {
        if(null != this.x12Reader){
            try {
                this.x12Reader.close();
            } catch (IOException ex) {
                ctx.error(ex);
            }
        }
    }
    
    private void onMetaDataExtracted(MetaDataExtractedEvent e){
        // Nothing to do yet
    }
    
    private void onInterchangeStarted(InterchangeStartedEvent e){
        ctx.debug("Interchange %s started", 
            e.getInterchange().getInterchangeControlNumber());
        
        withinTransactionSet = false;
        
        ctx.setCurrentInterchange(e.getInterchange());
        ctx.startCollectingValidationResult();
    }
    
    private void onInterchangeClosed(InterchangeClosedEvent e){
        withinTransactionSet = false;
        
        fireDisassembleValidationResultEvent();
    }
    
    private void cleanupSchemaVisitor(){
        
        // Cleanup ReferenceCodeCache before each schema visitor cleanup
        ReferenceCodeCache.clear();
        
        if(null == visitor){
            return;
        }
        
        ctx.debug("Clear BeforeLoopStartEventHandler on Schema Visitor");
        visitor.setBeforeLoopStartEventHandler(null);
        
        ctx.debug("Clear IterationCompletedEventHandler on Schema Visitor");
        visitor.setIterationCompletedEventHandler(null);
    }
    
    private boolean withinTransactionSet;
    
    private void onTransactionSetStarted(TransactionSetStartedEvent e){
        try {
            withinTransactionSet = true;
            
            this.ctx.setCurrentTransactionSet(e.getTransactionSet());
            
            cleanupSchemaVisitor();
            
            this.ctx.info("Initialize Schema Visitor "
                    + "for transaction set [Ctrl#:%s]",
                    this.ctx.getCurrentTransactionSet().getControlNumber());
            
            visitor = this.schemaVisitorFactory.build(this.ctx.getCurrentSchema());
            visitor.initialize();
            
            visitor.setIterationCompletedEventHandler(this::loopIterationCompletedEventHandler);
            visitor.setBeforeLoopStartEventHandler(this::beforeLoopStartEventHandler);
            
            verifyTransactionSetTypeIsMatch();
            
            createEdiXmlDocument(e.getTransactionSet());
            
        } catch (X12EngineException ex) {
            ctx.error(ex);
            ctx.setMessage(ex.getMessage());
            ctx.setTerminated(true);
        }
    }
    
    private void onGroupStarted(GroupStartedEvent e){
        
        withinTransactionSet = false;
        
        this.ctx.setCurrentGroup(e.getGroup());
        
        try{
            
            this.ctx.setCurrentSchema( SchemaFinder.retrievingX12Schema(
                    this.x12SchemaSearcherProvider.get(),
                    e.getGroup().getParentInterchange(),
                    e.getGroup())
            );                
            
            this.ctx.getValidationResultContainer()
                .startGroup(
                    e.getGroup(),
                    this.ctx.getCurrentSchema());
        }
        catch(X12EngineException ex){
            this.ctx.error(ex);
            
            this.ctx.setMessage(ex.getLocalizedMessage());
            this.ctx.setTerminated(true);            
        }
    }
    
    private void onTransactionSetClosed(TransactionSetClosedEvent e){
        
        withinTransactionSet = false;
        
        ctx.debug("Transaction Set has been closed.");
        
        // Use this step to record transaction-set which passed 
        // the schema validation, in this way, we can collect the number 
        // of transaction sets have been accepted in a group.
        ctx.getValidationResultContainer()
            .markTransactionSetClosed(
                ctx.getCurrentGroup(),
                e.getTransactionSet());
    }
    
    private void onGroupClosed(GroupClosedEvent e){
        withinTransactionSet = false;        
    }
    
    private void loopIterationCompletedEventHandler(
            IterationCompletedEvent iterationEvent) throws X12EngineException {
        
        // Current iterating loop instance
        Loop loop = iterationEvent.getLoop();
        
        ctx.debug("***Loop Iteration completed %s", loop.getRoot().getName());
        this.writeCloseElement();
        
        SegmentData seg = this.x12Reader.getCurrentDataSegment();
        
        if(null == seg){
            return;
        }        
        
        ctx.debug("***Current Data SEGMENT is : %s",
                seg.getOriginalSegmentData());

        String startSegmentOfThisLoop = loop.getLoopStartSegment();

        if(StringExtension.isNullOrWhitespace(startSegmentOfThisLoop)){
            
            String msg = String.format(
                "The Schema definition contains an invalid loop [%s], "
                        + "which cannot determine its start segment name. ",
                loop.getRoot());

            throw new X12EngineException(msg);
        }

        // If the next data segment is the start segment of current loop
        // make the loop to continue.
        if(startSegmentOfThisLoop.equals(seg.getName())){
            
            ctx.debug("A start segment [%s] of the loop [%s]"
                    + "(Start SEGMENT:%s) detected.",
                    seg.getOriginalSegmentData(),
                    loop.getRoot().getName(),
                    startSegmentOfThisLoop
            );
            
            iterationEvent.setContinueLoop(true);
            
        } else{
            ctx.debug("The new segment [%s] is not the "
                    + "start of loop [%s](Start SEGMENT:%s), "
                    + "which means the loop iteration has finished.",
                    seg.getName(),
                    loop.getRoot().getName(),
                    startSegmentOfThisLoop
            );

            iterationEvent.setContinueLoop(false);
        }            
    }
    
    private void beforeLoopStartEventHandler(BeforeLoopStartEvent event){
        // Check if the current loop is expected.        
        SegmentData seg = x12Reader.getCurrentDataSegment(); 
        
        X12SegmentDefinition loopDef = event.getX12SegmentDefinition();

        if(null == seg){
            ctx.debug("Current Data SEGMENT of X12Reader is null, skip the loop %s",
                    loopDef.getName());
            event.setSkipThisLoop(true);
            return;
        }        
                
        if(!event.getLoopStartSegment().equals(seg.getName()))
        {
            ctx.debug("Current Data SEGMENT of X12Reader is %s " ,
                    seg.getName());
            
            ctx.debug("  Which is not the start segment [%s] of the loop %s",
                    event.getLoopStartSegment(),
                    loopDef.getName()); 
            ctx.debug("Loop %s will be skipped.", loopDef.getName());
            
            event.setSkipThisLoop(true);
        }
    }
    
    @Override
    public void execute() throws X12EngineException{
        
        this.ctx.info("Start to disassemble input data stream ...");
        
        this.x12Reader.open();
                
        while(this.x12Reader.iterateSegments()){
            
            if(this.ctx.isTerminated()){
                this.ctx.warn("The disassemble process has been terminated.");
                this.ctx.warn(this.ctx.getMessage());
                break;
            }
            
            // If group started and transaction set started
            // the visitor should be initialized.
            if(null != this.visitor){
                disassembleTransactionSet();                
            }       
        }    
        
        this.ctx.info("Disassemble operation accomplished.");
    }
    
    private SegmentData getCurrentX12DataSegment() 
        throws X12StructualException{
        
        SegmentData seg = x12Reader.getCurrentDataSegment(); 
            
        if(null == seg){
            throw new X12StructualException("SegmentData shouldn't be null.");
        }
        
        this.ctx.debug("Current segment is %s "
            + "(Current segment buffer size in X12 reader is %d)" , 
            seg.getOriginalSegmentData(),
            x12Reader.getSegmentBufferSize());
        
        return seg;
    }
    
    private boolean isTheStartSegmentOfCurrentLoop(SegmentData seg){
        
        Loop loop = this.visitor.getCurrentLoop();
        
        if(null != loop) {
            return loop.getLoopStartSegment().equals(seg.getName());
        } 
        
        return false;
    }

    private void disassembleTransactionSet() 
            throws X12EngineException {
        
        ensureX12ReaderInitialized();
        ensureSchemaVisitorInitialized();
                
        if(!withinTransactionSet){
            ctx.debug("Outside a TransactionSet.");
            ctx.debug("Current Group: %s", this.ctx.getCurrentGroup());
            return;
        }
                
        while(visitor.moveToNextSegment()){
            
            SegmentData seg = getCurrentX12DataSegment();
            
            try{
            
                // Get current segment definition from schema visitor
                X12SegmentDefinition def =
                        visitor.getCurrentSegmentDefinition();
                
                ctx.debug("[%s] is current schema node definition.", def.getName());

                if(def.isLoop()){
                    
                    if(isTheStartSegmentOfCurrentLoop(seg))
                    {
                        startNewLoop(def);
                    } 

                    continue;
                }
                else{
                    ctx.debug("[%s] is not a loop.", def.getName());
                }

                // If the definition is not a Node, (DATA_ELEMENT definition)
                if(!def.isSegmentNode()) {
                    ctx.debug("It's not a SegmentNode");
                    continue;
                }
                
                // Match by name 
                if(isDataSegmentMatches(def, seg)){
                    // Process the entire data segment                                         
                    if(processSegment(def, seg)){
                        // Move on to the next segment in the schema
                        ctx.debug("Move on to the next node in schema.");
                        continue;
                    } 
                    // X12Reader terminated, stop iterating the SchemaVisitor.
                    ctx.debug("The X12Reader iteration terminated.");
                    
                    // Break to process the next data segment from X12 reader
                    break;
                }
                
                // The name of the current segment from X12 reader does NOT match
                // with the name in segment definition
                
                // For mandatory (Required) segment definition, 
                // collect the missing mandatory segment validation result.
                // and continue to process the next segment definition from schema
                if(def.isMandatory()){
                    collectMissingMandatorySegmentResult(def, seg);
                    continue;
                } 

                // If the definition is not mandatory
                // collect this def for later check on the unexpected segment
                if(MOVE_THE_X12_READER_TO_NEXT_SEG == 
                    checkForUnexpectedSegment(def, seg)){
                    break;
                }   
            }
            catch(X12SchemaValidationException validationException){
                
                // Collect the validation exception, and move on to the next segment.                 
                ctx.collectException(validationException);
            }
        }
    }
    
    private boolean checkForUnexpectedSegment(
        X12SegmentDefinition def, SegmentData seg) {

        ctx.debug("Checking data segment [%s] for optional segment definition [%s] ", 
            seg.getName(), def.getName());
         
        // If current segment read from X12 file is visited once before
        // it means the segment is in a wrong position. (Unexpected SEGMENT)
        if(!this.visitor.isSegmentVisited(seg.getName())) {
             
            return MOVE_THE_SCHEMA_VISITOR_TO_NEXT_DEF;
        } 
        
        // When the disassembler in a loop, the loop start segment might be 
        // consider as visited at the last check by default, so we must make 
        // sure the new  iteration of current loop continues.
        if(isTheStartSegmentOfCurrentLoop(seg)){
            
            // This is not a visited segment, it's the new iteration start 
            // of current loop
            return MOVE_THE_SCHEMA_VISITOR_TO_NEXT_DEF;
        }
        
        if(setting.isPerformEdiSchemaValidation())
        {
            // And when it happens, we should collect it as a validation result
            String message = String.format(
                "The data segment [%s at position %d] is unexpected.",            
                seg.getName(),
                seg.getPosition());

            ctx.collect(new ValidationResultEntry(
                seg.getName(),
                seg.getPosition(),
                Constants.NULL_VALUE,
                ValidationResultType.SEGMENT,
                ValidationErrorCode.SEGMENT_LEVEL_UNEXPECTED_SEGMENT,
                message
            ));
        }
        
        // Make sure the X12 reader to iterate to the next segment
        return MOVE_THE_X12_READER_TO_NEXT_SEG;
    }
    
    private void collectMissingMandatorySegmentResult(
        X12SegmentDefinition def,
        SegmentData seg) {
        
        if(!setting.isPerformEdiSchemaValidation()) {
            return;
        }
        
        String message = 
            String.format(
                "Expected segment is %s, but current data segment is %s",
                def.getName(),
                seg.getName());

        ctx.collect(new ValidationResultEntry(
                def.getName(),
                seg.getPosition(),
                Constants.NULL_VALUE,
                ValidationResultType.SEGMENT,
                ValidationErrorCode.SEGMENT_LEVEL_MANDATORY_SEGMENT_MISSING,
                message
            ));
    }

    private void ensureX12ReaderInitialized() throws X12EngineException {
        if(null != this.x12Reader) return;
        
        throw new X12EngineException(
                "The X12Reader must be initialized before perform the action.");
    }

    private void ensureSchemaVisitorInitialized() throws X12EngineException {
        if(null != this.visitor) return;
        
        throw new X12EngineException(
                "The X12SchemaVisitor must be initialized before perform the action.");
    }

    private void startNewLoop(X12SegmentDefinition def) throws X12EngineException { 
        
        this.ctx.debug("====>Starting Loop %s", def.getName());
        
        this.writeStartElement(def.getName()); 
    }

    private boolean processSegment(X12SegmentDefinition def, SegmentData seg) 
            throws X12EngineException {
        
        this.ctx.debug("Processing segment %s ...", seg.getName());
                    
        writeStartElement(seg.getName());
        processChildElements(def, seg);
        writeCloseElement();
        
        if(seg.isSE()){
            this.saveCurrentEDIXml();
            return this.x12Reader.iterateSegments();
        }        
                
        if(!def.isRepeatableSegmentNode()){         
            this.ctx.debug("[%s] is not a repeatable segment node. Continuer read segments from reader.",
                def.getName());
             
            return this.x12Reader.iterateSegments();
        }
        
        this.ctx.debug("[%s] is a repeatable segment node, read next segements from reader",
            def.getName());
        // If the segment node def is repeatable,             
        if(this.x12Reader.iterateSegments()){
            
            int repeatCount = 1;
            int lastRepeatSegmentPosition = 0;
            SegmentData repeatSeg = this.x12Reader.getCurrentDataSegment();
            
            this.ctx.debug("For repeatable segment node definition %s, we've got a segment %s now.",
                def.getName(),
                repeatSeg.getName());
            
            while(this.isDataSegmentMatches(def, repeatSeg)){
                repeatCount++;
                
                ctx.debug("Creating segment node %s ...", repeatSeg.getName());
                
                writeStartElement(repeatSeg.getName());
                processChildElements(def, repeatSeg);
                writeCloseElement();
                
                lastRepeatSegmentPosition = repeatSeg.getPosition();
                
                if(!this.x12Reader.iterateSegments()){
                    return false;
                }
                
                repeatSeg = this.x12Reader.getCurrentDataSegment();
            }
            
            ctx.debug("Checking segment occurance limits ...");
            
            checkSegmentOccuranceLimits(
                def, 
                repeatCount, 
                lastRepeatSegmentPosition);          
            
            ctx.debug("Occurance limits check passed.");
            
            return true;
        }
        
        return false;
    }
    
    private void checkSegmentOccuranceLimits(
        X12SegmentDefinition def, 
        int repeatCount,
        int lastRepeatSegmentPosition){
        
        if(!setting.isPerformEdiSchemaValidation()){
            return;
        }
        
        int maximumOccurs = def.getRestriction().getMaxOccurs();
        
        if(Constants.UNLIMITED == maximumOccurs){
            return;
        }        
        
        // If the maximum occurs is limited
        if(repeatCount > maximumOccurs){
            // Too many segments
            collectTooManySegmentValidationResult(
                def, 
                maximumOccurs, 
                repeatCount, 
                lastRepeatSegmentPosition
            );
        }
    }
    
    private void collectTooManySegmentValidationResult(
        X12SegmentDefinition def, 
        int maxOccurs, 
        int repeatCount, 
        int lastSegmentPosition){
        // Otherwise, the segment is invalid.
        String message = 
            String.format(
                "The segment %s has repeated for %d times, "
                + "which exceeded the maximum occurs %d defined in schema.",
                def.getName(),
                repeatCount,
                maxOccurs);
        
        ValidationResultEntryProvider entry = 
            new ValidationResultEntry(
                def.getName(),
                lastSegmentPosition,
                Constants.NULL_VALUE,    
                ValidationResultType.SEGMENT,
                ValidationErrorCode.SEGMENT_LEVEL_MAXIMUM_SEGMENT_USE_EXCEEDED,
                message
            );
        
        this.ctx.collect(entry);
    }

    private boolean isDataSegmentMatches(
        X12SegmentDefinition def, SegmentData seg) {
        boolean isMatch = def.getName().equals(seg.getName());
        
        if(isMatch){
            this.ctx.debug("SEGMENT is match with current schema node [%s]",
                seg.getName());
        } 
        else{
            this.ctx.debug("SEGMENT [%s] is not match with current schema node [%s]",
                seg.getName(),
                def.getName());
        }
        
        return isMatch;
    }

    private void verifyTransactionSetTypeIsMatch() throws X12EngineException {
        
        String functionalIdentifierCode = 
                this.ctx.getCurrentGroup().getFunctionalIdentifierCode();
        
        String transactionSetType = 
                this.ctx.getCurrentTransactionSet()
                .getTransactionSetType();
        
        if(!functionalIdentifierCode.equals(
                ctx.getCurrentSchema().getFunctionalIdentifierCode())){
            
            throw new X12EngineException(
                String.format(
                    "The functional identifier code [%s] of current group "
                        + "(Ctrl#:%s) does not match "
                        + "the code [%s] defined in current schema.",
                    functionalIdentifierCode,
                    ctx.getCurrentGroup().getGroupControlNumber(),
                    ctx.getCurrentSchema().getFunctionalIdentifierCode()));
        }                
        
        String schemaTransactionSetType =
            ctx.getCurrentSchema().getTransactionSetType();
        
        if(!transactionSetType.equals(schemaTransactionSetType)){
            
            throw new X12EngineException(
                String.format(
                    "The type [%s] of current transaction set (Ctrl#:%s)"
                        + "does not match the transactionSetType [%s] "
                        + "defined in current schema.",
                    transactionSetType,
                    ctx.getCurrentTransactionSet().getControlNumber(),
                    ctx.getCurrentSchema().getTransactionSetType()));
        }
    }
    
    private void processComponentElement(
            X12SegmentDefinition def,  // The component segment definition
            int elementIndex,
            String elementData,
            SegmentData seg) throws X12EngineException {
        
        boolean isValueEmpty = StringExtension.isNullOrEmpty(elementData);
        
        if(def.isMandatory() && isValueEmpty){
            
            String msg = String.format("The component element [%s] is mandatory",
                            def.getName());
            
            throw new DataElementValidationException( 
                this.ctx, 
                seg, 
                def.getName(),
                elementIndex,
                ValidationErrorCode.ELEMENT_LEVEL_MANDATORY_ELEMENT_MISSING,
                msg);
        }
        
        if(isValueEmpty) {
            return;
        }
        
        // Retrieve component element seperator from current ISA header
        String separator = 
                this.ctx.getCurrentMetaData()
                        .getComponentElementSeparator();
        
        String[] components = StringExtension.split(elementData, separator);
        
        if(components.length > def.getChildElementCount()){
            
            String msg = String.format(
                            "The component element [%s] should contains %s "
                            + "child components at most, but we got %s components, "
                            + "separater is %s.",
                            def.getName(),
                            def.getChildElementCount(),
                            components.length,
                            separator);
            
            throw new DataElementValidationException( 
                    this.ctx, 
                    seg, 
                    def.getName(),
                    elementIndex,
                    ValidationErrorCode.ELEMENT_LEVEL_TOO_MANY_ELEMENTS,
                    msg);
        }
        
        this.writeStartElement(def.getName());
        
        try{
            int index = 0;
            for(; index < components.length; index++){

                String value = components[index];

                X12SegmentDefinition componentDef = def.getSegments().get(index);
                
                verifyComponentValueElement(
                    seg, 
                    componentDef, 
                    elementIndex, 
                    index + 1, 
                    value);
                
                writeValueElement(componentDef.getName(), value);

            }
        }
        finally{
            this.writeCloseElement();
        }
    }
    
    private void verifyComponentValueElement(
            SegmentData seg,
            X12SegmentDefinition def, 
            int elementPosition,
            int componentPosition,
            String value
            ){
        
        Validator validater = validatorFactory.build(def);
        
        ValidationContext validationContext = new ValidationContext();
        
        validationContext.setResultCollector(ctx);
        validationContext.setSchema(ctx.getCurrentSchema());
        validationContext.setElementDefinition(def);
        validationContext.setSegment(seg);
        validationContext.setValue(value);
        validationContext.setElementPosition(elementPosition);
        validationContext.setComponentPosition(componentPosition);
        
        validater.validate(validationContext);
    }
     
    /**
     * Process all elements in the segment. validate element value against 
     * the schema segment definition
     * @param def The schema segment definition
     * @param seg The segment contains all X12 data elements
     */
    private void processChildElements(
            X12SegmentDefinition def, SegmentData seg)
        throws X12EngineException {
                
        validateChildElementCount(def, seg);
        
        PairedNodeValidator pairedNodeValidator = 
            new PairedNodeValidator(seg.getName());
        
        // SEGMENT.elements[0] is the name of segment, so we should start from 1
        for(int index=1; index < seg.getDataCount(); index++){
            
            if(index > def.getSegments().size()) break;
            
            String value = seg.getDataElement(index); 
            boolean isValueEmpty = StringExtension.isNullOrEmpty(value);
            
            X12SegmentDefinition childSegDef = def.getSegments().get(index-1);
            
            collectPairedNode(pairedNodeValidator, childSegDef, isValueEmpty);
            
            if(childSegDef.getRestriction().isComponent()){
                
                processComponentElement(childSegDef, index, value, seg);
                continue;
            }
            
            verifyValueElement(index, value, childSegDef, seg);
            
            validatePairedNode(
                seg, 
                index, 
                pairedNodeValidator, 
                childSegDef, 
                isValueEmpty);
             
            writeValueElement(childSegDef.getName(), value);
        }
        
        // If there is more element defined in the schema
        // We should check if they are required(Mandatory)
        validateRemainingElementDefinition(def, seg);
    }
    
    private void validatePairedNode(
        SegmentData seg, 
        int elementIndex,
        PairedNodeValidator pairedNodeValidator, 
        X12SegmentDefinition childSegDef, 
        boolean isValueEmpty) throws X12EngineException {
        
        if(!setting.isPerformEdiSchemaValidation()){
            return;
        }
        
        Optional<PairedNode> nullablePairedNode = 
            pairedNodeValidator.getPairNode(childSegDef.getName());
        
        // Not paired
        if(!nullablePairedNode.isPresent()){
            return;
        }
        
        PairedNode node = nullablePairedNode.get();
        
        boolean theParingNodeValueIsPresented = !isValueEmpty;
        
        // The value of paired nodes must be both empty or both presented
        if(node.isNodeValuePresented() == theParingNodeValueIsPresented){            
            return;
        }
        
        // Otherwise, the segment is invalid.
        String message = 
            String.format(
                "The child segment %s is pairing with segment %s,"
                + "they should be both empty or presented with data content.",
                node.getNodeName(),
                childSegDef.getName());
        
        ValidationResultEntryProvider entry = 
            new ValidationResultEntry(
                seg.getName(),
                seg.getPosition(),
                elementIndex,    
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_CONDITIONAL_REQUIRED_MISSING,
                message
            );
        
        this.ctx.collect(entry);
    }
    
    private void collectPairedNode(
        PairedNodeValidator pairedNodeValidator, 
        X12SegmentDefinition childSegDef, 
        boolean valueEmpty) {
        
        X12Restriction restriction = 
            childSegDef.getRestriction();
        
        if(StringExtension.isNullOrEmpty(restriction.getPairedNode())){
            return;
        }
        
        pairedNodeValidator.collectPairStartNode(
            childSegDef.getName(), 
            restriction.getPairedNode(), 
            !valueEmpty);
    }
    
    private void validateRemainingElementDefinition(
        X12SegmentDefinition def, SegmentData seg)
        throws X12EngineException {
        
        // childIndex is 0 based
        for(int childIndex = seg.getDataCount()-1; 
                childIndex < def.getChildElementCount(); 
                childIndex++){ 
            
            X12SegmentDefinition childSegDef = 
                    def.getSegments().get(childIndex);
            
            if(childSegDef.isMandatory()){
                
                String msg = String.format(
                    "The element [%s] is mandatory in segment [%s]",
                    childSegDef.getName(),
                    def.getName());
                
                throw new DataElementValidationException( 
                    this.ctx, 
                    seg,
                    childSegDef.getName(),
                    childIndex+1,
                    ValidationErrorCode.ELEMENT_LEVEL_MANDATORY_ELEMENT_MISSING,
                    msg);
            }
        }
    }

    private void validateChildElementCount(X12SegmentDefinition def, SegmentData seg) 
            throws X12EngineException {
        
        if(def.getChildElementCount() == 0){
            
            String msg = String.format("The segment definition [%s] contains "
                    + "no child segments/elements, which is unexpected, "
                    + "please check the schema definition.",
                    def.getName());
            
            throw new X12EngineException(msg);
        }
        
        if(!setting.isPerformEdiSchemaValidation()){
            return;
        }
        
        // Count data element, exclude the segment name
        int dataElementCount = seg.getDataCount() - 1; 
        
        if(def.getChildElementCount() <  dataElementCount){
            
            String msg = String.format("Too many data elements [%d] in the segment [%s], "
                    + "the definition of this segment [%s] contains "
                    + "%d child segments.",
                    dataElementCount,
                    seg.getName(),
                    def.getName(),
                    def.getChildElementCount());
            
            ctx.collect(new ValidationResultEntry(
                seg.getName(),
                seg.getPosition(),
                Constants.NULL_VALUE,
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_TOO_MANY_ELEMENTS,
                msg
                ));
             
        }
    }

    private void verifyValueElement(
            int valueIndex,
            String value, 
            X12SegmentDefinition childSegDef, 
            SegmentData seg) {
        
        if(!setting.isPerformEdiSchemaValidation()){
            return;
        }
        
        Validator validater = validatorFactory.build(childSegDef);
        
        ValidationContext validationContext = new ValidationContext();
        
        validationContext.setResultCollector(ctx);
        validationContext.setSchema(ctx.getCurrentSchema());
        validationContext.setElementDefinition(childSegDef);
        validationContext.setSegment(seg);
        validationContext.setValue(value);
        validationContext.setElementPosition(valueIndex);
        
        validater.validate(validationContext);                
    }
    
    /**
     * @return the ediXmlGenerator
     */
    private EdiXmlGenerator buildEdiXmlGenerator() {

        this.ctx.debug("Creating EDI XML Document [%s]", 
                this.ctx.getCurrentSchema().getName());
        
        EdiXmlGenerator generator = this.ediXmlGeneratorProvider.get();
        generator.getSetting().setDocumentRoot(
                this.ctx.getCurrentSchema().getName());
        
        return generator;
    }
    
    
    private void createEdiXmlDocument(TransactionSet ts) throws X12EngineException {
        
        ediXmlGenerator = buildEdiXmlGenerator();      
        ediXmlGenerator.createDocument(
                ts.getTransactionSetType(),
                ts.getControlNumber()
            );
    }

    private void writeStartElement(String name) throws X12EngineException {
        elementStack.push(name);
        ctx.debug("====>Starting Element [%s]", name);
        ediXmlGenerator.writeStartElement(name);
    }

    private void writeValueElement(String name, String value) throws X12EngineException {
        
        boolean isValueEmpty = StringExtension.isNullOrEmpty(value);
        
        if(isValueEmpty && 
            !setting.isGenerateElementWithEmptyValue()){
            return;
        }
        
        ediXmlGenerator.writeElementWithText(name, value); 
    }

    private void writeCloseElement() {
        try{
            if(!elementStack.isEmpty()){
                String currentElement = elementStack.pop();
                
                ctx.debug("====>Closing Element [%s]", currentElement);
            }
            ediXmlGenerator.closeElement();
        }
        catch(X12EngineException e){
            this.ctx.error(e);
        }
    }
    
    private void saveCurrentEDIXml() throws X12EngineException {        
        ediXmlGenerator.closeDocument();
        ediXmlGenerator.saveDocument();
    }

    /**
     * @return the resultReportEventHanlder
     */
    @Override
    public DisassembleEventHandler<DisassembleResultReportEvent> getResultReportEventHanlder() {
        return resultReportEventHanlder;
    }

    /**
     * @param resultReportEventHanlder the resultReportEventHanlder to set
     */
    @Override
    public void setResultReportEventHanlder(
        DisassembleEventHandler<DisassembleResultReportEvent> resultReportEventHanlder) {
        this.resultReportEventHanlder = resultReportEventHanlder;
    }

    private void fireDisassembleValidationResultEvent(){
        if(null == this.resultReportEventHanlder) {
            return;
        }
        
        DisassembleResultReportEvent e = 
            new DisassembleResultReportEvent(
                ctx, 
                ctx.getValidationResultContainer());
        
        this.resultReportEventHanlder.onEventFired(e);
    }
}
