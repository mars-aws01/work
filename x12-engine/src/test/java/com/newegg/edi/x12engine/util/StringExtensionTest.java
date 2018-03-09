/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

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
public class StringExtensionTest {
    
    public StringExtensionTest() {
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
     * Test of isNullOrEmpty method, of class StringExtension.
     */
    @Test
    public void testIsNullOrEmpty() {
        assertTrue(StringExtension.isNullOrEmpty(""));
    }
    
    @Test
    public void testIsNullOrEmpty_with_none_empty_string_should_return_false() { 
        assertFalse(StringExtension.isNullOrEmpty("ABC"));
    }
    
    @Test
    public void testIsNullOrEmpty_with_null_value_should_return_true() { 
        assertTrue(StringExtension.isNullOrEmpty(null));
    }

    @Test
    public void testIsNullOrWhitespace_with_no_empty_values() { 
        assertFalse(StringExtension.isNullOrWhitespace("Value"));
    }

    /**
     * Test of isNullOrWhitespace method, of class StringExtension.
     */
    @Test
    public void testIsNullOrWhitespace_with_empty() { 
        assertTrue(StringExtension.isNullOrWhitespace(""));
    }
    
    @Test
    public void testIsNullOrWhitespace_with_white_space() { 
        assertTrue(StringExtension.isNullOrWhitespace(" "));
    }
    
    @Test
    public void testIsNullOrWhitespace_with_null() {
        assertTrue(StringExtension.isNullOrWhitespace(null));
    }

    /**
     * Test of isWhitespace method, of class StringExtension.
     */
    @Test 
    public void testIsWhitespace() {
        assertFalse(StringExtension.isWhitespace(""));
    }
    
    /**
     * Test of isWhitespace method, of class StringExtension.
     */
    @Test 
    public void testIsWhitespace_emtpy_string() {
        assertFalse(StringExtension.isWhitespace(null));
    }
    
    @Test 
    public void testIsWhitespace_white_space_string() {
        assertTrue(StringExtension.isWhitespace("  "));
    }
    
    @Test 
    public void testIsWhitespace_none_white_space_string() {
        assertFalse(StringExtension.isWhitespace("ABC"));
    }
    
    @Test 
    public void testIsWhitespace_mixed_white_space_string() {
        assertFalse(StringExtension.isWhitespace(" ABC"));
    }
    
    @Test 
    public void testIsWhitespace_mixed_white_space_string2() {
        assertFalse(StringExtension.isWhitespace("ABC "));
    }
    
    @Test 
    public void testIsWhitespace_mixed_white_space_string3() {
        assertFalse(StringExtension.isWhitespace("A BC"));
    }
    
    @Test
    public void test_split_string(){
        String[] result = StringExtension.split("A\\B", "\\");
        
        assertEquals(2, result.length);
        assertEquals("A", result[0]);
        assertEquals("B", result[1]);
    }
    
    @Test
    public void test_split_string_with_nullValue(){
        String[] result = StringExtension.split(null, "\\");
        
        assertEquals(0, result.length);
    }
    
    @Test
    public void test_split_string2(){
        String[] result = StringExtension.split("A\\B\\", "\\");
        
        assertEquals(3, result.length);
        assertEquals("A", result[0]);
        assertEquals("B", result[1]);
        assertEquals("", result[2]);
    }
    
    @Test
    public void test_split_string3(){
        String[] result = StringExtension.split("A>B>", ">");
        
        assertEquals(3, result.length);
        assertEquals("A", result[0]);
        assertEquals("B", result[1]);
        assertEquals("", result[2]);
    }
}
