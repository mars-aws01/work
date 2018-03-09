/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.ack.codes;

/**
 *
 * @author mm67
 */
public final class DataElementErrorCode {
    public static final int AK403_CODE_MANDATORY_ELEMENT_MISSING = 1;
    public static final int AK403_CODE_CONDITIONAL_REQUIRED_ELEMENT_MISSING = 2;
    public static final int AK403_CODE_TOO_MANY_DATA_ELEMENTS = 3;
    public static final int AK403_CODE_DATA_ELEMENT_TOO_SHORT = 4;
    public static final int AK403_CODE_DATA_ELEMENT_TOO_LONG = 5;
    public static final int AK403_CODE_DATA_INVALID_CHARACTER_FOUND = 6;
    public static final int AK403_CODE_INVALID_ENUMERATION_VALUE = 7;
    public static final int AK403_CODE_INVALID_DATE = 8;
    public static final int AK403_CODE_INVALID_TIME = 9;
    public static final int AK403_CODE_EXCLUSION_CONDITION_VIOLATED = 10;
    
    private DataElementErrorCode(){
        
    }
}
