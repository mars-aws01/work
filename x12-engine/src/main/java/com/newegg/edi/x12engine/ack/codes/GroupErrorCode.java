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
public final class GroupErrorCode {
    public static final String AK901_CODE_ACCEPTED = "A";
    public static final String AK901_CODE_ACCEPTED_WITH_ERROR = "E";
    public static final String AK901_CODE_PARTIALLY_ACCEPTED = "P";
    public static final String AK901_CODE_REJECTED = "R";
    
    public static final int AK905_CODE_UNSUPPORTED_GROUP = 1;
    public static final int AK905_CODE_UNSUPPORTED_GROUP_VERSION = 2;
    public static final int AK905_CODE_GROUP_TRAILER_MISSING = 3;
    public static final int AK905_CODE_GROUP_CTRL_NUMBER_NOT_MATCH = 4;
    public static final int AK905_CODE_TRANSACTION_SET_COUNT_NOT_MATCH = 5;
    public static final int AK905_CODE_DUPLICATE_GROUP_CTRL_NUMBER = 6;
    
    private GroupErrorCode(){
        
    }
}
