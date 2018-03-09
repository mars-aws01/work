/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.ack;

import com.newegg.edi.x12engine.assemble.ControlNumberGenerator;
import com.newegg.edi.x12engine.disassemble.edixml.EdiXmlGenerator; 

/**
 *
 * @author mm67
 */
public class FunctionalAckGenerationContext {
    private final EdiXmlGenerator ediXmlGenerator;
    private final ControlNumberGenerator controlNumberGenerator;
    private String documentRoot;
    private int segmentCount;
    
    public FunctionalAckGenerationContext(
        EdiXmlGenerator ediXmlGenerator,
        ControlNumberGenerator controlNumberGenerator){
        this.ediXmlGenerator = ediXmlGenerator;        
        this.controlNumberGenerator = controlNumberGenerator;
    }
 

    /**
     * @return the documentRoot
     */
    public String getDocumentRoot() {
        return documentRoot;
    }

    /**
     * @param documentRoot the documentRoot to set
     */
    public void setDocumentRoot(String documentRoot) {
        this.documentRoot = documentRoot;
    }

    /**
     * @return the controlNumberGenerator
     */
    public ControlNumberGenerator getControlNumberGenerator() {
        return controlNumberGenerator;
    }

    /**
     * @return the ediXmlGenerator
     */
    public EdiXmlGenerator getEdiXmlGenerator() {
        return ediXmlGenerator;
    }

    public int getSegmentCount() {
        return segmentCount;
    }
    
    public void increaseSegmentCount(){
        segmentCount++;
    }

    public void resetSegmentCount() {
        segmentCount = 0;
    }
}
