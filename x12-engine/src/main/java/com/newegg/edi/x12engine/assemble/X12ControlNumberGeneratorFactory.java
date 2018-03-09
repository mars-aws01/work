package com.newegg.edi.x12engine.assemble;

import com.newegg.edi.x12engine.common.X12Profile;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

public class X12ControlNumberGeneratorFactory implements ControlNumberGeneratorFactory {

    @Override
    public ControlNumberGenerator getGenerator(ControlNumberGeneratorType generatorType,
                                               int length) {
        throw new NotImplementedException();
    }
}
