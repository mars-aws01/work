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
public class LoggerBuilder {
     
    public static Logger getLogger(String module){
        return new ConsoleLogger(module);
    }
}
