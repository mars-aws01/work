/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.util.TestBase;
import java.util.Map;

/**
 *
 * @author mm67
 */
public abstract class X12SchemaVisitorTestBase extends TestBase {
        
    protected void countSegmentDef(Map<String, Integer> counts,
            X12SegmentDefinition def){
        
        if(counts.containsKey(def.getName())){
            counts.put(def.getName(), 
                    counts.get(def.getName())+1);
            
            return;
        }
        
         counts.put(def.getName(), 1);
    }
}
