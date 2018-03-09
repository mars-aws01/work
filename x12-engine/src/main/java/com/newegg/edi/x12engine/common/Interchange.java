/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

/**
 *
 * @author mm67
 */
public class Interchange implements InterchangeInfoContainer {
    private final InterchangeHeader header;
 
    private SegmentData closeSegment;
    
    public Interchange(InterchangeHeader header){
        this.header = header; 
    }     

    /**
     * @return the header
     */
    public InterchangeHeader getHeader() {
        return header;
    }

    public void setIEASegment(SegmentData closeInterchangeSegment) {
        this.setCloseSegment(closeInterchangeSegment);
    }

    /**
     * @return the closeSegment
     */
    public SegmentData getCloseSegment() {
        return closeSegment;
    }

    /**
     * @param closeSegment the closeSegment to set
     */
    public void setCloseSegment(SegmentData closeSegment) {
        this.closeSegment = closeSegment;
    }

    @Override
    public String getControlVersion() {
        return header.getControlVersion();
    }

    @Override
    public String getInterchangeControlNumber() {
        return header.getInterchangeControlNumber();
    }

    @Override
    public String getReceiverId() {
        return header.getReceiverId();
    }

    @Override
    public String getReceiverIdQualifier() {
        return header.getReceiverIdQualifier();
    }

    @Override
    public String getSenderId() {
        return header.getSenderId();
    }

    @Override
    public String getSenderIdQualifier() {
        return header.getSenderIdQualifier();
    }
}
