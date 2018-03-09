/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

import com.newegg.edi.x12engine.exceptions.X12EngineException;
import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Assert;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author mm67
 */
public class SegmentDataTest {
    
    private X12MetaData metaData = new X12MetaData();
    
    public SegmentDataTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
        
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
        metaData.setElementDelimiter('*');
        metaData.setSegmentTerminator('~');
    }
    
    @After
    public void tearDown() {
    }

    @Test
    public void segmentData_getDataCount() throws X12EngineException{
        
        SegmentData segment = new SegmentData(this.metaData, 
            "ISA*00*          *00*          *01*043109560      *ZZ*5626958823VF   *170413*1317*U*00401*000016960*0*P*>~");
        
        Assert.assertEquals(17, segment.getDataCount());
    }
    
    @Test
    public void segmentData_getDataCount_2() throws X12EngineException{
        
        this.metaData.setSegmentTerminator('\n');
        
        SegmentData segment = new SegmentData(this.metaData, 
            "ISA*00*          *00*          *01*043109560      *ZZ*5626958823VF   *170413*1317*U*00401*000016960*0*P*>\n");
        
        Assert.assertEquals(17, segment.getDataCount());
    }
    
    @Test
    public void segmentData_getName() throws X12EngineException{
        
        SegmentData segment = new SegmentData(this.metaData, 
            "ISA*00*          *00*          *01*043109560      *ZZ*5626958823VF   *170413*1317*U*00401*000016960*0*P*>~");
        
        Assert.assertEquals("ISA", segment.getName());
    }
    
    @Test
    public void segmentData_getElements_with_correct_size() throws X12EngineException{
        
        SegmentData segment = new SegmentData(this.metaData, 
            "ST*846*000015612~");
        
        Assert.assertEquals(3, segment.getElements().size());
    }
    
    @Test
    public void segmentData_getDataElement_get_name() throws X12EngineException{
        
        SegmentData segment = new SegmentData(this.metaData, 
            "ST*846*000015612~");
        
        Assert.assertEquals("ST", segment.getDataElement(0));
    }
    
    @Test
    public void segmentData_getDataElement_get_ST01() throws X12EngineException{
        
        SegmentData segment = new SegmentData(this.metaData, 
            "ST*846*000015612~");
        
        Assert.assertEquals("846", segment.getDataElement(1));
    }
    
    @Test
    public void segmentData_getDataElement_get_ST02() throws X12EngineException{
        
        SegmentData segment = new SegmentData(this.metaData, 
            "ST*846*000015612~");
        
        Assert.assertEquals("000015612", segment.getDataElement(2));
    }
    
    @Test
    public void segmentData_isEnvelopeSegment() throws X12EngineException{
        
        SegmentData segment = new SegmentData(this.metaData, "ST*846*000015612~");
        
        Assert.assertEquals("000015612", segment.getDataElement(2));
    }
}
