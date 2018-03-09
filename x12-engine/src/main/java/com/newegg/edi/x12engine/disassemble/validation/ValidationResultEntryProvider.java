/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

/**
 *
 * @author mm67
 */
public interface ValidationResultEntryProvider {

    String getSegmentName();
    /**
     * @return the elementPosition
     */
    int getElementPosition();
    
    /**
     * @return the segmentPosition
     */
    int getSegmentPosition();
    
    /**
     * @return the ResultMessage
     */
    String getResultMessage(); 
    
    int getErrorCode();
    
    ValidationResultType getResultType();
    
    int getComponentPosition();
    
    String getElementData();
}
