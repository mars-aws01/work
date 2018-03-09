/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.common.GroupInfoContainer;
import com.newegg.edi.x12engine.common.InterchangeInfoContainer;
import com.newegg.edi.x12engine.common.SegmentDataInfoContainer;
import com.newegg.edi.x12engine.common.TransactionSetInfoContainer;
import com.newegg.edi.x12engine.common.X12InfoProvider;
import java.io.IOException;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.mockito.Mock;
import static org.mockito.Mockito.when;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

/**
 *
 * @author mm67
 */
public abstract class ValidationResultContainerTestBase {
    @Mock
    protected InterchangeInfoContainer fakeInterchange;
    
    @Mock
    protected GroupInfoContainer fakeGroup;
    
    @Mock
    protected TransactionSetInfoContainer fakeTransactionSet;
    
    @Mock
    protected SegmentDataInfoContainer fakeSegmentContainer;
    
    @Mock
    protected GroupInfoContainer fakeGroup2;
    
    @Mock
    protected TransactionSetInfoContainer fakeTransactionSet2;
    
    @Mock
    protected SegmentDataInfoContainer fakeSegmentContainer2;
    
    @Mock
    protected X12InfoProvider fakeX12InfoProvider;
    
    @Mock
    protected X12InfoProvider fakeX12InfoProvider2;
        
    @Rule 
    public MockitoRule mockitoRule = MockitoJUnit.rule(); 
    
    @Before 
    public void setup() {
        MockitoAnnotations.initMocks(this);
         
        
    }
    
    @After
    public void cleanUp() throws IOException{
          
    }
    
    protected void fakeX12InfoProvider(
            X12InfoProvider provider,            
            InterchangeInfoContainer ich,
            GroupInfoContainer g,
            TransactionSetInfoContainer ts
        ){
        
        when(provider.getCurrentInterchange())
                .thenReturn(ich);
        
        when(provider.getCurrentGroup()).thenReturn(g);
        
        when(provider.getCurrentTransactionSet())
                .thenReturn(ts);
    }

    protected void fakeInterchange(
            InterchangeInfoContainer ich,
            String controlVersion,
            String controlNumber,
            String senderID,
            String senderIDQualifier,
            String receiverID,
            String receiverIDQualifier) {
        // Fake Interchange
        when(ich.getControlVersion())
                .thenReturn(controlVersion);
        
        when(ich.getInterchangeControlNumber())
                .thenReturn(controlNumber);
        
        when(ich.getReceiverId())
                .thenReturn(receiverID);
        
        when(ich.getReceiverIdQualifier())
                .thenReturn(receiverIDQualifier);
        
        when(ich.getSenderId())
                .thenReturn(senderID);
        
        when(ich.getSenderIdQualifier())
                .thenReturn(senderIDQualifier);
    }
    
    protected void fakeGroup(GroupInfoContainer g,
            String functionalIdentifierCode,
            String senderID,
            String receiverID,
            String groupControlVersion,
            String groupControlNumber) {
        when(g.getFunctionalIdentifierCode())
                .thenReturn(functionalIdentifierCode);
        
        when(g.getSenderId()).thenReturn(senderID);
        when(g.getReceiverId()).thenReturn(receiverID);
        when(g.getControlVersion()).thenReturn(groupControlVersion);
        when(g.getGroupControlNumber()).thenReturn(groupControlNumber);
    }

    protected void fakeTransactionSet(
            TransactionSetInfoContainer ts,
            String controlNumber,
            String transactionSetType) {
        when(ts.getControlNumber())
                .thenReturn(controlNumber);
        
        when(ts.getTransactionSetType())
                .thenReturn(transactionSetType);
    }

    protected void fakeSegment(
            SegmentDataInfoContainer container,
            String originalSegment, String name, int dataCount, int segPOS) {
        when(container.getOriginalSegmentData())
                .thenReturn(originalSegment);
        
        when(container.getName()).thenReturn(name);
        
        when(container.getDataCount()).thenReturn(dataCount);
        
        when(container.getPosition()).thenReturn(segPOS);
    }
    

}
