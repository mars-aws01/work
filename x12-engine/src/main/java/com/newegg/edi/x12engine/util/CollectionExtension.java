/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import java.util.Collection; 
import java.util.List;
import java.util.function.Consumer;

/**
 *
 * @author mm67
 */
public final class CollectionExtension {
    
    private CollectionExtension(){}
    
    public static boolean isEmpty(Collection<?> list){
        if(null == list) return true;
        return list.isEmpty();
    }
    
    public static boolean isNotEmpty(Collection<?> list){
        return !isEmpty(list);
    }
    
    /**
     * Access the "list" in a reversed order, by the given action "consumer", 
     * if the consumer is null, the list will not be touched.
     * @param <E> The type of the element in the list
     * @param list The list
     * @param consumer The action which you whish to taken on each element
     */
    public static <E> void reverseAccess(List<E> list, Consumer<E> consumer){
        if(null == consumer) return;
        if(null == list) return;
        
        for(int index = list.size() - 1; index >=0 ; index--){
            consumer.accept(list.get(index));
        }
    }
}
