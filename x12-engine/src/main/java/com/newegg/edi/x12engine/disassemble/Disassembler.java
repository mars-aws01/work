/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble;

import com.newegg.edi.x12engine.disassemble.events.DisassembleEventHandler;
import com.newegg.edi.x12engine.disassemble.events.DisassembleResultReportEvent;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import java.io.Closeable;

/**
 *
 * @author mm67
 */
public interface Disassembler extends Closeable{

    void execute() throws X12EngineException;

    /**
     * @return the resultReportEventHanlder
     */
    DisassembleEventHandler<DisassembleResultReportEvent> getResultReportEventHanlder();

    void initialize();

    /**
     * @param resultReportEventHanlder the resultReportEventHanlder to set
     */
    void setResultReportEventHanlder(
        DisassembleEventHandler<DisassembleResultReportEvent> resultReportEventHanlder);
    
}
