/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.assemble;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.Iterator;

import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.schema.SchemaVisitor;
import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

/**
 *
 * @author mm67
 */
public class TransactionSetAssembler extends DefaultHandler {
 
    private final Deque<String> pathStack = new ArrayDeque<>();
    private final Deque<String> pathPadding = new ArrayDeque<>();
    private final String padding = "  ";
    private SchemaVisitor visitor;

    private String getCurrentPadding(){
        if(pathPadding.isEmpty()){
            return "";
        }
        
        StringBuilder paddingBuilder = new StringBuilder();
        
        Iterator<String> iterator = pathPadding.descendingIterator();
        
        while(iterator.hasNext()){
            paddingBuilder.append(iterator.next());
        }
         
        return paddingBuilder.toString();
    }
    
    private String getCurrentPath(){
        if(pathStack.isEmpty()){
            return "/";
        }
        
        StringBuilder pathBuilder = new StringBuilder("/");
        
        Iterator<String> iterator = pathStack.descendingIterator();
        
        while(iterator.hasNext()){
            pathBuilder.append(iterator.next());
            pathBuilder.append("/");
        }
         
        return pathBuilder.toString();
    }
    
    @Override
    public void startElement (String uri, String localName,
                              String qName, Attributes attributes)
    {
        String currentPadding = getCurrentPadding();
        String currentPath = getCurrentPath();
        System.out.print(currentPadding + "+[" + qName + "][Path: "+currentPath+"]");
        pathPadding.push(padding);
        pathStack.push(qName);

        try {
            visitor.moveToNextSegment();
        } catch (X12EngineException e) {
            e.printStackTrace();
        }

        System.out.println();
    }
    
    @Override
    public void endElement (String uri, String localName, String qName)
    {
        pathStack.pop();
        pathPadding.pop();
        String currentPadding = getCurrentPadding();
        System.out.print(currentPadding + "-[" + qName + "]END");

        System.out.println();
    }
    
    @Override
    public void characters (char ch[], int start, int length)
    {
        String currentPadding = getCurrentPadding();
        System.out.print(currentPadding + this.padding + "Text: " + new String(ch, start, length));

        System.out.println();
    }

    public SchemaVisitor getVisitor() {
        return visitor;
    }

    public void setVisitor(SchemaVisitor visitor) {
        this.visitor = visitor;
    }
}
