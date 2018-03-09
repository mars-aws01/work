/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.assertFalse;
/**
 *
 * @author mm67
 */
public class CommandLineArgumentsParserTest {
    
    private final String[] args = new String[]{
            "-taskfile=./doc/samples/localtask.yml",
            "-managecfg=config.yml",
            "InvalidParameter"
        };
    
    @Test
    public void bvt_Container_Size(){
                
        ArgumentContainer container = CommandLineArgumentsParser.parse(args);
        
        assertEquals(2, container.size());
    }
    
    @Test
    public void bvt_Container_Contains_Argument(){
                
        ArgumentContainer container = CommandLineArgumentsParser.parse(args);
        
        assertTrue(container.contains("taskfile"));
        
        // Case sensitive
        assertFalse(container.contains("Taskfile"));
    }
    
    @Test
    public void bvt_Container_Check_Argument_Existance(){
                
        ArgumentContainer container = CommandLineArgumentsParser.parse(args);
        
        assertTrue(container.contains("taskfile"));
        assertTrue(container.contains("managecfg"));
    }
    
    @Test
    public void bvt_Container_Get_Argument_Value(){
                
        ArgumentContainer container = CommandLineArgumentsParser.parse(args);
        
        String value = container.getArgumentValue("taskfile");
        assertEquals("./doc/samples/localtask.yml", value);
         
    }
    
    private final String[] argsWithDuplicates = new String[]{
            "-taskfile=./doc/samples/localtask1.yml",
            "-managecfg=config.yml",
            "-taskfile=./doc/samples/localtask2.yml"
        };
    
    @Test
    public void bvt_Container_Size_With_DuplicateArgs(){
                
        ArgumentContainer container = 
            CommandLineArgumentsParser.parse(argsWithDuplicates);
        
        assertEquals(2, container.size());
    }
    
    @Test
    public void bvt_Container_Get_Argument_Value_FromDuplicateArg(){
                
        ArgumentContainer container =
            CommandLineArgumentsParser.parse(argsWithDuplicates);
        
        String value = container.getArgumentValue("taskfile");
        assertEquals("./doc/samples/localtask1.yml", value);
    }
     
    @Test
    public void bvt_Container_Get_Argument_EmptyValue(){
                
        ArgumentContainer container = 
            CommandLineArgumentsParser.parse(
                new String[]{
                    "-managecfg="
                });
        
        assertTrue(container.contains("managecfg"));
        
        String value = container.getArgumentValue("managecfg");
        assertEquals("", value);
    }
    
    @Test
    public void bvt_Container_Get_Argument_WithValueContainsDelimiter(){
                
        ArgumentContainer container = 
            CommandLineArgumentsParser.parse(
                new String[]{
                    "-managecfg=Value=XX;Value2=XX2"
                });
        
        assertTrue(container.contains("managecfg"));
        
        String value = container.getArgumentValue("managecfg");
        assertEquals("Value=XX;Value2=XX2", value);
    }
     
    @Test
    public void bvt_Container_Get_Argument_WithoutDelimiter(){
                
        ArgumentContainer container = 
            CommandLineArgumentsParser.parse(
                new String[]{
                    "-managecfg"
                });
        
        assertTrue(container.contains("managecfg"));
        
        String value = container.getArgumentValue("managecfg");
        assertEquals("", value);
    }    
     
    @Test
    public void bvt_Container_Get_Argument_WithOnlyDelimiter(){
                
        ArgumentContainer container = 
            CommandLineArgumentsParser.parse(new String[]{
            "-="
        });
        
        assertEquals(0, container.size());
         
    }  
     
    @Test
    public void bvt_Container_Get_Argument_WithLeadingDelimiter(){
                
        ArgumentContainer container = 
            CommandLineArgumentsParser.parse(new String[]{
            "-=Value"
        });
        
        assertEquals(0, container.size());
    }
    
    @Test
    public void bvt_Container_Get_Argument_WithDefaultValue(){
                
        ArgumentContainer container = 
            CommandLineArgumentsParser.parse(new String[]{
            "-Para="
        });
        
        String actual = container.getArgumentValue("Para", "DefaultValue");
        
        assertEquals("DefaultValue", actual);
    }
}
