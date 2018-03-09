/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.exceptions.X12EngineException;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

/**
 *
 * @author mm67
 */
public class InventorySchemaVisitorTest extends X12SchemaVisitorTestBase {
    
    @Test
    public void visit_x12_846_schema_test() 
            throws IOException,
            FileNotFoundException,
            URISyntaxException,
            X12EngineException{
        
        X12SchemaVisitor visitor = new X12SchemaVisitor(
                super.getSchemaFromFile(SchemaFile846));
        
        visitor.initialize();
         
        while(visitor.moveToNextSegment()){
             
            X12SegmentDefinition segmentDef = visitor.getCurrentSegmentDefinition();
            
            String prefix = StringUtils.repeat("  ", segmentDef.getLevel());
            
            System.out.printf("Schema SEGMENT Definition: %s%s \r\n",
                    prefix,
                    segmentDef.toString());
            
            System.out.println("Path:" + visitor.getCurrentSegmentPath());
        }
    }
}
