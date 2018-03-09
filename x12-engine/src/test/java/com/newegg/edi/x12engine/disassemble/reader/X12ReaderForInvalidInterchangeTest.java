package com.newegg.edi.x12engine.disassemble.reader;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import com.newegg.edi.x12engine.exceptions.X12EngineException;
import org.junit.Test;

import java.io.IOException;

/**
 *
 * @author mm67
 */
public class X12ReaderForInvalidInterchangeTest extends X12ReaderTestBase{
    
    
    
    @Test
    public void invalid_X12_Content() throws IOException, X12EngineException{
        
        this.exception.expect(X12EngineException.class);
        this.exception.expectMessage("No enough data can be read from the X12 file");

        execute("This is not a X12 file, too short.");
    }
    
    @Test
    public void invalid_X12_InvalidISA_SegmentName1() throws IOException, X12EngineException{
        
        this.exception.expect(X12EngineException.class);
        this.exception.expectMessage("The file is not started with ISA, which is invalid.");
        
        execute("ASA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\r");
         
    }
    
    @Test
    public void invalid_X12_InvalidISA_SegmentName2() throws IOException, X12EngineException{
        
        this.exception.expect(X12EngineException.class);
        this.exception.expectMessage("The file is not started with ISA, which is invalid.");

        execute("IBA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\r");
         
    }
    
    @Test
    public void invalid_X12_InvalidISA_SegmentName3() throws IOException, X12EngineException{
        
        this.exception.expect(X12EngineException.class);
        this.exception.expectMessage("The file is not started with ISA, which is invalid.");

        execute("ISB*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\r");
        
    }
    
    @Test
    public void invalid_X12_Content3() throws IOException, X12EngineException{
        
        this.exception.expect(X12EngineException.class); 
        this.exception.expectMessage("The X12 file is invalid.");

        execute("ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\n");
         
    }
    
    /*
    The Segment Terminator suffix is CR, but followed with invalid group start segment.
    */
    @Test
    public void invalid_X12_Content4() throws IOException, X12EngineException{
        
        this.exception.expect(X12EngineException.class); 
        this.exception.expectMessage("The X12 file contains invalid group start segment.");

        execute("ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\r"+
                "XS*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010~");
    }
    
    /*
    The Segment Terminator suffix is NONE, but followed with invalid group start segment.
    */
    @Test
    public void invalid_X12_Content5() throws IOException, X12EngineException{
        
        
         
        this.exception.expect(X12EngineException.class); 
        this.exception.expectMessage("The X12 file contains invalid group start segment.");

        execute("ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~"+
             "XB*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010~");
    }

    @Override
    protected String getTestX12Content() {
        return null;
    }
}
