/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.common.SegmentData;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import com.newegg.edi.x12engine.schema.X12SegmentDefinition;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import org.junit.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

/**
 *
 * @author mm67
 */
public class TextValidatorTest extends ValidatorTestBase {
        
    private TextValidator validator;
    private ValidationContext ctx;
            
    @Override
    public void setUp() throws IOException, 
            FileNotFoundException, 
            URISyntaxException, 
            X12EngineException{
        
        super.setUp();
        
        validator = new TextValidator();
        ctx = new ValidationContext();
        ctx.setResultCollector(fakeCollector);
        ctx.setSchema(super.getSchemaFromFile(SchemaFile856));
    }
    
    @Test
    public void test_TextValidator_WithMinLength_And_MaxLength_Normal() 
            throws X12EngineException {
        
        X12SegmentDefinition segmentDefinition = 
                buildTextSegmentDefinition("TD505", 5, 10, "");        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("TD5*O*2*PRLA*M*PURO GRND", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(5); 
        ctx.setValue("PURO GRND");
        
        validator.validate(ctx);
        
        verify(fakeCollector, never()).collect(any(ValidationResultEntry.class));
    }
    
    @Test
    public void test_TextValidator_NotRequired_EmptyValue_Normal() 
            throws X12EngineException {
        
        X12SegmentDefinition segmentDefinition = 
                buildTextSegmentDefinition("TD104", 1, 10, "");        
        
        segmentDefinition.getRestriction().setRequired(false);
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("TD1*O*2*PRLA**PURO GRND", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(4); 
        ctx.setValue("");
        
        validator.validate(ctx);
        
        verify(fakeCollector, never()).collect(any(ValidationResultEntry.class));
    }

    @Test
    public void test_TextValidator_NotSatisfy_MinimumLength_Limits() 
            throws X12EngineException {
        
        X12SegmentDefinition segmentDefinition = 
                buildTextSegmentDefinition("TD505", 5, 10, "");        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("TD5*O*2*PRLA*M*PURO", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(5); 
        ctx.setValue("PURO");
        
        validator.validate(ctx);
        
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_TOO_SHORT); 
    }
    
    @Test
    public void test_TextValidator_NotSatisfy_MaximumLength_Limits() 
            throws X12EngineException {
        
        X12SegmentDefinition segmentDefinition = 
                buildTextSegmentDefinition("TD505", 5, 10, "");        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("TD5*O*2*PRLA*M*PUROLATORS", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(5); 
        ctx.setValue("PUROLATORSA");
        
        validator.validate(ctx);
         
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_TOO_LONG); 
    }
    
    @Test
    public void test_TextValidator_Required_but_Value_IsEmpty() 
            throws X12EngineException {
        
        X12SegmentDefinition segmentDefinition = 
                buildTextSegmentDefinition("TD505", 5, 10, "");     
        
        segmentDefinition.getRestriction().setRequired(true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("TD5*O*2*PRLA*M*PUROLATORS", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(5); 
        ctx.setValue("");
        
        validator.validate(ctx);
        
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_MANDATORY_ELEMENT_MISSING); 
         
    }
    
    public static final String DATE_REGEX = 
            "((?:19|20)\\d\\d)(0?[1-9]|1[012])([12][0-9]|3[01]|0?[1-9])";
    
    @Test
    public void test_TextValidator_Regex_Pattern_Match() 
            throws X12EngineException {
        
        X12SegmentDefinition segmentDefinition = 
                buildTextSegmentDefinition(
                    "BSN03", 5, 8, DATE_REGEX);     
        
        segmentDefinition.getRestriction().setRequired(true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment =
            buildSegmentData("BSN*00*40177341120170404*20170404*151008", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(5); 
        ctx.setValue("20170404");
        
        validator.validate(ctx);
        
        verify(fakeCollector, never()).collect(any());
    }
    
    @Test
    public void test_TextValidator_Regex_Pattern_NotMatch() 
            throws X12EngineException {
        
        X12SegmentDefinition segmentDefinition = 
                buildTextSegmentDefinition(
                    "BSN03", 5, 8, DATE_REGEX);     
        
        segmentDefinition.getRestriction().setRequired(true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment =
            buildSegmentData("BSN*00*40177341120170404*20170404*151008", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(5); 
        ctx.setValue("20171304");
        
        validator.validate(ctx);
        
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR); 
    }
}
