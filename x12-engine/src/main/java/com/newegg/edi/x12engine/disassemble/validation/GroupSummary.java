/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

/**
 *
 * @author mm67
 */
public class GroupSummary extends SummaryBase {
    private int transactionSetIncluded;
    private int transactionSetReceived;
    private int transactionSetAccepted;
    

    /**
     * @return the transactionSetIncluded
     */
    public int getTransactionSetIncluded() {
        return transactionSetIncluded;
    }

    /**
     * @param transactionSetIncluded the transactionSetIncluded to set
     */
    public void setTransactionSetIncluded(int transactionSetIncluded) {
        this.transactionSetIncluded = transactionSetIncluded;
    }

    /**
     * @return the transactionSetReceived
     */
    public int getTransactionSetReceived() {
        return transactionSetReceived;
    }

    /**
     * @param transactionSetReceived the transactionSetReceived to set
     */
    public void setTransactionSetReceived(int transactionSetReceived) {
        this.transactionSetReceived = transactionSetReceived;
    }

    /**
     * @return the transactionSetAccepted
     */
    public int getTransactionSetAccepted() {
        return transactionSetAccepted;
    }

    /**
     * @param transactionSetAccepted the transactionSetAccepted to set
     */
    public void setTransactionSetAccepted(int transactionSetAccepted) {
        this.transactionSetAccepted = transactionSetAccepted;
    }
}
