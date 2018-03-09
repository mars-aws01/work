/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.ack;

import com.newegg.edi.x12engine.disassemble.edixml.EdiX12XmlGenerator;
import com.newegg.edi.x12engine.disassemble.edixml.EdiXmlGenerator;
import com.newegg.edi.x12engine.disassemble.edixml.EdiXmlGeneratorSetting;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultContainer;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;
import org.junit.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

/**
 *
 * @author mm67
 */
public class FunctionalAckGeneratorWithErrorTest extends FunctionalAckGeneratorTestBase {
         
    
    @Test
    public void bvt() throws 
        X12EngineException, 
        UnsupportedEncodingException, 
        ParserConfigurationException, 
        SAXException, 
        IOException, 
        XPathExpressionException{
        
        this.fakeInterchange(this.fakeInterchange, 
                "00401","856038470","081940553PA10","16","5626958823BVF","ZZ");
        
        this.fakeGroup(this.fakeGroup, 
                "SH","081940553PA10","5626958823BVF","004010","000002033");
        
        this.fakeTransactionSet(this.fakeTransactionSet, "0001","856");
        
        this.fakeX12InfoProvider(
                fakeX12InfoProvider, 
                fakeInterchange, 
                fakeGroup, 
                fakeTransactionSet);
        
        int segmentPosition = 3;
        int elementPosition = 3;
        
        fakeSegment(this.fakeSegmentContainer, 
                "HL*1**ZZZ","HL",3,segmentPosition);
        
        ValidationResultContainer container = 
                new ValidationResultContainer(fakeInterchange);  

        ValidationResultEntry entry = 
            new ValidationResultEntry(
                "HL", segmentPosition, elementPosition, 
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_INVALID_ENUM_VALUE,
                "Error Message");
        
        entry.setElementData("ZZZ");
        
        container.collectValidationResult(fakeX12InfoProvider, entry);
        
        EdiXmlGeneratorSetting xmlGeneratorSetting = new EdiXmlGeneratorSetting();
        
        xmlGeneratorSetting.setOutputLocation("OUTPUT_LOCATION");
        
        xmlGeneratorSetting.setDocumentRoot(
            FunctionalAckGenerator.DEFAULT_DOCUMENT_ROOT);
        
        when(fakeOutputStreamFactory.getOutputStream(any()))
            .thenReturn(outputStreamEdiXml1);
        
        
        EdiXmlGenerator ediXmlGenerator =
            new EdiX12XmlGenerator(xmlGeneratorSetting, 
                fakeOutputStreamFactory,
                fakeOutputFilePathGenerator);
        
        FunctionalAckGenerationContext ctx =
            new FunctionalAckGenerationContext(
                ediXmlGenerator,
                fakeControlNumberGenerator
            );
        
        FunctionalAckGenerator ackGenerator = new FunctionalAckGenerator(ctx);
        
        ackGenerator.generate(container);
        
         String xmlContent = this.outputStreamEdiXml1.toString("utf-8");
         
        //System.out.println(xmlContent);
         
         Document doc = createDocument(xmlContent);
        
        // Verify transaction set level
        verifyXpathTextValue(doc, "/X12_00401_997/ST/ST01/text()", "997");
        verifyXpathTextValue(doc, "/X12_00401_997/ST/ST02/text()", FunctionalACKCtrlNumber);
        
        verifyXpathTextValue(doc, "/X12_00401_997/AK1/AK101/text()", "SH");
        verifyXpathTextValue(doc, "/X12_00401_997/AK1/AK102/text()", "000002033");
        
        verifyAK2LoopData(doc, "856","0001","AK3Loop[1]/AK3/AK301/text()","HL");
        verifyAK2LoopData(doc, "856","0001","AK3Loop[1]/AK3/AK302/text()","3");
        verifyAK2LoopData(doc, "856","0001","AK3Loop[1]/AK3/AK304/text()","8");
        
        verifyAK2LoopData(doc, "856","0001","AK3Loop[1]/AK4/AK401/AK401_1/text()","3");
        verifyAK2LoopData(doc, "856","0001","AK3Loop[1]/AK4/AK403/text()","7");
        verifyAK2LoopData(doc, "856","0001","AK3Loop[1]/AK4/AK404/text()","ZZZ");
        
        verifyAK2LoopData(doc, "856","0001","AK5/AK501/text()","R");
        verifyAK2LoopData(doc, "856","0001","AK5/AK502/text()","5");
        
        verifyXpathTextValue(doc, "/X12_00401_997/AK9/AK901/text()", "R");
        verifyXpathTextValue(doc, "/X12_00401_997/AK9/AK902/text()", "1");
        verifyXpathTextValue(doc, "/X12_00401_997/AK9/AK903/text()", "1");
        verifyXpathTextValue(doc, "/X12_00401_997/AK9/AK904/text()", "0");
    }
     
    
    
}
