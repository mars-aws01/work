package com.newegg.edi.x12engine.disassemble.reader;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.newegg.edi.x12engine.parsing.InterchangeHeaderAnalyzer;
import com.newegg.edi.x12engine.common.X12MetaData;
import com.newegg.edi.x12engine.parsing.X12ReaderContext;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import java.util.Arrays;
import java.util.Collection;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameters;

/**
 *
 * @author mm67
 */
@RunWith(Parameterized.class)
public class InterchangeHeaderAnalyzerParameterizedTest {
    
    @Parameters
    public static Collection<String> data(){
        return Arrays.asList(new String[]{
            "ISA*001*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~",
            "ISA*00*         *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~",
            "ISA*00*          *001*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~",
            "ISA*00*          *00*           *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~",
            "ISA*00*          *00*          *01*004919486CA1    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~",
            "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF2  *170404*1516*U*00401*000119072*0*P*>~",
            "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *1704043*1516*U*00401*000119072*0*P*>~",
            "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*15164*U*00401*000119072*0*P*>~",
            "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516**00401*000119072*0*P*>~",
            "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*004014*000119072*0*P*>~",
            "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*0001190725*0*P*>~",
            "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*01*P*>~",
            "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0**>~",
            "ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*~"
        });
    }
    
    private final String invalidHeaderContent;
    
    public InterchangeHeaderAnalyzerParameterizedTest(String headerContent){
        invalidHeaderContent = headerContent;
    }
    
    @Rule
    public final ExpectedException exception = ExpectedException.none();

    
    @Test
    public void testAnalyzeISAHeader_InvalidHeader_ShouldThrowException() 
            throws Exception {
         
        X12MetaData metaData = new X12MetaData();
        metaData.setElementDelimiter('*');
        metaData.setSegmentTerminator('~');
        
        X12ReaderContext ctx = new X12ReaderContext();
        ctx.setMetaData(metaData);
        
        char[] headerBuffer = invalidHeaderContent.toCharArray();
                
        exception.expect(X12EngineException.class);
        
        InterchangeHeaderAnalyzer.analyzeISAHeader(ctx, headerBuffer);                
    }
}
