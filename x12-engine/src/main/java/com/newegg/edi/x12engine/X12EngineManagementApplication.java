/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine;

import com.newegg.edi.x12engine.cfg.X12EngineConfiguration;
import io.dropwizard.Application;
import io.dropwizard.setup.Bootstrap;
import io.dropwizard.setup.Environment;

/**
 *
 * @author mm67
 */
public class X12EngineManagementApplication extends Application<X12EngineConfiguration> {
        
    
    @Override
    public String getName() {
        return "x12-engine-management";
    }
    
    @Override
    public void initialize(Bootstrap<X12EngineConfiguration> bootstrap) {
        // nothing to do yet
    }

    @Override
    public void run(X12EngineConfiguration cfg, Environment env) throws Exception {
        // Not implemeneted yet.
    }
}
