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

import static org.junit.Assert.assertEquals;

/**
 *
 * @author mm67
 */
@RunWith(Parameterized.class)
public class SegmentDataIsEnvelopeSegmentParameterizedTest {
    private final X12MetaData metaData;
          
    @Parameterized.Parameters
    public static String[][] testData(){
        return new String[][]{
          new String[]{"ISA*00*          *00*          *01*043109560      *ZZ*5626958823VF   *170413*1317*U*00401*000016960*0*P*>~", "true"},
          new String[]{"GS*SH*043109560_T*5626958823VF_T*20170413*1317*990016961*X*004010~","true"},
          new String[]{"ST*856*000136354~","true"},
          new String[]{"SE*24*000136354~","true"},
          new String[]{"GE*1*990016961~", "true"},
          new String[]{"IEA*1*990016961~", "true"},
          new String[]{"TD5**2**D*UPSMI~", "false"}
        };
    }
    
    private final String segmentData;
    private final boolean isEnvelopeSegment;
    
    public SegmentDataIsEnvelopeSegmentParameterizedTest(String data, String isEnvelope){
        segmentData = data;
        isEnvelopeSegment = Boolean.valueOf(isEnvelope);
        
        metaData = new X12MetaData();
        metaData.setElementDelimiter('*');
        metaData.setSegmentTerminator('~');
    }
    
    @Test
    public void verify_segment_name_check_is_correct() throws X12EngineException{
        System.out.printf("SegmentData:%s [%s]", this.segmentData, this.isEnvelopeSegment);
        System.out.println();
        
        SegmentData segment = new SegmentData(this.metaData, this.segmentData); 
        
        boolean actual = segment.isEnvelopeSegment();
        
        System.out.printf("SEGMENT.Name: %s isEnvelopeSegment = %s\r\n ",
                segment.getName(),
                actual);

        assertEquals(isEnvelopeSegment, actual);
    }
}
