/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.common.GroupInfoContainer;
import com.newegg.edi.x12engine.common.InterchangeInfoContainer;
import com.newegg.edi.x12engine.common.TransactionSet;
import com.newegg.edi.x12engine.common.TransactionSetInfoContainer;
import com.newegg.edi.x12engine.common.X12InfoProvider;
import com.newegg.edi.x12engine.common.X12PartnershipInfoContainer;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Function; 
import java.util.stream.Collectors;

/**
 *
 * @author mm67
 */
public class ValidationResultContainer implements X12PartnershipInfoContainer  {
    
    private final String controlVersion;
    private final String interchangeControlNumber;
    private final String receiverId;
    private final String receiverIdQualifier;
    private final String senderId;
    private final String senderIdQualifier;
     
    private final List<ValidationResultGroup> validationResultGroupList;
    
    public ValidationResultContainer(InterchangeInfoContainer ich){
        controlVersion = ich.getControlVersion();
        interchangeControlNumber = ich.getInterchangeControlNumber();
        receiverId = ich.getReceiverId();
        receiverIdQualifier = ich.getReceiverIdQualifier();
        senderId = ich.getSenderId();
        senderIdQualifier = ich.getSenderIdQualifier();
        
        validationResultGroupList = new ArrayList<>();
    }

    public String getControlVersion() {
        return controlVersion;
    }

    public String getInterchangeControlNumber() {
        return interchangeControlNumber;
    }

    @Override
    public String getReceiverId() {
        return receiverId;
    }

    @Override
    public String getReceiverIdQualifier() {
        return receiverIdQualifier;
    }

    @Override
    public String getSenderId() {
        return senderId;
    }

    @Override
    public String getSenderIdQualifier() {
        return senderIdQualifier;
    }
    
    public void collectValidationResult(
            X12InfoProvider x12InfoProvider,
            ValidationResultEntryProvider result){
         
        ValidationResultTransactionSet ts = 
            getOrAddTransactionSet(
                x12InfoProvider.getCurrentGroup(), 
                x12InfoProvider.getCurrentTransactionSet()
            );
        
        
        ts.collectValidationResult(result);
    }
    
    private ValidationResultTransactionSet 
        getOrAddTransactionSet(
            GroupInfoContainer group,
            TransactionSetInfoContainer ts){
            
            ValidationResultGroup validationResultGroup = 
                getOrAddGroup(
                        group, 
                        g->createGroup(g)
                );
        
        return
            validationResultGroup.getOrAddTransactionSet(
                    ts
            );        
    }     
    
    private ValidationResultGroup getOrAddGroup(
        GroupInfoContainer groupInfo,
        Function<GroupInfoContainer, ValidationResultGroup> factory){
        
        String functionalIdentifierCode = 
                groupInfo.getFunctionalIdentifierCode();
        
        String controlNumber = 
                groupInfo.getGroupControlNumber();
        
        Optional<ValidationResultGroup> theValidationGroup = 
                this.getValidationResultGroupList()
                .stream()
                .filter(g->g.getFunctionalIdentifierCode().equals(functionalIdentifierCode)) 
                .filter(g->g.getGroupControlNumber().equals(controlNumber))
                .findFirst();
        
        if(theValidationGroup.isPresent()) {
            return theValidationGroup.get();
        }
        
        ValidationResultGroup g = factory.apply(groupInfo);
        
        this.getValidationResultGroupList().add(g);
        
        return g;
    }
    
    private ValidationResultGroup createGroup(GroupInfoContainer group){
        return new ValidationResultGroup(group);
    }

    /**
     * @return the validationResultGroupList
     */
    public List<ValidationResultGroup> getValidationResultGroupList() {
        return validationResultGroupList;
    }
    
    public void startGroup(
        GroupInfoContainer groupInfo,
        X12SchemaDefinition schema){
        
        getOrAddGroup(groupInfo, schema);
    }
    
    private ValidationResultGroup getOrAddGroup(
        GroupInfoContainer groupInfo,
        X12SchemaDefinition schema){
        
        return getOrAddGroup(groupInfo,
            g->{
                    ValidationResultGroup group = createGroup(g);
                    group.setSchemaId(schema.getId());
                    group.setSchemaName(schema.getName());
                    return group;
               }
        );
    }
    
    public void startTransactionSet(
        GroupInfoContainer groupInfo,
        X12SchemaDefinition schema,
        TransactionSetInfoContainer transactionSet){
        
        ValidationResultGroup group = getOrAddGroup(groupInfo, schema);
        
        group.getOrAddTransactionSet(transactionSet);            
    }
    
    /**
     * Get the ValidationResultGroup which functional identifier code is not FA
     * We don't generate 997 for 997
     * @return 
     */
    public List<ValidationResultGroup> getGroupListForFunctionalACK(){
                
        return validationResultGroupList.stream()
            .filter(g->!"FA".equals(g.getFunctionalIdentifierCode()))
            .collect(Collectors.toList());
    } 

    public void markTransactionSetClosed(
        GroupInfoContainer currentGroup,
        TransactionSet transactionSet) {
        
        getOrAddTransactionSet(currentGroup, transactionSet);
    }

 
}
