/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.ack.codes.TransactionSetErrorCode;
import com.newegg.edi.x12engine.common.TransactionSetInfoContainer;
import com.newegg.edi.x12engine.util.StringExtension;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 *
 * @author mm67
 */
public class ValidationResultTransactionSet {
    private final String transactionSetType;
    private final String controlNumber;
    
    private final List<ValidationResultEntry> resultEntryList;
    
    public ValidationResultTransactionSet(
            TransactionSetInfoContainer transactionSet) {
        this.transactionSetType = transactionSet.getTransactionSetType();
        this.controlNumber = transactionSet.getControlNumber();
        
        resultEntryList = new ArrayList<>();
    }

    /**
     * @return the transactionSetType
     */
    public String getTransactionSetType() {
        return transactionSetType;
    }

    /**
     * @return the controlNumber
     */
    public String getControlNumber() {
        return controlNumber;
    }
    
    public boolean contentEquals(TransactionSetInfoContainer obj){
        
        if(obj == null) return false;
        
        if(StringExtension.isNullOrWhitespace(this.getControlNumber())){
            return false;
        }
        
        if(!this.getControlNumber().equals(obj.getControlNumber())){
            return false;
        }
        
        if(StringExtension.isNullOrWhitespace(this.getTransactionSetType())){
            return false;
        }
        
        return this.getTransactionSetType().equals(obj.getTransactionSetType());
    }

    public void collectValidationResult(ValidationResultEntryProvider result) {
        
        ValidationResultEntry entry = new ValidationResultEntry(result);
        
        this.getResultEntryList().add(entry);        
    }

    /**
     * @return the resultEntryList
     */
    public List<ValidationResultEntry> getResultEntryList() {
        return resultEntryList;
    }
    
    @Override
    public String toString(){
        return String.format("Transaction Set: [%s](%s)", 
            this.transactionSetType,
            this.controlNumber);
    }
    
    public List<ValidationResultEntry> getDataElementEntryList() {
        return this.resultEntryList.stream()
            .filter(e->e.getResultType() == ValidationResultType.DATA_ELEMENT)
            .collect(Collectors.toList());
    }

    public TransactionSetSummary buildSummary() {
        
        TransactionSetSummary summary = new TransactionSetSummary();
        
        if(this.getResultEntryList().isEmpty()){
            summary.setAckCode(TransactionSetErrorCode.AK501_CODE_ACCEPTED);
        } else {
            summary.setAckCode(TransactionSetErrorCode.AK501_CODE_REJECTED);
            summary.setErrorCode1(
                String.valueOf(
                    TransactionSetErrorCode.AK502_CODE_TRANSACTION_SET_HAS_ERROR_SEGMENTS));
        }
        
        return summary;
    }

    /**
     * If the transaction set contains no entry result, which means no segment 
     * violated the validation rules.
     * @return 
     */
    public boolean isAccepted() {
        return this.resultEntryList.isEmpty();
    }

    
}
