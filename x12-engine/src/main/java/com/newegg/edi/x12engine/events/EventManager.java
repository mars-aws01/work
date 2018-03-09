/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.events;

import java.util.function.Supplier;

/**
 * The EventManager provide functionality to support firing up event in different ways
 * @author mm67
 */
public final class EventManager {
    
    private EventManager(){
        
    }
    
    public static <T extends AbstractEvent> void fireEvent(T event,
            Supplier<EventHandler<T>> handlerSupplier){
        if(null == handlerSupplier) return;
        fireEvent(event, handlerSupplier.get(), null);
    }
    
    public static <T extends AbstractEvent> void fireEvent(
            T event, 
            Supplier<EventHandler<T>> handlerSupplier,
            Runnable actionBeforeFireUpEvent){
        if(null == handlerSupplier) return;
        
        fireEvent(event, handlerSupplier.get(), actionBeforeFireUpEvent);
    }
    
    public static <T extends AbstractEvent> void fireEvent(
            T event,
            EventHandler<T> handler){
        
        fireEvent(event, handler, null);
    }
        
    public static <T extends AbstractEvent> void fireEvent(
            T event,
            EventHandler<T> handler,
            Runnable actionBeforeFireUpEvent){
        if(null == handler) return;
        if(null != actionBeforeFireUpEvent){
            actionBeforeFireUpEvent.run();
        }
        
        handler.onEventFired(event);
    }
}
