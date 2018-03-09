/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.logging;

import com.newegg.edi.x12engine.GlobalSetting;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 *
 * @author mm67
 */
public class ConsoleLogger implements Logger {

    public static final String TYPE_INFO = "INFO";
    public static final String TYPE_WARN = "WARN";
    public static final String TYPE_EROR = "EROR";
    public static final String TYPE_DBUG = "DBUG";
    
    private final String module;
    
    private final SimpleDateFormat dateTimeFormatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
    
    private String theLastMessage;
    
    public ConsoleLogger(String moduleCode){
        this.module = moduleCode;
    }
    
    private String getCurrentDateTimeString(){
        return dateTimeFormatter.format(new Date());
    }
    
    private void writeMessageToConsole(String type, String message){
        
        theLastMessage = message;
        
        String content = String.format("[%s] [%s] [%s] %s",                                 
                getCurrentDateTimeString(),
                type,
                module,
                message);
        
        System.out.println(content);
    }
    
    @Override
    public void info(String message) {
        writeMessageToConsole(TYPE_INFO, message);
    }
    
    @Override
    public void info(String messageFormat, Object... values){
        info(String.format(messageFormat, values));
    }

    @Override
    public void warn(String message) {
        writeMessageToConsole(TYPE_WARN, message);
    }
    
    @Override
    public void warn(String messageFormat, Object... values){
        warn(String.format(messageFormat, values));
    }

    @Override
    public void error(String message) {
        writeMessageToConsole(TYPE_EROR, message);
    }
    
    @Override
    public void error(String messageFormat, Object... values){
        error(String.format(messageFormat, values));
    }

    @Override
    public void debug(String message) {                
        if(isDebugLogEnabled()){
            writeMessageToConsole(TYPE_DBUG, message);
        }
    }
    
    private boolean isDebugLogEnabled(){
        return GlobalSetting.getInstance().isDebugLogEnabled();
    }
    
    @Override
    public void debug(String messageFormat, Object... values){
        if(isDebugLogEnabled()){
            debug(String.format(messageFormat, values));
        }
    }
    
    @Override
    public void error(Throwable e){
        error(e.getMessage());
        warn(">>StackTrace:");
        for(StackTraceElement trace : e.getStackTrace()){
            warn("\t" + trace.toString());
        }
    }
    
    @Override
    public String getLastMessage(){
        return theLastMessage;
    }
}
