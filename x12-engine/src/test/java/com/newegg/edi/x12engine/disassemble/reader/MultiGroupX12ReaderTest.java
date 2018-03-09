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
import java.io.IOException;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

/**
 *
 * @author mm67
 */
public class MultiGroupX12ReaderTest extends X12ReaderTestBase{
        
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
"GS*PR*004919486CA*5626958823CVF*20170404*1159*36371*X*004010~\n" +
"ST*855*363710001~\n" +
"BAK*00*AD*101-308035735*20170404****4018107~\n" +
"PO1*000001*1*EA*215.33**VP*63442L*BP*82-725-032CVF*MG*SD-DP-1150*UP*0881493005075~\n" +
"CTP**EUP*215.33*1*EA~\n" +
"REF*VN*4018107~\n" +
"ACK*IA*1*EA~\n" +
"CTT*1*1~\n" +
"SE*8*363710001~\n" +
"GE*1*36371~"+
"IEA*1*000119072~";
    }
    
    @Test
    public void normal_x12_open_ReadSegments() throws IOException, X12EngineException{
        
        execute();

        assertEquals(1, this.getEnvelopeCount(Interchange.class));
        assertEquals(2, this.getEnvelopeCount(Group.class));
        assertEquals(2, this.getEnvelopeCount(TransactionSet.class));
        
        Group g1 = this.collectedGroups.get(0);
        
        assertNotNull(g1);
        assertEquals("SH", g1.getFunctionalIdentifierCode());
        assertEquals("004919486CA", g1.getSenderId());
        assertEquals("5626958823CVF", g1.getReceiverId());
        assertEquals("20170404", g1.getDate());
        assertEquals("1516", g1.getTime());
        assertEquals("25050", g1.getGroupControlNumber());
        assertEquals("004010", g1.getControlVersion());
        
        Group g2 = this.collectedGroups.get(1);

        assertNotNull(g2);
        assertEquals("PR", g2.getFunctionalIdentifierCode());
        assertEquals("004919486CA", g2.getSenderId());
        assertEquals("5626958823CVF", g2.getReceiverId());
        assertEquals("20170404", g2.getDate());
        assertEquals("1159", g2.getTime());
        assertEquals("36371", g2.getGroupControlNumber());
        assertEquals("004010", g2.getControlVersion());
    }
}
