/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.util.CollectionExtension;
import java.util.List;

/**
 *
 * @author mm67
 */
public class X12SegmentDefinition extends X12SchemaHierarchyNode{
     private X12Restriction restriction;
     private List<X12SegmentDefinition> segments;
     private int level; 

    /**
     * @return the restriction
     */
    public X12Restriction getRestriction() {
        return restriction;
    }

    /**
     * @param restriction the restriction to set
     */
    public void setRestriction(X12Restriction restriction) {
        this.restriction = restriction;
    }

    /**
     * @return the segments
     */
    public List<X12SegmentDefinition> getSegments() {
        return segments;
    }

    /**
     * @param segments the segments to set
     */
    public void setSegments(List<X12SegmentDefinition> segments) {
        this.segments = segments;
    }
    
    @Override
    public String toString(){
        X12Restriction rest = this.getRestriction();
        
        if(rest==null) return this.getName();
        
        return this.getName() + " - " + rest.getTargetDataType();
    }

    /**
     * The runtime level, which will be calculated at Schema Visitor
     * @return the level
     */
    public int getLevel() {
        return level;
    }

    /**
     * @param level the level to set
     */
    public void setLevel(int level) {
        this.level = level;
    }

    /**
     * To check this segment is mandatory or not, if MinOccurs of the 
     * Restriction is greater than zero, return true, otherwise return false.
     * 
     * If the Restriction is not provided, return false;
     * @return 
     */
    public boolean isMandatory() {
        
        X12Restriction rest = this.getRestriction();
        
        if(null == rest) {
            return false;
        }
        
        // For node type, use minOccurs to check mandatory
        if(X12Restriction.TARGET_DATA_TYPE_NODE.equals(rest.getTargetDataType())){
            return rest.getMinOccurs() > 0;
        }
        
        return rest.isRequired();
    }
    
    public boolean isLoop(){
        X12Restriction rest = this.getRestriction();
        
        if(null == rest) {
            return false;
        }
        // If the X12Restriction.TargetType is Loop then this X12SegmentDefinition
        // is a Loop definition
        return X12Restriction.TARGET_DATA_TYPE_LOOP.equals(
                rest.getTargetDataType());
    }
    
    /**
     * If a node is not a Loop or Segment node, then it should be a value node.
     * @return 
     */
    public boolean isValueNode(){
        return !isLoop() && !isSegmentNode();
    }
    
    /**
     * If the segment node support repeating, return true
     * @return 
     */
    public boolean isRepeatableSegmentNode(){
        if(!isSegmentNode()) return false;
        
        X12Restriction rest = this.getRestriction();
        
        if(null == rest) {
            return false;
        }
        
        if(rest.getMaxOccurs() == Constants.UNLIMITED){
            return true;
        }
        
        return rest.getMaxOccurs() > 1;
    }
    
    /**
     * 
     * @return 
     */
    public boolean isSegmentNode(){
        X12Restriction rest = this.getRestriction();
        
        if(null == rest) {
            return false;
        }
        
        return X12Restriction.TARGET_DATA_TYPE_NODE.equals(
                rest.getTargetDataType());
    }
    
    public int getChildElementCount(){
        if(CollectionExtension.isEmpty(segments)) return 0;
        
        return segments.size();
    }
}
