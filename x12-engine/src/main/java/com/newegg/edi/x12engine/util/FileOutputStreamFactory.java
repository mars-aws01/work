/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;

/**
 *
 * @author mm67
 */
public class FileOutputStreamFactory implements OutputStreamFactory {

    @Override
    public OutputStream getOutputStream(
        String outputFilePath) throws IOException {
         
        return new BufferedOutputStream(
            new FileOutputStream(new File(outputFilePath))
        ); 
    }
}
