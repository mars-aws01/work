/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.exceptions.validation.X12SchemaValidationException;

/**
 *
 * @author mm67
 */
public interface ValidationResultCollector {
    
    void collect(ValidationResultEntryProvider entry);
    
    void collectException(X12SchemaValidationException ex);
}
