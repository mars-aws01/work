/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.disassembler;

import com.newegg.edi.x12engine.disassemble.X12Disassembler;
import com.newegg.edi.x12engine.disassemble.X12DisassemblerSetting;
import com.newegg.edi.x12engine.disassemble.edixml.EdiX12XmlGenerator;
import com.newegg.edi.x12engine.disassemble.edixml.EdiXmlGenerator;
import com.newegg.edi.x12engine.disassemble.edixml.EdiXmlGeneratorSetting;
import com.newegg.edi.x12engine.parsing.X12Reader;
import com.newegg.edi.x12engine.parsing.X12ReaderSetting;
import com.newegg.edi.x12engine.schema.SchemaVisitorFactory;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import com.newegg.edi.x12engine.schema.X12SchemaLoader;
import com.newegg.edi.x12engine.schema.X12SchemaVisitorFactory;
import com.newegg.edi.x12engine.util.InputStreamReaderFactory;
import com.newegg.edi.x12engine.util.OutputStreamFactory;
import com.newegg.edi.x12engine.util.TestBase;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.URISyntaxException;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;

import static org.junit.Assert.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;
import com.newegg.edi.x12engine.validators.Validator;
import com.newegg.edi.x12engine.validators.ValidatorFactory;
import com.newegg.edi.x12engine.schema.X12SchemaProvider;
import com.newegg.edi.x12engine.util.PathGenerator;
import static org.mockito.ArgumentMatchers.eq;

/**
 *
 * @author mm67
 */
public abstract class X12DisassemblerTestBase extends TestBase {
    
    @Mock
    protected InputStreamReaderFactory fakeStreamReaderFactory;
    
    @Mock
    protected OutputStreamFactory fakeOutputStreamFactory;
       
    @Mock
    protected X12SchemaProvider fakeX12SchemaProvider;
        
    @Mock
    protected EdiXmlGenerator fakeEdiXmlGenerator;
    
    @Mock
    protected SchemaVisitorFactory fakeSchemaVisitorFactory;
    
    @Mock
    protected ValidatorFactory fakeValidaterFactory;
    
    @Mock
    protected Validator fakeValidaterDefault;
    
    @Mock
    protected PathGenerator fakeOutputFilePathGenerator;
    
    @Rule 
    public MockitoRule mockitoRule = MockitoJUnit.rule(); 
    
    protected OutputStream outputStreamEdiXml1;
    protected OutputStream outputStreamEdiXml2;
    protected InputStream inputStreamEdiX12;
    protected InputStreamReader streamReader; 
    protected X12Disassembler disassembler;
    protected String OutputPath = "THE_OUTPUT_FILE_PATH";
    
    protected final XPathFactory xPathfactory = XPathFactory.newInstance();
    
    protected abstract void fakeOutputStream() throws IOException;
    
    protected ValidatorFactory getValidatorFactory(){
        return fakeValidaterFactory;
    }

    @Before
    public void setUp() throws Exception{
        
        outputStreamEdiXml1 = new ByteArrayOutputStream();
        outputStreamEdiXml2 = new ByteArrayOutputStream();
        
        inputStreamEdiX12 = new ByteArrayInputStream( getData(getTestX12Content()));
        streamReader = new InputStreamReader(inputStreamEdiX12);
        
        when(fakeStreamReaderFactory.build(any(), any())).thenReturn(streamReader);
        when(this.fakeValidaterFactory.build(any()))
                .thenReturn(fakeValidaterDefault);
        
         
        this.fakeSchema();
        
        fakeOutputStream();
        
        X12DisassemblerSetting setting = new X12DisassemblerSetting();
          
        disassembler = new X12Disassembler(setting,
            new X12SchemaVisitorFactory(),
            getValidatorFactory(),
            ()-> new X12Reader(new X12ReaderSetting("",""), this.fakeStreamReaderFactory),
            ()-> new EdiX12XmlGenerator(
                        getEdiXmlGeneratorSetting(),
                        fakeOutputStreamFactory,
                        fakeOutputFilePathGenerator),
            ()-> fakeX12SchemaProvider
        );
    }
    
    protected void fakePathGenerator(){
            when(fakeOutputFilePathGenerator.getPath(
                any(), 
                any(), 
                any()))
                .thenReturn(this.OutputPath);
    }
    
    protected void fakePathGenerator(
        String transactionSetType, 
        String contrlNumber, 
        String expectedOutputPath){
        
            when(fakeOutputFilePathGenerator.getPath(
                eq(transactionSetType), 
                eq(contrlNumber), 
                any()))
                .thenReturn(expectedOutputPath);
    }
    
    protected EdiXmlGeneratorSetting getEdiXmlGeneratorSetting(){
        
        EdiXmlGeneratorSetting ediXmlGeneratorSetting = new EdiXmlGeneratorSetting();
        
        ediXmlGeneratorSetting.setOutputLocation(OutputLocation);
        
        return ediXmlGeneratorSetting;
    }

    @After
    public void tearDown() throws Exception{
        outputStreamEdiXml1.close();
        outputStreamEdiXml2.close();
        inputStreamEdiX12.close();
        streamReader.close();        
        disassembler.close();
        
    }
    
    protected X12SchemaDefinition buildFakeSchema(String schemaFileName) 
            throws IOException, FileNotFoundException, URISyntaxException {
        
        ClassLoader classloader = Thread.currentThread().getContextClassLoader();
        
        URL schemaPath = classloader.getResource("schemas/" + schemaFileName);
        
        return X12SchemaLoader.loadSchema(schemaPath);
    }
    
    protected byte[] getData(final String content) { 
        return content.getBytes(Charset.forName("UTF-8"));
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
    
    protected void verifyHLLoopData(
            Document doc, String loopCode, String loopId, String nodePath, String value) 
            throws XPathExpressionException{

        String path = String.format(
                "/X12_00401_856/" +
                "*[local-name()='HLLoop1' and " + 
                "./HL/HL03/text()='%s' and " +
                "./HL/HL01/text()='%s']/%s",
                loopCode,
                loopId, 
                nodePath);
        
        verifyXpathTextValue(doc, path, value);

    }

    protected void verifyShippingAddressData(
            Document doc, String addType, String nodePath, String value) 
            throws XPathExpressionException{

        String path = String.format(
                "/X12_00401_856" +
                "/*[local-name()='HLLoop1' and ./HL/HL03/text()='S']" +
                "/*[local-name()='N1Loop1' and ./N1/N101/text()='%s']/%s",
                addType,
                nodePath);
 
        verifyXpathTextValue(doc, path, value);

    }
    
    protected static final String OutputLocation = "OUTPUT_LOCATION";
    protected static final String SchemaFileName_0401_856 = "X12_004010_SH_Schema.yml";
    protected static final String SchemaFileName_0401_997 = "X12_004010_FA_Schema.yml";
    protected static final String SchemaFileName_0401_846 = "X12_004010_IB_Schema.yml";
     
    protected abstract String getTestX12Content();   
    
    protected abstract void fakeSchema() 
            throws FileNotFoundException, IOException, URISyntaxException;   
}
