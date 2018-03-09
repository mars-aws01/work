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
import com.newegg.edi.x12engine.schema.X12Restriction;
import com.newegg.edi.x12engine.util.StringExtension;
import java.math.BigDecimal;
import java.util.regex.Pattern;

/**
 *
 * @author mm67
 */
public class NumberValidator extends ValidatorBase implements Validator {

    @Override
    public void validate(ValidationContext ctx) {
        
        if(isInvalidForRequiredCheck(ctx)){
            return;
        }
        
        // If the value is null or empty, and we've got the code executed to
        // this point, which means the corresponding segment def is not required,
        // So if the value is null or empty, stop the number validation process.
        if(StringExtension.isNullOrEmpty(ctx.getValue())){
            return;
        }
                
        String normalizedValue = ctx.getValue().trim();
        
        if(isInvalidForNumber(ctx, normalizedValue)){
            return;
        }
        
        if(this.isInvalidForMaximumLengthCheck(ctx)){
            return;
        }
        
        if(this.isInvalidForMinimumLengthCheck(ctx)){
            return;
        }
        
        if(isInvalidForDecimalCheck(ctx, normalizedValue)){
            return;
        }
          
        if(isInvalidForMinimumValueCheck(ctx, normalizedValue)){
            return;
        }
        
        isInvalidForMaximumValueCheck(ctx, normalizedValue);
    }
    
    private static final Pattern DECIMAL_NUMBER_REGEX = 
        Pattern.compile("^[-+]?\\d+(\\.\\d*)?$");
    
    private boolean isDecimalNumber(String normalizedValue) {        
        return DECIMAL_NUMBER_REGEX.asPredicate().test(normalizedValue);        
    }
    
    private boolean isInvalidForNumber(
        ValidationContext ctx, 
        String normalizedValue){
        
        boolean isNumeric = isDecimalNumber(normalizedValue);
        
        if(isNumeric){
            return false;
        } 
        
        ValidationResultEntry entry = new ValidationResultEntry(
            ctx.getSegment().getName(),
            ctx.getSegment().getPosition(),
            ctx.getElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
            String.format(
                "The value [%s] of element [%s] invalid for numeric value format.",
                ctx.getValue(),
                ctx.getElementDefinition().getName())
        );

        entry.setElementData(ctx.getValue());

        ctx.getResultCollector().collect(entry);

        return true;        
    }
    
    private boolean isInvalidForDecimalCheck(
        ValidationContext ctx, String normalizedValue) {
        
        int maximumDecimals = 
            ctx.getElementDefinition()
                .getRestriction()
                .getDecimals();
        
        // No Limits
        if(maximumDecimals == Constants.NULL_VALUE){
            return false;
        }
        
        // Invalid limits
        if(maximumDecimals <= 0){
            return false;
        }
        
        BigDecimal decimal = new BigDecimal(normalizedValue);
        
        int scale = decimal.scale() ;
        
        if(scale <= maximumDecimals){
            return false;            
        } 
        
        ValidationResultEntry entry = new ValidationResultEntry(
            ctx.getSegment().getName(),
            ctx.getSegment().getPosition(),
            ctx.getElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
            String.format(
                "The value [%s] of element [%s] invalid for the definition. "
                    + "[Scale:%d MaxDecimals:%d]",
                ctx.getValue(),
                ctx.getElementDefinition().getName(),
                scale,
                maximumDecimals)
        );

        entry.setElementData(ctx.getValue());

        ctx.getResultCollector().collect(entry);

        return true;
    }
    
    private boolean greaterOrEquals(BigDecimal value1, BigDecimal value2){
        return value1.compareTo(value2) >= 0;
    }
    
    private boolean greaterThan(BigDecimal value1, BigDecimal value2){
        return value1.compareTo(value2) > 0;
    }
    
    private boolean lessOrEquals(BigDecimal value1, BigDecimal value2){
        return value1.compareTo(value2) <= 0;
    }
        
    private boolean lessThan(BigDecimal value1, BigDecimal value2){
        return value1.compareTo(value2) < 0;
    }
    
    private boolean isInvalidForMinimumValueCheck(
        ValidationContext ctx, String normalizedValue){
                
        X12Restriction restiction = ctx.getElementDefinition().getRestriction();
        
        BigDecimal minValue = restiction.getMinValue();
        
        // No lower bound limits
        if(minValue == null){
            return false;
        }
        
        BigDecimal decimalValue = new BigDecimal(normalizedValue);
        
        boolean isValid;
        
        // If the valid range including lower bound
        // For lower bound check, if the value is >= min, then valid = true
        
        // If the valid range exclude lower bound
        // and if the value is > min, then valid = true
        if(restiction.isInclusiveLowerBound()){
            isValid = greaterOrEquals(decimalValue, minValue);
        } else {
            isValid = greaterThan(decimalValue, minValue);
        }
                        
        if(isValid){
            return false;
        } 
        
        ValidationResultEntry entry = new ValidationResultEntry(
            ctx.getSegment().getName(),
            ctx.getSegment().getPosition(),
            ctx.getElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_OUT_OF_RANGE,
            String.format(
                "The value [%s] of element [%s] is out of the lower bound. "
                    + "[Minimum value is %s, inclusive lower bound: %s]",
                ctx.getValue(),
                ctx.getElementDefinition().getName(),
                minValue.toPlainString(),
                restiction.isInclusiveLowerBound())
        );

        entry.setElementData(ctx.getValue());

        ctx.getResultCollector().collect(entry);

        return true;            
    }
    
    private boolean isInvalidForMaximumValueCheck(
        ValidationContext ctx, String normalizedValue){

        X12Restriction restiction = ctx.getElementDefinition().getRestriction();
        
        BigDecimal maxValue = restiction.getMaxValue();
         
        if(maxValue == null){
            return false;
        }
        
        BigDecimal decimalValue = new BigDecimal(normalizedValue);
        
        boolean isValid;
        
        if(restiction.isInclusiveUpperBound()){
            isValid = lessOrEquals(decimalValue, maxValue);
        } else {
            isValid = lessThan(decimalValue, maxValue);
        }
        
        if(isValid){            
            return false;
        }
        
        ValidationResultEntry entry = new ValidationResultEntry(
            ctx.getSegment().getName(),
            ctx.getSegment().getPosition(),
            ctx.getElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_OUT_OF_RANGE,
            String.format(
                "The value [%s] of element [%s] out of the upper bound. "
                    + "[Maximum value is %s, inclusive upper bound: %s]",
                ctx.getValue(),
                ctx.getElementDefinition().getName(),
                maxValue.toPlainString(),
                restiction.isInclusiveUpperBound())
        );

        entry.setElementData(ctx.getValue());

        ctx.getResultCollector().collect(entry);

        return true; 
    }
}
