/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.events;

import com.newegg.edi.x12engine.common.SegmentData;
import com.newegg.edi.x12engine.parsing.X12ReaderContext;

/**
 *
 * @author mm67
 */
public class SegmentDataExtractedEvent extends X12ReaderEvent  {
    
    private final SegmentData segment;
        
    public SegmentDataExtractedEvent(
            X12ReaderContext ctx, 
            SegmentData segment) {
        super(ctx);
        this.segment = segment;
    }

    /**
     * @return the segment
     */
    public SegmentData getSegment() {
        return segment;
    }    
}
