/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.events;

import com.newegg.edi.x12engine.common.TransactionSet;
import com.newegg.edi.x12engine.parsing.X12ReaderContext;

/**
 *
 * @author mm67
 */
public class TransactionSetClosedEvent extends X12ReaderEvent  {
    
    private final TransactionSet transactionSet;
    
    public TransactionSetClosedEvent(
            X12ReaderContext ctx,
            TransactionSet transactionSet) {
        super(ctx); 
        this.transactionSet = transactionSet;
    } 

    /**
     * @return the transactionSet
     */
    public TransactionSet getTransactionSet() {
        return transactionSet;
    }
}
