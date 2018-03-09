/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.common.SegmentData;
import com.newegg.edi.x12engine.common.SegmentTerminatorSuffixType;
import com.newegg.edi.x12engine.common.X12MetaData;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultCollector;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntryProvider;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.schema.CodeDefinition;
import com.newegg.edi.x12engine.schema.X12Restriction;
import com.newegg.edi.x12engine.schema.X12SegmentDefinition;
import com.newegg.edi.x12engine.util.TestBase;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.net.URISyntaxException;
import java.util.Arrays;
import org.junit.After;
import org.junit.Before;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import org.mockito.Mock;
import static org.mockito.Mockito.doAnswer;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import org.mockito.invocation.InvocationOnMock;
import org.mockito.stubbing.Answer;

/**
 *
 * @author mm67
 */
public class ValidatorTestBase extends TestBase {
    
    @Mock
    protected ValidationResultCollector fakeCollector;
    
    protected X12SegmentDefinition buildTextSegmentDefinition(
            String name, int minLength, int maxLength, String pattern){
        X12SegmentDefinition segment = new X12SegmentDefinition();
        
        segment.setName(name);
        
        X12Restriction restriction = new X12Restriction();
        
        restriction.setTargetDataType(X12Restriction.TARGET_DATA_TYPE_STRING);
        restriction.setMaxLength(maxLength);
        restriction.setMinLength(minLength);
        restriction.setPattern(pattern);
        
        segment.setRestriction(restriction);
        
        return segment;
    }
    

    
    protected X12SegmentDefinition buildNumberSegmentDefinition(
            String name, 
            int minLength, 
            int maxLength, 
            BigDecimal minValue,
            BigDecimal maxValue,
            int decimals){
        X12SegmentDefinition segment = new X12SegmentDefinition();
        
        segment.setName(name);
        
        X12Restriction restriction = new X12Restriction();
        
        restriction.setTargetDataType(X12Restriction.TARGET_DATA_TYPE_NUMBER);
        restriction.setMaxLength(maxLength);
        restriction.setMinLength(minLength);
        restriction.setMinValue(minValue);
        restriction.setMaxValue(maxValue);
        restriction.setDecimals(decimals);
        
        segment.setRestriction(restriction);
        
        return segment;
    }
    
    protected X12SegmentDefinition buildInlineEnumSegmentDefinition(
        String name, 
        String... inlineEnumerations){
        
        return buildInlineEnumSegmentDefinition(
            name, 
            false,
            inlineEnumerations);
    }    
    
    protected X12SegmentDefinition buildNullInlineEnumSegmentDefinition(
        String name, boolean required){
        
        X12SegmentDefinition segment = new X12SegmentDefinition();
        
        segment.setName(name);
        
        X12Restriction restriction = new X12Restriction();
        
        restriction.setTargetDataType(X12Restriction.TARGET_DATA_TYPE_ENUM);
        restriction.setEnumerations(null);
        restriction.setRequired(required);
         
        segment.setRestriction(restriction);
        
        return segment;
    }
    
    protected X12SegmentDefinition buildInlineEnumSegmentDefinition(
        String name, 
        boolean required,
        String... inlineEnumerations){
        
        X12SegmentDefinition segment = new X12SegmentDefinition();
        
        segment.setName(name);
        
        X12Restriction restriction = new X12Restriction();
        
        restriction.setTargetDataType(X12Restriction.TARGET_DATA_TYPE_ENUM);
        restriction.setEnumerations(Arrays.asList(inlineEnumerations));
        restriction.setRequired(required);
         
        segment.setRestriction(restriction);
        
        return segment;
    }
    
    protected X12SegmentDefinition buildReferencedEnumSegmentDefinition(
        String name,  
        String referenceCode){
        
        return buildReferencedEnumSegmentDefinition(
            name,
            false,
            referenceCode);            
    }
    
    protected X12SegmentDefinition buildReferencedEnumSegmentDefinition(
        String name, 
        boolean required,
        String referenceCode){
        
         X12SegmentDefinition segment = new X12SegmentDefinition();
        
        segment.setName(name);
        
        X12Restriction restriction = new X12Restriction();
        
        restriction.setTargetDataType(X12Restriction.TARGET_DATA_TYPE_ENUM);
        restriction.setReferenceCode(referenceCode);
        restriction.setRequired(required);
         
        segment.setRestriction(restriction);
        
        return segment;
    }
    
    protected SegmentData buildSegmentData(String data, int segmentPosition)
            throws X12EngineException {
        X12MetaData metaData = new X12MetaData();
        
        metaData.setComponentElementSeparator(":");
        metaData.setElementDelimiter('*');
        metaData.setSegmentTerminator('~');
        metaData.setSegmentTerminatorSuffix(SegmentTerminatorSuffixType.NONE);
        
        SegmentData segment = new SegmentData(metaData, data, segmentPosition);
        
        return segment;
    }
    
    @Before
    public void setUp() throws IOException, 
            FileNotFoundException, 
            URISyntaxException, 
            X12EngineException{
        
        doAnswer((Answer) (InvocationOnMock inv) -> {
            ValidationResultEntryProvider arg = 
                (ValidationResultEntryProvider)inv.getArgument(0);
            
            System.out.printf("ValidationResultEntry Collected: Code:[%d] Type:%s %n", 
                arg.getErrorCode(),
                arg.getResultType());
            System.out.printf("Message Collected: %s%n", arg.getResultMessage());
            
            return "";
        }).when(fakeCollector).collect(any());
 
    }
    
    @After
    public void cleanUp(){
        
    }
    
    protected CodeDefinition buildCodeDefinition(
        String name, String... values){
        
        CodeDefinition def = new CodeDefinition();
        
        def.setName(name);         
        def.setValues(Arrays.asList(values));
        
        return def;
    }
    
    protected void verifyResultMessageContains(String messageFragment){
        verify(fakeCollector)
            .collect(argThat(entry->
                entry.getResultMessage()
                .contains(messageFragment)));     
    }
    
    protected void verify_That_No_Result_Collected(){
        verify(fakeCollector, never()).collect(any(ValidationResultEntry.class));
    }
        
    protected void verifyErrorCodeCollected(
        ValidationResultType expectedType,
        int code){
        verify(fakeCollector)
            .collect(argThat(
                e->e.getErrorCode()==code 
                && e.getResultType() == expectedType));    
    }
     
}
