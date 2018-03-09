/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.schema.X12Restriction;
import com.newegg.edi.x12engine.schema.X12SegmentDefinition;
import com.newegg.edi.x12engine.util.StringExtension;
import java.util.HashMap;

/**
 *
 * @author mm67
 */
public final class DefaultValidatorFactory implements ValidatorFactory{

    private static final HashMap<String, Validator> validators;
    private static final Validator defaultValidator;
    
    static {
        validators = new HashMap<>();
        
        validators.put(X12Restriction.TARGET_DATA_TYPE_NUMBER.toUpperCase(), 
            new NumberValidator());
        
        validators.put(X12Restriction.TARGET_DATA_TYPE_STRING.toUpperCase(), 
            new TextValidator());
        
        validators.put(X12Restriction.TARGET_DATA_TYPE_ENUM.toUpperCase(), 
            new EnumerationValidator());
        
        defaultValidator = new DummyValidator();
    }
    
    @Override
    public Validator build(X12SegmentDefinition def) {
        
        String dataType = def.getRestriction().getTargetDataType();
        
        if(StringExtension.isNullOrEmpty(dataType)){
            return defaultValidator;
        }
        
        String normalizedDataType = dataType.trim().toUpperCase();
        
        if(validators.containsKey(normalizedDataType)){
            return validators.get(normalizedDataType);
        }
        
        return defaultValidator;
    }
    
}
