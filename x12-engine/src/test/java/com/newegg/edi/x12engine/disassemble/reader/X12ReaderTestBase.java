package com.newegg.edi.x12engine.disassemble.reader;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.newegg.edi.x12engine.common.Group;
import com.newegg.edi.x12engine.common.Interchange;
import com.newegg.edi.x12engine.common.TransactionSet;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.rules.ExpectedException;
import static org.mockito.ArgumentMatchers.any;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

/**
 *
 * @author mm67
 */
public abstract class X12ReaderTestBase extends TestBase{

    protected final String encoding_UTF8 = "utf-8";
    protected final String defaultInputFilePath = "the_test_file_path";
    
    @Mock
    protected InputStreamReaderFactory fakeStreamReaderFactory;
        
    @Rule 
    public MockitoRule mockitoRule = MockitoJUnit.rule(); 
    
    @Rule
    public final ExpectedException exception = ExpectedException.none();
    
    private InputStream stream;
    private InputStreamReader streamReader;
    protected X12ReaderSetting setting;
    protected X12Reader reader;
    
    @Before
    public void setUp() throws FileNotFoundException{
        
        System.out.println("Setting up test case ...");
                
        System.out.printf("Instance of fakeStreamReaderFactory : %d%n",
                fakeStreamReaderFactory.hashCode());
        
    }
    
    @After
    public void cleanUp() throws IOException{
         
        stream.close();
        streamReader.close();        
        reader.close();
    }
     
    
    protected byte[] getData(final String content) { 
        return content.getBytes(Charset.forName("UTF-8"));
    }
    
    protected void prepareReader(
            final String x12Data, 
            final X12ReaderSetting x12ReaderSetting) 
            throws FileNotFoundException, UnsupportedEncodingException{
        
        stream = new ByteArrayInputStream( getData(x12Data));
        streamReader = new InputStreamReader(stream);
        
        this.setting = x12ReaderSetting;
        
        when(fakeStreamReaderFactory.build(any(), any()))
                .thenReturn(streamReader);
        
        reader = new X12Reader(this.setting, this.fakeStreamReaderFactory);
        
        setupEventHandlers();
    }
     
    protected final ArrayList<Interchange> collectedInterchanges = new ArrayList<>();
    protected final ArrayList<Group> collectedGroups = new ArrayList<>();
    protected final ArrayList<TransactionSet> collectedTransactionSets = new ArrayList<>();
    
    protected final Map<Class, Integer> statistics = new HashMap<>();
    
    protected void increaseEnvelopeCount(Class type){          
        Integer value = statistics.get(type);
        statistics.put(type, value + 1);
    }
    
    protected int getEnvelopeCount(Class type){
        Integer value = statistics.get(type);
        return value;
    }
    
    protected void collectInterchange(Interchange i){
        collectedInterchanges.add(i);
        increaseEnvelopeCount(i.getClass());
    }
    
    protected void collectGroup(Group g){
        collectedGroups.add(g);
        increaseEnvelopeCount(g.getClass());
    }
    
    protected void collectTransactionSet(TransactionSet t){
        collectedTransactionSets.add(t);
        increaseEnvelopeCount(t.getClass());
    }
    
    protected void setupEventHandlers(){
        
        reader.setInterchangeStartedEventHandler((InterchangeStartedEvent e) -> {
            System.out.print(">>>>>>>Interchange started : ");
            String originalData = e.getInterchange().getHeader().getOriginalSegmentData();
            
            System.out.println(originalData);
            
            collectInterchange(e.getInterchange());            
        });
        
        reader.setInterchangeClosedEventHandler((InterchangeClosedEvent e) -> {
            System.out.print(">>>>>>>Interchange closed : ");
            String originalData = e.getInterchange().getCloseSegment().getOriginalSegmentData();
            
            System.out.println(originalData);
        });
        
        reader.setGroupStartedEventHandler((GroupStartedEvent e) -> {
            System.out.print(">>>>>>>Group Started : ");
            
            String originalData = e.getGroup().getOriginalSegmentData();            
            System.out.println(originalData);
            
            collectGroup(e.getGroup());
        });
        
        reader.setGroupClosedEventHandler((GroupClosedEvent e) -> {
            System.out.print(">>>>>>>Group Closed : ");
            String originalData = e.getGroup().getCloseSegment().getOriginalSegmentData();
            
            System.out.println(originalData);
        });
        
        reader.setTransactionSetStartedEventHandler((TransactionSetStartedEvent e) -> {
            System.out.print(">>>>>>>TransactionSet Started : ");
            String originalData = e.getTransactionSet().getOriginalSegmentData();            
            System.out.println(originalData); 
            
            this.collectTransactionSet(e.getTransactionSet());
        });
        
        reader.setTransactionSetClosedEventHandler((TransactionSetClosedEvent e) -> {
            System.out.print(">>>>>>>TransactionSet Closed : ");
            String originalData = e.getTransactionSet().getCloseSegment().getOriginalSegmentData();
            
            System.out.println(originalData);
             
        });
        
        reader.setSegmentDataExtractedEventHandler((SegmentDataExtractedEvent e) -> {
            System.out.print(">>>>>>>SegmentExtracted : ");
            String originalData = e.getSegment().getOriginalSegmentData();
            
            System.out.println(originalData);
        });
        
    }
    
    protected void initializeStatistics(){
        statistics.put(Interchange.class, 0);
        statistics.put(Group.class, 0);
        statistics.put(TransactionSet.class, 0);
    }
    
    protected X12ReaderSetting getSetting(){
        return new X12ReaderSetting(encoding_UTF8,defaultInputFilePath);
    }
    
    protected void execute()
            throws IOException, X12EngineException{

        execute(this.getTestX12Content());
    }
    
    protected void execute(String content)
            throws IOException, X12EngineException{
        
        initializeStatistics();
         
        prepareReader(content, getSetting());        
        
        reader.open();
        
        while(reader.iterateSegments()){
            
        }       
    }
    
    protected abstract String getTestX12Content();   
    
}
