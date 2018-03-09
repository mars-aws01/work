/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.events;

import com.newegg.edi.x12engine.disassemble.DisassembleContext;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultContainer;

/**
 *
 * @author mm67
 */
public class DisassembleResultReportEvent extends DisassembleEvent {
    private final ValidationResultContainer result;
    
    public DisassembleResultReportEvent(
        DisassembleContext ctx,
        ValidationResultContainer resultReport){
        
        super(ctx);
        result = resultReport;
    }

    /**
     * @return the result
     */
    public ValidationResultContainer getResult() {
        return result;
    }
}
