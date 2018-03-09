/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.disassembler;

import static com.newegg.edi.x12engine.disassemble.disassembler.X12DisassemblerTestBase.SchemaFileName_0401_997;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.schema.X12SchemaCriteria;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.xpath.XPathExpressionException;
import org.junit.Test; 
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import org.w3c.dom.Document;
import org.xml.sax.SAXException;

/**
 *
 * @author mm67
 */
public class FunctionalACKDisassembleTest extends X12DisassemblerTestBase {

    @Override
    protected String getTestX12Content() {
        
        final String X12_DATA = 
"ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\n" +
"GS*FA*004919486CA*5626958823CVF*20170508*2304*25051*X*004010~\n" +
"ST*997*250500002~\n" +
"AK1*SH*25050~\n" +
"AK2*856*250500001~\n" +
"AK3*LIN*21*3*4~\n" +
"AK4*1>3*9*5*012345678901234567890~\n" +
"AK4*2*9*7*ABB~\n" +
"AK5*R*5~\n" +
"AK2*856*250500002~\n" +
"AK3*LIN*21**8~\n" +
"AK4*6**7*BPPP~\n" +
"AK3*SN1*22**8~\n" +
"AK4*2**5*12345678901~\n" +
"AK5*R*5~\n" +
"AK9*R*2*2*0~\n" +
"SE*15*250500002~\n" +
"GE*1*25051~\n"+
"IEA*1*000119072~";    
        
        return X12_DATA;
    }

    @Override
    protected void fakeOutputStream()  throws IOException{ 
        when(fakeOutputStreamFactory.getOutputStream(this.OutputPath))
                .thenReturn(outputStreamEdiXml1);
    }
    
    @Override
    protected void fakeSchema() throws FileNotFoundException, IOException, URISyntaxException {
        when(fakeX12SchemaProvider.search(
                argThat(
                        (X12SchemaCriteria x)->x!=null&&"FA".equals(x.getFunctionalIdentifierCode())
                )))
                .thenReturn(buildFakeSchema(SchemaFileName_0401_997));  
    }
    
    @Test
    public void test_x12_disassemble() 
            throws FileNotFoundException, IOException, X12EngineException, Exception{
        
        this.fakePathGenerator();
        
        this.disassembler.initialize();
        this.disassembler.execute();
         
        String ediXmlContent = this.outputStreamEdiXml1.toString();
        System.out.println(ediXmlContent);
                       
        verify(fakeOutputStreamFactory).getOutputStream(this.OutputPath);
        
        verifyEDIXmlContent(ediXmlContent);
    }    
    
    private void verifyEDIXmlContent(String ediXmlContent)
            throws ParserConfigurationException, 
            SAXException, 
            IOException, 
            XPathExpressionException{
        
        System.out.println();
        System.out.println("----------------------------------------");
        System.out.println("Verifying generated EDI XML Content...");
        
        Document doc = createDocument(ediXmlContent);
        
        // Verify transaction set level
        verifyXpathTextValue(doc, "/X12_00401_997/ST/ST01/text()", "997");
        verifyXpathTextValue(doc, "/X12_00401_997/ST/ST02/text()", "250500002");
        
        verifyXpathTextValue(doc, "/X12_00401_997/AK1/AK101/text()", "SH");
        verifyXpathTextValue(doc, "/X12_00401_997/AK1/AK102/text()", "25050"); 
 
        verifyXpathTextValue(doc, "/X12_00401_997/AK2Loop/AK2/AK201/text()", "856"); 
        verifyXpathTextValue(doc, "/X12_00401_997/AK2Loop/AK2/AK202/text()", "250500001"); 
        
        verifyXpathTextValue(doc, "/X12_00401_997/AK2Loop/AK3Loop/AK3/AK301/text()", "LIN"); 
        verifyXpathTextValue(doc, "/X12_00401_997/AK2Loop/AK3Loop/AK3/AK302/text()", "21"); 
        verifyXpathTextValue(doc, "/X12_00401_997/AK2Loop/AK3Loop/AK3/AK303/text()", "3"); 
        verifyXpathTextValue(doc, "/X12_00401_997/AK2Loop/AK3Loop/AK3/AK304/text()", "4"); 
        
        verifyAK2AK3Loop(doc, "856","250500001","LIN","AK4[1]/AK401/AK401_1/text()","1");
        verifyAK2AK3Loop(doc, "856","250500001","LIN","AK4[1]/AK401/AK401_2/text()","3");
        
        verifyAK2AK3Loop(doc, "856","250500001","LIN","AK4[1]/AK402/text()","9");
        verifyAK2AK3Loop(doc, "856","250500001","LIN","AK4[1]/AK403/text()","5");
        verifyAK2AK3Loop(doc, "856","250500001","LIN","AK4[1]/AK404/text()","012345678901234567890");
        
        
        verifyAK2AK3Loop(doc, "856","250500001","LIN","AK4[2]/AK401/AK401_1/text()","2"); 
        
        verifyAK2AK3Loop(doc, "856","250500001","LIN","AK4[2]/AK402/text()","9");
        verifyAK2AK3Loop(doc, "856","250500001","LIN","AK4[2]/AK403/text()","7");
        verifyAK2AK3Loop(doc, "856","250500001","LIN","AK4[2]/AK404/text()","ABB");
        
        verifyAK2Loop(doc, "856","250500001","AK5/AK501/text()","R"); 
        verifyAK2Loop(doc, "856","250500001","AK5/AK502/text()","5"); 
        
        // TODO: next AK2 loop need to be verified.
    }
    
    protected void verifyAK2AK3Loop(Document doc, 
            String ak201, 
            String ak202,
            String ak301,
            String xpath, String expectedValue)
        throws XPathExpressionException{
        
        String subNodePath = String.format(
                "*[local-name()='AK3Loop' and ./AK3/AK301/text()='%s']/%s", 
                ak301,
                xpath);
        
        verifyAK2Loop(doc, ak201, ak202, subNodePath, expectedValue);
                
    }
    
    protected void verifyAK2Loop(
            Document doc, String ak201, String ak202, String xpath, String expectedValue) 
            throws XPathExpressionException{

        String path = String.format(
                "/X12_00401_997" +
                "/*[local-name()='AK2Loop' "
                        + "and ./AK2/AK201/text()='%s' "
                        + "and ./AK2/AK202/text()='%s']/%s",
                ak201,
                ak202,
                xpath);
 
        verifyXpathTextValue(doc, path, expectedValue);

    }
}
