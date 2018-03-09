/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.cfg;

/**
 *
 * @author mm67
 */
public class MQNotificationSetting {
    private String messagePublishUrl;
    private String queueName;
    private String password;

    /**
     * @return the messagePublishUrl
     */
    public String getMessagePublishUrl() {
        return messagePublishUrl;
    }

    /**
     * @param messagePublishUrl the messagePublishUrl to set
     */
    public void setMessagePublishUrl(String messagePublishUrl) {
        this.messagePublishUrl = messagePublishUrl;
    }

    /**
     * @return the queueName
     */
    public String getQueueName() {
        return queueName;
    }

    /**
     * @param queueName the queueName to set
     */
    public void setQueueName(String queueName) {
        this.queueName = queueName;
    }

    /**
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * @param password the password to set
     */
    public void setPassword(String password) {
        this.password = password;
    }
    
}
