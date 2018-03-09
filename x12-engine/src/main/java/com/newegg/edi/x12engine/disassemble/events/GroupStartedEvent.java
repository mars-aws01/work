/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.events;

import com.newegg.edi.x12engine.common.Group;
import com.newegg.edi.x12engine.parsing.X12ReaderContext;

/**
 *
 * @author mm67
 */
public class GroupStartedEvent extends X12ReaderEvent  {
    
    private final Group group;
        
    public GroupStartedEvent(X12ReaderContext ctx, Group startedGroup) {
        super(ctx);
        this.group = startedGroup;
    }

    /**
     * @return the group
     */
    public Group getGroup() {
        return group;
    }
    
}
