package com.newegg.edi.x12engine.assemble.events;

import com.newegg.edi.x12engine.assemble.AssembleContext;

public class AssembleEvent {
    private final AssembleContext ctx;

    public AssembleEvent(AssembleContext ctx){
        this.ctx = ctx;
    }

    /**
     * @return the X12DisassemblerContext
     */
    public AssembleContext getCtx() {
        return ctx;
    }
}
