/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema.events;

import com.newegg.edi.x12engine.schema.X12SegmentDefinition;
import com.newegg.edi.x12engine.util.CollectionExtension;

/**
 *
 * @author mm67
 */
public class BeforeLoopStartEvent {
    private final X12SegmentDefinition segmentDefinition;    
    private boolean skipThisLoop;
    
    public BeforeLoopStartEvent(X12SegmentDefinition theLoopDef){
        this.segmentDefinition = theLoopDef;
    }

    /**
     * @return the loop
     */
    public X12SegmentDefinition getX12SegmentDefinition() {
        return segmentDefinition;
    }

    /**
     * @return the skipThisLoop
     */
    public boolean isSkipThisLoop() {
        return skipThisLoop;
    }

    /**
     * Set true to skip this loop
     * @param skipThisLoop the skipThisLoop to set
     */
    public void setSkipThisLoop(boolean skipThisLoop) {
        this.skipThisLoop = skipThisLoop;
    }
    
    public String getLoopStartSegment(){
        if(CollectionExtension.isEmpty(this.getX12SegmentDefinition().getSegments())){
            return null;
        }
        
        X12SegmentDefinition segDef = this.getX12SegmentDefinition().getSegments().get(0);
        
        return segDef.getName();
    }
}
