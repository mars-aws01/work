/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.ack;

import com.newegg.edi.x12engine.ack.codes.SegmentErrorCode;
import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.common.X12PartnershipInfoContainer;
import com.newegg.edi.x12engine.common.X12Standard;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultContainer;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultGroup;
import com.newegg.edi.x12engine.disassemble.validation.GroupSummary;
import com.newegg.edi.x12engine.disassemble.validation.TransactionSetSummary;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultTransactionSet;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import com.newegg.edi.x12engine.util.StringExtension;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 *
 * @author mm67
 */
public class FunctionalAckGenerator  {
    
    public static final String TRANSACTION_SET_TYPE = "997";
    public static final String DEFAULT_DOCUMENT_ROOT = "X12_00401_997";
    
    public static final int CONTROL_NUMBER_LENGTH = 8;
    
    public static final String FUNCTIONAL_GROUP_RESPONSE_HEADER_SEG = "AK1";
    
    // SH/PO/IN ...
    public static final String FUNCTIONAL_GROUP_IDENTIFIER_ELEMENT = "AK101";     
    public static final String FUNCTIONAL_GROUP_CTRL_NUMBER_ELEMENT = "AK102";
    
    public static final String TRANSACTION_SET_RESPONSE_LOOP = "AK2Loop";    
    public static final String TRANSACTION_SET_RESPONSE_HEADER_SEG = "AK2";
    
    // 856/810/855
    public static final String TRANSACTION_SET_TYPE_ELEMENT = "AK201";     
    public static final String TRANSACTION_SET_CTRL_NUMBER_ELEMENT = "AK202";
    
    public static final String DATA_ELEMENT_NOTE_LOOP = "AK3Loop";    
    public static final String DATA_SEGMENT_NOTE_SEG = "AK3";
    
    // Data Element note
    // Parent segment description
    public static final String DATA_SEGMENT_NOTE_NAME_ELEMENT = "AK301";
    public static final String DATA_SEGMENT_NOTE_POSITION = "AK302";
    public static final String DATA_SEGMENT_NOTE_LOOP_IDENTIFIER = "AK303";
    public static final String DATA_SEGMENT_NOTE_ERROR_CODE = "AK304";
    
    // Data Element note detailed information
    public static final String DATA_ELEMENT_NOTE_SEG = "AK4";
    public static final String DATA_ELEMENT_NOTE_POSITION = "AK401";
    public static final String DATA_ELEMENT_NOTE_ELEMENT_POSITION = "AK401_1";
    public static final String DATA_ELEMENT_NOTE_COMPONENT_POSITION = "AK401_2";
    public static final String DATA_ELEMENT_NOTE_REFERENCE_NUMBER = "AK402";
    public static final String DATA_ELEMENT_NOTE_SYNTAX_ERROR_CODE = "AK403";
    public static final String DATA_ELEMENT_NOTE_DATA_SNAPSHOT = "AK404";
    
    public static final String TRANSACTION_SET_RESPONSE_TRAILER_SEG = "AK5";
    public static final String TRANSACTION_SET_RESPONSE_TRAILER_ACK_CODE = "AK501";
    public static final String TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE1 = "AK502";
    public static final String TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE2 = "AK503";
    public static final String TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE3 = "AK504";
    public static final String TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE4 = "AK505";
    public static final String TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE5 = "AK506";
    
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_SEG = "AK9";
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_ACK_CODE = "AK901";
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_TRANSET_INCLUDED = "AK902";
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_TRANSET_RECEIVED = "AK903";
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_TRANSET_ACCEPTED = "AK904";
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_ERROR_CODE1 = "AK905";
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_ERROR_CODE2 = "AK906";
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_ERROR_CODE3 = "AK907";
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_ERROR_CODE4 = "AK908";
    public static final String FUNCTIONAL_GROUP_RESPONSE_TRAILER_ERROR_CODE5 = "AK909";
    
    
    private final FunctionalAckGenerationContext ctx;
    private final Logger logger;
    
    public FunctionalAckGenerator(FunctionalAckGenerationContext ctx){
        this.ctx = ctx;     
        this.logger = LoggerBuilder.getLogger(Constants.MODULE_CODE_ACK_GENERATOR);
    }
 
    /**
     * Accept a validation result container, use the data in it to generate the 
     * functional ACK EDI XML content, write the content into the stream created 
     * by OutputStreamFactory
     * @param resultContainer 
     * @throws com.newegg.edi.x12engine.exceptions.X12EngineException 
     */
    public void generate(ValidationResultContainer resultContainer) 
        throws X12EngineException{
        
        logger.info(String.format("Start to generate Functional ACK for Interchange %s", 
            resultContainer.getInterchangeControlNumber()));
        
        if(resultContainer.getValidationResultGroupList().isEmpty()){
            logger.warn(
                "The validation result container contains no "
                    + "validation result group, which should not happen.");
            
            return;
        }
        
        List<ValidationResultGroup> groups = 
            resultContainer.getGroupListForFunctionalACK();
        
        if(groups.isEmpty()){
            
            logger.info("There is no ValidationResultGroup "
                + "available for FunctionalACK generation.");
            
            return;
        }        
        
        List<String> controlNumberList = 
            generateControlNumber(resultContainer, groups.size());
        
        for(int index = 0; index < groups.size(); index++){
            
            generateFunctionalAckForGroup(
                groups.get(index), 
                controlNumberList.get(index));
        }        
    }
    
    private void generateFunctionalAckForGroup(
        ValidationResultGroup group, 
        String controlNumber) throws X12EngineException {
        try{
            
            logger.debug(String.format("Creating document for [%s Ctrl#: %s] "
                + "Validation Target :[%s Ctrl#:%s] ", 
                TRANSACTION_SET_TYPE, 
                controlNumber,
                group.getFunctionalIdentifierCode(),
                group.getGroupControlNumber()));
            
            ctx.getEdiXmlGenerator().createDocument(TRANSACTION_SET_TYPE, controlNumber);
            
            buildFunctionalAckTransactionSetEnvelope(
                group, 
                controlNumber);
        }    
        catch(X12EngineException ex){
            throw ex;
        }
        catch(Exception exx){
            logger.error(exx);
        }
        finally{
            ctx.getEdiXmlGenerator().closeDocument();
        } 
    }

    /**
     * Generate Transaction Set Control Number for Functional ACK
     * @param partnership
     * @return 
     */
    private List<String> generateControlNumber(
        X12PartnershipInfoContainer partnership, int groupCount) {
        
        List<String> controlNumbers = this.ctx.getControlNumberGenerator()
            .getControlNumberList(partnership, groupCount);
        
        return controlNumbers;
    }
    
    private void writeTransactionStartSegment(String controlNumber) 
        throws X12EngineException{
        
        ctx.increaseSegmentCount();
        
        try{
            ctx.getEdiXmlGenerator().writeStartElement(X12Standard.ST);
            
            ctx.getEdiXmlGenerator().writeElementWithText("ST01", 
                TRANSACTION_SET_TYPE);
            
            ctx.getEdiXmlGenerator().writeElementWithText("ST02", 
                controlNumber);
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }
    }
    
    private void writeTransactionEndSegment(String controlNumber) 
        throws X12EngineException {
        
        ctx.increaseSegmentCount();
        
        try{
            
            ctx.getEdiXmlGenerator().writeStartElement(X12Standard.SE);
            
            ctx.getEdiXmlGenerator().writeElementWithText("SE01", 
                String.valueOf(ctx.getSegmentCount()));
            
            ctx.getEdiXmlGenerator().writeElementWithText("SE02",
                controlNumber);
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
            
            // The functional ACK transaction set is generated 
            // for each functional group, so the segment count
            // should be re-count for each functional group
            ctx.resetSegmentCount(); 
        }        
    }

    private void buildFunctionalAckTransactionSetEnvelope( 
        ValidationResultGroup group,
        String controlNumber) throws X12EngineException {
        
        try{
            writeTransactionStartSegment(controlNumber);
             
            buildFunctionalGroupEnvelope(group);
        
        }
        finally{
            writeTransactionEndSegment(controlNumber);
        }
    }

    private void buildFunctionalGroupEnvelope( 
        ValidationResultGroup group) throws X12EngineException {

        buildFunctionalGroupResponseHeader(group);
        
        try{
            
            // Start to generate AK2 Loop for transaction set response within 
            // this group            
            for(ValidationResultTransactionSet ts : group.getTransactionSetList()){
                buildTransactionSetResponseLoop(ts);
            } 
        }
        finally{
            buildFunctionalGroupResponseTrailer(group);    
        }        
    }

    private void buildFunctionalGroupResponseHeader(
        ValidationResultGroup group) throws X12EngineException {
        
        ctx.increaseSegmentCount();
        
        ctx.getEdiXmlGenerator()
            .writeStartElement(FUNCTIONAL_GROUP_RESPONSE_HEADER_SEG);
        
        try{
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                FUNCTIONAL_GROUP_IDENTIFIER_ELEMENT, 
                group.getFunctionalIdentifierCode());
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                FUNCTIONAL_GROUP_CTRL_NUMBER_ELEMENT, 
                group.getGroupControlNumber());
            
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }
    } 
    
    

    private void buildFunctionalGroupResponseTrailer(
        ValidationResultGroup group) throws X12EngineException {
        
        GroupSummary summary = group.buildSummary();
        
        ctx.increaseSegmentCount();
        
        ctx.getEdiXmlGenerator().writeStartElement(
            FUNCTIONAL_GROUP_RESPONSE_TRAILER_SEG);
        
        try{
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                FUNCTIONAL_GROUP_RESPONSE_TRAILER_ACK_CODE, 
                summary.getAckCode());
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                FUNCTIONAL_GROUP_RESPONSE_TRAILER_TRANSET_INCLUDED, 
                String.valueOf(summary.getTransactionSetIncluded()));
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                FUNCTIONAL_GROUP_RESPONSE_TRAILER_TRANSET_RECEIVED, 
                String.valueOf(summary.getTransactionSetReceived()));
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                FUNCTIONAL_GROUP_RESPONSE_TRAILER_TRANSET_ACCEPTED, 
                String.valueOf(summary.getTransactionSetAccepted()));
            
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }
        
    }

    private void buildTransactionSetResponseLoop(ValidationResultTransactionSet ts) 
        throws X12EngineException {
        
        ctx.getEdiXmlGenerator()
            .writeStartElement(TRANSACTION_SET_RESPONSE_LOOP);
        
        try{
            
            buildTransactionSetResponse(ts);
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }        
    }

    private void buildTransactionSetResponse(
        ValidationResultTransactionSet ts) throws X12EngineException {
        
        buildTransactionSetResponseHeader(ts);
        
        try{
            
            // Group ValidationResultEntry by segment name and its position in TS
            Map<String, List<ValidationResultEntry>> groupedDataElementEntryList =
                ts.getDataElementEntryList()
                .stream()
                .filter(e->e.getResultType() == ValidationResultType.DATA_ELEMENT ||
                           e.getResultType() == ValidationResultType.SEGMENT)
                .collect(
                    Collectors.groupingBy(ValidationResultEntry::getGroupingKey)
                );
            
            for(Map.Entry<String,List<ValidationResultEntry>> group : 
                groupedDataElementEntryList.entrySet()){
                buildDataElementNoteLoop(group.getValue());
            }    
            
            
        }
        finally{
            buildTransactionSetResponseTrailer(ts);
        }
        
    }
     

    private void buildTransactionSetResponseHeader(
        ValidationResultTransactionSet ts) throws X12EngineException {
        
        ctx.increaseSegmentCount();
        
        ctx.getEdiXmlGenerator()
            .writeStartElement(TRANSACTION_SET_RESPONSE_HEADER_SEG);
        
        try{
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                TRANSACTION_SET_TYPE_ELEMENT, 
                ts.getTransactionSetType());
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                TRANSACTION_SET_CTRL_NUMBER_ELEMENT, 
                ts.getControlNumber());
            
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }
    }
     
    
    private void writeTextElementIfPresent(
        String elementName, String value) throws X12EngineException{
        
        if(StringExtension.isNullOrWhitespace(value)){
           return;            
        }
        
        ctx.getEdiXmlGenerator().writeElementWithText(
                elementName,
                value);
    }

    private void buildTransactionSetResponseTrailer(
        ValidationResultTransactionSet ts) throws X12EngineException {
        
        ctx.increaseSegmentCount();
        
        ctx.getEdiXmlGenerator()
            .writeStartElement(TRANSACTION_SET_RESPONSE_TRAILER_SEG);
        
        try{
            
            TransactionSetSummary summary = ts.buildSummary();
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                TRANSACTION_SET_RESPONSE_TRAILER_ACK_CODE, 
                summary.getAckCode());
            
            writeTextElementIfPresent(
                TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE1,
                summary.getErrorCode1()
            );
            
            writeTextElementIfPresent(
                TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE2,
                summary.getErrorCode2()
            );
            
            writeTextElementIfPresent(
                TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE3,
                summary.getErrorCode3()
            );
            
            writeTextElementIfPresent(
                TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE4,
                summary.getErrorCode4()
            );
            
            writeTextElementIfPresent(
                TRANSACTION_SET_RESPONSE_TRAILER_ERROR_CODE5,
                summary.getErrorCode5()
            );
            
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }
        
    }
    
    

    private void buildDataElementNoteLoop(
        List<ValidationResultEntry> entryGroup) throws X12EngineException {
        
        if(entryGroup.isEmpty()){
            return;
        }
        
        ctx.getEdiXmlGenerator()
            .writeStartElement(DATA_ELEMENT_NOTE_LOOP);
        
        try{ 
            
            // Sort grouped enetries by element position
            Collections.sort(entryGroup, 
                (e1, e2)->e1.getElementPosition() - e2.getElementPosition());
            
            // Build data segment note by the first entry in this group
            buildDataSegmentNote(entryGroup.get(0));
             
            for(int index = 0; index < entryGroup.size(); index++){
               buildDataElementNote(entryGroup.get(index));
            }
            
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }
    }  
        
    private void buildDataSegmentNote(ValidationResultEntry segmentEntry) 
        throws X12EngineException {
        
        ctx.getEdiXmlGenerator().writeStartElement(DATA_SEGMENT_NOTE_SEG);
        ctx.increaseSegmentCount();
        
        try{
            ctx.getEdiXmlGenerator().writeElementWithText(
                DATA_SEGMENT_NOTE_NAME_ELEMENT, 
                segmentEntry.getSegmentName());
            
            ctx.getEdiXmlGenerator().writeElementWithValue(
                DATA_SEGMENT_NOTE_POSITION, 
                segmentEntry.getSegmentPosition());
            
            ctx.getEdiXmlGenerator().writeElementWithText(
                DATA_SEGMENT_NOTE_LOOP_IDENTIFIER, 
                segmentEntry.getLoopIdentifier());
            
            ctx.getEdiXmlGenerator().writeElementWithValue(
                DATA_SEGMENT_NOTE_ERROR_CODE, 
                SegmentErrorCode.ACK304_CODE_SEGMENT_HAS_DATA_ELEMENT_ERROR);
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }
    }

    
    private void buildDataElementNote(
        ValidationResultEntry entry) 
        throws X12EngineException {
        
        ctx.getEdiXmlGenerator().writeStartElement(DATA_ELEMENT_NOTE_SEG);
        ctx.increaseSegmentCount();
        
        try{
            
            //AK401
            buildDataElementPosition(entry);
            
            //AK402
            ctx.getEdiXmlGenerator().writeElementWithValue(
                DATA_ELEMENT_NOTE_REFERENCE_NUMBER, // TODO: TBD
                entry.getLoopIdentifier());
            
            //AK403
            ctx.getEdiXmlGenerator().writeElementWithValue(
                DATA_ELEMENT_NOTE_SYNTAX_ERROR_CODE, 
                entry.getErrorCode());
            
            //AK404
            ctx.getEdiXmlGenerator().writeElementWithValue(
                DATA_ELEMENT_NOTE_DATA_SNAPSHOT, 
                entry.getElementData());
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }
    }
    
    private void buildDataElementPosition(
        ValidationResultEntry entry) throws X12EngineException {
        
        ctx.getEdiXmlGenerator().writeStartElement(DATA_ELEMENT_NOTE_POSITION);
        
        try{
            
            //AK401_1
            ctx.getEdiXmlGenerator().writeElementWithValue(
                DATA_ELEMENT_NOTE_ELEMENT_POSITION, 
                entry.getElementPosition());
            
            if(entry.getComponentPosition()>0) {            
                //AK401_2
                ctx.getEdiXmlGenerator().writeElementWithValue(
                    DATA_ELEMENT_NOTE_COMPONENT_POSITION, 
                    entry.getComponentPosition());
            }
             
        }
        finally{
            ctx.getEdiXmlGenerator().closeElement();
        }
    }
}
