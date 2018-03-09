package com.newegg.edi.x12engine.common;

import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *
 * @author mm67
 */
public abstract class ContextBase implements Logger {
     protected Logger logger = null;
     
     protected ContextBase(String module){
         logger = LoggerBuilder.getLogger(module);
     }
     
     /**
     * @return the logger
     */
    public Logger getLogger() {
        return logger;
    } 
    
    @Override
    public void info(String message){
        logger.info(message);
    }
    
    @Override
    public void info(String messageFormat, Object... values){
        logger.info(messageFormat, values);
    }
    
    @Override
    public void warn(String message){
        logger.warn(message);
    }
    
    @Override
    public void warn(String messageFormat, Object... values){
        logger.warn(messageFormat, values);
    }
    
    @Override
    public void error(String message){
        logger.error(message);
    }
    
    @Override
    public void error(String messageFormat, Object... values){
        logger.error(messageFormat, values);
    }
    
    @Override
    public void debug(String message){
        logger.debug(message);
    }
    
    @Override
    public void debug(String messageFormat, Object... values){
        logger.debug(messageFormat, values);
    }
    
    @Override
    public void error(Throwable e){
        logger.error(e);
    }
    
    @Override
    public String getLastMessage(){
        return logger.getLastMessage();
    }
}
