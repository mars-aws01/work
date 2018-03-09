/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.events;

/**
 * The general EventHandler interface
 * @author mm67
 * @param <T> The Event class
 */
@FunctionalInterface
public interface EventHandler<T> {    
    void onEventFired(T e);
}
