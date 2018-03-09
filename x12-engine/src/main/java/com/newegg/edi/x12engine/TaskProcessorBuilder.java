/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine;

import com.newegg.edi.x12engine.util.ArgumentContainer;

/**
 *
 * @author mm67
 */
public class TaskProcessorBuilder {
    
    public TaskProcessor buildTaskProcessor(ArgumentContainer argumentContainer){
        if(argumentContainer.isLocalTaskArgumentSpecified()){
            return new LocalTaskProcessor();
        }
        
        return new GeneralTaskProcessor();
    }
}
