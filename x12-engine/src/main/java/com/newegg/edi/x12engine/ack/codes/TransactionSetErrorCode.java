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
public final class TransactionSetErrorCode {
    
    public static final String AK501_CODE_REJECTED = "R";
    public static final String AK501_CODE_PARTIALLY_ACCEPTED = "P";
    public static final String AK501_CODE_ACCEPTED_WITH_ERROR = "E"; 
    public static final String AK501_CODE_ACCEPTED = "A";
    
    public static final int AK502_CODE_TRANSACTION_SET_NOT_SUPPORTED = 1;
    public static final int AK502_CODE_TRANSACTION_SET_TRAILER_MISSING = 2;
    public static final int AK502_CODE_TRANSACTION_SET_CTRL_NUMBER_NOT_MATCH = 3;
    public static final int AK502_CODE_TRANSACTION_SET_SEGMENTS_COUNT_NOT_MATCH = 4;
    public static final int AK502_CODE_TRANSACTION_SET_HAS_ERROR_SEGMENTS = 5;
    public static final int AK502_CODE_TRANSACTION_SET_MISSING_OR_INVALID_IDENTIFIER = 6;
    public static final int AK502_CODE_TRANSACTION_SET_DUPLICATE_CTRL_NUMBER = 7;
    
    private TransactionSetErrorCode(){
        
    }
}
