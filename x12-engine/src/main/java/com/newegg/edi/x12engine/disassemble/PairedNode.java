/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble;

/**
 *
 * @author mm67
 */
public class PairedNode {
    /**
     * The start node name of the node pair, usually the first node of the pair.
     */
    private final String nodeName;
    
    /**
     * The paring node to check.
     */
    private final String paringNodeName;
    
    /**
     * Identify the value (Element data content) is present on the start node
     */
    private final boolean nodeValuePresented;
    
    public PairedNode(
        String nodeName, 
        String paringNodeName, 
        boolean isNodeValuePresented){
        
        this.nodeName = nodeName;
        this.paringNodeName = paringNodeName;
        this.nodeValuePresented = isNodeValuePresented;
    }

    /**
     * @return the nodeName
     */
    public String getNodeName() {
        return nodeName;
    }

    /**
     * @return the paringNodeName
     */
    public String getParingNodeName() {
        return paringNodeName;
    }

    /**
     * @return the nodeValuePresented
     */
    public boolean isNodeValuePresented() {
        return nodeValuePresented;
    }
}
