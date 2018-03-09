/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.disassembler;

import com.newegg.edi.x12engine.disassemble.DisassembleContext;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultContainer;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import com.newegg.edi.x12engine.validators.DefaultValidatorFactory;
import com.newegg.edi.x12engine.validators.ValidatorFactory;
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
public class ShipNotice856X12DisassemblerValidationTest 
    extends X12DisassemblerTestBase{
    @Override
    protected String getTestX12Content() {
        final String X12_DATA = 
"ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\n" +
"GS*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010~\n" +
"ST*856*250500001~\n" +
"BSN*00*40177341120170404000000000000000000000000000000000000000000*20170404*151008~\n" +
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
"HL*3*2*XX*1~\n" +
"TD1*CTN*1****G*1*LB~\n" +
"REF*2I*JFV245892153~\n" +
"HL*4*3*I*0~\n" +
"LIN*000001*VP*8397DD*MG*USB433ACD1X1*BP*0XM-0076-000*UP*0065030863773~\n" +
"SN1**1*EA**1*EA**AC~\n" +
"PID*X****DUAL-BAND NANO WL ADAPTER      WRLS 1~\n" +
"HL*5*3*I*1~\n" +
"LIN*000002*VP**MG*USB433ACD1X2**0XM-0076-001*UP*0065030863774~\n" +
"SN1**1*EA**1*EA**AC~\n" +
"PID*X****DUAL-BAND NANO WL ADAPTER      WRLS 2~\n" +
"CTT*5*1~\n" +
"SE*29*250500001~\n" +
"GE*1*25050~\n" +
"IEA*1*000119072~";    
        
        return X12_DATA;
    }
    
    @Override
    protected ValidatorFactory getValidatorFactory(){
        return new DefaultValidatorFactory();
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
    
    private ValidationResultContainer result;
    
    @Test
    public void test_with_normal_856_x12_withValidation() 
            throws FileNotFoundException, IOException, X12EngineException, Exception{
        
        this.fakePathGenerator();
        
        this.disassembler.setResultReportEventHanlder(
            e->{
                result = e.getResult();
                DisassembleContext ctx = e.getCtx();
                
                dumpValidationResult(result);
            }
        );
        
        this.disassembler.initialize();
        this.disassembler.execute();
        
        System.out.println();
        System.out.println("----------------------------------------");
        System.out.println("Output generated EDI XML Content:");
        
        String ediXmlContent = this.outputStreamEdiXml1.toString();
        
        System.out.println(ediXmlContent);
        
    }   
    
    private void dumpValidationResult(ValidationResultContainer result){
        testOutput("Validation Result report for Interchange [%s] Group Count: %d",
                        result.getInterchangeControlNumber(),
                        result.getValidationResultGroupList().size());
        
        result.getValidationResultGroupList().stream().map((group) -> {
            
            testOutput(String.format(" >>>Result: %s", 
                group.toString()));
            
            return group;          
            
        }).forEachOrdered((group) -> {
            
            group.getTransactionSetList().stream().map((ts) -> {
                testOutput(String.format("    >>>Result: %s", 
                    ts.toString()));
                
                return ts;            
                
            }).forEachOrdered((ts) -> {
                
                ts.getResultEntryList().forEach((entry) -> {
                    
                    testOutput(String.format("[%s(POS:[%d]/%d)] MSG: %s",   
                        entry.getSegmentName(),
                        entry.getElementPosition(),
                        entry.getSegmentPosition(), 
                        entry.getResultMessage()));
                });
            });
        });
    }
}
