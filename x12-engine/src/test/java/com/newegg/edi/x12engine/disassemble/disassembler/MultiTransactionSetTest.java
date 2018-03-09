/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.disassembler;

import static com.newegg.edi.x12engine.disassemble.disassembler.X12DisassemblerTestBase.SchemaFileName_0401_856;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import org.junit.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 *
 * @author mm67
 */
public class MultiTransactionSetTest extends X12DisassemblerTestBase{

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
"ST*856*250500002~\n" +
"BSN*00*8006767837*20170427*084046*0001*AS~\n" +
"HL*1**S~\n" +
"TD1*CTN*1****G*7.79*KG~\n" +
"TD5***TOLL TRANS**STANDARD GROUND~\n" +
"REF*BM*IMT4931572~\n" +
"DTM*011*20170427~\n" +
"DTM*371*20170428~\n" +
"N1*ST*Tony Stark~\n" +
"N2*Tony Stark~\n" +
"N3*5550 Doncaster Avenue~\n" +
"N4*Kensington*NS*2133*AU~\n" +
"N1*SF*Ingram Micro Australia~\n" +
"N2*Ingram Micro Australia~\n" +
"N3*22-24  Wonderland Drive~\n" +
"N4*Eastern Creek*NS*2766*AU~\n" +
"HL*2*1*O~\n" +
"PRF*101-118517604***20170426~\n" +
"HL*3*2*P~\n" +
"PO4**1*EA**G*7.79*KG*0.027*CR*78*24.3*14*CM~\n" +
"REF*2I*00393161422239023729~\n" +
"MAN*GM*00393161422239023729~\n" +
"HL*4*3*I~\n" +
"LIN*1*VP*3243418*UP*65030864527*MG*ARMSLIMDUO~\n" +
"SN1**1*EA~\n" +
"PID*F****ACC MNTR STARTECH ARMSLIMDUO R~\n" +
"CTT*2*1~\n" +
"SE*28*250500002~"+
"GE*2*25050~\n" +
"IEA*1*000119072~";    
        
        return X12_DATA;
    }
    

    @Override
    protected void fakeSchema() throws FileNotFoundException, IOException, URISyntaxException {
        X12SchemaDefinition schema856 = buildFakeSchema(SchemaFileName_0401_856);
        when(fakeX12SchemaProvider.search(any())).thenReturn(schema856);    
    }
    
    @Override
    protected void fakeOutputStream() throws IOException {
        
        when(fakeOutputStreamFactory.getOutputStream(outputFilePath1))
                .thenReturn(outputStreamEdiXml1);
        
        when(fakeOutputStreamFactory.getOutputStream(outputFilePath2))
                .thenReturn(outputStreamEdiXml2);
    }
    
    private final String outputFilePath1="PATH 1";
    private final String outputFilePath2="PATH 2";
    
    @Test
    public void test_with_856_x12_with_Multiple_Transaction_Sets() 
            throws FileNotFoundException, IOException, X12EngineException, Exception{
        
        this.fakePathGenerator("856", "250500001", outputFilePath1);
        this.fakePathGenerator("856", "250500002", outputFilePath2);
        
        this.disassembler.initialize();
        this.disassembler.execute();
        
        System.out.println(this.outputStreamEdiXml1.toString());
        System.out.println(this.outputStreamEdiXml2.toString());
        
        verify(fakeOutputStreamFactory).getOutputStream(eq(outputFilePath1));        
        verify(fakeOutputStreamFactory).getOutputStream(eq(outputFilePath2));
    }    
}
