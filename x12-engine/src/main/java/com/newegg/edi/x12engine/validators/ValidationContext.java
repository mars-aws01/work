/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.common.SegmentData;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultCollector;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import com.newegg.edi.x12engine.schema.X12SegmentDefinition;

/**
 *
 * @author mm67
 */
public class ValidationContext {
   
    public static final int NULL_VALUE = -1;
    
    private ValidationResultCollector resultCollector;
    private X12SchemaDefinition schema;
    private X12SegmentDefinition elementDefinition;
    private SegmentData segment;
    private String value;
    private int elementPosition;
    private int componentPosition;
    
    public ValidationContext(){
        componentPosition = NULL_VALUE;
    }

    /**
     * @return the resultCollector
     */
    public ValidationResultCollector getResultCollector() {
        return resultCollector;
    }

    /**
     * @param resultCollector the resultCollector to set
     */
    public void setResultCollector(ValidationResultCollector resultCollector) {
        this.resultCollector = resultCollector;
    }

    /**
     * @return the schema
     */
    public X12SchemaDefinition getSchema() {
        return schema;
    }

    /**
     * @param schema the schema to set
     */
    public void setSchema(X12SchemaDefinition schema) {
        this.schema = schema;
    }

    /**
     * @return the elementDefinition
     */
    public X12SegmentDefinition getElementDefinition() {
        return elementDefinition;
    }

    /**
     * @param elementDefinition the elementDefinition to set
     */
    public void setElementDefinition(X12SegmentDefinition elementDefinition) {
        this.elementDefinition = elementDefinition;
    }

    /**
     * @return the segment
     */
    public SegmentData getSegment() {
        return segment;
    }

    /**
     * @param segment the segment to set
     */
    public void setSegment(SegmentData segment) {
        this.segment = segment;
    }

    /**
     * @return the value
     */
    public String getValue() {
        return value;
    }
    
    public String getNormalizedValue(){
        if(null == value) {
            return null;
        }
        
        return value.trim();
    }

    /**
     * @param value the value to set
     */
    public void setValue(String value) {
        this.value = value;
    }

    int getElementPosition() {
        return this.elementPosition;
    }

    /**
     * @param elementPosition the elementPosition to set
     */
    public void setElementPosition(int elementPosition) {
        this.elementPosition = elementPosition;
    }
    
    /**
     * @return the componentPosition
     */
    public int getComponentPosition() {
        return componentPosition;
    }

    /**
     * @param componentPosition the componentPosition to set
     */
    public void setComponentPosition(int componentPosition) {
        this.componentPosition = componentPosition;
    }
}
