/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import com.newegg.edi.x12engine.util.CollectionExtension;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 *
 * @author mm67
 */
public class Loop {
    
    // The root segment of the loop
    private final X12SegmentDefinition root;
    private int loopCount;
    private X12SegmentDefinition currentSegment;
    private final Deque<X12SegmentDefinition> segmentStack; 
    private final int loopSegmentLevel;
    
    // Stores visited node segments with in root level
    private final List<X12SegmentDefinition> visitedNodeSegmentListByLevel 
        = new ArrayList<>();
    
    private final Logger logger;
    
    public Loop(X12SegmentDefinition loopDef){
        this.segmentStack = new ArrayDeque<>();
        this.root = loopDef;
        this.currentSegment = this.root;
        this.logger = LoggerBuilder.getLogger(Constants.MODULE_CODE_LOOP);
        
        this.loopCount = 1;         
        this.loopSegmentLevel = this.root.getLevel();
        
        prepareForIteration();
    }
    
    private void prepareForIteration(){
        
        int theNextLevel = this.loopSegmentLevel + 1;
        
        visitedNodeSegmentListByLevel.clear();
        
        CollectionExtension.reverseAccess(this.root.getSegments(), 
                (sd)-> {                    
                    if(sd.isLoop() || sd.isSegmentNode()){
                        sd.setLevel(theNextLevel);
                        this.segmentStack.push(sd);
                    }
                });
    }

    /**
     * @return the loop
     */
    public X12SegmentDefinition getRoot() {
        return root;
    }

    /**
     * @return the loopCount
     */
    public int getLoopCount() {
        return loopCount;
    }

    /**
     * @param loopCount the loopCount to set
     */
    public void setLoopCount(int loopCount) {
        this.loopCount = loopCount;
    }

    /**
     * @return the currentSegment
     */
    public X12SegmentDefinition getCurrentSegment() {
        return currentSegment;
    }
    
    public boolean moveToNextSegment() {
              
        // If the segment stack is empty, it means all segments 
        // have been visited, the iteration should be stopped.
        if(this.segmentStack.isEmpty()){
            this.currentSegment = null;
            return false;
        }
                        
        // Pop a sgement from the stack
        currentSegment = this.segmentStack.pop();
        
        visitedNodeSegmentListByLevel.add(currentSegment);
                
        if(currentSegment.getRestriction().isLoop()){
            
            logger.debug("[%s] is the current segment in the loop [%s]",
                            this.currentSegment.getName(),
                            this.getRoot().getName());
        
            return true;
        }
        
        int theNextLevel = currentSegment.getLevel() + 1;
                         
        // Push all children from this segment into stack in a reversed order
        if(CollectionExtension.isNotEmpty(currentSegment.getSegments())){
            
            CollectionExtension.reverseAccess(
                    currentSegment.getSegments(), 
                    (sd)-> {
                            if(sd.isLoop() || sd.isSegmentNode()){
                                // Set child segment as the next level
                                sd.setLevel(theNextLevel);
                                this.segmentStack.push(sd);
                                }
                            }
            );
        }
        
        return true;      
    }     
    
    /**
     * Start the next iteration if the schema defined maximum occurs not 
     * exceeded, otherwise, a X12EngineException will be threw out.
     * 
     * @throws com.newegg.edi.x12engine.exceptions.X12EngineException
     */
    public void nextIteration() throws X12EngineException{
        
        int maximumOccurs = this.root.getRestriction().getMaxOccurs();
        
        if(this.loopCount == maximumOccurs){
            throw new X12EngineException(
                    String.format("Too many segments %s found, "
                            + "maximum allowed count is %d.",
                            this.root.getName(),
                            maximumOccurs)
            );
        }
        
        // Increase loop count
        this.loopCount++;
        
        prepareForIteration();
    }
    
    @Override
    public String toString(){
        return "Looping on [" + this.root.toString() + "]";
    }
    
    public String getLoopStartSegment(){
        if(CollectionExtension.isEmpty(this.getRoot().getSegments())){
            return null;
        }
        
        X12SegmentDefinition segDef = this.getRoot().getSegments().get(0);
        
        return segDef.getName();
    }

    public boolean isSegmentVisited(String name) {
        
        boolean visited = 
            visitedNodeSegmentListByLevel.stream()
                .anyMatch(d->d.getName().equals(name));
        
        return visited;
    } 
}
