/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.edixml;

import com.newegg.edi.x12engine.exceptions.X12EngineException;

/**
 * The general EDI XML generator interface, defines the common methods for 
 * creating EDI XML.
 * @author mm67
 */
public interface EdiXmlGenerator {
     
    EdiXmlGeneratorSetting getSetting(); 
    
    void createDocument(
            String transactionSetType, 
            String transactionSetControlNumber) throws X12EngineException;    
    
    void writeStartElement(String name) throws X12EngineException;
    void writeElementWithText(String name, String text) throws X12EngineException;
    <T> void writeElementWithValue(String name, T value) throws X12EngineException;
    void closeElement() throws X12EngineException;    
    void closeDocument() throws X12EngineException;
    void saveDocument() throws X12EngineException;
}
