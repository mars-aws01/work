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
public class ArgumentException extends X12EngineException {
    public ArgumentException(String parameterName) {
        super(String.format("The parameter %s is invalid.", parameterName));
    }
}
