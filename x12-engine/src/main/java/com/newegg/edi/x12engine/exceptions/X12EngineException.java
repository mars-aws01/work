/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.exceptions;

/**
 *
 * @author mm67
 */
public class X12EngineException extends Exception{
    
    public X12EngineException(String message) {
        super(message);
    }
     
    public  X12EngineException(String message, Throwable innerException){
        super(message, innerException);
    }

    public X12EngineException(Throwable innerException) {
        super(innerException);
    }
}
