/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import java.util.HashMap; 

/**
 *
 * @author mm67
 */
public class ArgumentContainer {
    
    public final static String LOCAL_TASK_ARGUMENT = "local-task";
    
    private final HashMap<String, String> argumentsPool = 
        new HashMap<>();

    public String[] buildDropwizardArguments() {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
     
    public int size(){
        return argumentsPool.size();
    }

    void add(String argName, String argValue) {
        argumentsPool.put(argName, argValue);
    }

    public boolean contains(String argName) {
        return argumentsPool.containsKey(argName);
    }
 
    public String getArgumentValue(String argumentName) {
        return argumentsPool.get(argumentName).trim();
    }
    
    public String getArgumentValue(String argumentName, String defaultValue) {
        
        if(!contains(argumentName)){
            return defaultValue;
        }
        
        String value = argumentsPool.get(argumentName);
        
        if(StringExtension.isNullOrEmpty(value)){
            return defaultValue;
        }
        
        return value.trim();
    }
    
    public boolean isLocalTaskArgumentSpecified(){
        return this.contains(LOCAL_TASK_ARGUMENT);
    }
}
