/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

import com.newegg.edi.x12engine.exceptions.X12EngineException;

/**
 *
 * @author mm67
 */
public class Group extends SegmentData implements GroupInfoContainer {
    
    private SegmentData closeSegment;
    
    private final Interchange parentInterchange;
    
    public Group(
            X12MetaData metaData, 
            Interchange interchange, 
            String segmentData) 
            throws X12EngineException{
        super(metaData,segmentData);
        
        this.parentInterchange = interchange;
    }
    
    public Group(Interchange interchange, SegmentData segment){
        super(segment);
        
        this.parentInterchange = interchange;
    }
    
    /*
    GS01 
    */
    @Override
    public String getFunctionalIdentifierCode(){
        return this.getDataElement(X12Standard.GS01);
    }
    
    /*
    GS02
    */
    @Override
    public String getSenderId(){
        return this.getDataElement(X12Standard.GS02);
    }
    
    /*
    GS03
    */
    @Override
    public String getReceiverId(){
        return this.getDataElement(X12Standard.GS03);
    }
    
    /*
    GS04
    */
    public String getDate(){
        return this.getDataElement(X12Standard.GS04);
    }
    
    /*
    GS05
    */
    public String getTime(){
        return this.getDataElement(X12Standard.GS05);
    }
    
    /*
    GS06
    */
    @Override
    public String getGroupControlNumber(){
        return this.getDataElement(X12Standard.GS06);
    }
    
    @Override
    public String getControlVersion(){
        return this.getDataElement(X12Standard.GS08);
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
    public String toString(){
        return String.format("Group:(FIC:%s Ctrl#:%s Ver:%s SenderID:%s ReceiverID:%s)", 
                this.getFunctionalIdentifierCode(),
                this.getGroupControlNumber(),
                this.getControlVersion(),
                this.getSenderId(),
                this.getReceiverId());
    }

    /**
     * @return the parentInterchange
     */
    public Interchange getParentInterchange() {
        return parentInterchange;
    }
}
