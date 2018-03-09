/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.events;

import com.newegg.edi.x12engine.common.X12MetaData;
import com.newegg.edi.x12engine.events.AbstractEvent;
import com.newegg.edi.x12engine.parsing.X12ReaderContext;

/**
 *
 * @author mm67
 */
public abstract class X12ReaderEvent extends AbstractEvent {
    private X12MetaData metaData;
    private X12ReaderContext ctx;
    
    protected X12ReaderEvent(X12ReaderContext ctx){
        this.metaData = ctx.getMetaData();
        this.ctx = ctx;
    }

    /**
     * @return the metaData
     */
    public X12MetaData getMetaData() {
        return metaData;
    }

    /**
     * @param metaData the metaData to set
     */
    public void setMetaData(X12MetaData metaData) {
        this.metaData = metaData;
    }

    /**
     * @return the setting
     */
    public X12ReaderContext getCtx() {
        return ctx;
    }

    /**
     * @param ctx
     */
    public void setCtx(X12ReaderContext ctx) {
        this.ctx = ctx;
    }
        
}
