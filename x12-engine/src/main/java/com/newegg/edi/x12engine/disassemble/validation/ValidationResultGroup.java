/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.ack.codes.GroupErrorCode;
import com.newegg.edi.x12engine.common.GroupInfoContainer;
import com.newegg.edi.x12engine.common.TransactionSetInfoContainer;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 *
 * @author mm67
 */
public class ValidationResultGroup {

    private final String controlVersion;
    private final String functionalIdentifierCode;
    private final String groupControlNumber;
    private final String receiverId;
    private final String senderId;
     
    private String schemaName;
    private String schemaId;
    
    private final List<ValidationResultTransactionSet> transactionSetList;
    
    public ValidationResultGroup(GroupInfoContainer group){
        controlVersion = group.getControlVersion();
        functionalIdentifierCode = group.getFunctionalIdentifierCode();
        groupControlNumber = group.getGroupControlNumber();
        receiverId = group.getReceiverId();
        senderId = group.getSenderId();
        
        transactionSetList = new ArrayList<>();
    }

    public String getControlVersion() {
        return controlVersion;
    }

    public String getFunctionalIdentifierCode() {
        return functionalIdentifierCode;
    }

    public String getGroupControlNumber() {
        return groupControlNumber;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public String getSenderId() {
        return senderId;
    }

    public ValidationResultTransactionSet getOrAddTransactionSet(
            TransactionSetInfoContainer transactionSet) {
        
        Optional<ValidationResultTransactionSet> matchResult =
            getTransactionSetList()
                .stream()
                .filter(ts->ts.contentEquals(transactionSet))
                .findFirst();
        
        if(!matchResult.isPresent()){
            
            ValidationResultTransactionSet matchedTS = 
                new ValidationResultTransactionSet(transactionSet);
            
            getTransactionSetList().add(matchedTS);
            
            return matchedTS;            
        } 
        
        return matchResult.get();
    }

    /**
     * @return the transactionSetList
     */
    public List<ValidationResultTransactionSet> getTransactionSetList() {
        return transactionSetList;
    }    
    
    @Override
    public String toString(){
        return String.format("Group:[%s](%s) Sender:%s Receiver:%s Ver:%s Schema:%s(ID:%s)",
            this.functionalIdentifierCode,
            this.groupControlNumber,
            this.senderId,
            this.receiverId,
            this.controlVersion,
            this.schemaName,
            this.schemaId);
    }

    /**
     * @return the schemaName
     */
    public String getSchemaName() {
        return schemaName;
    }

    /**
     * @param schemaName the schemaName to set
     */
    public void setSchemaName(String schemaName) {
        this.schemaName = schemaName;
    }

    /**
     * @return the schemaId
     */
    public String getSchemaId() {
        return schemaId;
    }

    /**
     * @param schemaId the schemaId to set
     */
    public void setSchemaId(String schemaId) {
        this.schemaId = schemaId;
    }

    /**
     * @return the totalTransactionSetCount
     */
    public int getTotalTransactionSetCount() {
        return this.transactionSetList.size();
    } 

    /**
     * @return the acceptedTransactionSetCount
     */
    public int getAcceptedTransactionSetCount() {
        return (int)this.transactionSetList.stream()
            .filter(ts->ts.isAccepted())
            .count();
    }
 
     
    public GroupSummary buildSummary() {
        GroupSummary summary = new GroupSummary();
        
        summary.setTransactionSetIncluded(this.getTotalTransactionSetCount());
        summary.setTransactionSetReceived(this.getTotalTransactionSetCount());
        summary.setTransactionSetAccepted(this.getAcceptedTransactionSetCount());
        
        if(this.getTotalTransactionSetCount() == this.getAcceptedTransactionSetCount()){
            summary.setAckCode(GroupErrorCode.AK901_CODE_ACCEPTED);
        } else if(this.getAcceptedTransactionSetCount()>0){
            summary.setAckCode(GroupErrorCode.AK901_CODE_ACCEPTED_WITH_ERROR);
        } else {
            summary.setAckCode(GroupErrorCode.AK901_CODE_REJECTED);
        }
        
        return summary;
    }
}
