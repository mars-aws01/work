/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.exceptions.X12EngineException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;
import org.apache.commons.lang3.StringUtils;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
/**
 *
 * @author mm67
 */
public class X12SchemaVisitorTest extends X12SchemaVisitorTestBase {
        
    @Test
    public void visit_x12_856_schema_test() 
            throws IOException,
            URISyntaxException,
            X12EngineException{
        
        X12SchemaVisitor visitor = new X12SchemaVisitor(
                super.getSchemaFromFile(SchemaFile856));
        
        visitor.initialize();
         
        while(visitor.moveToNextSegment()){
             
            X12SegmentDefinition segmentDef = visitor.getCurrentSegmentDefinition();
            
            String prefix = StringUtils.repeat("  ", segmentDef.getLevel());
            
            System.out.printf("Schema SEGMENT Definition: %s%s \r\n",
                    prefix,
                    segmentDef.toString());
        }
    }
        
    @Test
    public void visit_x12_856_schema_loop_test() 
            throws IOException,
            URISyntaxException,
            X12EngineException{
        
        int maxLoopCount = 3;
        
        X12SchemaVisitor visitor = new X12SchemaVisitor(super.getSchemaFromFile(SchemaFile856));
        
        visitor.setIterationCompletedEventHandler(
         (e)-> {
             System.out.printf("Loop Iteration Completed [%s iteration: %s]%n",
                 e.getLoop().getRoot().getName(),
                 e.getLoop().getLoopCount());
             
             if(e.getLoop().getLoopCount() < maxLoopCount){
                 e.setContinueLoop(true);
             } else{
                 e.setContinueLoop(false);
             }
                     });
        
        visitor.initialize();
        
        Map<String, Integer> loopCounts = new HashMap<>();
        
        loopCounts.put("HLLoop1", 0);
        loopCounts.put("N1Loop1", 0);
                 
        while(visitor.moveToNextSegment()){
            
             
            X12SegmentDefinition segmentDef = visitor.getCurrentSegmentDefinition();
            
            countSegmentDef(loopCounts, segmentDef);
                        
            String prefix = StringUtils.repeat("  ", segmentDef.getLevel());
                       
            
            System.out.printf("Schema SEGMENT Definition: %s%s \r\n",
                    prefix,
                    segmentDef.toString());
        }
        
        assertEquals(3, loopCounts.get("HLLoop1").intValue());
        assertEquals(9, loopCounts.get("N1Loop1").intValue());
    }
    
    @Test
    public void visit_x12_856_schema_loop_skip_before_start() 
            throws IOException,
            URISyntaxException,
            X12EngineException{
        
        int maxLoopCount = 3;
        
        Map<String, Integer> newloopCounts = new HashMap<>();
        
        newloopCounts.put("HLLoop1", 0);
        newloopCounts.put("N1Loop1", 0);
                
        X12SchemaVisitor visitor = new X12SchemaVisitor(
                super.getSchemaFromFile(SchemaFile856));
        
        visitor.setIterationCompletedEventHandler(
         (e)-> {
             System.out.printf("Loop Iteration Completed [%s iteration: %s]%n",
                 e.getLoop().getRoot().getName(),
                 e.getLoop().getLoopCount());
             
             if(e.getLoop().getLoopCount() < maxLoopCount){
                 e.setContinueLoop(true);
             } else{
                 e.setContinueLoop(false);
             }
                     });
        
        visitor.setBeforeLoopStartEventHandler(
         (e) -> {
             System.out.printf("New Loop is about to start [%s]%n",
                 e.getX12SegmentDefinition().getName());
             
             countSegmentDef(newloopCounts, e.getX12SegmentDefinition());
         });
        
        visitor.initialize();
                 
        while(visitor.moveToNextSegment()){  
            
            X12SegmentDefinition segmentDef = visitor.getCurrentSegmentDefinition();
            
            String prefix = StringUtils.repeat("  ", segmentDef.getLevel());
            
            System.out.printf("Schema SEGMENT Definition: %s%s \r\n",
                    prefix,
                    segmentDef.toString());
        }
        
        assertEquals(1, newloopCounts.get("HLLoop1").intValue());
        assertEquals(3, newloopCounts.get("N1Loop1").intValue());
        
        assertNull(visitor.getCurrentLoop());
    }
}
