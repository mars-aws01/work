/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

/**
 *
 * @author mm67
 */
public interface X12InfoProvider {
    InterchangeInfoContainer getCurrentInterchange();
    GroupInfoContainer getCurrentGroup();
    TransactionSetInfoContainer getCurrentTransactionSet();
}
