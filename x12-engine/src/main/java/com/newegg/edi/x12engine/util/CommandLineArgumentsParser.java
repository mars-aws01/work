/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.util;

import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author mm67
 */
public final class CommandLineArgumentsParser {
    public static final String ARG_PREFIX = "-";
    public static final String ARG_DELIMITER = "=";
    
    private static final Logger logger = LoggerBuilder.getLogger("AUGPSR");
    
    private CommandLineArgumentsParser(){
        // preivate ctor to prevent instanciate
    }

    public static ArgumentContainer parse(String[] args) {
        
        logger.info("Parsing command line arguments.");
        
        List<String> filteredArguments = filterValidArguments(args);
        
        ArgumentContainer container = new ArgumentContainer();
         
        filteredArguments.forEach(
            arg -> collectSingleArgument(container, arg));
        
        return container;
    }

    
    private static List<String> filterValidArguments(String[] args) {
        
        List<String> validArgs = new ArrayList<>();
        
        for(String arg : args){
            if(arg.startsWith(ARG_PREFIX)){
                validArgs.add(arg);
            }
        }
        
        return validArgs;
    }
    
    private static void collectSingleArgument(
        ArgumentContainer container, 
        String argumentContent){
        String argName = extractArgumentName(argumentContent);
        
        if(null == argName) {
                logger.warn("Empty argument name is not allowed.");                
                return;
            }
        
        String argValue = extractArgumentValue(argumentContent);
            
        if(container.contains(argName)){

            logger.warn(
                "Duplicate command line argument %s=%s ignored.",
                argName,
                argValue);

            return;
        }
            
        container.add(argName, argValue);
    } 

    private static String extractArgumentName(String arg) {
        if(!arg.contains(ARG_DELIMITER)){
            return arg.substring(1);
        }
        
        String name = arg.substring(1, arg.indexOf(ARG_DELIMITER));
        
        if("".equals(name) || name.startsWith(ARG_DELIMITER)){
            return null;
        }
        
        return name;
    }

    private static String extractArgumentValue(String arg) {
        if(!arg.contains(ARG_DELIMITER)){
            return "";
        }
        
        return arg.substring(arg.indexOf(ARG_DELIMITER) + 1);
    }
}
