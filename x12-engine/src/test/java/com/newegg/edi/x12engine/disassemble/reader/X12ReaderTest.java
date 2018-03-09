package com.newegg.edi.x12engine.disassemble.reader;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.newegg.edi.x12engine.common.Group;
import com.newegg.edi.x12engine.common.Interchange;
import com.newegg.edi.x12engine.common.InterchangeHeader;
import com.newegg.edi.x12engine.common.SegmentTerminatorSuffixType;
import com.newegg.edi.x12engine.common.X12MetaData;
import com.newegg.edi.x12engine.parsing.X12Reader;
import com.newegg.edi.x12engine.parsing.X12ReaderContext;
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
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;

import static org.junit.Assert.assertNotNull;
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
public class X12ReaderTest extends TestBase{
    
    @Mock
    protected InputStreamReaderFactory fakeStreamReaderFactory;
        
    @Rule 
    public MockitoRule mockitoRule = MockitoJUnit.rule(); 
    
    private InputStream stream;
    private InputStreamReader streamReader;
    private X12ReaderSetting setting;
    private X12Reader reader;
    
    @Before
    public void setUp() throws FileNotFoundException, UnsupportedEncodingException{
        
        stream = new ByteArrayInputStream( getTestX12Data());
        streamReader = new InputStreamReader(stream);
        
        System.out.println("Setting up test case ...");
        
       
        System.out.printf("Instance of fakeStreamReaderFactory : %d%n",
                fakeStreamReaderFactory.hashCode());
        
        when(fakeStreamReaderFactory.build(any(), any()))
                .thenReturn(streamReader);             
         
        setting = new X12ReaderSetting("utf-8","the_input_file_path");
        
        reader = new X12Reader(setting, fakeStreamReaderFactory);
    }
    
    @After
    public void cleanUp() throws IOException{
         
        stream.close();
        streamReader.close();        
        reader.close();
    }
     
    private byte[] getTestX12Data() {
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
"GE*1*25050~\n" +
"IEA*1*000119072~";        
        
        return X12_DATA.getBytes(Charset.forName("UTF-8"));
    }
 
    @Test
    public void normal_x12_open_MetaData_Extracted() throws FileNotFoundException, IOException, X12EngineException{
        
        reader.open();
        
        X12MetaData metaData = reader.getMetaData();
        
        assertEquals('*', metaData.getElementDelimiter());
        assertEquals('~', metaData.getSegmentTerminator());
        assertEquals(SegmentTerminatorSuffixType.LF, metaData.getSegmentTerminatorSuffix());
    }
    
    @Test
    public void normal_x12_open_Interchange_Started() throws X12EngineException{
        
        reader.open();
        
        X12ReaderContext ctx = reader.getCtx();
        
        Interchange ich = ctx.getCurrenctInterchange();
        
        assertNotNull(ich);
        
        InterchangeHeader hdr = ich.getHeader();
        
        //ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~
        assertEquals("00", hdr.getAuthorizationInformationQualifier());
        assertEquals("          ", hdr.getAuthorizationInformation());
        assertEquals("00", hdr.getSecurityInformationQualifier());
        assertEquals("          ", hdr.getSecurityInformation());
        
        assertEquals("01", hdr.getSenderIdQualifier());
        assertEquals("004919486CA    ", hdr.getSenderId());
        assertEquals("ZZ", hdr.getReceiverIdQualifier());
        assertEquals("5626958823CVF  ", hdr.getReceiverId());
        
        assertEquals("170404", hdr.getInterchangeDate());
        assertEquals("1516", hdr.getInterchangeTime());
        
        assertEquals("U", hdr.getRepetitionSeparatorUsage());
        
        assertEquals("00401", hdr.getControlVersion());
        assertEquals("000119072", hdr.getInterchangeControlNumber());
        assertEquals("P", hdr.getInterchangeIndicator());
    }
    
    @Test
    public void normal_x12_open_GroupExtracted() throws X12EngineException{
        
        reader.open();
         
        X12ReaderContext ctx = reader.getCtx();

        assertEquals("GS*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010~", ctx.getCurrentGSSegment());
        
        Group group = ctx.getCurrentGroup();
        
        assertEquals("SH", group.getFunctionalIdentifierCode());
        assertEquals("004919486CA", group.getSenderId());
        assertEquals("5626958823CVF", group.getReceiverId());
        assertEquals("20170404", group.getDate());
        assertEquals("1516", group.getTime());
        assertEquals("25050", group.getGroupControlNumber());
        assertEquals("004010", group.getControlVersion());
    }
    
    @Test
    public void normal_x12_open_ReadSegments() throws X12EngineException{
         
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
            
            // The segment count should count ST and SE segments as well
            assertEquals(25, e.getTransactionSet().getSegmentCount());
        });
        
        reader.setSegmentDataExtractedEventHandler((SegmentDataExtractedEvent e) -> {
            System.out.print(">>>>>>>SegmentExtracted : ");
            String originalData = e.getSegment().getOriginalSegmentData();
            
            System.out.println(originalData);
            
            
        });
        
        reader.open();
        
        while(reader.iterateSegments()){
            
        }           
    }
     
}
