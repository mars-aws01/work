/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble;
 
import com.newegg.edi.x12engine.common.Constants; 
import com.newegg.edi.x12engine.common.ContextBase;
import com.newegg.edi.x12engine.common.Group;
import com.newegg.edi.x12engine.common.GroupInfoContainer;
import com.newegg.edi.x12engine.common.Interchange;
import com.newegg.edi.x12engine.common.InterchangeInfoContainer;
import com.newegg.edi.x12engine.common.TransactionSet;
import com.newegg.edi.x12engine.common.TransactionSetInfoContainer;
import com.newegg.edi.x12engine.common.X12InfoProvider;
import com.newegg.edi.x12engine.common.X12MetaData;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultCollector;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultContainer;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntryProvider; 
import com.newegg.edi.x12engine.exceptions.validation.X12SchemaValidationException;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import com.newegg.edi.x12engine.util.ExceptionHandler;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author mm67
 */
public class DisassembleContext extends ContextBase
        implements ExceptionHandler, 
                    X12InfoProvider,
                    ValidationResultCollector{

    private X12SchemaDefinition currentSchema;
    
    private Interchange currentInterchange;
    private TransactionSet currentTransactionSet;
    private Group currentGroup;
    private X12MetaData currentMetaData;
    private boolean terminated;
    private String message;
    private final List<ValidationResultContainer> validationResultContainerList;
    private ValidationResultContainer currentValidationResultContainer;
        
    public DisassembleContext(){
        super(Constants.MODULE_CODE_X12_DISASSEMBLER); 
        
        validationResultContainerList = new ArrayList<>();
    }

    @Override
    public void captureException(Exception ex) {
        // TODO implement exception capture method
    }
    
    /**
     * @return the currentInterchange
     */
    @Override
    public InterchangeInfoContainer getCurrentInterchange() {
        return currentInterchange;
    }

    /**
     * @param interchange the current Interchange to set
     */
    public void setCurrentInterchange(Interchange interchange) {
        this.currentInterchange = interchange;
        this.currentMetaData = interchange.getHeader().getMetaData();        
    }

    /**
     * @return the currentTransactionSet
     */
    @Override
    public TransactionSetInfoContainer getCurrentTransactionSet() {
        return currentTransactionSet;
    }

    /**
     * @param currentTransactionSet the currentTransactionSet to set
     */
    public void setCurrentTransactionSet(TransactionSet currentTransactionSet) {
        this.currentTransactionSet = currentTransactionSet;
    }

    /**
     * @return the currentGroup
     */
    @Override
    public GroupInfoContainer getCurrentGroup() {
        return currentGroup;
    }

    /**
     * 
     * @param currentGroup the currentGroup to set
     */
    public void setCurrentGroup(Group currentGroup) {
        this.currentGroup = currentGroup;   
    }
    
    public void startCollectingValidationResult(){
        
        currentValidationResultContainer = 
                new ValidationResultContainer(this.currentInterchange);
        
        this.validationResultContainerList.add(getValidationResultContainer());
    }

    /**
     * @return the currentSchema
     */
    public X12SchemaDefinition getCurrentSchema() {
        return currentSchema;
    }

    /**
     * @param currentSchema the currentSchema to set
     */
    public void setCurrentSchema(X12SchemaDefinition currentSchema) {
        this.currentSchema = currentSchema;
    }

    /**
     * @return the terminated
     */
    public boolean isTerminated() {
        return terminated;
    }

    /**
     * @param terminated the terminated to set
     */
    public void setTerminated(boolean terminated) {
        this.terminated = terminated;
    }

    /**
     * @return the lastMessage
     */
    public String getMessage() {
        return message;
    }

    /**
     * @param message the message to set
     */
    public void setMessage(String message) {
        this.message = message;
    }

    /**
     * @return the currentMetaData
     */
    public X12MetaData getCurrentMetaData() {
        return currentMetaData;
    }

    /**
     * @param currentMetaData the currentMetaData to set
     */
    public void setCurrentMetaData(X12MetaData currentMetaData) {
        this.currentMetaData = currentMetaData;
    }

    /**
     * @return the currentValidationResultContainer
     */
    public ValidationResultContainer getValidationResultContainer() {
        return currentValidationResultContainer;
    }

    @Override
    public void collect(ValidationResultEntryProvider result) {
        
        this.getValidationResultContainer()
                .collectValidationResult(this, result);
    } 
    
    @Override
    public void collectException(X12SchemaValidationException ex) {
        this.getValidationResultContainer()
            .collectValidationResult(this, ex.toValidationResult());
    }
}
