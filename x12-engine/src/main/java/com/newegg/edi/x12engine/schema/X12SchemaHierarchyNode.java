/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

/**
 *
 * @author mm67
 */
public abstract class X12SchemaHierarchyNode {
    private String name;
    private X12SchemaHierarchyNode parent;
    private String description; 
    
    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }
    
        /**
     * @return the parent
     */
    public X12SchemaHierarchyNode getParent() {
        return parent;
    }

    /**
     * @param parent the parent to set
     */
    public void setParent(X12SchemaHierarchyNode parent) {
        this.parent = parent;
    }
    
    /**
     * @return the description
     */
    public String getDescription() {
        return description;
    }

    /**
     * @param description the description to set
     */
    public void setDescription(String description) {
        this.description = description;
    }
}
