/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import static org.junit.Assert.*;

/**
 *
 * @author mm67
 */
public class CollectionExtensionTest {
    
    public CollectionExtensionTest() {
    }
    
    @BeforeClass
    public static void setUpClass() {
    }
    
    @AfterClass
    public static void tearDownClass() {
    }
    
    @Before
    public void setUp() {
    }
    
    @After
    public void tearDown() {
    }

    /**
     * Test of isEmpty method, of class CollectionExtension.
     */
    @Test
    public void testIsEmpty_null_collection() {
        
        Collection list = null;
        boolean expResult = true;
        boolean result = CollectionExtension.isEmpty(list);
        assertEquals(expResult, result); 
    }
    
    @Test
    public void testIsEmpty_empty_collection() {
        
        ArrayList<String> list = new ArrayList<>();
        boolean expResult = true;
        boolean result = CollectionExtension.isEmpty(list);
        assertEquals(expResult, result); 
    }
    
    @Test
    public void testIsEmpty_noneEmpty_collection() {
        
        ArrayList<String> list = new ArrayList<>();
        list.add("String");
        
        boolean expResult = false;
        boolean result = CollectionExtension.isEmpty(list);
        assertEquals(expResult, result); 
    }

    /**
     * Test of isNotEmpty method, of class CollectionExtension.
     */
    @Test
    public void testIsNotEmpty() {
        System.out.println("isNotEmpty");
        Collection list = null;
        boolean expResult = false;
        boolean result = CollectionExtension.isNotEmpty(list);
        assertEquals(expResult, result);
    }
    
}
