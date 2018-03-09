/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.UUID;

/**
 *
 * @author mm67
 */
public final class OutputFilePathGenerator implements PathGenerator {
    
    private final Logger logger = 
        LoggerBuilder.getLogger(Constants.MODULE_CODE_OUTPUT_FILE_PATH_GTR);
    
    /**
     * Generate output file path by transaction set type, ctrl number and 
     * output location
     * @param transactionSetType
     * @param transactionSetControlNumber
     * @param outputLocation
     * @return
     */
    @Override
    public String getPath(String transactionSetType, 
        String transactionSetControlNumber,
        String outputLocation){
         
        try {
            // Ensure output location is exists
            // Create it if not exists
            ensureOutputLocationExists(outputLocation);
            
        } catch (IOException ex) {
            logger.error("Failed to ensure output path [%s] existance.",
                    outputLocation);
            logger.error(ex);
            return null;
        }
        
        
        // Generate target file name by parameters
        String outputFileName = generateFileName(
            transactionSetType,
            transactionSetControlNumber);
                
        return Paths.get(outputLocation, outputFileName).toString();
    }
    
    private void ensureOutputLocationExists(String outputLocation) 
        throws IOException {
        
        File file = new File(outputLocation);
        
        if(file.exists()) return;
        
        file.mkdirs();
    }
    
    private String generateFileName(
        String transactionSetType, 
        String transactionSetControlNumber) {
        
        UUID id = UUID.randomUUID();
        
        return "Output_" + transactionSetType + "_"+
            transactionSetControlNumber + "_"+ id.toString()
            +".xml";        
    }
}
