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
import org.junit.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 *
 * @author mm67
 */
public class Inventory846X12DisassemblerTest extends X12DisassemblerTestBase {
    
    @Override
    protected String getTestX12Content() {
        final String X12_DATA = 
                "ISA*00*          *00*          *ZZ*44424NG        *ZZ*5626958823VF   *170725*0500*U*00401*000003434*0*P*>~\n" +
"GS*IB*44424NG*5626958823VF*20170725*0500*967*X*004010~\n" +
"ST*846*0967~\n" +
"BIA*00*DD*00029997*20170725~\n" +
"CUR*BY*USD~\n" +
"N1*SF*CA Warehouse*91*UNKNOW~\n" +
"N3*540 S. Melrose St.~\n" +
"N4*Placentia*CA*92870*US~\n" +
"LIN*147*VP*SAMLTD116L*MF*AGCL*MG*SAMLTD116L*UP*811793023769~\n" +
"PID*F*08***Samsung Xpress SL-M2625/M2625D/2626/2825/2825DW/2826/2835, MMLT-D116L,Toner Cart~\n" +
"CTP*WH*WHL*28.99~\n" +
"SDQ*EA*54*MEL*50~\n" +
"QTY*33*7*EA~\n" +
"LIN*148*VP*SAMLTD203E*MF*AGCL*MG*SAMLTD203E*UP*~\n" +
"PID*F*08***Samsung ProXpress SL-M3820/M3820ND/M3820DW/M4020ND, M3870FD/MLT-D203E,Toner Cart~\n" +
"CTP*WH*WHL*55.0~\n" +
"SDQ*EA*54*MEL*7~\n" +
"QTY*33*0*EA~\n" +
"LIN*149*VP*SAMLTD203L*MF*AGCL*MG*SAMLTD203L*UP*811793023783~\n" +
"PID*F*08***Samsung ProXpress SL-M3320ND/M3820/M3820ND/M3820DW/M4020ND,MLT-D203L,Toner Cartr~\n" +
"CTP*WH*WHL*47.13~\n" +
"CTT*3*3214~\n" +
"SE*21*0967~\n" +
"GE*1*967~\n" +
"IEA*1*000003434~";    
        
        return X12_DATA;
    }
    
    @Override
    protected void fakeSchema() 
     throws FileNotFoundException, IOException, URISyntaxException {
       X12SchemaDefinition schema = buildFakeSchema(SchemaFileName_0401_846);
       when(fakeX12SchemaProvider.search(any())).thenReturn(schema); 
    }

    @Override
    protected void fakeOutputStream() throws IOException {
        when(fakeOutputStreamFactory.getOutputStream(any()))
                .thenReturn(outputStreamEdiXml1);
    }    
    
    @Test
    public void test_with_normal_846_x12() 
            throws FileNotFoundException, IOException, X12EngineException, Exception{
        
        this.fakePathGenerator();
        
        this.disassembler.initialize();
        this.disassembler.execute();
        
        System.out.println();
        System.out.println("----------------------------------------");
        System.out.println("Output generated EDI XML Content:");
        
        String ediXmlContent = this.outputStreamEdiXml1.toString();
        
        System.out.println(ediXmlContent);  
    }  
}
