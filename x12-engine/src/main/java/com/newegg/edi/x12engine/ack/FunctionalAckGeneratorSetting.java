/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.ack;

/**
 *
 * @author mm67
 */
public class FunctionalAckGeneratorSetting {
        
    /**
     * Set to true to generate AK2 loop for accepted TS
     * Default value is false, AK2 loop should be generated only
     * if the AK501 is not A (Accept).
     */
    private boolean generateAK2LoopForAcceptedTS;
    
    private long maximumTSControlNumber;
    
    private long minimumTSControlNumber;
    
    private int controlNumberLength;
        

    /**
     * @return the generateAK2LoopForAcceptedTS
     */
    public boolean isGenerateAK2LoopForAcceptedTS() {
        return generateAK2LoopForAcceptedTS;
    }

    /**
     * @param generateAK2LoopForAcceptedTS the generateAK2LoopForAcceptedTS to set
     */
    public void setGenerateAK2LoopForAcceptedTS(boolean generateAK2LoopForAcceptedTS) {
        this.generateAK2LoopForAcceptedTS = generateAK2LoopForAcceptedTS;
    }

    /**
     * @return the maximumTSControlNumber
     */
    public long getMaximumTSControlNumber() {
        return maximumTSControlNumber;
    }

    /**
     * @param maximumTSControlNumber the maximumTSControlNumber to set
     */
    public void setMaximumTSControlNumber(long maximumTSControlNumber) {
        this.maximumTSControlNumber = maximumTSControlNumber;
    }

    /**
     * @return the minimumTSControlNumber
     */
    public long getMinimumTSControlNumber() {
        return minimumTSControlNumber;
    }

    /**
     * @param minimumTSControlNumber the minimumTSControlNumber to set
     */
    public void setMinimumTSControlNumber(long minimumTSControlNumber) {
        this.minimumTSControlNumber = minimumTSControlNumber;
    }

    /**
     * @return the controlNumberLength
     */
    public int getControlNumberLength() {
        return controlNumberLength;
    }

    /**
     * @param controlNumberLength the controlNumberLength to set
     */
    public void setControlNumberLength(int controlNumberLength) {
        this.controlNumberLength = controlNumberLength;
    }
    
}
