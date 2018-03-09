/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import org.junit.Test;
import static org.junit.Assert.assertEquals;

/**
 *
 * @author mm67
 */
public class ValidationResultContainerTest 
    extends ValidationResultContainerTestBase {
    
    @Test
    public void test_ValidationResultContainer(){
                
        this.fakeInterchange(this.fakeInterchange, 
                "00401",
                "856038470",
                "081940553PA10",
                "16",
                "5626958823BVF",
                "ZZ");
        
        this.fakeGroup(this.fakeGroup, 
                "SH",
                "081940553PA10",
                "5626958823BVF",
                "004010",
                "38470");
        
        this.fakeTransactionSet(this.fakeTransactionSet,
                "85679050",
                "856");
        
        this.fakeX12InfoProvider(
                fakeX12InfoProvider, 
                fakeInterchange, 
                fakeGroup, 
                fakeTransactionSet);
        
        fakeSegment(this.fakeSegmentContainer, 
                "BSN*00*40177341120170404*20170404*151008",
                "BSN",
                4,
                321);
        
        ValidationResultContainer container = 
                new ValidationResultContainer(fakeInterchange);
         

        ValidationResultEntryProvider ex = 
            new ValidationResultEntry(
                "BSN",
                    2,
                    3,
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
                "Error Message");
        
        assertEquals("5626958823BVF", container.getReceiverId());
        assertEquals("ZZ", container.getReceiverIdQualifier());
        assertEquals("081940553PA10", container.getSenderId());
        assertEquals("16", container.getSenderIdQualifier());
        assertEquals("856038470", container.getInterchangeControlNumber());
        assertEquals("00401", container.getControlVersion());
        
        
        container.collectValidationResult(fakeX12InfoProvider, ex);
        
        assertEquals(1, container.getValidationResultGroupList().size());
        
        ValidationResultGroup group = container.getValidationResultGroupList().get(0);
        
        assertEquals("SH", group.getFunctionalIdentifierCode());
        assertEquals("081940553PA10", group.getSenderId());
        assertEquals("5626958823BVF", group.getReceiverId());
        assertEquals("004010", group.getControlVersion());
        assertEquals("38470", group.getGroupControlNumber());
        assertEquals(1, group.getTransactionSetList().size());
        
        ValidationResultTransactionSet ts = group.getTransactionSetList().get(0);
        
        assertEquals("856", ts.getTransactionSetType());
        assertEquals("85679050", ts.getControlNumber());
        assertEquals(1, ts.getResultEntryList().size());
        
        ValidationResultEntry entry = ts.getResultEntryList().get(0);
        
        assertEquals(2, entry.getSegmentPosition());
        assertEquals(3, entry.getElementPosition());
        assertEquals("BSN", entry.getSegmentName());
        assertEquals("Error Message", entry.getResultMessage());
    }

    @Test
    public void test_ValidationResultContainer_MultipleGroup_ExceptionCaptured(){
        
        this.fakeInterchange(this.fakeInterchange, 
                "00401",
                "856038470",
                "081940553PA10",
                "16",
                "5626958823BVF",
                "ZZ");
        
        this.fakeGroup(this.fakeGroup, 
                "SH",
                "081940553PA10",
                "5626958823BVF",
                "004010",
                "38471");
        
        this.fakeTransactionSet(this.fakeTransactionSet,
                "85679051",
                "856");
                       
        this.fakeX12InfoProvider(
                fakeX12InfoProvider, 
                fakeInterchange, 
                fakeGroup, 
                fakeTransactionSet);
        
        fakeSegment(this.fakeSegmentContainer,
                "BSN*00*40177341120170404*20170404*151008",
                "BSN",
                4,
                1);
        
        this.fakeGroup(this.fakeGroup2, 
                "SH",
                "081940553PA10",
                "5626958823BVF",
                "004010",
                "38472");
        
        this.fakeTransactionSet(this.fakeTransactionSet2,
                "85679052",
                "856");
                       
        this.fakeX12InfoProvider(
                fakeX12InfoProvider2, 
                fakeInterchange, 
                fakeGroup2, 
                fakeTransactionSet2);
        
        fakeSegment(this.fakeSegmentContainer2,
                "TD5*00*124234*23*324","TD5",4,2);
        
        ValidationResultContainer container = 
                new ValidationResultContainer(fakeInterchange);
        
        ValidationResultEntryProvider ex = 
            new ValidationResultEntry(
                fakeSegmentContainer.getName(), 
                fakeSegmentContainer.getPosition(), 
                1, 
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
                "Error Message1");
        
        ValidationResultEntryProvider ex2 = 
            new ValidationResultEntry(
                fakeSegmentContainer2.getName(), 
                fakeSegmentContainer2.getPosition(), 
                2, 
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
                "Error Message2");
          
        
        container.collectValidationResult(fakeX12InfoProvider, ex);
        container.collectValidationResult(fakeX12InfoProvider2, ex2);
        
        assertEquals(2, container.getValidationResultGroupList().size());
        
        ValidationResultGroup group1 = container.getValidationResultGroupList().get(0);
        ValidationResultGroup group2 = container.getValidationResultGroupList().get(1);
         
        assertEquals("38471", group1.getGroupControlNumber());
        assertEquals("38472", group2.getGroupControlNumber());
        
        assertEquals(1, group1.getTransactionSetList().size());
        assertEquals(1, group2.getTransactionSetList().size());
        
        ValidationResultTransactionSet ts1 = group1.getTransactionSetList().get(0);
        ValidationResultTransactionSet ts2 = group2.getTransactionSetList().get(0);
        
        assertEquals("85679051", ts1.getControlNumber());
        assertEquals("856", ts1.getTransactionSetType());
        
        assertEquals("85679052", ts2.getControlNumber());
        assertEquals("856", ts2.getTransactionSetType());
    }
    
    @Test
    public void test_ValidationResultContainer_MultipleTS_ExceptionCaptured(){
        
        this.fakeInterchange(this.fakeInterchange, 
                "00401","856038470","081940553PA10","16","5626958823BVF","ZZ");
        
        this.fakeGroup(this.fakeGroup, 
                "SH","081940553PA10","5626958823BVF","004010","38471");
        
        this.fakeTransactionSet(this.fakeTransactionSet, "85679051","856");
                       
        this.fakeX12InfoProvider(
                fakeX12InfoProvider, 
                fakeInterchange, 
                fakeGroup, 
                fakeTransactionSet);
        
        fakeSegment(this.fakeSegmentContainer,
                "BSN*00*40177341120170404*20170404*151008","BSN",4,1);
         
        
        this.fakeTransactionSet(this.fakeTransactionSet2, "85679052","856");
                       
        this.fakeX12InfoProvider(
                fakeX12InfoProvider2, 
                fakeInterchange, 
                fakeGroup, 
                fakeTransactionSet2);
        
        fakeSegment(this.fakeSegmentContainer2,
                "TD5*00*124234*23*324","TD5",4,2);
        
        ValidationResultContainer container = 
                new ValidationResultContainer(fakeInterchange);
        
        ValidationResultEntryProvider ex = 
            new ValidationResultEntry(
                fakeSegmentContainer.getName(), 
                fakeSegmentContainer.getPosition(), 
                1, 
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
                "Error Message1");
        
        ValidationResultEntryProvider ex2 = 
            new ValidationResultEntry(
                fakeSegmentContainer2.getName(), 
                fakeSegmentContainer2.getPosition(), 
                2, 
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
                "Error Message2");
        
        container.collectValidationResult(fakeX12InfoProvider, ex);
        container.collectValidationResult(fakeX12InfoProvider2, ex2);
        
        assertEquals(1, container.getValidationResultGroupList().size());
        
        ValidationResultGroup group1 = container.getValidationResultGroupList().get(0);
         
        assertEquals("38471", group1.getGroupControlNumber());
        assertEquals(2, group1.getTransactionSetList().size());
        
        ValidationResultTransactionSet ts1 = group1.getTransactionSetList().get(0);
        ValidationResultTransactionSet ts2 = group1.getTransactionSetList().get(1);
        
        assertEquals("85679051", ts1.getControlNumber());
        assertEquals("856", ts1.getTransactionSetType());
        
        assertEquals("85679052", ts2.getControlNumber());
        assertEquals("856", ts2.getTransactionSetType());
    }
    
    @Test
    public void test_ValidationResultContainer_MultipleTS_SameControlNumber_ExceptionCaptured(){
        
        this.fakeInterchange(this.fakeInterchange, 
                "00401","856038470","081940553PA10","16","5626958823BVF","ZZ");
        
        this.fakeGroup(this.fakeGroup, 
                "SH","081940553PA10","5626958823BVF","004010","38471");
        
        this.fakeTransactionSet(this.fakeTransactionSet, "00000001","856");
                       
        this.fakeX12InfoProvider(
                fakeX12InfoProvider, 
                fakeInterchange, 
                fakeGroup, 
                fakeTransactionSet);
        
        fakeSegment(this.fakeSegmentContainer,
                "BSN*00*40177341120170404*20170404*151008","BSN",4,1);
         
        
        this.fakeTransactionSet(this.fakeTransactionSet2, "00000001","855");
                       
        this.fakeX12InfoProvider(
                fakeX12InfoProvider2, 
                fakeInterchange, 
                fakeGroup, 
                fakeTransactionSet2);
        
        fakeSegment(this.fakeSegmentContainer2,
                "TD5*00*124234*23*324","TD5",4,2);
        
        ValidationResultContainer container = 
                new ValidationResultContainer(fakeInterchange);
        
        ValidationResultEntryProvider ex = 
            new ValidationResultEntry(
                fakeSegmentContainer.getName(), 
                fakeSegmentContainer.getPosition(), 
                1, 
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
                "Error Message1");
        
        ValidationResultEntryProvider ex2 = 
            new ValidationResultEntry(
                fakeSegmentContainer2.getName(), 
                fakeSegmentContainer2.getPosition(), 
                2, 
                ValidationResultType.DATA_ELEMENT,
                ValidationErrorCode.ELEMENT_LEVEL_DATA_FORMAT_ERROR,
                "Error Message2");
        
        container.collectValidationResult(fakeX12InfoProvider, ex);
        container.collectValidationResult(fakeX12InfoProvider2, ex2);
        
        assertEquals(1, container.getValidationResultGroupList().size());
        
        ValidationResultGroup group1 = container.getValidationResultGroupList().get(0);
         
        assertEquals("38471", group1.getGroupControlNumber());
        
        assertEquals(2, group1.getTransactionSetList().size());
        
        ValidationResultTransactionSet ts1 = group1.getTransactionSetList().get(0);
        ValidationResultTransactionSet ts2 = group1.getTransactionSetList().get(1);
        
        assertEquals("00000001", ts1.getControlNumber());
        assertEquals("856", ts1.getTransactionSetType());
        
        assertEquals("00000001", ts2.getControlNumber());
        assertEquals("855", ts2.getTransactionSetType());
    }
}
