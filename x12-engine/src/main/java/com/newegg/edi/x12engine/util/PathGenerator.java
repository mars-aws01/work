/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

/**
 *
 * @author mm67
 */
public interface PathGenerator {
    
    /**
     * Generate output path based on the transaction set type, control number and 
     * output location.
     * 
     * If output location does not exists, it will create one
     * If the operation failed, return null.
     * @param transactionSetType
     * @param transactionSetControlNumber
     * @param outputLocation
     * @return 
     */
    String getPath(
        String transactionSetType, 
        String transactionSetControlNumber,
        String outputLocation);
}
