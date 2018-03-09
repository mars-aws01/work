/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import com.newegg.edi.x12engine.util.RegexMatcher;
import com.newegg.edi.x12engine.util.StringExtension;

/**
 *
 * @author mm67
 */
public class TextValidator extends ValidatorBase implements Validator{

    @Override
    public void validate(ValidationContext ctx) {
        
        if(isOptional(ctx) && isValueNullOrEmpty(ctx)){
            return;
        }
        
        if(isInvalidForRequiredCheck(ctx)){
            return;
        }
        
        if(isInvalidForMinimumLengthCheck(ctx)){
            return;
        }
                
        if(isInvalidForMaximumLengthCheck(ctx)){
            return;
        }
                
        matchByRegexPattern(ctx);
    }    
    
    private void matchByRegexPattern(ValidationContext ctx) {
        
        String pattern = ctx.getElementDefinition()
                .getRestriction().getPattern();
        
        // No pattern defined
        if(StringExtension.isNullOrEmpty(pattern)){
            return;
        }
        
        // If the value matches the pattern defined in the segment definition
        if(RegexMatcher.matches(pattern, ctx.getValue())){
           return; 
        }
        
        ValidationResultEntry entry = new ValidationResultEntry(
            ctx.getSegment().getName(),
            ctx.getSegment().getPosition(),
            ctx.getElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
            String.format(
                "The value [%s] of element [%s] "
                    + "does not match the regex pattern [%s].",
                ctx.getValue(),
                ctx.getElementDefinition().getName(),
                pattern)
        );
        
        entry.setElementData(ctx.getValue());
        
        ctx.getResultCollector().collect(entry);
    }
}
