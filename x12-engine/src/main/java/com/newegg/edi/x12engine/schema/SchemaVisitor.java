/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.schema.events.BeforeLoopStartEvent;
import com.newegg.edi.x12engine.schema.events.IterationCompletedEvent;
import com.newegg.edi.x12engine.schema.events.X12SchemaEventHandler;

/**
 * Visit the SchemaDefinition via a tree style
 * @author mm67
 */
public interface SchemaVisitor {
    
    /**
     * Initialize the visitor
     */
    void initialize();

    /**
     * Get current segment, please note that the methods should be called 
     * right after the moveToNextSegment() was called and returns true.
     * 
     * Otherwise, it will return null.
     * 
     * @return X12SegmentDefinition
     */
    X12SegmentDefinition getCurrentSegmentDefinition();
    
    /**
     * Iterate to the next node on the schema structure tree, if all tree nodes
     * have been iterated, it will return false to indicate the iteration should
     * be stopped.
     * @return boolean
     */
    boolean moveToNextSegment() throws X12EngineException;
    
    /**
     * Check if the given segment was visited at current level, if the visitor 
     * currently not in any loop, it should be at root level, otherwise, it will 
     * check the segment name in current loop.
     * 
     * @param name the SEGMENT name to check
     * @return boolean
     */
    boolean isSegmentVisited(String name);
        
    /**
     * Return the Schema currently visiting.
     * @return X12SchemaDefinition
     */
    X12SchemaDefinition getSchema();
    
    /**
     * 
     * @return Loop
     */
    Loop getCurrentLoop();
    
    /**
     * Setup Loop event handler
     * @param handler Specify the X12SchemaEventHandler for IterationCompletedEvent
     */
    void setIterationCompletedEventHandler(
            X12SchemaEventHandler<IterationCompletedEvent> handler);
    
    void setBeforeLoopStartEventHandler(
            X12SchemaEventHandler<BeforeLoopStartEvent> handler);
    
    String getCurrentSegmentPath();
    
}
