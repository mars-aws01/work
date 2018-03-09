/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.parsing;

/**
 *
 * @author mm67
 */
public class X12ReaderSetting {
    private final String encoding;
    private final String inputFilePath;
    
    public X12ReaderSetting(String encoding, String x12FilePath){
        this.encoding = encoding;
        this.inputFilePath = x12FilePath;
    }
    
    /**
     * @return the encoding
     */
    public String getEncoding() {
        return encoding;
    }

    /**
     * @return the inputFilePath
     */
    public String getInputFilePath() {
        return inputFilePath;
    }
}
