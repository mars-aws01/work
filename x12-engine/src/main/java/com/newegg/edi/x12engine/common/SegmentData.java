/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

import com.newegg.edi.x12engine.exceptions.ArgumentException;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.util.CollectionExtension;
import com.newegg.edi.x12engine.util.StringExtension;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 *
 * @author mm67
 */
public class SegmentData implements SegmentDataInfoContainer {
     
    private final int position;
    private String name;
    private String originalSegmentData;
    private List<String> elements;
    private X12MetaData metaData;
    
   
    @Override
    public int getDataCount(){
        return CollectionExtension.isEmpty(getElements())? 0 : getElements().size();
    }
     
    /**
     * @return the name
     */
    @Override
    public String getName() {
        return name;
    }

    /**
     * @return the originalSegmentData
     */
    @Override
    public String getOriginalSegmentData() {
        return originalSegmentData;
    }

    /**
     * @return the elements
     */
    public List<String> getElements() {
        return elements;
    }

    /**
     * @return the metaData
     */
    public X12MetaData getMetaData() {
        return metaData;
    }
    
    @Override
    public String toString(){
        return this.originalSegmentData;
    }
    
    public SegmentData(){
        position = 0;
    }
    
    public SegmentData(X12MetaData metaData, String segmentData, int position) 
            throws X12EngineException{
                        
        if(Character.isWhitespace(metaData.getElementDelimiter())){
            throw new ArgumentException("metaData.ElementDelimiter");
        }
        
        this.originalSegmentData = segmentData;
        this.metaData = metaData;
        this.position = position;
        this.elements = breakDownElements();
        
    }
    
    public SegmentData(X12MetaData metaData, String segmentData)
        throws X12EngineException{
        this(metaData, segmentData, 0);
    }
    
    public SegmentData(SegmentData segment){
        this(segment, 0);
    }
    
    public SegmentData(SegmentData segment, int position){
        this.metaData = segment.metaData;
        this.originalSegmentData = segment.originalSegmentData;
        this.elements = segment.elements;
        this.name = segment.name;
        this.position = position;
    }

    private List<String> breakDownElements() throws X12EngineException {
         
        if(StringExtension.isNullOrWhitespace(originalSegmentData)){
            return new ArrayList<>();
        }
        
        if(originalSegmentData.endsWith(
                String.valueOf(metaData.getSegmentTerminator())
                )){
            originalSegmentData = 
                    originalSegmentData.substring(0,
                    originalSegmentData.length()-1);
        }
         
        String[] splittedElements = 
                originalSegmentData.split("\\" + metaData.getElementDelimiter());
        
        if(splittedElements.length==0) {
            return new ArrayList<>();
        }

        name = splittedElements[0];
                
        return Arrays.asList(splittedElements);
    }
    
    public String getDataElement(int index){
        return this.elements.get(index);
    }
    
    public boolean isSpecificSegment(String segmentName){
        return this.name.equals(segmentName);
    }
    
    public boolean isISA(){
        return this.isSpecificSegment(X12Standard.ISA);
    }
        
    public boolean isIEA(){
        return this.isSpecificSegment(X12Standard.IEA);
    }
    
    public boolean isGS(){
        return this.isSpecificSegment(X12Standard.GS);
    }
        
    public boolean isGE(){
        return this.isSpecificSegment(X12Standard.GE);
    }
    
    public boolean isST(){
        return this.isSpecificSegment(X12Standard.ST);
    }
        
    public boolean isSE(){
        return this.isSpecificSegment(X12Standard.SE);
    }

    public boolean isEnvelopeSegment() {
        if(this.isISA()) return true;
        if(this.isGS()) return true;
        if(this.isST()) return true;
        if(this.isSE()) return true;
        if(this.isGE()) return true; 
        
        return this.isIEA();
    } 
    
    public boolean isTransactionSetEnvelope(){
        if(this.isST()) return true;
        return this.isSE();
    }

    /**
     * Get the position of this segment within a transaction set (1 based)
     * @return the position
     */
    @Override
    public int getPosition() {
        return position;
    } 
}
