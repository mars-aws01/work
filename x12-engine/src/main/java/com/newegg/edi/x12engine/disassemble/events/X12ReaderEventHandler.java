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
 * @param <TEvent> The event data while will be specified while firing up this 
 * event
 */
public interface X12ReaderEventHandler<TEvent extends X12ReaderEvent>
    extends EventHandler<TEvent> {
    
}
