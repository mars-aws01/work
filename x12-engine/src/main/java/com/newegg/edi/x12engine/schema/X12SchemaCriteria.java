/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.util.StringExtension;

/**
 * The query criteria for X12Schema definition
 * @author mm67
 */
public class X12SchemaCriteria {
    private String senderIdQualifier;
    private String senderId;
    private String receiverIdQualifier;
    private String receiverId;
    private String functionalIdentifierCode;

    private String groupSenderId;
    private String groupReceiverId;
    
    private String schemaId;    
    private String interchangeControlVersion;
    private String groupControlVersion;
    
    private String schemaStore;
    private String schemaFileNamePrefix;
    private String schemaFileNameSuffix;
       

    /**
     * @return the senderIdQualifier
     */
    public String getSenderIdQualifier() {
        return senderIdQualifier;
    }

    /**
     * @param senderIdQualifier the senderIdQualifier to set
     */
    public void setSenderIdQualifier(String senderIdQualifier) {
        this.senderIdQualifier = senderIdQualifier;
    }

    /**
     * @return the senderId
     */
    public String getSenderId() {
        return senderId;
    }

    /**
     * @param senderId the senderId to set
     */
    public void setSenderId(String senderId) {
        this.senderId = StringExtension.trimNullSafe(senderId);
    }

    /**
     * @return the receiverIdQualifier
     */
    public String getReceiverIdQualifier() {
        return receiverIdQualifier;
    }

    /**
     * @param receiverIdQualifier the receiverIdQualifier to set
     */
    public void setReceiverIdQualifier(String receiverIdQualifier) {
        this.receiverIdQualifier = receiverIdQualifier;
    }

    /**
     * @return the receiverId
     */
    public String getReceiverId() {
        return receiverId;
    }

    /**
     * @param receiverId the receiverId to set
     */
    public void setReceiverId(String receiverId) {
        this.receiverId = StringExtension.trimNullSafe(receiverId);
    }

    /**
     * @return the functionalIdentifierCode
     */
    public String getFunctionalIdentifierCode() {
        return functionalIdentifierCode;
    }

    /**
     * @param functionalIdentifierCode the functionalIdentifierCode to set
     */
    public void setFunctionalIdentifierCode(String functionalIdentifierCode) {
        this.functionalIdentifierCode = functionalIdentifierCode;
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
     * @return the interchangeControlVersion
     */
    public String getInterchangeControlVersion() {
        return interchangeControlVersion;
    }

    /**
     * @param interchangeControlVersion the interchangeControlVersion to set
     */
    public void setInterchangeControlVersion(String interchangeControlVersion) {
        this.interchangeControlVersion = interchangeControlVersion;
    }

    /**
     * @return the groupSenderId
     */
    public String getGroupSenderId() {
        return groupSenderId;
    }

    /**
     * @param groupSenderId the groupSenderId to set
     */
    public void setGroupSenderId(String groupSenderId) {
        this.groupSenderId = StringExtension.trimNullSafe(groupSenderId);
    }

    /**
     * @return the groupReceiverId
     */
    public String getGroupReceiverId() {
        return groupReceiverId;
    }

    /**
     * @param groupReceiverId the groupReceiverId to set
     */
    public void setGroupReceiverId(String groupReceiverId) {
        this.groupReceiverId = StringExtension.trimNullSafe(groupReceiverId);
    }

    /**
     * @return the groupControlVersion
     */
    public String getGroupControlVersion() {
        return groupControlVersion;
    }

    /**
     * @param groupControlVersion the groupControlVersion to set
     */
    public void setGroupControlVersion(String groupControlVersion) {
        this.groupControlVersion = groupControlVersion;
    }
    
    @Override
    public String toString(){
        return String.format("ICH Sender-Receiver: (%s)%s - (%s)%s"
                + " Ver:%s"
                + " Group SDR-RCV: %s - %s"
                + " FunctionalIdentifierCode: %s"
                + " Group Ctrl Ver:%s", 
                this.getSenderIdQualifier(),
                this.getSenderId(),
                this.getReceiverIdQualifier(),
                this.getReceiverId(),
                this.getInterchangeControlVersion(),
                this.getGroupSenderId(),
                this.getGroupReceiverId(),
                this.getFunctionalIdentifierCode(),
                this.getGroupControlVersion());
    }
    
    public void log(Logger logger){
        logger.info("    Interchange Sender-Receiver      : (%s) %s - (%s) %s", 
                this.getSenderIdQualifier(),
                this.getSenderId(),
                this.getReceiverIdQualifier(),
                this.getReceiverId());
        
        logger.info("    Interchange Control Version      : %s",
                        this.getInterchangeControlVersion()
                );
        
        logger.info("    Group Sender-Receiver            : %s - %s", 
                this.getGroupSenderId(),
                this.getGroupReceiverId());
        
        logger.info("    Group Functional Identifier Code : %s",
                    this.getFunctionalIdentifierCode());
        
        logger.info("    Group Control Version            : %s",
                        this.getGroupControlVersion()
                );
        
    }

    /**
     * @return the schemaStore
     */
    public String getSchemaStore() {
        return schemaStore;
    }

    /**
     * @param schemaStore the schemaStore to set
     */
    public void setSchemaStore(String schemaStore) {
        this.schemaStore = schemaStore;
    }

    /**
     * @return the schemaFileNamePrefix
     */
    public String getSchemaFileNamePrefix() {
        return schemaFileNamePrefix;
    }

    /**
     * @param schemaFileNamePrefix the schemaFileNamePrefix to set
     */
    public void setSchemaFileNamePrefix(String schemaFileNamePrefix) {
        this.schemaFileNamePrefix = schemaFileNamePrefix;
    }

    /**
     * @return the schemaFileNameSuffix
     */
    public String getSchemaFileNameSuffix() {
        return schemaFileNameSuffix;
    }

    /**
     * @param schemaFileNameSuffix the schemaFileNameSuffix to set
     */
    public void setSchemaFileNameSuffix(String schemaFileNameSuffix) {
        this.schemaFileNameSuffix = schemaFileNameSuffix;
    }
}
