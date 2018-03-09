/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

import java.io.Serializable;

/**
 *
 * @author mm67
 */
public interface TransactionSetInfoContainer  extends Serializable{

    /*
    Returns the TransactionSetControlNumber
     */
    String getControlNumber();

    /*
    Returns the TransactionSetType, 850,810,856
     */
    String getTransactionSetType();
    
}
