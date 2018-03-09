/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

import java.io.Serializable;

/**
 *
 * @author mm67
 */
public class X12MetaData implements Serializable {
    
    private char elementDelimiter;
    private char segmentTerminator;
    private SegmentTerminatorSuffixType segmentTerminatorSuffix;
    private InterchangeHeader isaHeader;
    private String componentElementSeparator;
    
    /**
     * @return the segmentTerminator
     */
    public char getSegmentTerminator() {
        return segmentTerminator;
    }

    /**
     * @param segmentTerminator the segmentTerminator to set
     */
    public void setSegmentTerminator(char segmentTerminator) {
        this.segmentTerminator = segmentTerminator;
    }

    /**
     * @return the elementDelimiter
     */
    public char getElementDelimiter() {
        return elementDelimiter;
    }

    /**
     * @param elementDelimiter the elementDelimiter to set
     */
    public void setElementDelimiter(char elementDelimiter) {
        this.elementDelimiter = elementDelimiter;
    }

    /**
     * @return the segmentTerminatorSuffix
     */
    public SegmentTerminatorSuffixType getSegmentTerminatorSuffix() {
        return segmentTerminatorSuffix;
    }

    /**
     * @param segmentTerminatorSuffix the segmentTerminatorSuffix to set
     */
    public void setSegmentTerminatorSuffix(SegmentTerminatorSuffixType segmentTerminatorSuffix) {
        this.segmentTerminatorSuffix = segmentTerminatorSuffix;
    }

    /**
     * @return the isaHeader
     */
    public InterchangeHeader getIsaHeader() {
        return isaHeader;
    }

    /**
     * @param isaHeader the isaHeader to set
     */
    public void setIsaHeader(InterchangeHeader isaHeader) {
        this.isaHeader = isaHeader;
    }

    /**
     * @return the componentElementSeparator
     */
    public String getComponentElementSeparator() {
        return componentElementSeparator;
    }

    /**
     * @param componentElementSeparator the componentElementSeparator to set
     */
    public void setComponentElementSeparator(String componentElementSeparator) {
        this.componentElementSeparator = componentElementSeparator;
    }
    
}
