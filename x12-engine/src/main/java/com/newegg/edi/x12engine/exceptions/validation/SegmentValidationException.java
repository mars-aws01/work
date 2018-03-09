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
public class SegmentValidationException extends X12SchemaValidationException {

    public SegmentValidationException(
        X12InfoProvider x12InfoProvider, 
        SegmentDataInfoContainer segment, 
        int errorCode, 
        String message) {
        
        super(x12InfoProvider, segment, errorCode, message);
    }

    @Override
    public ValidationResultEntryProvider toValidationResult() {
        return new ValidationResultEntry(
            this.getSegmentName(),
            this.getSegmentPosition(),
            Constants.NULL_VALUE,
            Constants.NULL_VALUE,
            ValidationResultType.SEGMENT,
            this.getErrorCode(),
            this.getMessage()
        );
    }
 
}
