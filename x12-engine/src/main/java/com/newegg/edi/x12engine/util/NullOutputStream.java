/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import java.io.IOException;
import java.io.OutputStream;

/**
 *
 * @author mm67
 */
public class NullOutputStream extends OutputStream {

    @Override
    public void write(int b) throws IOException {
        // DO NOTHING
    }
    
}
