/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.common.Constants;
import java.math.BigDecimal;
import java.util.List;

/**
 *
 * @author mm67
 */
public class X12Restriction {
    
    public static final String TARGET_DATA_TYPE_NODE = "Node";
    public static final String TARGET_DATA_TYPE_LOOP = "Loop";
    public static final String TARGET_DATA_TYPE_STRING = "String";
    public static final String TARGET_DATA_TYPE_ENUM = "Enum";
    public static final String TARGET_DATA_TYPE_NUMBER = "Number";    
    public static final String TARGET_DATA_TYPE_COMPONENT = "Component";    
    public static final String TARGET_DATA_TYPE_COMPOSITE_ENUM = "CompositeEnum";
    
    private String targetDataType;
    private String pairedNode;
    private boolean required;
    private int minOccurs;
    private int maxOccurs;
    private int minLength;
    private int maxLength;
    private String pattern;
    private List<String> enumerations;
    private BigDecimal minValue;
    private BigDecimal maxValue;
    private String referenceCode;
    private List<String> referenceCodes;
    private int decimals;
    private boolean inclusiveLowerBound;
    private boolean inclusiveUpperBound;
    
    public X12Restriction(){
        
        // No limits
        minOccurs = 0;
        
        // No limits
        maxOccurs = Constants.UNLIMITED;
        
        minLength = 0;
        maxLength = Constants.NULL_VALUE;
        
        minValue = null;
        maxValue = null;
        
        // By default we don't check for decimals
        decimals = Constants.NULL_VALUE;
        
        inclusiveLowerBound = false;
        inclusiveUpperBound = false;
    }

    /**
     * Refer to the Constants definition X12Restriction.TARGET_DATA_TYPE_*
     * @return the targetDataType
     */
    public String getTargetDataType() {
        return targetDataType;
    }

    /**
     * @param targetDataType the targetDataType to set
     */
    public void setTargetDataType(String targetDataType) {
        this.targetDataType = targetDataType;
    }

    /**
     * @return the minLength
     */
    public int getMinLength() {
        return minLength;
    }

    /**
     * @param minLength the minLength to set
     */
    public void setMinLength(int minLength) {
        this.minLength = minLength;
    }

    /**
     * @return the maxLength
     */
    public int getMaxLength() {
        return maxLength;
    }

    /**
     * @param maxLength the maxLength to set
     */
    public void setMaxLength(int maxLength) {
        this.maxLength = maxLength;
    }

    /**
     * @return the pattern
     */
    public String getPattern() {
        return pattern;
    }

    /**
     * @param pattern the pattern to set
     */
    public void setPattern(String pattern) {
        this.pattern = pattern;
    }

    /**
     * @return the enumerations
     */
    public List<String> getEnumerations() {
        return enumerations;
    }

    /**
     * @param enumerations the enumerations to set
     */
    public void setEnumerations(List<String> enumerations) {
        this.enumerations = enumerations;
    }

    /**
     * @return the minValue
     */
    public BigDecimal getMinValue() {
        return minValue;
    }

    /**
     * @param minValue the minValue to set
     */
    public void setMinValue(BigDecimal minValue) {
        this.minValue = minValue;
    }

    /**
     * @return the maxValue
     */
    public BigDecimal getMaxValue() {
        return maxValue;
    }

    /**
     * @param maxValue the maxValue to set
     */
    public void setMaxValue(BigDecimal maxValue) {
        this.maxValue = maxValue;
    }

    /**
     * @return the minOccurs
     */
    public int getMinOccurs() {
        return minOccurs;
    }

    /**
     * @param minOccurs the minOccurs to set
     */
    public void setMinOccurs(int minOccurs) {
        this.minOccurs = minOccurs;
    }

    /**
     * @return the maxOccurs
     */
    public int getMaxOccurs() {
        return maxOccurs;
    }

    /**
     * @param maxOccurs the maxOccurs to set
     */
    public void setMaxOccurs(int maxOccurs) {
        this.maxOccurs = maxOccurs;
    }

    /**
     * @return the required
     */
    public boolean isRequired() {
        return required;
    }

    /**
     * @param required the required to set
     */
    public void setRequired(boolean required) {
        this.required = required;
    }

    /**
     * @return the pairedNode
     */
    public String getPairedNode() {
        return pairedNode;
    }

    /**
     * @param pairedNode the pairedNode to set
     */
    public void setPairedNode(String pairedNode) {
        this.pairedNode = pairedNode;
    }

    /**
     * @return the referenceCodes
     */
    public List<String> getReferenceCodes() {
        return referenceCodes;
    }

    /**
     * @param referenceCodes the referenceCodes to set
     */
    public void setReferenceCodes(List<String> referenceCodes) {
        this.referenceCodes = referenceCodes;
    }
        
    /** 
     * Return true if the TargetDataType is LOOP
     * @return 
     */
    public boolean isLoop(){
        return TARGET_DATA_TYPE_LOOP.equals(this.getTargetDataType());
    }
    
    /**
     * 
     * @return the decimals
     */
    public int getDecimals() {
        return decimals;
    }

    /**
     * @param decimals the decimals to set
     */
    public void setDecimals(int decimals) {
        this.decimals = decimals;
    }
    
    /**
     * @return the referenceCode
     */
    public String getReferenceCode() {
        return referenceCode;
    }
        

    /**
     * @param referenceCode the referenceCode to set
     */
    public void setReferenceCode(String referenceCode) {
        this.referenceCode = referenceCode;
    }
    
    /**
     * A segment definition can be a Component Element, only if the type 
     * of the segment is Component, a Component Element is an specialized data
     * element which may contains multiple child elements separated by the 
     * component separator (ISA16)
     * 
     * @return true if the target data type is "Component"
     */
    public boolean isComponent(){
        return TARGET_DATA_TYPE_COMPONENT.equals(this.getTargetDataType());
    }

    /**
     * @return the inclusiveLowerBound
     */
    public boolean isInclusiveLowerBound() {
        return inclusiveLowerBound;
    }

    /**
     * @param inclusiveLowerBound the inclusiveLowerBound to set
     */
    public void setInclusiveLowerBound(boolean inclusiveLowerBound) {
        this.inclusiveLowerBound = inclusiveLowerBound;
    }

    /**
     * @return the inclusiveUpperBound
     */
    public boolean isInclusiveUpperBound() {
        return inclusiveUpperBound;
    }

    /**
     * @param inclusiveUpperBound the inclusiveUpperBound to set
     */
    public void setInclusiveUpperBound(boolean inclusiveUpperBound) {
        this.inclusiveUpperBound = inclusiveUpperBound;
    }
}
