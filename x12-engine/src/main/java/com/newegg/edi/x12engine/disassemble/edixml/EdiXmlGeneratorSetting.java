/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.edixml;

/**
 *
 * @author mm67
 */
public class EdiXmlGeneratorSetting {
        
    private String encoding;
    private String documentRoot;
    private String outputLocation;
         
    public EdiXmlGeneratorSetting(){
        encoding = "utf-8";        
    }

    public String getEncoding() {
        return encoding;
    }

    /**
     * @param encoding the encoding to set
     */
    public void setEncoding(String encoding) {
        this.encoding = encoding;
    }

    /**
     * Get the document root element name for the generated EDI XML, it was retrieved
     * from the corresponding X12SchemaDefinition.
     * @return the documentRoot
     */
    public String getDocumentRoot() {
        return documentRoot;
    }

    /**
     * Set the document root element name for the generated EDI XML, it was retrieved
     * from the corresponding X12SchemaDefinition.
     * @param documentRoot the documentRoot to set
     */
    public void setDocumentRoot(String documentRoot) {
        this.documentRoot = documentRoot;
    }

    /**
     * @return the outputLocation
     */
    public String getOutputLocation() {
        return outputLocation;
    }

    /**
     * @param outputLocation the outputLocation to set
     */
    public void setOutputLocation(String outputLocation) {
        this.outputLocation = outputLocation;
    }
}
