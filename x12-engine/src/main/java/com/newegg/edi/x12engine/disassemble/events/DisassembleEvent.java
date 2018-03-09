/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.events;

import com.newegg.edi.x12engine.disassemble.DisassembleContext;
import com.newegg.edi.x12engine.events.AbstractEvent;

/**
 *
 * @author mm67
 */
public class DisassembleEvent extends AbstractEvent {
    private final DisassembleContext ctx;
    
    public DisassembleEvent(DisassembleContext ctx){
        this.ctx = ctx;
    }

    /**
     * @return the X12DisassemblerContext
     */
    public DisassembleContext getCtx() {
        return ctx;
    }
}
