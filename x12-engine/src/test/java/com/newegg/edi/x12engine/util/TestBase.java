/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import com.newegg.edi.x12engine.schema.X12SchemaLoader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;

import junit.framework.TestCase;
import org.junit.Before;
import org.mockito.MockitoAnnotations;

/**
 *
 * @author mm67
 */
public abstract class TestBase {
    @Before 
    public void initMocks() {
           MockitoAnnotations.initMocks(this);
    }
    
    public static final String SchemaFile846 = "X12_004010_IB_Schema.yml";
    public static final String SchemaFile856 = "X12_004010_SH_Schema.yml";
    public static final String SchemaFile997 = "X12_004010_FA_Schema.yml";
    public static final String SchemaDirectory = "schemas";
    
    protected X12SchemaDefinition getSchemaFromFile(String schemaFileName) 
            throws IOException, FileNotFoundException, URISyntaxException {
        
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        
        URL schemaPath = classloader.getResource("schemas/" + schemaFileName);
        
        return X12SchemaLoader.loadSchema(schemaPath);
    }
    
    protected File getSampleFile(String fileName){
        try{
            
            ClassLoader classloader = Thread.currentThread().getContextClassLoader();
            URL filePath = classloader.getResource("samples/" + fileName);            
            return new File(filePath.getPath());            
        } catch(Exception e){
            e.printStackTrace();
            return null;
        }
    }
    
    protected void testOutput(String message){
        System.out.printf("[TEST-OUTPUT] %s%n", message);
    }
    
    protected void testOutput(String format, Object... args){
        testOutput(String.format(format, args));
    }
}
