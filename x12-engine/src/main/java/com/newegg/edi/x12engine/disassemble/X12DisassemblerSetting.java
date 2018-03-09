/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble;

/**
 *
 * @author mm67
 */
public class X12DisassemblerSetting { 
    
    private boolean generateElementWithEmptyValue; 
    private boolean performEdiSchemaValidation;
    
    public X12DisassemblerSetting(){
        
        // By default, EDI schema validation is enabled.
        performEdiSchemaValidation = true;
    }

    /**
     * @return the generateElementWithEmptyValue
     */
    public boolean isGenerateElementWithEmptyValue() {
        return generateElementWithEmptyValue;
    }

    /**
     * Set to true to generate XML element with <TD103></TD103>
     * @param value the generateElementWithEmptyValue to set
     */
    public void setGenerateElementWithEmptyValue(boolean value) {
        this.generateElementWithEmptyValue = value;
    }

    /**
     * @return the performEdiSchemaValidation
     */
    public boolean isPerformEdiSchemaValidation() {
        return performEdiSchemaValidation;
    }

    /**
     * @param performEdiSchemaValidation the performEdiSchemaValidation to set
     */
    public void setPerformEdiSchemaValidation(boolean performEdiSchemaValidation) {
        this.performEdiSchemaValidation = performEdiSchemaValidation;
    }
 
}
