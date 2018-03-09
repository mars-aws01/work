/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.parsing;

import com.newegg.edi.x12engine.common.X12Standard;
import com.newegg.edi.x12engine.common.InterchangeHeader; 
import com.newegg.edi.x12engine.exceptions.InvalidX12FormatException;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
/**
 *
 * @author mm67
 */
public final class InterchangeHeaderAnalyzer {
    
    private static final int[] ISA_ELEMENT_LENGTH_ARRAY =
        {
            X12Standard.ISA_LENGTH_00,
            X12Standard.ISA_LENGTH_01,
            X12Standard.ISA_LENGTH_02,
            X12Standard.ISA_LENGTH_03,
            X12Standard.ISA_LENGTH_04,
            X12Standard.ISA_LENGTH_05,
            X12Standard.ISA_LENGTH_06,
            X12Standard.ISA_LENGTH_07,
            X12Standard.ISA_LENGTH_08,
            X12Standard.ISA_LENGTH_09,
            X12Standard.ISA_LENGTH_10,
            X12Standard.ISA_LENGTH_11,
            X12Standard.ISA_LENGTH_12,
            X12Standard.ISA_LENGTH_13,
            X12Standard.ISA_LENGTH_14,
            X12Standard.ISA_LENGTH_15,
            X12Standard.ISA_LENGTH_16
        };

    private InterchangeHeaderAnalyzer(){}
    
    public static InterchangeHeader analyzeISAHeader(            
            X12ReaderContext ctx,
            char[] headerBuffer) throws X12EngineException{
        
        ctx.info("Analyzing ISA header elements ...");
        
        String headerSegment = String.valueOf(headerBuffer);
        
        InterchangeHeader header = new InterchangeHeader(ctx.getMetaData(), headerSegment);
        
        if(header.getDataCount()!= X12Standard.ISA_ELEMENTS_COUNT){
            throw new InvalidX12FormatException(
                    "The X12 file contains invalid ISA header data. " + 
                    String.format("Expected data element count is %d, but %d elements extracted.",
                            X12Standard.ISA_ELEMENTS_COUNT,
                            header.getDataCount()
                            ));
        }
        
        validate(ctx, header);
        
        ctx.info("ISA header analysis accomplished.");
        
        return header;
    }
    
    private static void validate(
            X12ReaderContext ctx,
            InterchangeHeader header) throws InvalidX12FormatException {
        
        ctx.debug("Validating ISA header elements ...");
                
        for(int index = 0; 
                index < ISA_ELEMENT_LENGTH_ARRAY.length; index++){
            
            int expectedElementLength = ISA_ELEMENT_LENGTH_ARRAY[index];
            
            String element = header.getDataElement(index);
            
            ctx.debug("  Validating ISA%02d : [%s] Length: [Expected: %d Actual: %d]",
                    index,
                    element,
                    expectedElementLength,
                    element.length());
            
            if(expectedElementLength != element.length()){
                throw new InvalidX12FormatException(
                    String.format("The ISA%02d should be contains %d chars, "
                            + "but we've got is [%s] which length is %d chars.",
                            index,
                            expectedElementLength,
                            element,
                            element.length())
                );
            }
        }
    }
}
