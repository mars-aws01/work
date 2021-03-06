/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.events;

import com.newegg.edi.x12engine.common.Interchange;
import com.newegg.edi.x12engine.parsing.X12ReaderContext;

/**
 *
 * @author mm67
 */
public class InterchangeStartedEvent extends X12ReaderEvent {
    
    private final Interchange interchange;
    
    public InterchangeStartedEvent(
            X12ReaderContext ctx, 
            Interchange interchange){
        
        super(ctx);        
        this.interchange = interchange;
    }
    
    public Interchange getInterchange(){
        return this.interchange;
    }
}
