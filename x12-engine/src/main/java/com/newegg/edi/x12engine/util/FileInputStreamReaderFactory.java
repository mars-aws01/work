/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import com.ibm.icu.text.CharsetDetector;
import com.ibm.icu.text.CharsetMatch;
import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;

/**
 *
 * @author mm67
 */
public final class FileInputStreamReaderFactory implements InputStreamReaderFactory {
    
    public final String DEFAULT_ENCODING = "UTF-8";
    
    private final Logger logger = 
        LoggerBuilder.getLogger(Constants.MODULE_CODE_INPUTSTREAM_FACTORY);
    
    private final InputStreamFactory inputStreamFactory;
    
    public FileInputStreamReaderFactory(InputStreamFactory inputStreamFactory){
        this.inputStreamFactory = inputStreamFactory;
    }
        
    @Override
    public InputStreamReader build(String filePath, String encoding) 
        throws FileNotFoundException, UnsupportedEncodingException{ 
        String specifiedEncoding = encoding;
        
        if(StringExtension.isNullOrWhitespace(specifiedEncoding)){

            logger.info("Encoding unspecified, try to detect encoding from file."); 

            specifiedEncoding = detectEncoding(filePath);
        }
        else{
            logger.info("Encoding specified : %s.", specifiedEncoding); 
        }
        
        InputStreamReader reader = new InputStreamReader(
            inputStreamFactory.buildInputStream(filePath), 
            specifiedEncoding);
        
        return reader;
    }   
    
    private String detectEncoding(String filePath) {
        try(InputStream stream = new MarkableFileInputStream(new File(filePath))) {

            logger.info("Detecting Charset of the input file ...");
            
            CharsetDetector detector = new CharsetDetector();
            detector.setText(stream);
            CharsetMatch match = detector.detect();

            if(null != match){ 
                logger.info("Detection Result: Name:%s Lang:%s Confidence:%d",
                    match.getName(),
                    match.getLanguage(),
                    match.getConfidence()
                );

                return match.getName(); 
            } else {
                logger.info("Detection Result: Unable to detect charset."); 
            }
        
        } catch (IOException ex) {
            logger.error(ex);
        }
        logger.warn("Using default encoding %s.", DEFAULT_ENCODING); 
        return DEFAULT_ENCODING;
    }
}
