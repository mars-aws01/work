/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.exceptions.validation;

import com.newegg.edi.x12engine.common.SegmentDataInfoContainer;
import com.newegg.edi.x12engine.common.X12InfoProvider;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntryProvider;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;

/**
 *
 * @author mm67
 */
public class ComponentElementValidationException extends DataElementValidationException {
    
    private final int componentElementPosition;
    
    public ComponentElementValidationException(
        X12InfoProvider x12InfoProvider, 
        SegmentDataInfoContainer segment, 
        String elementName,
        int elementPosition,  
        int componentElementPosition,
        int errorCode, 
        String message) {
        super(
            x12InfoProvider, 
            segment, 
            elementName, 
            elementPosition, 
            errorCode, 
            message);
        
        this.componentElementPosition = componentElementPosition;
    }

    /**
     * @return the componentElementPosition
     */
    public int getComponentElementPosition() {
        return componentElementPosition;
    }
    
    @Override
    public ValidationResultEntryProvider toValidationResult() {
        return new ValidationResultEntry(
            this.getSegmentName(),
            this.getSegmentPosition(),
            this.getElementPosition(),
            this.getComponentElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            this.getErrorCode(),
            this.getMessage()
        );
    }
}
