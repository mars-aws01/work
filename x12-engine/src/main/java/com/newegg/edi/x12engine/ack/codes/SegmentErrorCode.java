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
public final class SegmentErrorCode {
    
    /**
     * Unrecognized segment ID
     */
    public static final int ACK304_CODE_UNRECOGNIZED_SEGMENT_ID = 1;
    
    /**
     * Unexpected segment
     */
    public static final int ACK304_CODE_UNEXPECTED_SEGMENT = 2;
    
    /**
     * Mandatory segment missing
     */
    public static final int ACK304_CODE_MANDATORY_SEGMENT_MISSING = 3;
    
    /**
     * Loop occurs over maximum times
     */
    public static final int ACK304_CODE_LOOP_OCCURS_OVER_MAX_TIMES = 4;
    
    /**
     * 	Segment exceeds maximum use
     */
    public static final int ACK304_CODE_SEGMENT_EXCEEDS_MAX_USE = 5;
    
    /**
     * Segment not in defined transaction set
     */
    public static final int ACK304_CODE_SEGMENT_UNDEFINED = 6;
    
    /**
     * Segment not in proper sequence
     */
    public static final int ACK304_CODE_SEGMENT_NOT_IN_PROPER_SEQUENCE = 7;
    
    /**
     * Segment has data element errors
     */
    public static final int ACK304_CODE_SEGMENT_HAS_DATA_ELEMENT_ERROR = 8;
    
    /**
     * Trailing separators encountered (custom code)
     */
    public static final int ACK304_CODE_TRAILING_SEPARATORS_ENCOUNTERED = 511;
    
    
    private SegmentErrorCode(){
        
    }
    
}
