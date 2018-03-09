package com.newegg.edi.x12engine.disassemble.reader;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.newegg.edi.x12engine.common.Group;
import com.newegg.edi.x12engine.common.Interchange;
import com.newegg.edi.x12engine.common.TransactionSet;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import java.io.FileNotFoundException;
import java.io.IOException;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 *
 * @author mm67
 */
public class MultiTransactionSetX12ReaderTest extends X12ReaderTestBase{            
    
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
"ST*856*000135278~\n" +
"BSN*00*010398229*20170119*233706*0001~\n" +
"HL*1**S~\n" +
"TD5**2**U~\n" +
"DTM*011*20170119~\n" +
"DTM*371*20170124~\n" +
"N1*SF*INGRAM ENT. - MEMPHIS~\n" +
"N3*5010 TUGGLE ROAD~\n" +
"N4*MEMPHIS*TN*381187526*US~\n" +
"N1*ST*COREY WHITE~\n" +
"N3*606 GILSTER ST~\n" +
"N4*ONALASKA*WI*546508516*US~\n" +
"HL*2*1*O~\n" +
"PRF*101-280332383~\n" +
"HL*3*2*P~\n" +
"PO4*1*1*EA**B*1~\n" +
"TD1*CTN*1****G*1*LB~\n" +
"REF*2I*272808670015172~\n" +
"HL*4*3*I~\n" +
"LIN*1*UP*712725021139*VP*PS3 DIS 02113*UK*00712725021139~\n" +
"SN1**1*EA~\n" +
"PID*F****LEGO PIRATES OF THE~\n" +
"HL*5*1*O~\n" +
"PRF*101-280341703~\n" +
"HL*6*5*P~\n" +
"PO4*2*1*EA**B*1~\n" +
"TD1*CTN*2****G*1*LB~\n" +
"REF*2I*272808670015172~\n" +
"HL*7*6*I~\n" +
"LIN*2*UP*853466001834*VP*PS4 XSE 81583*UK*00853466001834~\n" +
"SN1**1*EA~\n" +
"PID*F****EARTH DEFENSE 4.1:SH~\n" +
"HL*8*6*I~\n" +
"LIN*3*UP*010086671063*VP*WIU SEG 67106*UK*00010086671063~\n" +
"SN1**1*EA~\n" +
"PID*F****SONIC LOST WORLD~\n" +
"CTT*8*3~\n" +
"SE*38*000135278~"+
"GE*2*25050~\n" +
"IEA*2*000119072~\n";  
        return X12_DATA;
    }
       
    
    @Test
    public void normal_x12_open_ReadSegments() 
            throws IOException, X12EngineException{
        
        execute();
         
        assertEquals(1, this.getEnvelopeCount(Interchange.class));
        assertEquals(1, this.getEnvelopeCount(Group.class));
        assertEquals(2, this.getEnvelopeCount(TransactionSet.class));
        
        TransactionSet t1 = this.collectedTransactionSets.get(0);
        
        assertNotNull(t1);
        assertEquals(25, t1.getSegmentCount());
        assertEquals("856", t1.getTransactionSetType());
        assertEquals("250500001", t1.getControlNumber());
        
        TransactionSet t2 = this.collectedTransactionSets.get(1);
        
        assertNotNull(t2);
        assertEquals(38, t2.getSegmentCount());
        assertEquals("856", t2.getTransactionSetType());
        assertEquals("000135278", t2.getControlNumber());
    }    
}
