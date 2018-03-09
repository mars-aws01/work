/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.common.SegmentData;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import com.newegg.edi.x12engine.schema.X12SegmentDefinition;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URISyntaxException;
import org.junit.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;

/**
 *
 * @author mm67
 */
public class NumberValidatorTest extends ValidatorTestBase {
    private NumberValidator validator;
    private ValidationContext ctx;
    
    @Override
    public void setUp() throws IOException, 
            FileNotFoundException, 
            URISyntaxException, 
            X12EngineException{
        
        super.setUp();
        
        validator = new NumberValidator();
        ctx = new ValidationContext();
        ctx.setResultCollector(fakeCollector);
        ctx.setSchema(super.getSchemaFromFile(SchemaFile856));
    }
    
    @Test
    public void test_WithMinLength_And_MaxLength_Normal() 
            throws X12EngineException {
        
        int minLength = 5;
        int maxLength = 10;
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    minLength, 
                    maxLength, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("10.98");
        
        validator.validate(ctx);
        
        verify(fakeCollector, never())
            .collect(any(ValidationResultEntry.class));
    }
    
    @Test
    public void test_WithMinLength_And_MaxLength_Normal2() 
            throws X12EngineException {
        
        int minLength = 5;
        int maxLength = 10;
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    minLength, 
                    maxLength, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("10.001");
        
        validator.validate(ctx);
        
        verify(fakeCollector, never())
            .collect(any(ValidationResultEntry.class));
    }
    
    @Test
    public void test_WithMinLength_And_MaxLength_NotMatchDecimalLimits() 
            throws X12EngineException {
        
        int minLength = 5;
        int maxLength = 10;
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    minLength, 
                    maxLength, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    2);        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("10.001");
        
        validator.validate(ctx); 
         
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR); 
    }
    
    @Test
    public void test_WithMinLength_Not_Satisfied() 
            throws X12EngineException {
        
        int minLength = 5;
        int maxLength = 10;
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    minLength, 
                    maxLength, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    2);        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("10.1"); // Too short, less than 5 chars
        
        validator.validate(ctx);
                 
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_TOO_SHORT); 
    }
    
    @Test
    public void test_WithMaxLength_Not_Satisfied() 
            throws X12EngineException {
        
        int minLength = 5;
        int maxLength = 10;
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    minLength, 
                    maxLength, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    2);        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("100000000.1"); // Too long, greater than 10 chars
        
        validator.validate(ctx);
         
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_TOO_LONG); 
    }
    
    @Test
    public void test_Max_Value_Exclusive_Exceeded() 
            throws X12EngineException {
         
        // default is exclusive upper/lower bound
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    Constants.NULL_VALUE, 
                    Constants.NULL_VALUE, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("10.99000");
        
        validator.validate(ctx); 
        
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_OUT_OF_RANGE); 
        
        verifyResultMessageContains("upper bound");
    }
    

    
    @Test
    public void test_Max_Value_Inclusive_NotExceeded() 
            throws X12EngineException {
         
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    Constants.NULL_VALUE, 
                    Constants.NULL_VALUE, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);   
        
        // Inclusive upper bound
        segmentDefinition.getRestriction().setInclusiveUpperBound(true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("10.99000");
        
        validator.validate(ctx); 
        
        verify(fakeCollector, never()).collect(any());        
    }
    
    @Test
    public void test_Min_Value_Exclusive_Exceeded() 
            throws X12EngineException {
         
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    Constants.NULL_VALUE, 
                    Constants.NULL_VALUE, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("10.00");
        
        validator.validate(ctx); 
        
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_OUT_OF_RANGE); 

        verifyResultMessageContains("lower bound");
    }
    
    @Test
    public void test_Min_Value_Inclusive_Not_Exceeded() 
            throws X12EngineException {
         
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    Constants.NULL_VALUE, 
                    Constants.NULL_VALUE, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);      
        
        segmentDefinition.getRestriction().setInclusiveLowerBound(true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("10.00");
        
        validator.validate(ctx); 
        
        verify(fakeCollector, never()).collect(any());        
    }
    
    @Test
    public void test_NegativeMin_Value_Exceeded() 
            throws X12EngineException {         
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    Constants.NULL_VALUE, 
                    Constants.NULL_VALUE, 
                    new BigDecimal("-1.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("-1.00000001");
        
        validator.validate(ctx); 
         
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_OUT_OF_RANGE); 
        
        verifyResultMessageContains("lower bound");    
    }   
    
    @Test
    public void test_NegativeMin_Value2_Exceeded() 
            throws X12EngineException {         
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    Constants.NULL_VALUE, 
                    Constants.NULL_VALUE, 
                    new BigDecimal("0.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);        
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*10.98*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("-0.00000001");
        
        validator.validate(ctx); 
         
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_OUT_OF_RANGE); 
        
        verifyResultMessageContains("lower bound");      
    }   
    
    @Test
    public void test_Required_EmptyValue() 
            throws X12EngineException {         
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    Constants.NULL_VALUE, 
                    Constants.NULL_VALUE, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);      
        
        segmentDefinition.getRestriction().setRequired(true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G**KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("");
        
        validator.validate(ctx); 
        
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_MANDATORY_ELEMENT_MISSING);    
    }
    
    @Test
    public void test_None_NumericeValue() 
            throws X12EngineException {         
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    Constants.NULL_VALUE, 
                    Constants.NULL_VALUE, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    Constants.NULL_VALUE);      
        
        segmentDefinition.getRestriction().setRequired(true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*ABCD*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("ABCD");
        
        validator.validate(ctx); 
         
        verifyErrorCodeCollected(
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR); 
    }
    
    @Test
    public void test_Invalid_DecimalLimits_Normal() 
            throws X12EngineException {         
        
        X12SegmentDefinition segmentDefinition = 
                buildNumberSegmentDefinition(
                    "PO406", 
                    Constants.NULL_VALUE, 
                    Constants.NULL_VALUE, 
                    new BigDecimal("10.00"),
                    new BigDecimal("10.99"),
                    -1); // Invalid decimals limit      
        
        segmentDefinition.getRestriction().setRequired(true);
        
        ctx.setElementDefinition(segmentDefinition);
        
        SegmentData segment = 
            buildSegmentData(
                "PO4**1*EA**G*12.99*KG*0.027*CR*78*24.3*14*CM", 1);
        
        ctx.setSegment(segment);
        ctx.setElementPosition(6); 
        ctx.setValue("10.989");
        
        validator.validate(ctx); 
        
        verify(fakeCollector, never()).collect(any());  
    }
}
