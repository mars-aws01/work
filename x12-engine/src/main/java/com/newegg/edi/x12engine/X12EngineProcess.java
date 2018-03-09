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
public final class X12EngineProcess {
    
    private final ArgumentContainer arguments;
    
    public X12EngineProcess(ArgumentContainer args){
        arguments = args;
    }
          
    //private final Logger logger = LoggerBuilder.getLogger("X12EPR");
    
    public void start(){
        
        TaskProcessor processor =
            new TaskProcessorBuilder().buildTaskProcessor(arguments);
        
        processor.Process(arguments);        
    }
}
