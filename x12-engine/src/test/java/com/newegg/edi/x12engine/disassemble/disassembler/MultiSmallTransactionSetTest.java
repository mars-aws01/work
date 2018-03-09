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
public class MultiSmallTransactionSetTest extends X12DisassemblerTestBase{

@Override
    protected String getTestX12Content() {
        final String X12_DATA = 
"ISA*00*          *00*          *12*2039673435     *ZZ*5626958823VF   *170523*0455*U*00401*846038470*0*P*>~\n" +
"GS*IB*2039673435*5626958823VF*20170523*0455*38470*X*004010~\n" +
"ST*846*84679050~\n" +
"BIA*00*SI*20170523044616*20170523~\n" +
"LIN**VP*HPW2M99UAR*UP*190780050378*MF*HP~\n" +
"PID*F*08***HP 17X061NR W10 I36100U 23GHZ 8GB DDR3L SDRAM INTEL HD 520 1TB 5400RPM SATA HDD ~\n" +
"CTP***335~\n" +
"SDQ*EA*54*100*0~\n" +
"QTY*33*0*EA~\n" +
"SE*8*84679050~\n" +
"ST*846*84679051~\n" +
"BIA*00*SI*20170523044717*20170523~\n" +
"LIN**VP*2SN-0001-000W7*UP*617561019268*MF*APPLE~\n" +
"PID*F*08***APPLE MACBOOK PRO 15 I73615QM 23GHZ 16256TCLAIM~\n" +
"CTP***825~\n" +
"SDQ*EA*54*100*0~\n" +
"QTY*33*0*EA~\n" +
"SE*8*84679051~\n" +
"GE*2*38470~\n" +
"IEA*1*846038470~";    
        
        return X12_DATA;
    }
    

    @Override
    protected void fakeSchema() throws FileNotFoundException, IOException, URISyntaxException {
        X12SchemaDefinition schema846 = buildFakeSchema(SchemaFileName_0401_846);
        when(fakeX12SchemaProvider.search(any())).thenReturn(schema846);    
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
    public void test_with_two_small_846_Transaction_Sets() 
            throws FileNotFoundException, IOException, X12EngineException, Exception{
        
        this.fakePathGenerator("846", "84679050", outputFilePath1);
        this.fakePathGenerator("846", "84679051", outputFilePath2);
        
        this.disassembler.initialize();
        this.disassembler.execute();
        
        System.out.println(this.outputStreamEdiXml1.toString());
        System.out.println(this.outputStreamEdiXml2.toString());
        
        verify(fakeOutputStreamFactory).getOutputStream(eq(outputFilePath1));        
        verify(fakeOutputStreamFactory).getOutputStream(eq(outputFilePath2));
    }  
}
