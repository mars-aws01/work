/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.reader;

import com.newegg.edi.x12engine.common.SegmentData;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import java.io.IOException;
import org.junit.Test;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;

/**
 *
 * @author mm67
 */
public class X12ReaderIterationTest extends X12ReaderTestBase {

    @Override
    protected String getTestX12Content() {
        return "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\n" +
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
        "GE*1*25050~\n" +
        "IEA*1*000119072~";
    }
    
    private void assertSegmentData(
            String originalSegmentData, 
            SegmentData segData, 
            int expectedPosition){
        
        assertNotNull(segData);
        
        assertEquals(originalSegmentData, segData.getOriginalSegmentData());
        
        assertEquals(expectedPosition, segData.getPosition());
    }
    
    private void assertIteration(String originalSegmentData, int expectedPosition) 
            throws X12EngineException {
        
        assertTrue(reader.iterateSegments());
        assertSegmentData(originalSegmentData,
                reader.getCurrentDataSegment(),
                expectedPosition);
    }
    
    @Test
    public void test() 
            throws IOException, X12EngineException{
        initializeStatistics();
         
        
        prepareReader(this.getTestX12Content(), this.getSetting());        
        
        reader.open();
         
        assertIteration("ST*856*250500001", 1);
        assertIteration("BSN*00*40177341120170404*20170404*151008", 2);
	    assertIteration("HL*1*0*S*1", 3);
        assertIteration("TD1*CTN*1****G*1*LB", 4);
        assertIteration("TD5*O*2*PRLA*M*PURO GRND", 5);
        assertIteration("REF*CN*JFV245892153", 6);
        assertIteration("DTM*011*20170404", 7);
        assertIteration("N1*SF*INGRAM MICRO  CANADA*91*40", 8);
        assertIteration("N3*INGRAM MICRO  CANADA*88 FOSTER CRESCENT", 9);
        assertIteration("N4*MISSISSAUGA*ON*L5R4A2*CA", 10);
        assertIteration("N1*ST*MUJEEBUR SULAIMALEBBE", 11);
        assertIteration("N3*880 ELLESMERE ROAD UNIT 106", 12);
        assertIteration("N4*SCARBOROUGH*ON*M1P2W6*CA", 13);
        assertIteration("HL*2*1*O*1", 14);
        assertIteration("PRF*101-292842576***20170404", 15);
        assertIteration("REF*IV*401773411", 16);
        assertIteration("HL*3*2*P*1", 17);
        assertIteration("TD1*CTN*1****G*1*LB", 18);
        assertIteration("REF*2I*JFV245892153", 19);
        assertIteration("HL*4*3*I*0", 20);
        assertIteration("LIN*000001*VP*8397DD*MG*USB433ACD1X1*BP*0XM-0076-000*UP*0065030863773", 21);
        assertIteration("SN1**1*EA**1*EA**AC", 22);
        assertIteration("PID*X****DUAL-BAND NANO WL ADAPTER      WRLS", 23);
        assertIteration("CTT*4*1", 24);
        assertIteration("SE*25*250500001", 25);
        
        assertTrue(reader.iterateSegments()); // GE
        assertFalse(reader.iterateSegments()); // IEA, end the iteration
    }
    

}
