/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import java.io.FileNotFoundException;
import java.io.InputStream;

/**
 *
 * @author mm67
 */
public interface InputStreamFactory {
    InputStream buildInputStream(String filePath) throws FileNotFoundException;
}
