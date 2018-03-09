/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.util.StringExtension;

/**
 *
 * @author mm67
 */
public class TransactionSet extends SegmentData 
        implements TransactionSetInfoContainer {
     
    private SegmentData closeSegment;
    private int segmentCount;
    
    public TransactionSet(X12MetaData metaData, String segmentData) 
            throws X12EngineException {
        super(metaData, segmentData);
         
    }
    
    public TransactionSet(SegmentData segment){
        super(segment); 
    } 
    
    /*
    Returns the TransactionSetType, 850,810,856
    */
    @Override
    public String getTransactionSetType(){
        return this.getDataElement(X12Standard.ST01);
    }
    
    
        /*
    Returns the TransactionSetControlNumber
    */
    @Override
    public String getControlNumber(){
        return this.getDataElement(X12Standard.ST02);
    }

    public void increaseSegmentCount() {
        segmentCount++;
    }

    /**
     * @return the segmentCount
     */
    public int getSegmentCount() {
        return segmentCount;
    }

    public void setCloseSegment(SegmentData seSegment) {
        this.closeSegment = seSegment;
    }

    /**
     * @return the closeSegment
     */
    public SegmentData getCloseSegment() {
        return closeSegment;
    }
 
    @Override
    public String toString(){
        return String.format("Transaction Set [Type: %s Ctrl#: %s]",
                this.getTransactionSetType(),
                this.getControlNumber());
    }
    
    public boolean isTypeMatch(String transactionSetType){
        if(StringExtension.isNullOrWhitespace(transactionSetType)) return false;
        return transactionSetType.equals(this.getTransactionSetType());
    }
    
    
}
