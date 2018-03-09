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
public class InvalidX12FormatException extends X12EngineException {

    public InvalidX12FormatException() {
        super("The X12 file is invalid.");
    }

    public InvalidX12FormatException(String message) {
        super(message);
    }    
}
