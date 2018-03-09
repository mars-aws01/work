/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.exceptions.validation;

/**
 *
 * @author mm67
 */
public final class ValidationErrorCode {
   
    public static final int SEGMENT_LEVEL_UNRECOGNIZED_SEGMENT_ID = 1;
    public static final int SEGMENT_LEVEL_UNEXPECTED_SEGMENT = 2;
    public static final int SEGMENT_LEVEL_MANDATORY_SEGMENT_MISSING = 3;
    public static final int SEGMENT_LEVEL_TOO_MANY_LOOPS = 4;
    public static final int SEGMENT_LEVEL_MAXIMUM_SEGMENT_USE_EXCEEDED = 5;
    public static final int SEGMENT_LEVEL_NOT_DEFINED = 6;
    public static final int SEGMENT_LEVEL_NOT_IN_PROPER_SEQUENCE = 7;
    public static final int SEGMENT_LEVEL_HAS_DATA_ELEMENT_ERROR = 8;
    public static final int SEGMENT_LEVEL_TRAILING_SEPARATORS_DETECTED = 511;
            
    public static final int ELEMENT_LEVEL_MANDATORY_ELEMENT_MISSING = 1;
    public static final int ELEMENT_LEVEL_CONDITIONAL_REQUIRED_MISSING = 2;
    public static final int ELEMENT_LEVEL_TOO_MANY_ELEMENTS = 3;
    public static final int ELEMENT_LEVEL_DATA_TOO_SHORT = 4;
    public static final int ELEMENT_LEVEL_DATA_TOO_LONG = 5;
    public static final int ELEMENT_LEVEL_INVALID_CHARACTER = 6;
    public static final int ELEMENT_LEVEL_INVALID_ENUM_VALUE = 7;
    public static final int ELEMENT_LEVEL_INVALID_DATE = 8;
    public static final int ELEMENT_LEVEL_INVALID_TIME = 9;
    public static final int ELEMENT_LEVEL_EXCLUSION_CONDITION_VIOLATED = 10;
    public static final int ELEMENT_LEVEL_DATA_OUT_OF_RANGE = 101;
    public static final int ELEMENT_LEVEL_DATA_FORMAT_ERROR = 102;
    
    private ValidationErrorCode(){
        // Prevent it from instantiate
    }
}
