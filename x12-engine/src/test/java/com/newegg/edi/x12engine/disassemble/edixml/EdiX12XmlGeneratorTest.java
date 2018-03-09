/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.edixml;

import com.newegg.edi.x12engine.exceptions.X12EngineException; 
import com.newegg.edi.x12engine.util.OutputStreamFactory;
import com.newegg.edi.x12engine.util.PathGenerator;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

/**
 *
 * @author mm67
 */
public class EdiX12XmlGeneratorTest {
     
    private ByteArrayOutputStream outputStream;
            
    @Mock
    protected OutputStreamFactory fakeOutputStreamFactory;
    
    @Mock
    protected PathGenerator fakeOutputFilePathGenerator;
    
    @Rule 
    public MockitoRule mockitoRule = MockitoJUnit.rule(); 
        
    
    @Before
    public void setUp() throws IOException{
                
        outputStream = new ByteArrayOutputStream();
         
        when(fakeOutputStreamFactory.getOutputStream("OUTPUT_PATH")
        ).thenReturn(outputStream) ;
        
        when(fakeOutputFilePathGenerator.getPath(any(),any(),any()))
            .thenReturn("OUTPUT_PATH");
    }
    
    @After
    public void cleanUp() throws IOException{
        outputStream.close();        
    }
    
    @Test
    public void generate_simple_xml_structure() throws X12EngineException, UnsupportedEncodingException{
        
        EdiXmlGeneratorSetting setting = new EdiXmlGeneratorSetting();
        
        setting.setDocumentRoot("X12_00401_856");
        setting.setEncoding("utf-8");
        
        EdiX12XmlGenerator generator = new EdiX12XmlGenerator(
                setting,
                this.fakeOutputStreamFactory,
                this.fakeOutputFilePathGenerator
            );
        
        generator.createDocument("856","000000001");
        generator.writeStartElement("BSN");
        generator.writeElementWithText("BSN01", "Value Of BSN01");
        generator.closeElement();
        generator.closeDocument();
        generator.saveDocument();
        
                 
        String xmlContent = this.outputStream.toString(setting.getEncoding());
        
        assertXmlContent("<X12_00401_856>", xmlContent);
        assertXmlContent("<BSN>", xmlContent);
        assertXmlContent("<BSN01>", xmlContent);
        assertXmlContent("Value Of BSN01", xmlContent);
        assertXmlContent("</BSN01>", xmlContent);
        assertXmlContent("</BSN>", xmlContent);
        assertXmlContent("</X12_00401_856>", xmlContent);
    }
    
    private void assertXmlContent(String expected, String content){
        assertTrue(String.format("The content Should contains %s", expected),
                content.contains(expected));
    }
}
