/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.disassembler;
 
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
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
public class ShipNotice856X12DisassemblerTest extends X12DisassemblerTestBase {
    
    

    @Override
    protected String getTestX12Content() {
        final String X12_DATA = 
                "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\n" +
"GS*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010~\n" +
"ST*856*250500001~\n" +
"BSN*00*40177341120170404*20170404*151008~\n" +
"HL*1*0*S*1~\n" +
"TD1*CTN*1****G*1*LB~\n" +
"TD5*O*2*PRLA*M*PURO GRND~\n" +
"REF*CN*JFV245892153~\n" +
"REF*CO*JFV245892154~\n" +
"DTM*011*20170404~\n" +
"N1*SF*INGRAM MICRO  CANADA*91*40~\n" +
"N3*INGRAM MICRO  CANADA*88 FOSTER CRESCENT~\n" +
"N4*MISSISSAUGA*ON*L5R4A2*CA~\n" +
"N1*ST*MUJEEBUR SULAIMALEBBE~\n" +
"N3*880 ELLESMERE ROAD UNIT 106~\n" +
"N4*SCARBOROUGH*ON*M1P2W6*CA~\n" +
"HL*2*1*O*1~\n" +
"PRF*101-292842576***20170404~\n" +
"REF*IV*401773411~\n" +
"HL*3*2*P*1~\n" +
"TD1*CTN*1****G*1*LB~\n" +
"REF*2I*JFV245892153~\n" +
"HL*4*3*I*0~\n" +
"LIN*000001*VP*8397DD*MG*USB433ACD1X1*BP*0XM-0076-000*UP*0065030863773~\n" +
"SN1**1*EA**1*EA**AC~\n" +
"PID*X****DUAL-BAND NANO WL ADAPTER      WRLS 1~\n" +
"HL*5*3*I*1~\n" +
"LIN*000002*VP*8397DE*MG*USB433ACD1X2*BP*0XM-0076-001*UP*0065030863774~\n" +
"SN1**1*EA**1*EA**AC~\n" +
"PID*X****DUAL-BAND NANO WL ADAPTER      WRLS 2~\n" +
"CTT*5*1~\n" +
"SE*29*250500001~\n" +
"GE*1*25050~\n" +
"IEA*1*000119072~";    
        
        return X12_DATA;
    }
    
    @Override
    protected void fakeSchema() 
     throws FileNotFoundException, IOException, URISyntaxException {
       X12SchemaDefinition schema = buildFakeSchema(SchemaFileName_0401_856);
       when(fakeX12SchemaProvider.search(any())).thenReturn(schema); 
    }

    @Override
    protected void fakeOutputStream() throws IOException {
        when(fakeOutputStreamFactory.getOutputStream(any()))
                .thenReturn(outputStreamEdiXml1);
    }    
    
    @Test
    public void test_with_normal_856_x12() 
            throws FileNotFoundException, IOException, X12EngineException, Exception{
        
        this.fakePathGenerator();
        
        this.disassembler.initialize();
        this.disassembler.execute();
        
        System.out.println();
        System.out.println("----------------------------------------");
        System.out.println("Output generated EDI XML Content:");
        
        String ediXmlContent = this.outputStreamEdiXml1.toString();
        
        System.out.println(ediXmlContent);
        
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
        verifyXpathTextValue(doc, "/X12_00401_856/ST/ST01/text()", "856");
        verifyXpathTextValue(doc, "/X12_00401_856/ST/ST02/text()", "250500001");
        
        verifyXpathTextValue(doc, "/X12_00401_856/BSN/BSN01/text()", "00");
        verifyXpathTextValue(doc, "/X12_00401_856/BSN/BSN02/text()", "40177341120170404");
        verifyXpathTextValue(doc, "/X12_00401_856/BSN/BSN03/text()", "20170404");
        verifyXpathTextValue(doc, "/X12_00401_856/BSN/BSN04/text()", "151008");

        // Verify ShipNotice level
        
        verifyHLLoopData(doc, "S","1", "HL/HL02/text()","0");             
                
        verifyHLLoopData(doc, "S","1", "TD1/TD101/text()", "CTN");
        verifyHLLoopData(doc, "S","1", "TD1/TD102/text()", "1");
        verifyHLLoopData(doc, "S","1", "TD1/TD106/text()", "G");
        verifyHLLoopData(doc, "S","1", "TD1/TD107/text()", "1");
        verifyHLLoopData(doc, "S","1", "TD1/TD108/text()", "LB");
        
        
        verifyHLLoopData(doc, "S","1", "TD5/TD501/text()", "O");
        verifyHLLoopData(doc, "S","1", "TD5/TD502/text()", "2");
        verifyHLLoopData(doc, "S","1", "TD5/TD503/text()", "PRLA");
        verifyHLLoopData(doc, "S","1", "TD5/TD504/text()", "M");
        verifyHLLoopData(doc, "S","1", "TD5/TD505/text()", "PURO GRND");
        
        verifyHLLoopData(doc, "S","1", "REF[1]/REF01/text()", "CN");
        verifyHLLoopData(doc, "S","1", "REF[1]/REF02/text()", "JFV245892153");
        verifyHLLoopData(doc, "S","1", "REF[2]/REF01/text()", "CO");
        verifyHLLoopData(doc, "S","1", "REF[2]/REF02/text()", "JFV245892154");
        
        verifyHLLoopData(doc, "S","1", "DTM/DTM01/text()", "011");
        verifyHLLoopData(doc, "S","1", "DTM/DTM02/text()", "20170404");
        
        // Verify ShipFrom Data

        verifyShippingAddressData(doc, "SF","N1/N102/text()","INGRAM MICRO  CANADA");
        verifyShippingAddressData(doc, "SF","N1/N103/text()","91");
        verifyShippingAddressData(doc, "SF","N1/N104/text()","40");
        
        verifyShippingAddressData(doc, "SF","N3/N301/text()","INGRAM MICRO  CANADA");
        verifyShippingAddressData(doc, "SF","N3/N302/text()","88 FOSTER CRESCENT");
        
        verifyShippingAddressData(doc, "SF","N4/N401/text()","MISSISSAUGA");
        verifyShippingAddressData(doc, "SF","N4/N402/text()","ON");
        verifyShippingAddressData(doc, "SF","N4/N403/text()","L5R4A2");
        verifyShippingAddressData(doc, "SF","N4/N404/text()","CA");
          
                
        // Verify ShipTo Data
        verifyShippingAddressData(doc, "ST","N1/N102/text()","MUJEEBUR SULAIMALEBBE");        
        verifyShippingAddressData(doc, "ST","N3/N301/text()","880 ELLESMERE ROAD UNIT 106");
        
        verifyShippingAddressData(doc, "ST","N4/N401/text()","SCARBOROUGH");
        verifyShippingAddressData(doc, "ST","N4/N402/text()","ON");
        verifyShippingAddressData(doc, "ST","N4/N403/text()","M1P2W6");
        verifyShippingAddressData(doc, "ST","N4/N404/text()","CA");

        // Verify Order Level Data

        verifyHLLoopData(doc, "O","2", "HL/HL02/text()","1"); 
        verifyHLLoopData(doc, "O","2", "HL/HL04/text()","1"); 

        verifyHLLoopData(doc, "O","2", "PRF/PRF01/text()","101-292842576"); 
        verifyHLLoopData(doc, "O","2", "PRF/PRF04/text()","20170404"); 

        verifyHLLoopData(doc, "O","2", "REF/REF01/text()","IV"); 
        verifyHLLoopData(doc, "O","2", "REF/REF02/text()","401773411"); 

        // Verify Package Level Data
        verifyHLLoopData(doc, "P","3", "HL/HL02/text()","2"); 
        verifyHLLoopData(doc, "P","3", "HL/HL04/text()","1"); 
 
        verifyHLLoopData(doc, "P","3", "TD1/TD101/text()","CTN"); 
        verifyHLLoopData(doc, "P","3", "TD1/TD102/text()","1"); 
        verifyHLLoopData(doc, "P","3", "TD1/TD106/text()","G"); 
        verifyHLLoopData(doc, "P","3", "TD1/TD107/text()","1"); 
        verifyHLLoopData(doc, "P","3", "TD1/TD108/text()","LB"); 

        verifyHLLoopData(doc, "P","3", "REF/REF01/text()","2I"); 
        verifyHLLoopData(doc, "P","3", "REF/REF02/text()","JFV245892153"); 

        // Verify Item Level Data 1st item
        verifyHLLoopData(doc, "I","4", "HL/HL02/text()","3"); 
        verifyHLLoopData(doc, "I","4", "HL/HL04/text()","0"); 

        verifyHLLoopData(doc, "I","4", "LIN/LIN01/text()","000001");  
        verifyHLLoopData(doc, "I","4", "LIN/LIN02/text()","VP");  
        verifyHLLoopData(doc, "I","4", "LIN/LIN03/text()","8397DD");  
        verifyHLLoopData(doc, "I","4", "LIN/LIN04/text()","MG");  
        verifyHLLoopData(doc, "I","4", "LIN/LIN05/text()","USB433ACD1X1");  
        verifyHLLoopData(doc, "I","4", "LIN/LIN06/text()","BP");  
        verifyHLLoopData(doc, "I","4", "LIN/LIN07/text()","0XM-0076-000");  
        verifyHLLoopData(doc, "I","4", "LIN/LIN08/text()","UP");  
        verifyHLLoopData(doc, "I","4", "LIN/LIN09/text()","0065030863773"); 

        verifyHLLoopData(doc, "I","4", "SN1/SN102/text()","1"); 
        verifyHLLoopData(doc, "I","4", "SN1/SN103/text()","EA"); 
        verifyHLLoopData(doc, "I","4", "SN1/SN105/text()","1"); 
        verifyHLLoopData(doc, "I","4", "SN1/SN106/text()","EA"); 
        verifyHLLoopData(doc, "I","4", "SN1/SN108/text()","AC"); 

        verifyHLLoopData(doc, "I","4", "PID/PID01/text()","X"); 
        verifyHLLoopData(doc, "I","4", "PID/PID05/text()","DUAL-BAND NANO WL ADAPTER      WRLS 1"); 
 
        // Verify Item Level Data 2nd item
        verifyHLLoopData(doc, "I","5", "HL/HL02/text()","3"); 
        verifyHLLoopData(doc, "I","5", "HL/HL04/text()","1"); 
        verifyHLLoopData(doc, "I","5", "LIN/LIN01/text()","000002");  
        verifyHLLoopData(doc, "I","5", "LIN/LIN02/text()","VP");  
        verifyHLLoopData(doc, "I","5", "LIN/LIN03/text()","8397DE");  
        verifyHLLoopData(doc, "I","5", "LIN/LIN04/text()","MG");  
        verifyHLLoopData(doc, "I","5", "LIN/LIN05/text()","USB433ACD1X2");  
        verifyHLLoopData(doc, "I","5", "LIN/LIN06/text()","BP");  
        verifyHLLoopData(doc, "I","5", "LIN/LIN07/text()","0XM-0076-001");  
        verifyHLLoopData(doc, "I","5", "LIN/LIN08/text()","UP");  
        verifyHLLoopData(doc, "I","5", "LIN/LIN09/text()","0065030863774"); 
        verifyHLLoopData(doc, "I","5", "SN1/SN102/text()","1"); 
        verifyHLLoopData(doc, "I","5", "SN1/SN103/text()","EA"); 
        verifyHLLoopData(doc, "I","5", "SN1/SN105/text()","1"); 
        verifyHLLoopData(doc, "I","5", "SN1/SN106/text()","EA"); 
        verifyHLLoopData(doc, "I","5", "SN1/SN108/text()","AC"); 
        verifyHLLoopData(doc, "I","5", "PID/PID01/text()","X"); 
        verifyHLLoopData(doc, "I","5", "PID/PID05/text()","DUAL-BAND NANO WL ADAPTER      WRLS 2"); 
    }

    
    
    
}
