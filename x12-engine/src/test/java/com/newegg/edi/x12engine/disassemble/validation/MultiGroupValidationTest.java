/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.disassemble.DisassembleContext;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import com.newegg.edi.x12engine.util.OutputStreamFactory;
import com.newegg.edi.x12engine.validators.DefaultValidatorFactory;
import com.newegg.edi.x12engine.validators.ValidatorFactory;
import java.io.ByteArrayOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URISyntaxException;
import org.junit.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat; 
import static org.mockito.ArgumentMatchers.eq;
import org.mockito.Mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * When a X12 file contains multiple different groups, 
 * Then 
 *    1.validation should be performed per transaction set within each group, 
 *    2.Functional ACK should be generated per group
 *    3.Functional ACK should NOT be generated for FA group if the X12 file has.
 * 
 * @author mm67
 */
public class MultiGroupValidationTest  extends ShipNoticeValidationTestBase {

    @Mock
    protected OutputStreamFactory fakeOutputStreamFactoryFor997;
    
    protected OutputStream outputStreamEdiXmlForInbound856;    
    protected OutputStream outputStreamEdiXmlForInbound997;
    
        
    @Override
    protected ValidatorFactory getValidatorFactory(){
        return new DefaultValidatorFactory();
    }
     
    @Override
    public void setUp() throws Exception{
        super.setUp();
        
        outputStreamEdiXmlForInbound856 = new ByteArrayOutputStream();
        outputStreamEdiXmlForInbound997 = new ByteArrayOutputStream();
        
        // Inbound
        this.fakePathGenerator("856","250500001", "Inbound_856_250500001_EDI_XML.xml");
        this.fakePathGenerator("997","250500002", "Inbound_997_250500002_EDI_XML.xml");         
        
        when(fakeOutputStreamFactory.getOutputStream("Inbound_856_250500001_EDI_XML.xml"))
            .thenReturn(outputStreamEdiXmlForInbound856);
        
        when(fakeOutputStreamFactory.getOutputStream("Inbound_997_250500002_EDI_XML.xml"))
            .thenReturn(outputStreamEdiXmlForInbound997);
        
    }

    @Override
    protected void fakeSchema() throws FileNotFoundException, IOException, URISyntaxException { 
 
        X12SchemaDefinition schema856 = buildFakeSchema(SchemaFileName_0401_856);
        
        when(fakeX12SchemaProvider.search(
                argThat(q->q!=null&&"SH".equals(q.getFunctionalIdentifierCode()))
                )).thenReturn(schema856);   
        
        X12SchemaDefinition schema997 = buildFakeSchema(SchemaFileName_0401_997);
        
        when(fakeX12SchemaProvider.search(
                argThat(q->q!=null&&"FA".equals(q.getFunctionalIdentifierCode()))
                )).thenReturn(schema997);
    }
    
    
    @Override
    protected void fakeOutputStream() throws IOException {
         // Doen by the setup() method
    }

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
"PID*X****DUAL-BAND NANO WL ADAPTER      WRLS~\n" +
"CTT*4*1~\n" +
"SE*25*250500001~\n" +
"GE*2*25050~\n" +
"GS*FA*004919486CA*5626958823CVF*20170508*2304*25051*X*004010~\n" +
"ST*997*250500002~\n" +
"AK1*PO*400879223~\n" +
"AK2*850*879222~\n" +
"AK5*A~\n" +
"AK9*A*1*1*1~\n" +
"SE*6*250500002~\n" +
"GE*1*25051~\n"+
"IEA*1*000119072~";    
        
        return X12_DATA;
    }
    
    private ValidationResultContainer result;
    
    @Test
    public void test_Muli_Group_ValidationReporting() throws X12EngineException{
                
         this.disassembler.setResultReportEventHanlder(
            e->{
                result = e.getResult();
                
                DisassembleContext ctx = e.getCtx();
                
                dumpValidationResult(result);             
            }
        );
        
        this.disassembler.initialize();
        this.disassembler.execute();
        
                // Inbound
        this.fakePathGenerator("856","250500001", "Inbound_856_250500001_EDI_XML.xml");
        this.fakePathGenerator("997","250500002", "Inbound_997_250500002_EDI_XML.xml");    
        
        verify(fakeOutputFilePathGenerator).getPath(eq("856"), eq("250500001"), any());
        verify(fakeOutputFilePathGenerator).getPath(eq("997"), eq("250500002"), any());
    }
}
