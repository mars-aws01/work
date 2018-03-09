/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine;

import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import com.newegg.edi.x12engine.util.ArgumentContainer;
import com.newegg.edi.x12engine.util.CommandLineArgumentsParser;

/**
 *
 * @author mm67
 */
public final class Launcher {

    private final Logger logger = LoggerBuilder.getLogger("LUNCHR");
    
    private void displayLogo() {
        
        logger.info("X12 Engine version 1.0.0 (C) Copyright Newegg Inc. 2017"); 
    }  
    
    public static void main(String[] args) throws Exception {
        Launcher launcher = new Launcher();
        
        launcher.displayLogo();
        
        ArgumentContainer argumentContainer = CommandLineArgumentsParser.parse(args);
        
        launcher.start(argumentContainer); 
    }

    private void start(ArgumentContainer argumentContainer) throws Exception {
         
        // If the argument of starting this container is to process local task
        // we should not start the management API.
        if(!argumentContainer.isLocalTaskArgumentSpecified()){
            
            String[] dropWizardArguments = 
                argumentContainer.buildDropwizardArguments();

            new X12EngineManagementApplication().run(dropWizardArguments);
            
        } else {
            
            logger.info(
                "The local task process requested, management API disabled.");
        }
        
        logger.info("Starting X12 Engine ...");
                
        new X12EngineProcess(argumentContainer).start();
    }    
}
