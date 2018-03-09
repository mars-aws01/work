/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.util.CollectionExtension;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.function.Supplier;

/**
 *
 * @author mm67
 */
public final class ReferenceCodeCache {
    private static final HashMap<String, HashSet<String>> referenceCodePool = new 
        HashMap<>();
    
    
    public static void put(String key, List<String> codes){        
        if(CollectionExtension.isEmpty(codes)) {
            return;
        }
        
        referenceCodePool.putIfAbsent(key, new HashSet(codes));
    }
    
    public static void put(String key, HashSet codeSet){
        referenceCodePool.putIfAbsent(key, codeSet);
    }
    
    public static HashSet get(String key){
        return referenceCodePool.getOrDefault(key, null);
    }
    
    public static HashSet getOrAdd(String key, Supplier<List<String>> codesSupplier){
        
        HashSet codeSet = referenceCodePool.getOrDefault(key, null);
        
        if(null != codeSet){
            return codeSet;
        }
        
        if(null == codesSupplier) {
            return null;
        }
        
        List<String> codes = codesSupplier.get();
        if(CollectionExtension.isEmpty(codes)){
            return null;
        }
        
        codeSet = new HashSet(codes);        
        referenceCodePool.putIfAbsent(key, codeSet);
        
        return codeSet;
    }
    
    public static void clear(){
        referenceCodePool.clear();
    }
}
