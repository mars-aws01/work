/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.parsing;

import com.newegg.edi.x12engine.common.SegmentData;
import com.newegg.edi.x12engine.disassemble.events.BeforeInterchangeStartEvent;
import com.newegg.edi.x12engine.disassemble.events.GroupClosedEvent;
import com.newegg.edi.x12engine.disassemble.events.GroupStartedEvent;
import com.newegg.edi.x12engine.disassemble.events.InterchangeClosedEvent;
import com.newegg.edi.x12engine.disassemble.events.InterchangeStartedEvent;
import com.newegg.edi.x12engine.disassemble.events.MetaDataExtractedEvent;
import com.newegg.edi.x12engine.disassemble.events.SegmentDataExtractedEvent;
import com.newegg.edi.x12engine.disassemble.events.TransactionSetClosedEvent;
import com.newegg.edi.x12engine.disassemble.events.TransactionSetStartedEvent;
import com.newegg.edi.x12engine.disassemble.events.X12ReaderEventHandler;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import java.io.Closeable;

/**
 *
 * @author mm67
 */
public interface X12StreamReader extends Closeable {
    
    X12ReaderContext getCtx();
    
    void open() throws X12EngineException;
    
    boolean iterateSegments() throws X12EngineException;
    
    SegmentData getCurrentDataSegment();
    
    /**
     * @param beforeInterchangeStartHandler the beforeInterchangeStartHandler to set
     */
    void setBeforeInterchangeStartHandler(
            X12ReaderEventHandler<BeforeInterchangeStartEvent> 
                    beforeInterchangeStartHandler);

    /**
     * @param interchangeStartedEventHandler the interchangeStartedEventHandler to set
     */
    void setInterchangeStartedEventHandler(
            X12ReaderEventHandler<InterchangeStartedEvent> 
                    interchangeStartedEventHandler);

    /**
     * @param metaDataExtractedEventHandler the metaDataExtractedEventHandler to set
     */
    void setMetaDataExtractedEventHandler(
            X12ReaderEventHandler<MetaDataExtractedEvent> 
                    metaDataExtractedEventHandler);

    /**
     * @param interchangeClosedEventHandler the interchangeClosedEventHandler to set
     */
    void setInterchangeClosedEventHandler(
            X12ReaderEventHandler<InterchangeClosedEvent> 
                    interchangeClosedEventHandler);

    /**
     * @param groupStartedEventHandler the groupStartedEventHandler to set
     */
    void setGroupStartedEventHandler(
            X12ReaderEventHandler<GroupStartedEvent> groupStartedEventHandler);

    /**
     * @param groupClosedEventHandler the groupClosedEventHandler to set
     */
    void setGroupClosedEventHandler(
            X12ReaderEventHandler<GroupClosedEvent> groupClosedEventHandler);

    /**
     * @param transactionSetStartedEventHandler the transactionSetStartedEventHandler to set
     */
    void setTransactionSetStartedEventHandler(
            X12ReaderEventHandler<TransactionSetStartedEvent> 
                    transactionSetStartedEventHandler);

    /**
     * @param transactionSetClosedEventHandler the transactionSetClosedEventHandler to set
     */
    void setTransactionSetClosedEventHandler(
            X12ReaderEventHandler<TransactionSetClosedEvent> 
                    transactionSetClosedEventHandler);

    /**
     * @param segmentDataExtractedEventHandler the segmentDataExtractedEventHandler to set
     */
    void setSegmentDataExtractedEventHandler(
            X12ReaderEventHandler<SegmentDataExtractedEvent> 
                    segmentDataExtractedEventHandler);
    
    int getSegmentBufferSize();
}
