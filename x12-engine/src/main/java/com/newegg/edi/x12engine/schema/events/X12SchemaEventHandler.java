/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema.events;

import com.newegg.edi.x12engine.exceptions.X12EngineException;

/**
 *
 * @author mm67
 * @param <TEvent>
 */
public interface X12SchemaEventHandler<TEvent> {
    void onEventFired(TEvent e) throws X12EngineException;
}
