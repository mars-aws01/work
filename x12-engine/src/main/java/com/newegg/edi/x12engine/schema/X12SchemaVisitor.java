/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.schema.events.X12SchemaEventHandler;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import com.newegg.edi.x12engine.schema.events.BeforeLoopStartEvent;
import com.newegg.edi.x12engine.schema.events.IterationCompletedEvent;
import com.newegg.edi.x12engine.util.CollectionExtension;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

/**
 * The X12SchemaVistor provide DFS based iteration on the schema structure tree
 * @author mm67
 */
public class X12SchemaVisitor implements SchemaVisitor{

    private final Logger logger;
    private boolean initialized;    
    private final X12SchemaDefinition schema;
    private final Deque<X12SegmentDefinition> segmentStack;
    private X12SegmentDefinition currentSegment;
    private Loop currentLoop;    
    private final Deque<Loop> loopStack;
    
    // Stores visited node segments with in root level
    private final List<X12SegmentDefinition> visitedNodeSegmentListByLevel 
        = new ArrayList<>();
    
    private X12SchemaEventHandler<IterationCompletedEvent> 
            iterationCompletedEventHandler;
    
    private X12SchemaEventHandler<BeforeLoopStartEvent> 
            beforeLoopStartEventHandler;
    
    public X12SchemaVisitor(X12SchemaDefinition schema){
        this.logger =
                LoggerBuilder.getLogger(Constants.MODULE_CODE_X12_SCHEMA_VISITOR);
        
        this.loopStack = new ArrayDeque<>();
        this.schema = schema; 
        this.segmentStack = new ArrayDeque<>();
    }     
    
    /**
     * Initialize the visitor
     */
    @Override
    public void initialize(){
        
        if(initialized){
            return;
        }
        
        CollectionExtension.reverseAccess(this.schema.getSegments(), 
                sd-> {
                    // Collect only segment and loop node for visiting
                    if(sd.isLoop() || sd.isSegmentNode()){
                        sd.setLevel(1);
                        sd.setParent(schema);
                        this.segmentStack.push(sd);
                    }
                });
        
        initialized = true;
    }
    
    /**
     * Get current segment, please note that the methods should be called 
     * right after the moveToNextSegment() was called and returns true.
     * 
     * Otherwise, it will return null.
     * 
     * @return X12SegmentDefinition
     */
    @Override
    public X12SegmentDefinition getCurrentSegmentDefinition() {
         return currentSegment;
    }

    /**
     * Iterate to the next node on the schema structure tree, if all tree nodes
     * have been iterated, it will return false to indicate the iteration should
     * be stopped.
     * @return boolean
     */
    @Override
    public boolean moveToNextSegment() throws X12EngineException {
        
        // Check if currently we are working on a loop
        if(null != this.currentLoop){                        
            return moveToNextSegmentInCurrentLoop();            
        }
        
        // If the segment stack is empty, it means all segments 
        // have been visited, the iteration should be stopped.
        if(this.segmentStack.isEmpty()){
            this.currentSegment = null;
            return false;
        }
        
        // Pop a segment from the stack
        currentSegment = this.segmentStack.pop();
        
        visitedNodeSegmentListByLevel.add(currentSegment);
        
        // If current segment is a loop, mark a loop start
        if(currentSegment.getRestriction().isLoop()){
             
            // Fire up BeforeLoopStartEvent
            BeforeLoopStartEvent event = new BeforeLoopStartEvent(currentSegment);
            this.onBeforeLoopStart(event);
            
            // If the event handler decide not to skip this loop
            if(!event.isSkipThisLoop()){
                // Mark current segment as loop started.
                this.markLoopStart(currentSegment);
                return true;
            }
            
            // Move to the next segment if the loop skipped
            return this.moveToNextSegment();
        }

        // Push all children from this segment into stack in a reversed order
        if(CollectionExtension.isNotEmpty(currentSegment.getSegments())){
            
            CollectionExtension.reverseAccess(
                    currentSegment.getSegments(), 
                    sd-> {
                            if(sd.isLoop() || sd.isSegmentNode()){
                                // Set child segment as the next level
                                sd.setLevel(currentSegment.getLevel() + 1);
                                sd.setParent(currentSegment);
                                this.segmentStack.push(sd);
                            }
                        }
            );
        }
        
        return true;      
    }
    
    @Override
    public boolean isSegmentVisited(String name){
        if(null != this.currentLoop){
            
            this.logger.debug(
                "[VisitedCheck] Checking if the segment [%s] is visited in loop [%s]",
                    name,
                    this.currentLoop.getRoot().getName());
            
            boolean visited = this.currentLoop.isSegmentVisited(name);
            
            this.logger.debug(
                "[VisitedCheck] CheckResult is [%s]",
                    visited);
            
            return visited;
        }
        
        this.logger.debug(
            "[VisitedCheck] Checking if the segment [%s] is visited in current level",
                name);
        
        boolean visited = 
            visitedNodeSegmentListByLevel.stream()
                .anyMatch(d->d.getName().equals(name));
        
        this.logger.debug(
            "[VisitedCheck] CheckResult is [%s]",
                visited);
        
        return visited;
    }

    @Override
    public X12SchemaDefinition getSchema() {
        return this.schema;
    }
    
    /**
     *  Mark current X12SegmentDefinition as the loop start, if current definition
     * is null or it's not a loop, it will throw a X12EngineException
     *
     */
    private void markLoopStart(X12SegmentDefinition def) {
         
        this.logger.debug("Schema Visitor is marking new loop [%s] started", 
                def.getName());
        
        // Push previous loop into stack for later recovery
        if(null != this.currentLoop){
            
            this.logger.debug("PUSING LOOP [%s]", currentLoop.getRoot().getName());            
            this.loopStack.push(currentLoop);
        }
        
        this.currentLoop = new Loop(def);        
    }
    
    @Override
    public Loop getCurrentLoop(){
        
        return this.currentLoop;
    }
 
    private void stopCurrentLoop() throws X12EngineException {
        
        if(null == this.currentLoop){
            throw new X12EngineException(
            "Currently we are not in a loop, "
                    + "breakLoop failed, check your code logic.");
        }

        this.currentLoop = null;
        
        // If the loop stack is not empty, it means there is at least one more
        // loop we are currently in.
        if(!this.loopStack.isEmpty()){
            
           // restore to the previous loop
           this.currentLoop =  this.loopStack.pop();
           
           // And move the segment pointer to the next segment. 
           // To skip the CURRENT segment node in the previous loop
           this.moveToNextSegment();
           
        }
    }
    
    private boolean moveToNextSegmentInnerLoop() throws X12EngineException{
        
        this.logger.debug("Inner loop [%s] detected.", 
                        this.currentSegment.getName());

        // When an inner loop detected, the caller should check if 
        // the loop is presented in the corresponding X12 data segment
        // (Current Segment), if the loop is not present in X12 data
        // then the loop should be skipped.
        BeforeLoopStartEvent event = new BeforeLoopStartEvent(currentSegment);
        this.onBeforeLoopStart(event);

        if(!event.isSkipThisLoop()){

            this.markLoopStart(currentSegment);   
            return true;
        }
        else{

            this.logger.debug("Skipping the inner loop [%s] ...",
                    this.currentSegment.getName());

            // Move on to the next segment
            return this.moveToNextSegment();
        }
    }
    
    /** 
     * Visit segments in current loop or inner loop
     * @return boolean
     */
    private boolean moveToNextSegmentInCurrentLoop() throws X12EngineException{
        if(null == this.currentLoop){
            throw new X12EngineException(
                    "The current loop cannot be null when loopStack is not empty.");
        }
        
        // Iterate segment tree within current loop
        if(this.currentLoop.moveToNextSegment()){
            
            // Update current segment as the current segment inside the loop
            this.currentSegment = this.currentLoop.getCurrentSegment();
            this.currentSegment.setParent(this.currentLoop.getRoot());            
                      
            // Root node for restarted iteration should not consider
            // as a inner loop
            if(this.currentSegment == this.currentLoop.getRoot()){
                this.logger.debug("Loop [%s] restarted [Count: %d]", 
                        this.currentSegment,
                        this.currentLoop.getLoopCount());
                return true;
            }
            
            // If the segment is an inner loop
            if(this.currentSegment.getRestriction().isLoop()){                
                return moveToNextSegmentInnerLoop();
            }    
        } else { 
            // It means the current loop is empty or the current iteration has
            // been completed
            
            this.logger.debug(
                "Segment [%s] is the last segment of the loop %s",
                this.currentSegment.getName(),
                this.currentLoop);                
            
            // Since an iteration of this loop has finished, we should 
            // check if the caller wish to continue, by triggering the 
            // IterationCompletedEvent, the handler should check the current
            // state, if the loop iteration should be stopped, the caller 
            // should set the continue loop to false on the event.
            IterationCompletedEvent event = new IterationCompletedEvent(this.currentLoop);
            onIterationCompleted(event);
            if(!event.isContinueLoop()){
                // Handler ask to stop current looping
                this.stopCurrentLoop();
            }else{
                // Otherwise, prepare the next iteration of this loop
                // set the current segment to the root of this loop
                this.currentLoop.nextIteration();
                this.currentSegment = this.currentLoop.getRoot();
            }
        }
        
        return true;
    }
    
    @Override
    public void setIterationCompletedEventHandler(
            X12SchemaEventHandler<IterationCompletedEvent> handler){
        
        this.iterationCompletedEventHandler = handler;
    }
    
    private void onIterationCompleted(IterationCompletedEvent e) throws X12EngineException{
        if(null == this.iterationCompletedEventHandler){
            this.logger.warn("No iterationCompletedEventHandler configured, "
                + "iteration terminated.");
            return;
        }
        
        this.iterationCompletedEventHandler.onEventFired(e);
         
    }

    @Override
    public void setBeforeLoopStartEventHandler(
            X12SchemaEventHandler<BeforeLoopStartEvent> handler) {
        this.beforeLoopStartEventHandler = handler;
    }

    private void onBeforeLoopStart(BeforeLoopStartEvent e) throws X12EngineException{
        if(null == this.beforeLoopStartEventHandler) {
            return;
        }
        
        this.beforeLoopStartEventHandler.onEventFired(e);
    }

    @Override
    public String getCurrentSegmentPath() {        
        
        Deque<String> pathStack = new ArrayDeque<>();        
        this.buildPath(this.currentSegment, pathStack);
        
        StringBuilder path = new StringBuilder();
        path.append("/");
        
        while(!pathStack.isEmpty()){
            path.append(pathStack.pop());
            path.append("/");    
        }
        
        return path.toString();
    }

    private void buildPath(X12SchemaHierarchyNode node, Deque<String> pathStack) {
        if(node == null){
            return;
        }
        
        pathStack.push(node.getName());
        
        buildPath(node.getParent(), pathStack);
    }
    
}
