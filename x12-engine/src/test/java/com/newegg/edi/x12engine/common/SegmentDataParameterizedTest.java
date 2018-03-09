/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

import com.newegg.edi.x12engine.exceptions.X12EngineException;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

import static org.junit.Assert.assertTrue;

/**
 *
 * @author mm67
 */
@RunWith(Parameterized.class)
public class SegmentDataParameterizedTest {
    
    private final X12MetaData metaData;
          
    @Parameters
    public static String[][] testData(){
        return new String[][]{
          new String[]{"ISA*00*          *00*          *01*043109560      *ZZ*5626958823VF   *170413*1317*U*00401*000016960*0*P*>~", "ISA"},
          new String[]{"GS*SH*043109560_T*5626958823VF_T*20170413*1317*990016961*X*004010~","GS"},
          new String[]{"ST*856*000136354~","ST"},
          new String[]{"SE*24*000136354~","SE"},
          new String[]{"GE*1*990016961~", "GE"},
          new String[]{"IEA*1*990016961~", "IEA"}
        };
    }
    
    private final String segmentData;
    private final String segmentName;
    
    public SegmentDataParameterizedTest(String data, String name){
        segmentData = data;
        segmentName = name;
        
        metaData = new X12MetaData();
        metaData.setElementDelimiter('*');
        metaData.setSegmentTerminator('~');
    }
    
    @Test
    public void verify_segment_name_check_is_correct() throws X12EngineException{
        SegmentData segment = new SegmentData(this.metaData, this.segmentData); 
        
        assertTrue(segment.isSpecificSegment(this.segmentName));
    }
}
