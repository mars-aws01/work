/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.logging;

/**
 *
 * @author mm67
 */
public interface Logger {
    void info(String message);
    void info(String messageFormat, Object... values);
    void warn(String message); 
    void warn(String messageFormat, Object... values);
    void error(String message);
    void error(String messageFormat, Object... values);
    void debug(String message);
    void debug(String messageFormat, Object... values); 
    void error(Throwable e);
    String getLastMessage();
}
