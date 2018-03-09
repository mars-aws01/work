/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.exceptions.validation;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.common.SegmentDataInfoContainer;
import com.newegg.edi.x12engine.common.X12InfoProvider;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntryProvider;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;

/**
 *
 * @author mm67
 */
public class DataElementValidationException extends X12SchemaValidationException {
    
    private final String elementName;
    private final int elementPosition;
        
    public DataElementValidationException(
        X12InfoProvider x12InfoProvider, 
        SegmentDataInfoContainer segment, 
        String elementName,
        int elementPosition,      
        int errorCode, 
        String message) {
        
        super(x12InfoProvider, segment, errorCode, message);
        
        this.elementName = elementName;
        this.elementPosition = elementPosition;
    }

    /**
     * @return the elementPosition
     */
    public int getElementPosition() {
        return elementPosition;
    }

    /**
     * @return the elementName
     */
    public String getElementName() {
        return elementName;
    }
    
    @Override
    public ValidationResultEntryProvider toValidationResult() {
        return new ValidationResultEntry(
            this.getSegmentName(),
            this.getSegmentPosition(),
            this.getElementPosition(),
            Constants.NULL_VALUE,
            ValidationResultType.DATA_ELEMENT,
            this.getErrorCode(),
            this.getMessage()
        );
    }
}
