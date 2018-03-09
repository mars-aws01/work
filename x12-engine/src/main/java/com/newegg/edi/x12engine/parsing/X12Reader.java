/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.parsing;

import com.newegg.edi.x12engine.common.*;
import com.newegg.edi.x12engine.disassemble.events.*;
import com.newegg.edi.x12engine.events.EventManager;
import com.newegg.edi.x12engine.exceptions.InvalidX12FormatException;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.util.InputStreamReaderFactory;
import com.newegg.edi.x12engine.util.StringExtension;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
/**
 *
 * @author mm67
 */
public class X12Reader implements X12StreamReader {
    
    private static final int DEFAULT_BUFFER_SIZE = 256;
    private final X12ReaderContext ctx;

    private final X12ReaderSetting setting;
    
    private final X12MetaData metaData;
        
    private InputStreamReader streamReader;
    private BufferedReader bufferedReader;
    private SegmentData currentDataSegment;
    
    private X12ReaderEventHandler<BeforeInterchangeStartEvent> beforeInterchangeStartHandler;
    private X12ReaderEventHandler<MetaDataExtractedEvent> metaDataExtractedEventHandler;
    private X12ReaderEventHandler<InterchangeStartedEvent> interchangeStartedEventHandler;
    private X12ReaderEventHandler<InterchangeClosedEvent> interchangeClosedEventHandler;
    private X12ReaderEventHandler<GroupStartedEvent> groupStartedEventHandler;
    private X12ReaderEventHandler<GroupClosedEvent> groupClosedEventHandler;
    private X12ReaderEventHandler<TransactionSetStartedEvent> transactionSetStartedEventHandler;
    private X12ReaderEventHandler<TransactionSetClosedEvent> transactionSetClosedEventHandler;    
    private X12ReaderEventHandler<SegmentDataExtractedEvent> segmentDataExtractedEventHandler;
     
    private final InputStreamReaderFactory streamReaderFactory;
     
        /**
     * @return the metaData
     */
    public X12MetaData getMetaData() {
        return metaData;
    } 
    
    
    /**
     * @return the Context
     */
    @Override
    public X12ReaderContext getCtx() {
        return ctx;
    }
    
    /**
     * @param beforeInterchangeStartHandler the beforeInterchangeStartHandler to set
     */
    @Override
    public void setBeforeInterchangeStartHandler(
            X12ReaderEventHandler<BeforeInterchangeStartEvent> 
                    beforeInterchangeStartHandler) {
        
        this.beforeInterchangeStartHandler = beforeInterchangeStartHandler;
    }

    /**
     * @param interchangeStartedEventHandler the interchangeStartedEventHandler to set
     */
    @Override
    public void setInterchangeStartedEventHandler(
            X12ReaderEventHandler<InterchangeStartedEvent> 
                    interchangeStartedEventHandler) {
        
        this.interchangeStartedEventHandler = interchangeStartedEventHandler;
    }

    /**
     * @param metaDataExtractedEventHandler the metaDataExtractedEventHandler to set
     */
    @Override
    public void setMetaDataExtractedEventHandler(
            X12ReaderEventHandler<MetaDataExtractedEvent> 
                    metaDataExtractedEventHandler) {
        this.metaDataExtractedEventHandler = metaDataExtractedEventHandler;
    }

    /**
     * @param interchangeClosedEventHandler the interchangeClosedEventHandler to set
     */
    @Override
    public void setInterchangeClosedEventHandler(
            X12ReaderEventHandler<InterchangeClosedEvent> 
                    interchangeClosedEventHandler) {
        this.interchangeClosedEventHandler = interchangeClosedEventHandler;
    }

    /**
     * @param groupStartedEventHandler the groupStartedEventHandler to set
     */
    @Override
    public void setGroupStartedEventHandler(
            X12ReaderEventHandler<GroupStartedEvent> groupStartedEventHandler) {
        this.groupStartedEventHandler = groupStartedEventHandler;
    }

    /**
     * @param groupClosedEventHandler the groupClosedEventHandler to set
     */
    @Override
    public void setGroupClosedEventHandler(
            X12ReaderEventHandler<GroupClosedEvent> groupClosedEventHandler) {
        this.groupClosedEventHandler = groupClosedEventHandler;
    }

    /**
     * @param transactionSetStartedEventHandler the transactionSetStartedEventHandler to set
     */
    @Override
    public void setTransactionSetStartedEventHandler(
            X12ReaderEventHandler<TransactionSetStartedEvent> 
                    transactionSetStartedEventHandler) {
        this.transactionSetStartedEventHandler = transactionSetStartedEventHandler;
    }

    /**
     * @param transactionSetClosedEventHandler the transactionSetClosedEventHandler to set
     */
    @Override
    public void setTransactionSetClosedEventHandler(
            X12ReaderEventHandler<TransactionSetClosedEvent> 
                    transactionSetClosedEventHandler) {
        this.transactionSetClosedEventHandler = transactionSetClosedEventHandler;
    }

    /**
     * @param segmentDataExtractedEventHandler the segmentDataExtractedEventHandler to set
     */
    @Override
    public void setSegmentDataExtractedEventHandler(
            X12ReaderEventHandler<SegmentDataExtractedEvent> 
                    segmentDataExtractedEventHandler) {
        this.segmentDataExtractedEventHandler = segmentDataExtractedEventHandler;
    }
 
    public X12Reader(
            X12ReaderSetting setting,
            InputStreamReaderFactory streamReaderFactory){   
        
        this.streamReaderFactory = streamReaderFactory;
        this.setting = setting;
        this.metaData = new X12MetaData();
        
        this.ctx = new X12ReaderContext();
        this.ctx.setSetting(setting);
        this.ctx.setMetaData(metaData);
    }
    
    /*
    Try to open the X12 file and probe the X12 file format (separators)
    */
    @Override
    public void open() throws X12EngineException{
        
        ctx.info("[START] Open X12 file [%s] to read.", 
                this.setting.getInputFilePath());   
        try{ 
                        
            this.streamReader = 
                    this.streamReaderFactory.build(
                        this.setting.getInputFilePath(),
                        this.setting.getEncoding());

            this.bufferedReader = new BufferedReader(streamReader);
           
            ctx.info("Reading X12 header ...");
            
            char[] buffer = new char[X12Standard.ISA_SEGMENT_LENGTH];
            
            int headerBytesRead = this.bufferedReader.read(buffer);
            
            if(headerBytesRead != X12Standard.ISA_SEGMENT_LENGTH){
                
                ctx.error("No enough data can be read from the X12 file.");
                throw new X12EngineException(ctx.getLastMessage());
            }
            
            analysisHeaderData(buffer);
            
            fireBeforeInterchangeStart(ctx);
            
            readSegment(128);
                        
            ctx.setCurrentGSSegment("GS"+ctx.getSegmentBuffer().poll());
            
            ctx.beginInterchange();
            
            fireInterchangeStartedEvent(ctx);
            
            ctx.beginGroup(
                    ctx.getCurrentGSSegment());
            
            fireGroupStartedEvent(ctx);

        } catch (X12EngineException e) { 
            ctx.error(e);
            throw e;
        } catch (IOException ex) { 
            throw new X12EngineException(ex);
        }
    }     
     
    @Override
    public boolean iterateSegments() throws X12EngineException{
        
        if(ctx.isSegmentBufferEmpty()){
            
            ctx.debug("No segment in buffer right now, try to read some segments...");
            
            if(!readSegmentForIteration()){
                ctx.debug("No more data can be read "
                        + "from X12 data stream, stopping iteration.");
                
                closeCurrenctInterchange();
                return false;
            }
        }
        else{
            ctx.debug("Current segment buffer size is %d", this.getSegmentBufferSize());
        }
        
        if(ctx.isSegmentBufferEmpty()){
            
            ctx.debug("Some data was read from X12 data stream, "
                    + "but it's an incomplete segment, try to read more data.");
                       
            return true;            
        }
        
        String segmentData = ctx.getSegmentBuffer().poll();
        
        ctx.debug("Next Segment: %s ", segmentData);
        
        if(StringExtension.isNullOrWhitespace(segmentData)){
            throw new InvalidX12FormatException(
                    "The SegmentBuffer contains empty segment.");
        }
        
        int position = ctx.increaseSegmentPositionInTS();
        
        SegmentData segment = new SegmentData(
                ctx.getMetaData(), segmentData, position);
        
        ctx.debug("Segment data instance created for %s", segment.getOriginalSegmentData());
        
        handleSegmentExtracted(segment);        
        
        // If there is more segment in the buffer
        if(ctx.isSegmentBufferNotEmpty()) {
            
            // Make the next iteration to read segment from buffer directly
            return true;
        }
        
        ctx.debug("Current Segment buffer is empty.........");
        
        if(readSegmentForIteration()){
            
            // If the method readSegmentForIteration returns true,
            // The segment buffer should always contains at least one segment
            return true;
        }
        else{
            ctx.debug("Failed to read segments for iteration.");
        }
        
        // If the method readSegmentForIteration returns false,
        // which means the EOF is reached, but there might be some segment data
        // has been read into segment buffer, that's why we should check 
        // for the segment buffer.
        if(ctx.isSegmentBufferNotEmpty()){            
            return true;
        }
        
        ctx.debug("EOF reached and no more data can be read. Closing current interchange.");
        
        // EOF reached and no more data can be read.
        // Make sure unclosed TransactionSet, Group and Interchange get closed,
        // This is for supporting X12 data with incomplete structure.
        this.closeCurrenctInterchange();
        
        // Indicate that no more segment to iterate.
        return false;
    }

    @Override
    public void close(){
        try{
            ctx.debug("Closing the InputStreamReader ...");
            if(this.streamReader !=null){
                this.streamReader.close();
                ctx.debug(">>> InputStreamReader closed.");
            }
        }
        catch(IOException ex){
            ctx.error(ex);
        }
        finally{
            closeBufferedReader();            
        }
    }
    
    private void closeBufferedReader(){
        ctx.debug("Closing Buffered Reader ...");
        try {
            if(this.bufferedReader!=null){            
                this.bufferedReader.close();
                ctx.debug(">>> Buffered Reader closed.");
            
            }
        } catch (IOException ex) {
            ctx.error(">>> Buffered Reader failed to close.");
            ctx.error(ex);
        }
    }
    
    private static char getElementSeparator(final char[] headerBuffer) {
        return headerBuffer[X12Standard.ELEMENT_SEPARATOR_INDEX];
    }

    private static char getSegmentSeparator(final char[] headerBuffer) {
        return headerBuffer[X12Standard.SEGMENT_SEPARATOR_INDEX];
    }

    private static boolean isISAHeader(final char[] headerBuffer) {
        return headerBuffer[0] == 'I' && headerBuffer[1] == 'S' && headerBuffer[2] == 'A';
    }

    private void analysisHeaderData(char[] headerBuffer) 
            throws X12EngineException {
        
        ctx.debug("Analyzing ISA header data.");
        
        if(!isISAHeader(headerBuffer)){
            ctx.error("The file is not started with ISA, which is invalid.");
            throw new X12EngineException(ctx.getLastMessage());
        }
        
        this.metaData.setElementDelimiter(getElementSeparator(headerBuffer));
        this.metaData.setSegmentTerminator(getSegmentSeparator(headerBuffer));
        
        ctx.info("Element Delimiter: %c (%d)", 
                this.metaData.getElementDelimiter(),
                (int)this.metaData.getElementDelimiter()
                );
        ctx.info("Segment Delimiter: %c (%d)",
                this.metaData.getSegmentTerminator(),
                (int)this.metaData.getSegmentTerminator()
                );
        
        InterchangeHeader isaHeader = 
                InterchangeHeaderAnalyzer.analyzeISAHeader(ctx, headerBuffer);
        
        this.metaData.setIsaHeader(isaHeader);
        this.metaData.setComponentElementSeparator(
                isaHeader.getComponentElementSeparator());
        
        ctx.info("Start to process Interchange [From: (%s)%s To: (%s)%s Ctrl# %s] ... ",
                isaHeader.getSenderIdQualifier(),
                isaHeader.getSenderId(),
                isaHeader.getReceiverIdQualifier(),
                isaHeader.getReceiverId(),
                isaHeader.getInterchangeControlNumber());
        
        detectSegmentTerminatorSuffix();
        
        this.fireMetaDataExtractedEvent(this.ctx);
    }
    
    private int readDataFromBufferedReader(char[] buffer)
            throws X12EngineException {
        try
        {
            return this.bufferedReader.read(buffer);
        } catch (IOException ex) {
            throw new X12EngineException(
                String.format(
                        "Faile to read data from "
                        + "bufferedReader into the buffer due to %s", 
                        ex.getMessage()),
                ex);
        }        
    }
    
    private int readDataFromBufferedReader(
            char[] buffer, int startIndex, int length)
            throws X12EngineException {
        try
        {
            return this.bufferedReader.read(buffer, startIndex, length);
        } catch (IOException ex) {
            throw new X12EngineException(
                String.format(
                        "Failed to read data from "
                        + "bufferedReader into the buffer "
                        + "[Start Index %d, length %d] due to %s", 
                        startIndex, 
                        length,
                        ex.getMessage()),
                ex);
        }        
    }

    private void detectSegmentTerminatorSuffix() 
            throws X12EngineException {
        
        ctx.info("Start to detecting segment terminator suffix...");
                
        final int maxSuffixLength = 2;
        char[] suffix = new char[maxSuffixLength];
        
        int actualReads = readDataFromBufferedReader(suffix);
        
        if(actualReads < maxSuffixLength){
            throw new InvalidX12FormatException();
        }
        
        char[] gsElementName = new char[2];
        
        int remainingLengthOfGSElementName;
        
        if(X12Standard.CR == suffix[0]){
            
            if(suffix[1] == X12Standard.LF){
                this.metaData.setSegmentTerminatorSuffix(SegmentTerminatorSuffixType.CRLF);
                
                remainingLengthOfGSElementName = 2;
                
            } else {
                this.metaData.setSegmentTerminatorSuffix(SegmentTerminatorSuffixType.CR);
                
                if(suffix[1] != 'G'){
                    ctx.error("The X12 file contains invalid group start segment.");
                    throw new InvalidX12FormatException(ctx.getLastMessage());
                }
                
                gsElementName[0] = suffix[1];
                remainingLengthOfGSElementName = 1;
            }    
            
        } else if(suffix[0] == X12Standard.LF) {
            this.metaData.setSegmentTerminatorSuffix(SegmentTerminatorSuffixType.LF);
            gsElementName[0] = suffix[1];
            remainingLengthOfGSElementName = 1;
        } else {
            this.metaData.setSegmentTerminatorSuffix(SegmentTerminatorSuffixType.NONE);
            
            if(suffix[0] != 'G' || suffix[1] != 'S'){
                    ctx.error("The X12 file contains invalid group start segment.");
                    throw new InvalidX12FormatException(ctx.getLastMessage());
                }
            
            gsElementName[0] = suffix[0];
            gsElementName[1] = suffix[1]; 
            
            ctx.info("Detected SegmentTerminatorSuffix is %s",
                this.metaData.getSegmentTerminatorSuffix().toString());
            
            return;
        }

        int actualReadRest = readDataFromBufferedReader(gsElementName,
                gsElementName.length - remainingLengthOfGSElementName,
                remainingLengthOfGSElementName);

        if(actualReadRest != remainingLengthOfGSElementName){
            throw new InvalidX12FormatException();
        }
        
        if(gsElementName[0] != 'G' || gsElementName[1] != 'S'){
            throw new InvalidX12FormatException();
        }
        
        ctx.debug("Detected SegmentTerminatorSuffix is %s",
                this.metaData.getSegmentTerminatorSuffix().toString());
             
    }   
 
    private String getCurrentSegmentData(){
        
        int bufferSize = this.ctx.getDataBuffer().size();
        
        if(bufferSize == 0) 
        {
            return StringExtension.EMPTY_STRING;
        }
        
        StringBuilder strBuffer = new StringBuilder(bufferSize);
        
        while(!this.ctx.getDataBuffer().isEmpty()){
            
            Character ch = this.ctx.getDataBuffer().poll();
            if(null == ch) break;
            strBuffer.append(ch.charValue());
        }
        
        strBuffer.append(ctx.getMetaData().getSegmentTerminator());
        
        return strBuffer.toString();
    }
    
    @Override
    public int getSegmentBufferSize(){
        return ctx.getSegmentBuffer().size();
    }

    /*
    Read in given bytes (bufferSize) to load more segment
    */
    private boolean readSegment(int bufferSize) throws X12EngineException{
        
        try {
            char[] buffer = new char[bufferSize];
            
            int readCount = this.bufferedReader.read(buffer);
            
            if(readCount != bufferSize){
                ctx.debug("%d bytes read (Buffer size: %d)", readCount, bufferSize);
            }
             
            for(int index = 0; index < readCount; index++){
                char currentChar = buffer[index];                 
                if(currentChar == ctx.getMetaData().getSegmentTerminator()){
                    
                    String segment = getCurrentSegmentData();
                    ctx.getSegmentBuffer().offer(segment);
                    
                    continue;
                }
                
                if(isSegmentTerminatorSuffix(currentChar)){
                    continue;
                }
                
                ctx.getDataBuffer().offer(currentChar);
            }
            return readCount == bufferSize;
        } catch (IOException ex) {
            throw new X12EngineException(ex);
        }
    }

    private boolean isSegmentTerminatorSuffix(char currentChar) {
        
        if(ctx.getPreviousSegmentTerminatorSuffix() 
                != SegmentTerminatorSuffixType.NONE){
            
            if(X12Standard.CR == currentChar || 
                    X12Standard.LF == currentChar){
                return true;
            }
        }
        
        if(SegmentTerminatorSuffixType.NONE == ctx.getMetaData().getSegmentTerminatorSuffix()){
            return false;
        }
        
        return X12Standard.CR == currentChar ||
                X12Standard.LF == currentChar;
    }
    
    private void fireMetaDataExtractedEvent(X12ReaderContext ctx) {
        EventManager.fireEvent(
                new MetaDataExtractedEvent(ctx), 
                this.metaDataExtractedEventHandler, 
                ()-> ctx.debug("Firing up MetaDataExtractedEvent."));
    }
    
    private void fireBeforeInterchangeStart(X12ReaderContext ctx) {
        EventManager.fireEvent(
                new BeforeInterchangeStartEvent(ctx), 
                this.beforeInterchangeStartHandler, 
                ()-> ctx.debug("Firing up BeforeInterchangeStartEvent."));
    }
    
    private void fireInterchangeStartedEvent(X12ReaderContext ctx){ 
        EventManager.fireEvent(
                new InterchangeStartedEvent(ctx, ctx.getCurrenctInterchange()),
                this.interchangeStartedEventHandler);        
    }
    
    private void fireInterchangeClosedEvent(
            X12ReaderContext ctx, 
            Interchange currentInterchange){ 
        EventManager.fireEvent(
                new InterchangeClosedEvent(ctx, currentInterchange),
                this.interchangeClosedEventHandler);        
    }
    
    private void fireGroupStartedEvent(X12ReaderContext ctx){ 
        EventManager.fireEvent(
                new GroupStartedEvent(ctx, ctx.getCurrentGroup()),
                groupStartedEventHandler);        
    }
    
    private void fireGroupClosedEvent(X12ReaderContext ctx, Group group){ 
        EventManager.fireEvent(
                new GroupClosedEvent(ctx, group),
                groupClosedEventHandler);         
    }
    
    private void fireTransactionSetStartedEvent(X12ReaderContext ctx){ 
        EventManager.fireEvent(
                new TransactionSetStartedEvent(ctx, ctx.getCurrentTransactionSet()),
                transactionSetStartedEventHandler);        
    }
    
    private void fireTransactionSetClosedEvent(
            X12ReaderContext ctx,
            TransactionSet closedTransactionSet){ 
        EventManager.fireEvent(
                new TransactionSetClosedEvent(ctx,closedTransactionSet),
                transactionSetClosedEventHandler);         
    }
    
    private void fireSegmentDataExtractedEvent(SegmentData segment) {
        
        if(segmentDataExtractedEventHandler == null){
            ctx.debug("segmentDataExtractedEventHandler is not set.");
            return;
        }
        
        ctx.debug("Firing segment data extracted event on handler");
        
        EventManager.fireEvent(
                new SegmentDataExtractedEvent(ctx, segment),
                segmentDataExtractedEventHandler);       
    }

    private boolean readSegmentForIteration() throws X12EngineException {
        
        ctx.debug("Reding segments for iteration......");
        
        // If current interchange was completed, we should try
        // to detect new metaData from the next ISA.
        if(ctx.getCurrenctInterchange() == null){
            
            ctx.warn("The current interchange is null.");
            
            if(!detectNewInterchange()) return false;
        }
        else{
            ctx.debug("The current interchange is NOT null.");
        }
        
        boolean readSegmentResult = this.readSegment(DEFAULT_BUFFER_SIZE);
        
        ctx.debug("First readSegment call result is : %s", readSegmentResult);
                
        while(ctx.isSegmentBufferEmpty() && readSegmentResult){
            readSegmentResult = this.readSegment(DEFAULT_BUFFER_SIZE);
            ctx.debug("In whille loop readSegment call result is : %s", readSegmentResult);
        }
        
        return readSegmentResult;
    }

    private void closeCurrenctInterchange() {
        ctx.closeInterchange(null);
    }

    private boolean detectNewInterchange()
            throws X12EngineException {        
        // In this case, the data buffer in meta data 
        // my still contains characters behind the previous interchange.
        if(ctx.isDataBufferNotEmpty()){
            
            char[] isaHeaderBuffer = new char[X12Standard.ISA_SEGMENT_LENGTH];
            StringBuilder charsInBuffer = new StringBuilder();
            int isaIndex = 0;
            boolean isaHeaderBufferIsComplete = false;            

            while(ctx.isDataBufferNotEmpty()){
                
                char c = ctx.getDataBuffer().poll();
                
                if(charsInBuffer.length() == 0 && c == ' '){
                    // Ignore leading space chars
                    continue;
                }

                charsInBuffer.append(c);
                
                if(isaIndex < X12Standard.ISA_SEGMENT_LENGTH){
                    isaHeaderBuffer[isaIndex] = c;
                }
                else{
                    isaHeaderBufferIsComplete = true;
                }
                isaIndex ++;
            }
            
            if(!isaHeaderBufferIsComplete){
                
                // If existing blank characters at the start if ISA segment,
                // do reading loops until a character is readed.                
                while(charsInBuffer.length() == 0){
                    char[] headerBuffer = new char[X12Standard.ISA_SEGMENT_LENGTH];
                    
                    int innerReads = readDataFromBufferedReader(
                            headerBuffer, 
                            0, 
                            X12Standard.ISA_SEGMENT_LENGTH);
                    
                    if(innerReads < X12Standard.ISA_SEGMENT_LENGTH){
                        // No enough data to read.
                        return false;
                    }
                    
                    for(int i=0; i<innerReads; i++){
                        char ch = headerBuffer[i];
                        
                        if(charsInBuffer.length() ==0 && ch == ' ') continue;

                        charsInBuffer.append(ch);
                        isaHeaderBuffer[isaIndex] = ch;
                        isaIndex++;
                    } // End of for loop                                       
                } // End of while loop
                
                int restOfIsaLength = X12Standard.ISA_SEGMENT_LENGTH - isaIndex;
                char[] restOfIsaHeaderBuffer = new char[restOfIsaLength];
                int reads = readDataFromBufferedReader(restOfIsaHeaderBuffer, 0, restOfIsaLength);
                
                if(reads != restOfIsaLength){
                    throw new InvalidX12FormatException(
                            "The X12 data stream contains invalid interchange data.");
                }
                
                for(int i=0; i< reads; i++){
                    char ch = restOfIsaHeaderBuffer[i];
                    charsInBuffer.append(ch);
                }
                
                System.arraycopy(restOfIsaHeaderBuffer, 0, isaHeaderBuffer, isaIndex, restOfIsaLength);
            }
            
            this.analysisHeaderData(isaHeaderBuffer);
            
            this.fireBeforeInterchangeStart(ctx);
            
            this.ctx.beginInterchange();
            
            this.fireInterchangeStartedEvent(ctx);
            
            this.readSegment(128);
            
            this.ctx.setCurrentGSSegment("GS"+ctx.getSegmentBuffer().poll());
            
            this.ctx.beginGroup(ctx.getCurrentGSSegment());
            
            this.fireGroupStartedEvent(ctx);
        }
        
        return true;
    }

    public X12ReaderSetting getSetting() {
        return this.setting;
    }

    private void handleSegmentExtracted(SegmentData segment) 
            throws X12EngineException {
       
        if(segment.isEnvelopeSegment()) {    
            ctx.debug("This is an envelope segment. ");
            if(!segment.isTransactionSetEnvelope())
            {
                handleEnvelopeSegment(segment);
                return;
            }
            
            handleTransactionSetEnvelopeSegment(segment);
            
            return;
        } 
        
        ctx.debug("This is NOT an envelope segment. ");
            
        if(ctx.isEnvelopeSegmentExpected()){
            throw new InvalidX12FormatException(
                    "The X12 reader is expecting an envelope segmenet.");
        }               

        TransactionSet transactionSet = ctx.getCurrentTransactionSet();

        // The segment extracted event should be fired only if 
        // the X12 reader is in a transaction set.
        if(null == transactionSet) return;

        // Update current Data Segment
        currentDataSegment = segment;

        transactionSet.increaseSegmentCount();

        fireSegmentDataExtractedEvent(segment);
    }
    
    private void handleTransactionSetEnvelopeSegment(SegmentData segment){

        handleTransactionSetStarted(segment);
        
        TransactionSet transactionSet = ctx.getCurrentTransactionSet();

        // The segment extracted event should be fired only if 
        // the X12 reader is in a transaction set.
        if(null == transactionSet) return;        
        
        transactionSet.increaseSegmentCount();
        
        // Update current Data Segment
        currentDataSegment = segment;
        
        fireSegmentDataExtractedEvent(segment);    

        handleTransactionSetCompleted(segment);        
    }

    private void handleEnvelopeSegment(SegmentData segment) 
            throws X12EngineException {
        handleInterchangeStarted(segment);
        handleInterchangeCompleted(segment);
        handleGroupCompleted(segment);
        handleGroupStarted(segment);        
    }

    private void handleInterchangeStarted(SegmentData segment)
            throws InvalidX12FormatException {
        if(!segment.isISA()) return;
        
        if(null != ctx.getCurrenctInterchange()){
            
            Interchange currentInterchange = ctx.closeInterchange(null);
            
            this.fireInterchangeClosedEvent(ctx, currentInterchange);
            
            throw new InvalidX12FormatException(
                    String.format("A new interchange [%s] was detected, "+
                            "but the X12 Reader still got an interchange [%s] unclosed, " + 
                            "the interchange has been closed automatically.",
                            segment,
                            currentInterchange));
        }
        
        this.fireBeforeInterchangeStart(ctx);
        
        ctx.beginInterchange();
        
        this.fireInterchangeStartedEvent(ctx);
    }

    private void handleInterchangeCompleted(SegmentData segment) throws InvalidX12FormatException {
        if(!segment.isIEA()) return;
        
        Interchange currentInterchange = ctx.getCurrenctInterchange();
        
        if(null == currentInterchange){
            throw new InvalidX12FormatException(
                String.format("An interchange complete segment %s was detected, " + 
                "but currently no interchange started, " + 
                "interchange complete (IEA) was not expected, " +
                "it may caused by incorrect structure in the X12 data.",
                segment
                )
            );
        }
        
        ctx.closeInterchange(segment);
        
        this.fireInterchangeClosedEvent(ctx, currentInterchange);
    }

    private void handleGroupCompleted(SegmentData segment) throws InvalidX12FormatException {
        if(!segment.isGE()) return;
         
        if(null == ctx.getCurrentGroup()){            
            throw new InvalidX12FormatException(
            String.format("A group complete segment %s was detected, "+
                    "but currently no group started, " + 
                    "group complete (GE) was not expected, " + 
                    "it may caused by incorrect structure in the X12 data.", 
                    segment));
        }
        
        Group group = ctx.closeGroup(segment);
        
        this.fireGroupClosedEvent(ctx, group);
    }

    private void handleGroupStarted(SegmentData segment) throws X12EngineException {
        if(!segment.isGS()) return;
        
        if(null!= ctx.getCurrentGroup()){
            Group completedGroup = ctx.closeGroup(null);
            
            this.fireGroupClosedEvent(ctx, completedGroup);
        }
        
        if(null == ctx.getCurrenctInterchange()){
            throw new InvalidX12FormatException(
            String.format("A group start segment %s was detected but " + 
                    "currently the X12 reader is not in an interchange.", 
                    segment));
        }
        
        ctx.beginGroup(segment.getOriginalSegmentData());
        
        this.fireGroupStartedEvent(ctx);
    }

    private void handleTransactionSetStarted(SegmentData segment) {
        if(!segment.isST()) return;
        
        ctx.beginTransactionSet(segment);
        
        this.currentDataSegment = segment;
        
        this.fireTransactionSetStartedEvent(ctx);
    }
    
    private void handleTransactionSetCompleted(SegmentData segment) {
        if(!segment.isSE()) return;
        
        this.currentDataSegment = segment;
        
        if(null == ctx.getCurrentTransactionSet()) return;
        
        TransactionSet transactionSet = ctx.closeTransactionSet(segment);
        
        this.fireTransactionSetClosedEvent(ctx, transactionSet);
        
        // Since this transaction set ended, we should reset the segment
        // position within a transaction set, to start a new position count.
        ctx.resetSegmentPosition();
    }

    /**
     * @return the currentDataSegment
     */
    @Override
    public SegmentData getCurrentDataSegment() {
        return currentDataSegment;
    }

}
