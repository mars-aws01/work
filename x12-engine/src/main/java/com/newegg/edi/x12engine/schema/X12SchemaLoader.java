/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import org.yaml.snakeyaml.Yaml;

/**
 *
 * @author mm67
 */
public class X12SchemaLoader {
    private X12SchemaLoader(){
    }
 
    public static X12SchemaDefinition loadSchema(String schemaFilePath)
            throws FileNotFoundException, IOException, URISyntaxException{
           return loadSchema(new URL(schemaFilePath));
    }
    
    public static X12SchemaDefinition loadSchema(File schemaFilePath)
            throws FileNotFoundException, IOException, URISyntaxException{
        
        Logger logger = LoggerBuilder.getLogger(Constants.MODULE_CODE_SCHAM_LOADER);
        logger.info("Loading schema " + schemaFilePath.toString());
        
        X12SchemaDefinition schema;
        
        try(FileInputStream stream = new FileInputStream(schemaFilePath)){
            Yaml yaml = new Yaml();
            
            schema = yaml.loadAs(stream, X12SchemaDefinition.class);
            
            logger.info("Schema Loaded: " + schema.getId());
        }
        
        return schema;
    }
    
    public static X12SchemaDefinition loadSchema(URL url) 
            throws FileNotFoundException, IOException, URISyntaxException{

        return loadSchema(new File(url.toURI()));        
    }
    
}
