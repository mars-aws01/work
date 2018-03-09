/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import java.util.Locale;
import java.util.regex.Pattern;

/**
 *
 * @author mm67
 */
public final class StringExtension {
    /*
    This is an extension class, so no instance is needed.
    */
    private StringExtension(){}
    
    public static boolean isNullOrEmpty(String s){
        return s==null || s.length()==0;
    }
    
    public static boolean isNullOrWhitespace(String s){
        return isNullOrEmpty(s) || isWhitespace(s);
    }
    
    public static boolean isWhitespace(String s){
        if(isNullOrEmpty(s)) return false;
        int length = s.length();
        for(int i=0;i<length;i++){
            if(!Character.isWhitespace(s.charAt(i))) return false;
        }
        
        return true;
    }
    
    public static final String EMPTY_STRING = "";
    
    public static String trimNullSafe(String value){
        if(null == value) return value;
        return value.trim();
    }
    
    public static String toUpperCase(String value){
        String trimedValue = trimNullSafe(value);
        if(null == trimedValue) return null;
        
        return trimedValue.toUpperCase(Locale.ROOT);
    }
    
     public static String toLowerCase(String value){
        String trimedValue = trimNullSafe(value);
        if(null == trimedValue) return null;
        
        return trimedValue.toLowerCase(Locale.ROOT);
    }
    
    public static String[] split(String value, String separator){
        if(value == null){
            return new String[0];
        }
        
        final int KEEP_EMPTY_ENTRIES = -1;
        
        // The first parameter of the method String.split(String regex, int limit)
        // is a regular expression, so we must use Pattern.quote(regex) to make
        // sure when the special characters reserved in regex will be quoted before
        // perfom the split operation. For example, use \ as the separator, which 
        // will cause error, but will work if it was quoted.        
        return value.split(Pattern.quote(separator), KEEP_EMPTY_ENTRIES);
    }
}
