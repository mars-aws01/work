/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.exceptions.validation;

import com.newegg.edi.x12engine.common.GroupInfoContainer;
import com.newegg.edi.x12engine.common.InterchangeInfoContainer;
import com.newegg.edi.x12engine.common.SegmentDataInfoContainer;
import com.newegg.edi.x12engine.common.TransactionSetInfoContainer;
import com.newegg.edi.x12engine.common.X12InfoProvider;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntryProvider;
import com.newegg.edi.x12engine.exceptions.X12EngineException;

/**
 *
 * @author mm67
 */
public abstract class X12SchemaValidationException
        extends X12EngineException{
   
    private final InterchangeInfoContainer interchangeInfo;
    private final GroupInfoContainer groupInfo; 
    private final TransactionSetInfoContainer transactionSet;
    private final int segmentPosition;    
    private final String segmentName;
    private final String resultMessage;
    private final int errorCode;
    
    public X12SchemaValidationException(
            X12InfoProvider x12InfoProvider,
            SegmentDataInfoContainer segment,   
            int errorCode, 
            String message) {
        super(message);

        this.interchangeInfo = x12InfoProvider.getCurrentInterchange();
        this.groupInfo = x12InfoProvider.getCurrentGroup();
        this.transactionSet = x12InfoProvider.getCurrentTransactionSet();
        
        this.segmentPosition = segment.getPosition();
        this.segmentName = segment.getName();
        this.errorCode = errorCode;
        
        resultMessage = message;
    }
    
    public abstract ValidationResultEntryProvider toValidationResult();

    /**
     * @return the interchangeInfo
     */
    public InterchangeInfoContainer getInterchangeInfo() {
        return interchangeInfo;
    }

    /**
     * @return the groupInfo
     */
    public GroupInfoContainer getGroupInfo() {
        return groupInfo;
    }

    /**
     * @return the transactionSet
     */
    public TransactionSetInfoContainer getTransactionSet() {
        return transactionSet;
    }

    /**
     * @return the segmentPosition
     */
    public int getSegmentPosition() {
        return segmentPosition;
    }

    /**
     * @return the errorMessage
     */
    public String getResultMessage() {
        return resultMessage;
    }

    public String getSegmentName() {
        return segmentName;
    }

    /**
     * @return the errorCode
     */
    public int getErrorCode() {
        return errorCode;
    }

        
}
