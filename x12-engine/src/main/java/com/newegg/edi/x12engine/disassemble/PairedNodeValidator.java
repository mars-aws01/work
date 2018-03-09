/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble;

import com.newegg.edi.x12engine.exceptions.X12EngineException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static java.util.stream.Collectors.toList;

/**
 *
 * @author mm67
 */
public class PairedNodeValidator {
    
    private final String parentSegmentName;
    
    private final List<PairedNode> pairedNodeList;
    
    public PairedNodeValidator(String parentSegmentName){
        pairedNodeList = new ArrayList<>();
        this.parentSegmentName = parentSegmentName;
    }

    /**
     * @return the parentSegmentName
     */
    public String getParentSegmentName() {
        return parentSegmentName;
    }

    /**
     * @return the pairedNodeList
     */
    public List<PairedNode> getPairedNodeList() {
        return pairedNodeList;
    }
    
    public void collectPairStartNode(
        String nodeName, 
        String paringNodeName, 
        boolean isDataPresent){
        
        PairedNode node = new PairedNode(
            nodeName, paringNodeName, isDataPresent);
        
        this.pairedNodeList.add(node);        
    }
    
    public Optional<PairedNode> getPairNode(String paringNodeName)
        throws X12EngineException {
        
        List<PairedNode> nodes = 
            this.pairedNodeList
            .stream()
            .filter(n->n.getParingNodeName().equals(paringNodeName))
            .collect(toList());
        
        if(nodes.isEmpty()){
            return Optional.empty();
        }
        
        if(nodes.size()>1){
            
            String nodeNameList = 
                nodes.stream()
                    .map(n->n.getNodeName())
                    .reduce(" ", String::concat);
            
            throw new X12EngineException(
                String.format(
                    "There are %d nodes [%s] is pairing with %s "
                        + "which is unexpected, "
                        + "please make sure the schema contains "
                        + "only one node pairing with another.", 
                    nodes.size(),
                    nodeNameList,
                    paringNodeName)
            );
        }
        
        return Optional.of(nodes.get(0));
    }
}
