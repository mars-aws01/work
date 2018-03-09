package com.newegg.edi.x12engine.assemble;


import com.newegg.edi.x12engine.common.X12Profile;

public interface ControlNumberGeneratorFactory {
    ControlNumberGenerator getGenerator(
            ControlNumberGeneratorType generatorType,
            int length);
}
