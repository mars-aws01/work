package com.newegg.edi.x12engine.disassemble.reader;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.newegg.edi.x12engine.common.InterchangeHeader;
import com.newegg.edi.x12engine.parsing.InterchangeHeaderAnalyzer;
import com.newegg.edi.x12engine.common.X12MetaData;
import com.newegg.edi.x12engine.parsing.X12ReaderContext;
import com.newegg.edi.x12engine.common.X12Standard;
import org.junit.*;

import static org.junit.Assert.assertEquals;

/**
 *
 * @author mm67
 */
public class InterchangeHeaderAnalyzerTest {

    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of analyzeISAHeader method, of class InterchangeHeaderAnalyzer.
     */
    @Test
    public void testAnalyzeISAHeader() throws Exception {
        
        final String ISA_X12_CONTENT = 
                "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~";
        
        X12MetaData metaData = new X12MetaData();
        metaData.setElementDelimiter('*');
        metaData.setSegmentTerminator('~');
        
        X12ReaderContext ctx = new X12ReaderContext();
        ctx.setMetaData(metaData);
        
        char[] headerBuffer = ISA_X12_CONTENT.toCharArray();
                
        InterchangeHeader result = InterchangeHeaderAnalyzer.analyzeISAHeader(ctx, headerBuffer);
        
        assertEquals("ISA", result.getName());
        assertEquals(17, result.getDataCount());
        assertEquals("00", result.getDataElement(X12Standard.ISA01_ELEMENT_INDEX));
        assertEquals("          ", result.getDataElement(X12Standard.ISA02_ELEMENT_INDEX));
        assertEquals("00", result.getDataElement(X12Standard.ISA03_ELEMENT_INDEX));
        assertEquals("          ", result.getDataElement(X12Standard.ISA04_ELEMENT_INDEX));
        assertEquals("01", result.getDataElement(X12Standard.ISA05_ELEMENT_INDEX));
        assertEquals("004919486CA    ", result.getDataElement(X12Standard.ISA06_ELEMENT_INDEX));
        assertEquals("ZZ", result.getDataElement(X12Standard.ISA07_ELEMENT_INDEX));
        assertEquals("5626958823CVF  ", result.getDataElement(X12Standard.ISA08_ELEMENT_INDEX));
        assertEquals("170404", result.getDataElement(X12Standard.ISA09_ELEMENT_INDEX));
        assertEquals("1516", result.getDataElement(X12Standard.ISA10_ELEMENT_INDEX));
        assertEquals("U", result.getDataElement(X12Standard.ISA11_ELEMENT_INDEX));
        assertEquals("00401", result.getDataElement(X12Standard.ISA12_ELEMENT_INDEX));
        assertEquals("000119072", result.getDataElement(X12Standard.ISA13_ELEMENT_INDEX));
        assertEquals("0", result.getDataElement(X12Standard.ISA14_ELEMENT_INDEX));
        assertEquals("P", result.getDataElement(X12Standard.ISA15_ELEMENT_INDEX));
        assertEquals(">", result.getDataElement(X12Standard.ISA16_ELEMENT_INDEX));
    }
}
