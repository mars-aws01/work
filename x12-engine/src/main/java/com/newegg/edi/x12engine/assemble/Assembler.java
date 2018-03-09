package com.newegg.edi.x12engine.assemble;

import com.newegg.edi.x12engine.exceptions.X12EngineException;

import java.io.Closeable;

public interface Assembler extends Closeable {

    void execute() throws X12EngineException;

    void initialize();
}
