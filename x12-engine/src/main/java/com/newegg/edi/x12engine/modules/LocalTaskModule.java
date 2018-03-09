/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.modules;

import com.google.inject.AbstractModule;
import com.newegg.edi.x12engine.parsing.X12Reader;
import com.newegg.edi.x12engine.parsing.X12StreamReader;

/**
 *
 * @author mm67
 */
public class LocalTaskModule extends AbstractModule{

    @Override
    protected void configure() {
        bind(X12StreamReader.class).to(X12Reader.class);
        
    }
    
}
