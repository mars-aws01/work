/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.common.SegmentData;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import com.newegg.edi.x12engine.schema.CodeDefinition;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import com.newegg.edi.x12engine.schema.X12SegmentDefinition;
import com.newegg.edi.x12engine.schema.X12SharedData;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import org.junit.Test;

import static org.mockito.Mockito.verify;

/**
 *
 * @author mm67
 */
public class EnumerationValidatorTest extends ValidatorTestBase {
    
    private final String EmptyEnumerationCodeName = "EmptyEnumerationCodes";
    
    private EnumerationValidator validator;
    private ValidationContext ctx;
    
    private X12SchemaDefinition buildTestSchema(){
        
        X12SchemaDefinition schema = new X12SchemaDefinition();
        
        schema.setId("TEST_SCHEMA_ID");
            
         
        X12SharedData sharedData = new X12SharedData();
        
        schema.setSharedData(sharedData);
        
        List<CodeDefinition> codes = new ArrayList<>();
        
        sharedData.setCodes(codes);
        
        CodeDefinition cd1 = 
            buildCodeDefinition("FunctionalIdentifierCode",
                "IN","SC", "IB","PR", "PO", "SH");
                
        codes.add(cd1);
        
        CodeDefinition cd2 = 
            buildCodeDefinition("TransactionSetTypeCode",
                "810","855", "832","846", "850", "856");
        
        codes.add(cd2);
         
        codes.add(buildCodeDefinition(EmptyEnumerationCodeName));
        
        return schema;
    }
            
    @Override
    public void setUp() throws IOException, 
            FileNotFoundException, 
            URISyntaxException, 
            X12EngineException{
        
        super.setUp();
        
        validator = new EnumerationValidator();
        ctx = new ValidationContext();
        ctx.setResultCollector(fakeCollector);
        ctx.setSchema(buildTestSchema());
    }
    
    @Test
    public void test_Inline_Enumeration_Normal() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildInlineEnumSegmentDefinition("ST01",
                    "855",
                    "856",
                    "810");
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST*856*123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("856");
        
        validator.validate(ctx);
        
        verify_That_No_Result_Collected();
    }
    
    @Test
    public void test_Inline_Enumeration_Optional_EmptyValue_Normal() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildInlineEnumSegmentDefinition("ST01",
                    "855",
                    "856",
                    "810");
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST**123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("");
        
        validator.validate(ctx);
        
        verify_That_No_Result_Collected();
    }
    
    @Test
    public void test_Inline_Enumeration_Required_Normal() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildInlineEnumSegmentDefinition("ST01",
                    true,
                    "855",
                    "856",
                    "810");
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST*856*123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("856");
        
        validator.validate(ctx);
        
        verify_That_No_Result_Collected();
    }
    
    @Test
    public void test_Inline_Enumeration_Required_EmptyValue() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildInlineEnumSegmentDefinition("ST01",
                    true,
                    "855",
                    "856",
                    "810");
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST**123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("");
        
        validator.validate(ctx); 
        
        this.verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_MANDATORY_ELEMENT_MISSING);

    }
    
    @Test
    public void test_Inline_Enumeration_Required_InvalidValue() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildInlineEnumSegmentDefinition("ST01",
                    true,
                    "855",
                    "856",
                    "810");
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST*000*123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("000");
        
        validator.validate(ctx);
        
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_INVALID_ENUM_VALUE);
    }
    
    @Test
    public void test_Inline_Enumeration_Required_EmptyEnumerations() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildInlineEnumSegmentDefinition("ST01",
                    true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST*000*123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("000");
        
        validator.validate(ctx);
        
        this.verify_That_No_Result_Collected();        
    }
    
    @Test
    public void test_Inline_Enumeration_Required_NullEnumerations() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildNullInlineEnumSegmentDefinition("ST01",
                    true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST*000*123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("000");
        
        validator.validate(ctx);
        
        this.verify_That_No_Result_Collected();        
    }
        
    @Test
    public void test_Referenced_Enumeration_Required_Normal() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildReferencedEnumSegmentDefinition("ST01",
                    true,
                    "TransactionSetTypeCode");
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST*856*123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("856");
        
        validator.validate(ctx);
        
        verify_That_No_Result_Collected();
    }
    
    @Test
    public void test_Referenced_Enumeration_Required_Invalid() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildReferencedEnumSegmentDefinition("ST01",
                    true,
                    "TransactionSetTypeCode");
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST*000*123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("000");
        
        validator.validate(ctx);
        
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_INVALID_ENUM_VALUE);
    }
    
    @Test
    public void test_Referenced_Enumeration_Optional_EmptyValue() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildReferencedEnumSegmentDefinition("ST01",
                    false,
                    "TransactionSetTypeCode");
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST**123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("");
        
        validator.validate(ctx);
        
        verify_That_No_Result_Collected();
    }
    
    @Test
    public void test_Referenced_Enumeration_Required_ReferenceCodeNotFound() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildReferencedEnumSegmentDefinition("ST01",
                    true,
                    "TransactionSetTypeCode_NotExists");
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST*856*123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("856");
        
        validator.validate(ctx);
        
        verify_That_No_Result_Collected();
    }
    
    @Test
    public void test_Referenced_Enumeration_Required_ReferenceCodesIsEmpty() 
        throws X12EngineException{
        
        X12SegmentDefinition segmentDefinition = 
                this.buildReferencedEnumSegmentDefinition("ST01",
                    true,
                    this.EmptyEnumerationCodeName);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = buildSegmentData("ST*856*123456789", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(1); 
        ctx.setValue("856");
        
        validator.validate(ctx);
        
        verify_That_No_Result_Collected();
    }
}
