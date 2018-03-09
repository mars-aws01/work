/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import java.util.regex.Pattern;

/**
 *
 * @author mm67
 */
public final class RegexMatcher {
    
    private RegexMatcher(){
        
    }
    
    /**
     * Match value with given pattern, return true if matches
     * Pattern will be cached (TBD)
     * @param pattern
     * @param value
     * @return 
     */
    public static boolean matches(String pattern, String value){
        return Pattern.matches(pattern, value);
    }
}
