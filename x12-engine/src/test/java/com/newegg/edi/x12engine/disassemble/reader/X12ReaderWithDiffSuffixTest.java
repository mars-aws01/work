package com.newegg.edi.x12engine.disassemble.reader;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.newegg.edi.x12engine.parsing.X12Reader;
import com.newegg.edi.x12engine.parsing.X12ReaderSetting;
import com.newegg.edi.x12engine.disassemble.events.GroupClosedEvent;
import com.newegg.edi.x12engine.disassemble.events.GroupStartedEvent;
import com.newegg.edi.x12engine.disassemble.events.InterchangeClosedEvent;
import com.newegg.edi.x12engine.disassemble.events.InterchangeStartedEvent;
import com.newegg.edi.x12engine.disassemble.events.SegmentDataExtractedEvent;
import com.newegg.edi.x12engine.disassemble.events.TransactionSetClosedEvent;
import com.newegg.edi.x12engine.disassemble.events.TransactionSetStartedEvent;
import com.newegg.edi.x12engine.exceptions.X12EngineException; 
import com.newegg.edi.x12engine.util.InputStreamReaderFactory;
import com.newegg.edi.x12engine.util.TestBase;
import java.io.ByteArrayInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.util.Arrays;
import java.util.Collection;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;
import static org.junit.Assert.assertEquals;

/**
 *
 * @author mm67
 */
@RunWith(Parameterized.class)
public class X12ReaderWithDiffSuffixTest  extends TestBase{
    
	private static final String X12_DATA_NONE = 
                "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~" +
"GS*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010~" +
"ST*856*250500001~" +
"BSN*00*40177341120170404*20170404*151008~" +
"HL*1*0*S*1~" +
"TD1*CTN*1****G*1*LB~" +
"TD5*O*2*PRLA*M*PURO GRND~" +
"REF*CN*JFV245892153~" +
"DTM*011*20170404~" +
"N1*SF*INGRAM MICRO  CANADA*91*40~" +
"N3*INGRAM MICRO  CANADA*88 FOSTER CRESCENT~" +
"N4*MISSISSAUGA*ON*L5R4A2*CA~" +
"N1*ST*MUJEEBUR SULAIMALEBBE~" +
"N3*880 ELLESMERE ROAD UNIT 106~" +
"N4*SCARBOROUGH*ON*M1P2W6*CA~" +
"HL*2*1*O*1~" +
"PRF*101-292842576***20170404~" +
"REF*IV*401773411~" +
"HL*3*2*P*1~" +
"TD1*CTN*1****G*1*LB~" +
"REF*2I*JFV245892153~" +
"HL*4*3*I*0~" +
"LIN*000001*VP*8397DD*MG*USB433ACD1X1*BP*0XM-0076-000*UP*0065030863773~" +
"SN1**1*EA**1*EA**AC~" +
"PID*X****DUAL-BAND NANO WL ADAPTER      WRLS~" +
"CTT*4*1~" +
"SE*25*250500001~" +
"GE*1*25050~" +
"IEA*1*000119072~"; 
	
    private static final String X12_DATA_CR = 
                "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\r" +
"GS*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010~\r" +
"ST*856*250500001~\r" +
"BSN*00*40177341120170404*20170404*151008~\r" +
"HL*1*0*S*1~\r" +
"TD1*CTN*1****G*1*LB~\r" +
"TD5*O*2*PRLA*M*PURO GRND~\r" +
"REF*CN*JFV245892153~\r" +
"DTM*011*20170404~\r" +
"N1*SF*INGRAM MICRO  CANADA*91*40~\r" +
"N3*INGRAM MICRO  CANADA*88 FOSTER CRESCENT~\r" +
"N4*MISSISSAUGA*ON*L5R4A2*CA~\r" +
"N1*ST*MUJEEBUR SULAIMALEBBE~\r" +
"N3*880 ELLESMERE ROAD UNIT 106~\r" +
"N4*SCARBOROUGH*ON*M1P2W6*CA~\r" +
"HL*2*1*O*1~\r" +
"PRF*101-292842576***20170404~\r" +
"REF*IV*401773411~\r" +
"HL*3*2*P*1~\r" +
"TD1*CTN*1****G*1*LB~\r" +
"REF*2I*JFV245892153~\r" +
"HL*4*3*I*0~\r" +
"LIN*000001*VP*8397DD*MG*USB433ACD1X1*BP*0XM-0076-000*UP*0065030863773~\r" +
"SN1**1*EA**1*EA**AC~\r" +
"PID*X****DUAL-BAND NANO WL ADAPTER      WRLS~\r" +
"CTT*4*1~\r" +
"SE*25*250500001~\r" +
"GE*1*25050~\r" +
"IEA*1*000119072~\r"; 

private static final String X12_DATA_LF = 
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
"GE*1*25050~\n" +
"IEA*1*000119072~\n"; 
    
    private static final String X12_DATA_CRLF = 
                "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\r\n" +
"GS*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010~\r\n" +
"ST*856*250500001~\r\n" +
"BSN*00*40177341120170404*20170404*151008~\r\n" +
"HL*1*0*S*1~\r\n" +
"TD1*CTN*1****G*1*LB~\r\n" +
"TD5*O*2*PRLA*M*PURO GRND~\r\n" +
"REF*CN*JFV245892153~\r\n" +
"DTM*011*20170404~\r\n" +
"N1*SF*INGRAM MICRO  CANADA*91*40~\r\n" +
"N3*INGRAM MICRO  CANADA*88 FOSTER CRESCENT~\r\n" +
"N4*MISSISSAUGA*ON*L5R4A2*CA~\r\n" +
"N1*ST*MUJEEBUR SULAIMALEBBE~\r\n" +
"N3*880 ELLESMERE ROAD UNIT 106~\r\n" +
"N4*SCARBOROUGH*ON*M1P2W6*CA~\r\n" +
"HL*2*1*O*1~\r\n" +
"PRF*101-292842576***20170404~\r\n" +
"REF*IV*401773411~\r\n" +
"HL*3*2*P*1~\r\n" +
"TD1*CTN*1****G*1*LB~\r\n" +
"REF*2I*JFV245892153~\r\n" +
"HL*4*3*I*0~\r\n" +
"LIN*000001*VP*8397DD*MG*USB433ACD1X1*BP*0XM-0076-000*UP*0065030863773~\r\n" +
"SN1**1*EA**1*EA**AC~\r\n" +
"PID*X****DUAL-BAND NANO WL ADAPTER      WRLS~\r\n" +
"CTT*4*1~\r\n" +
"SE*25*250500001~\r\n" +
"GE*1*25050~\r\n" +
"IEA*1*000119072~\r\n"; 
    
    @Parameters
    public static Collection<String> data(){
        return Arrays.asList(X12_DATA_NONE,
                X12_DATA_CR,
                X12_DATA_LF,
                X12_DATA_CRLF);
    }
    
    private final String x12Data;
    
    public X12ReaderWithDiffSuffixTest(String x12Data){
        this.x12Data = x12Data;
    }
    
    @Mock
    private InputStreamReaderFactory fakeStreamReaderFactory;
         
    @Rule 
    public MockitoRule mockitoRule = MockitoJUnit.rule(); 
    
    private InputStream stream;
    private InputStreamReader streamReader;
    private X12Reader reader;
    
    @Before
    public void setUp() throws FileNotFoundException, UnsupportedEncodingException{
        stream = new ByteArrayInputStream( getTestX12Data());
        streamReader = new InputStreamReader(stream);
        
        when(fakeStreamReaderFactory.build(any(),any()))
            .thenReturn(streamReader);

        X12ReaderSetting setting = new X12ReaderSetting("utf-8", "the_test_file_path");
        
        reader = new X12Reader(setting,
                fakeStreamReaderFactory
            );
    }
    
    @After
    public void cleanUp() throws IOException{
         
        stream.close();
        streamReader.close();        
        reader.close();
    }
     
    private byte[] getTestX12Data() {              
        
        return x12Data.getBytes(Charset.forName("UTF-8"));
    }
    
    private void setupVerificationForEvents(){
        
        reader.setInterchangeStartedEventHandler((InterchangeStartedEvent e) -> {
            System.out.print(">>>>>>>Interchange started : ");
            String originalData = e.getInterchange().getHeader().getOriginalSegmentData();
            
            System.out.println(originalData);
            
            assertEquals("ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>",
                    originalData);
        });
        
        reader.setInterchangeClosedEventHandler((InterchangeClosedEvent e) -> {
            System.out.print(">>>>>>>Interchange closed : ");
            String originalData = e.getInterchange().getCloseSegment().getOriginalSegmentData();
            
            System.out.println(originalData);
            
            assertEquals("IEA*1*000119072", originalData);
        });
        
        reader.setGroupStartedEventHandler((GroupStartedEvent e) -> {
            System.out.print(">>>>>>>Group Started : ");
            String originalData = e.getGroup().getOriginalSegmentData();
            
            System.out.println(originalData);
            
            assertEquals("GS*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010", originalData);
        });
        
        reader.setGroupClosedEventHandler((GroupClosedEvent e) -> {
            System.out.print(">>>>>>>Group Closed : ");
            String originalData = e.getGroup().getCloseSegment().getOriginalSegmentData();
            
            System.out.println(originalData);
            
            assertEquals("GE*1*25050", originalData);
        });
        
        reader.setTransactionSetStartedEventHandler((TransactionSetStartedEvent e) -> {
            System.out.print(">>>>>>>TransactionSet Started : ");
            String originalData = e.getTransactionSet().getOriginalSegmentData();            
            System.out.println(originalData);
            
            assertEquals("ST*856*250500001", originalData);
        });
        
        reader.setTransactionSetClosedEventHandler((TransactionSetClosedEvent e) -> {
            System.out.print(">>>>>>>TransactionSet Closed : ");
            String originalData = e.getTransactionSet().getCloseSegment().getOriginalSegmentData();
            
            System.out.println(originalData);
            
            assertEquals("SE*25*250500001", originalData);
        });
        
        reader.setSegmentDataExtractedEventHandler((SegmentDataExtractedEvent e) -> {
            System.out.print(">>>>>>>SegmentExtracted : ");
            String originalData = e.getSegment().getOriginalSegmentData();
            
            System.out.println(originalData);
        });
    }
    
    @Test
    public void normal_x12_open_ReadSegments() throws X12EngineException{
         
        setupVerificationForEvents();
        
        reader.open();
        
        while(reader.iterateSegments()){
            // No op
        }       
        
    }
}
