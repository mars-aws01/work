/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema.events;

import com.newegg.edi.x12engine.schema.Loop;
import java.util.function.Consumer;

/**
 *
 * @author mm67
 */
public class IterationCompletedEvent {
    private final Loop loop;    
    private boolean continueLoop;
    
    public IterationCompletedEvent(Loop theLoop){
        this.loop = theLoop;
    }

    /**
     * @return the loop
     */
    public Loop getLoop() {
        return loop;
    }
 
    public boolean isContinueLoop() {
        return continueLoop;
    }

    public void setContinueLoop(boolean shouldContinue) {
        this.continueLoop = shouldContinue;
    }
}
