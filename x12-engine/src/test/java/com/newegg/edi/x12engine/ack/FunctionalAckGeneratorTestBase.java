/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.ack;

import com.newegg.edi.x12engine.assemble.ControlNumberGenerator;
import com.newegg.edi.x12engine.common.X12PartnershipInfoContainer;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultContainerTestBase;
import com.newegg.edi.x12engine.util.OutputStreamFactory;
import com.newegg.edi.x12engine.util.PathGenerator;
import org.junit.After;
import org.mockito.Mock;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.when;

/**
 *
 * @author mm67
 */
public class FunctionalAckGeneratorTestBase extends ValidationResultContainerTestBase{
    protected ByteArrayOutputStream outputStreamEdiXml1;
    protected ByteArrayOutputStream outputStreamEdiXml2;
    
    @Mock
    protected OutputStreamFactory fakeOutputStreamFactory;
    
    @Mock
    protected ControlNumberGenerator fakeControlNumberGenerator;
    
    @Mock
    protected X12PartnershipInfoContainer fakePartnership;
    
    @Mock
    protected PathGenerator fakeOutputFilePathGenerator;
    
    protected final XPathFactory xPathfactory = XPathFactory.newInstance();
    
    protected String FunctionalACKCtrlNumber = "500000025";
    
    protected String OutputPath = "THE_OUTPUT_FILE_PATH";
    
    @Override
    public void setup() {
        super.setup();         
        
        outputStreamEdiXml1 = new ByteArrayOutputStream();
        outputStreamEdiXml2 = new ByteArrayOutputStream();        
        
        List<String> controlNumbers = new ArrayList<>();
        
        controlNumbers.add(FunctionalACKCtrlNumber);
        
        when(fakeControlNumberGenerator.getControlNumberList(
            any(),
            anyInt()
            )).thenReturn(controlNumbers);
        
        when(fakeOutputFilePathGenerator.getPath(
            any(), 
            any(), 
            any()))
            .thenReturn(OutputPath);
    }
    
    /**
     *
     * @throws IOException
     */
    @After
    @Override
    public void cleanUp() throws IOException{
        super.cleanUp();     
        outputStreamEdiXml1.close();
        outputStreamEdiXml2.close();
    }
    
    protected Document createDocument(String content)
            throws ParserConfigurationException, SAXException, IOException{
        DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
        DocumentBuilder builder = factory.newDocumentBuilder();
        
        Document doc;
        try (InputStream stream = new ByteArrayInputStream(
                content.getBytes(StandardCharsets.UTF_8))) {
            doc = builder.parse(stream);
        }
        
        return doc;
    }
    
    protected XPathExpression createXpathExp(String xpathString) 
            throws XPathExpressionException{
        XPath xpath = xPathfactory.newXPath();
        XPathExpression expr = xpath.compile(xpathString);
        
        return expr;
    }
    
    protected void verifyXpathTextValue(Document doc,String xPath, 
            String expectedValue) 
            throws XPathExpressionException{        
        
        System.out.printf("Verifying: %s = %s ", xPath, expectedValue);
        
        try{
            
            XPathExpression xpathExp = createXpathExp(xPath);
        
            String result = xpathExp.evaluate(doc);
            
            assertEquals(
                    String.format("Verifying XPath[%s]:", xPath),
                    expectedValue, result);
            
            System.out.print("[PASSED]");
        }
        finally{
            System.out.println();
        }
    }
    
    protected void verifyAK2LoopData(
        Document doc, 
        String tsType, 
        String tsControlNumber, 
        String nodePath, String value) 
            throws XPathExpressionException{

        String path = String.format(
                "/X12_00401_997/" +
                "*[local-name()='AK2Loop' and " + 
                "./AK2/AK201/text()='%s' and " +
                "./AK2/AK202/text()='%s']/%s",
                tsType,
                tsControlNumber, 
                nodePath);
        
        verifyXpathTextValue(doc, path, value);

    }
}
