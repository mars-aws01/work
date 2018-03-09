/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import java.util.List;

/**
 *
 * @author mm67
 */
public class X12SchemaDefinition extends X12SchemaHierarchyNode {
    private String id;    
    private String type;
    private String transactionSetType;
    private String functionalIdentifierCode;
    private String version;
    private String category;
    private String subCategory;       
    private List<X12SegmentDefinition> segments;
    private X12SharedData sharedData;

    /**
     * @return the version
     */
    public String getVersion() {
        return version;
    }

    /**
     * @param version the version to set
     */
    public void setVersion(String version) {
        this.version = version;
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

    /**
     * @return the id
     */
    public String getId() {
        return id;
    }

    /**
     * @param id the id to set
     */
    public void setId(String id) {
        this.id = id;
    }

    /**
     * @return the category
     */
    public String getCategory() {
        return category;
    }

    /**
     * @param category the category to set
     */
    public void setCategory(String category) {
        this.category = category;
    }

    /**
     * @return the subCategory
     */
    public String getSubCategory() {
        return subCategory;
    }

    /**
     * @param subCategory the subCategory to set
     */
    public void setSubCategory(String subCategory) {
        this.subCategory = subCategory;
    }

    /**
     * @return the sharedData
     */
    public X12SharedData getSharedData() {
        return sharedData;
    }

    /**
     * @param sharedData the sharedData to set
     */
    public void setSharedData(X12SharedData sharedData) {
        this.sharedData = sharedData;
    }

    /**
     * @return the type
     */
    public String getType() {
        return type;
    }

    /**
     * @param type the type to set
     */
    public void setType(String type) {
        this.type = type;
    }

    /**
     * @return the functionalIdentifierCode
     */
    public String getFunctionalIdentifierCode() {
        return functionalIdentifierCode;
    }

    /**
     * @param functionalIdentifierCode the functionalIdentifierCode to set
     */
    public void setFunctionalIdentifierCode(String functionalIdentifierCode) {
        this.functionalIdentifierCode = functionalIdentifierCode;
    }

    /**
     * @return the transactionSetType
     */
    public String getTransactionSetType() {
        return transactionSetType;
    }

    /**
     * @param transactionSetType the transactionSetType to set
     */
    public void setTransactionSetType(String transactionSetType) {
        this.transactionSetType = transactionSetType;
    }
    
    @Override
    public String toString(){
        return String.format("Schema [ID:%s Type:%s Ver:%s BizType:%s TS Type:%s]",
                this.getId(),
                this.getType(),
                this.getVersion(),
                this.getFunctionalIdentifierCode(),                
                this.getTransactionSetType());
    }
}
