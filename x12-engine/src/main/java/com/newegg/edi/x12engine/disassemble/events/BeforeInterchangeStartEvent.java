/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.events;

import com.newegg.edi.x12engine.parsing.X12ReaderContext;

/**
 *
 * @author mm67
 */
public class BeforeInterchangeStartEvent extends X12ReaderEvent {
    
    public BeforeInterchangeStartEvent(X12ReaderContext ctx){
        super(ctx);
    }
}
