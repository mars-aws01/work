/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;
 
import java.util.HashMap;
import java.util.Map;
import java.util.function.Supplier;

/**
 *
 * @author mm67
 */
public final class InstanceManager {
    
    private static final Map<Class<?>, Object> 
            instancePool = new HashMap<>();
    
    private static final Map<Class<?>, Supplier<?>> 
            instanceSupplierPool = new HashMap<>();
    
    public static <E> void registerBuilder(Class<E> clazz, Supplier<E> supplier) 
            throws ClassNotFoundException{
       
        instanceSupplierPool.put(clazz, supplier);
    }  
    
    public static <E> void register(Class<E> clazz, E instance){
        instancePool.put(clazz, instance);
    }
    
    public static <E> void reset(Class<E> clazz){
        if(instancePool.containsKey(clazz)){
            instancePool.remove(clazz);
        }
    }
    
    public static <E> E getInstance(Class<E> clazz){
        
        if(instancePool.containsKey(clazz)){
            return (E)instancePool.get(clazz);
        }
        
        if(!instanceSupplierPool.containsKey(clazz)){
            return null;
        }
        
        Object value = instanceSupplierPool.get(clazz).get();
        
        instancePool.put(clazz, value);
        
        return (E)value;
    }
}
