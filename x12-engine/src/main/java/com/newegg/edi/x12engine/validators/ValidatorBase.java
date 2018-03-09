/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import com.newegg.edi.x12engine.schema.X12SegmentDefinition;
import com.newegg.edi.x12engine.util.StringExtension;

/**
 *
 * @author mm67
 */
public abstract class ValidatorBase {
    
    protected int getValueLength(ValidationContext ctx){        
        String value = ctx.getValue();
        if(StringExtension.isNullOrEmpty(value)){
            return 0;
        }
        
        return value.length();
    }
    
    /**
     * Check if the segment is optional, (not required)
     * @param ctx
     * @return 
     */
    protected boolean isOptional(ValidationContext ctx){
        return !ctx.getElementDefinition().getRestriction().isRequired();
    }
    
    protected boolean isValueNullOrEmpty(ValidationContext ctx){
        return StringExtension.isNullOrEmpty(ctx.getValue());
    }
    
    protected boolean isInvalidForRequiredCheck(ValidationContext ctx){
        
        // If this segment is optional, we don't have to check the actual 
        // value
        if(this.isOptional(ctx)) {
            return false;
        }
        
        // If the segment is required, and the value is not empty.
        // this check should pass.
        if(!this.isValueNullOrEmpty(ctx)){
            return false;
        }
        
        ValidationResultEntry entry = new ValidationResultEntry(
            ctx.getSegment().getName(),
            ctx.getSegment().getPosition(),
            ctx.getElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_MANDATORY_ELEMENT_MISSING,
            String.format(
                "The element [%s] is required.",
                ctx.getElementDefinition().getName())
        );
        
        ctx.getResultCollector().collect(entry);

        return true;
    }
    
    protected boolean isInvalidForMinimumLengthCheck(ValidationContext ctx){
        
        X12SegmentDefinition def = ctx.getElementDefinition();        
        
        int minLength = def.getRestriction().getMinLength();
                  
        int valueLength = getValueLength(ctx);
        
        // No minimum length limits
        if(minLength == Constants.NULL_VALUE){
            return false;
        }
        
        // Minimum length limits is invalid
        if(minLength <= 0){
            return false;
        }
        
        // Minimum length limits satisfied
        if(valueLength >= minLength){
            return false;
        }
        
        ValidationResultEntry entry = new ValidationResultEntry(
            ctx.getSegment().getName(),
            ctx.getSegment().getPosition(),
            ctx.getElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_TOO_SHORT,
            String.format(
                "The value [%s] of element [%s] [Length: %d] "
                    + "is too short [Minimum Length: %d].",
                ctx.getValue(),
                ctx.getElementDefinition().getName(),
                valueLength,
                minLength)
        );
        
        entry.setElementData(ctx.getValue());
        
        ctx.getResultCollector().collect(entry);
        return true;
    }
    
    protected boolean isInvalidForMaximumLengthCheck(ValidationContext ctx){
        X12SegmentDefinition def = ctx.getElementDefinition();
        
        int maxLength = def.getRestriction().getMaxLength();
        
        int valueLength = getValueLength(ctx);
        
        // No maximum length limits
        if(maxLength == Constants.NULL_VALUE){
            return false;
        }
        
        // Maximum length limits is invalid
        if(maxLength <= 0){
            return false;
        }
        
        // Maximum length limits satisfied
        if(valueLength <= maxLength){
            return false;
        }
        
        ValidationResultEntry entry = new ValidationResultEntry(
            ctx.getSegment().getName(),
            ctx.getSegment().getPosition(),
            ctx.getElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_TOO_LONG,
            String.format(
                "The value [%s] of element [%s] [Length: %d] "
                    + "is too long [Maximum Length: %d].",
                ctx.getValue(),
                ctx.getElementDefinition().getName(),
                valueLength,
                maxLength)
        );
        
        entry.setElementData(ctx.getValue());
                
        ctx.getResultCollector().collect(entry);
        
        return true;
    }
}
