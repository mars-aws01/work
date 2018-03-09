/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.events;

import com.newegg.edi.x12engine.events.EventHandler;

/**
 *
 * @author mm67
 * @param <TEvent> the DisassembleEvent or its subclass
 */
public interface DisassembleEventHandler<TEvent extends DisassembleEvent> 
    extends EventHandler<TEvent> {
    
}
