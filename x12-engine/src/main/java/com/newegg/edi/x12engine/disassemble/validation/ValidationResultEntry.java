/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.common.Constants;


/**
 *
 * @author mm67
 */
public class ValidationResultEntry implements ValidationResultEntryProvider {
    private final ValidationResultType resultType;
    private final int errorCode;
        
    private final int segmentPosition;
    private final int elementPosition;
    private final int componentPosition;
    
    // If the segment of this entry is occurred in a loop
    // set this property to identify the segment in which loop
    private String loopIdentifier;
    
    private String elementData;
    
    private final String segmentName; 
    private final String resultMessage;
     
        
    public ValidationResultEntry(
        String segmentName,
        int segmentPosition, 
        int elementPosition,
        int componentPosition,
        ValidationResultType resultType,
        int errorCode,
        String message){
        
        this.segmentName = segmentName;
        this.segmentPosition = segmentPosition;
        
        this.elementPosition = elementPosition;      
        
        this.componentPosition = componentPosition;
        
        this.resultType = resultType;
        this.errorCode = errorCode;
        
        this.resultMessage = message;       
    }
    
public ValidationResultEntry(
        String segmentName,
        int segmentPosition, 
        int elementPosition, 
        ValidationResultType resultType,
        int errorCode,
        String message){
        
        this(
            segmentName,
            segmentPosition,      
            elementPosition,
            Constants.NULL_VALUE,
            resultType,
            errorCode,   
            message);
    }

    
    
    public ValidationResultEntry(ValidationResultEntryProvider provider){
        this.segmentName = provider.getSegmentName();
        this.segmentPosition = provider.getSegmentPosition(); 
        this.elementPosition = provider.getElementPosition();
        
        this.componentPosition = provider.getComponentPosition();
        
        this.resultType = provider.getResultType();
        this.errorCode = provider.getErrorCode();
        
        this.resultMessage = provider.getResultMessage();
        this.elementData = provider.getElementData();
    }

    /**
     * @return the segmentPosition
     */
    @Override
    public int getSegmentPosition() {
        return segmentPosition;
    }

    /**
     * @return the elementPosition
     */
    @Override
    public int getElementPosition() {
        return elementPosition;
    }

    /**
     * @return the errorMessage
     */
    @Override
    public String getResultMessage() {
        return resultMessage;
    }

    @Override
    public String getSegmentName() {
        return this.segmentName;
    }

    /**
     * @return the resultType
     */
    @Override
    public ValidationResultType getResultType() {
        return resultType;
    }
 
    /**
     * @return the errorCode
     */
    @Override
    public int getErrorCode() {
        return errorCode;
    }

    /**
     * @return the componentPosition
     */
    @Override
    public int getComponentPosition() {
        return componentPosition;
    } 

    /**
     * @return the loopIdentifier
     */
    public String getLoopIdentifier() {
        return loopIdentifier;
    }

    /**
     * @param loopIdentifier the loopIdentifier to set
     */
    public void setLoopIdentifier(String loopIdentifier) {
        this.loopIdentifier = loopIdentifier;
    }
    
    public String getGroupingKey(){
        
        String segName;
        
        if(null == this.segmentName){
            segName = "EMPTY";
        } else {
            segName = this.segmentName.trim();
        }
        
        return segName + "-" + this.segmentPosition;
    }

    /**
     * @return the elementData
     */
    public String getElementData() {
        return elementData;
    }

    /**
     * @param elementData the elementData to set
     */
    public void setElementData(String elementData) {
        this.elementData = elementData;
    }
}
