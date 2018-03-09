package com.newegg.edi.x12engine.assemble.events;

import com.newegg.edi.x12engine.events.EventHandler;

public interface AssembleEventHandler <TEvent extends AssembleEvent>
        extends EventHandler<TEvent> {
}
