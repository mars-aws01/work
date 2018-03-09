/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.parsing;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.common.X12MetaData;
import com.newegg.edi.x12engine.common.SegmentTerminatorSuffixType;
import com.newegg.edi.x12engine.common.ContextBase;
import com.newegg.edi.x12engine.common.Group;
import com.newegg.edi.x12engine.common.Interchange; 
import com.newegg.edi.x12engine.common.SegmentData;
import com.newegg.edi.x12engine.common.TransactionSet;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import java.util.LinkedList;
import java.util.Queue;

/**
 *
 * @author mm67
 */
public class X12ReaderContext extends ContextBase { 
    
    private X12MetaData metaData;
    private X12ReaderSetting setting;
    private final Queue<String> segmentBuffer;
    private final Queue<Character> dataBuffer;
    private SegmentTerminatorSuffixType previousSegmentTerminatorSuffix;
    
    private String currentGSSegment;
    
    private Interchange currenctInterchange;    
    private Group currentGroup;
    private TransactionSet currentTransactionSet;
    
    private int segmentPositionInTS;
        
    public X12ReaderContext(){ 
        super(Constants.MODULE_CODE_X12_READER);
        
        segmentBuffer = new LinkedList<>();
        dataBuffer = new LinkedList<>();
        segmentPositionInTS = 0;
    }

    /**
     * @return the metaData
     */
    public X12MetaData getMetaData() {
        return metaData;
    }

    /**
     * @param metaData the metaData to set
     */
    public void setMetaData(X12MetaData metaData) {
        this.metaData = metaData;
    }

    /**
     * @return the setting
     */
    public X12ReaderSetting getSetting() {
        return setting;
    }

    /**
     * @param setting the setting to set
     */
    public void setSetting(X12ReaderSetting setting) {
        this.setting = setting;
    }
    
    /**
     * @return the segmentBuffer
     */
    public Queue<String> getSegmentBuffer() {
        return segmentBuffer;
    }
    
    public boolean isSegmentBufferEmpty(){
        return this.segmentBuffer.isEmpty();
    }
    
    public boolean isSegmentBufferNotEmpty(){
        return !isSegmentBufferEmpty();
    }
    
    public boolean isDataBufferEmpty() {
        return this.dataBuffer.isEmpty();
    }
    
    public boolean isDataBufferNotEmpty() {
        return !isDataBufferEmpty();
    }

    /**
     * @return the dataBuffer
     */
    public Queue<Character> getDataBuffer() {
        return dataBuffer;
    }

    /**
     * @return the previousSegmentTerminatorSuffix
     */
    public SegmentTerminatorSuffixType getPreviousSegmentTerminatorSuffix() {
        return previousSegmentTerminatorSuffix;
    }

    /**
     * @param previousSegmentTerminatorSuffix the previousSegmentTerminatorSuffix to set
     */
    public void setPreviousSegmentTerminatorSuffix(
            SegmentTerminatorSuffixType previousSegmentTerminatorSuffix) {
        this.previousSegmentTerminatorSuffix = previousSegmentTerminatorSuffix;
    }

    /**
     * @return the currentGSSegment
     */
    public String getCurrentGSSegment() {
        return currentGSSegment;
    }

    /**
     * @param currentGSSegment the currentGSSegment to set
     */
    public void setCurrentGSSegment(String currentGSSegment) {
        this.currentGSSegment = currentGSSegment;
    }

    public Interchange beginInterchange() {        
        
        this.currenctInterchange = new Interchange(this.metaData.getIsaHeader());
        
        return currenctInterchange;
    }

    /**
     * @return the currenctInterchange
     */
    public Interchange getCurrenctInterchange() {
        return currenctInterchange;
    }
     
    public void beginGroup(
            String geSegmentDataString) throws X12EngineException {
        this.currentGroup = 
                new Group(
                    this.metaData,
                    this.getCurrenctInterchange(),
                    geSegmentDataString);
    }

    /**
     * @return the currentGroup
     */
    public Group getCurrentGroup() {
        return currentGroup;
    }
    
    public void beginTransactionSet(SegmentData stSegment){
        this.currentTransactionSet = new TransactionSet(stSegment); 
    }

    /**
     * @return the currentTransactionSet
     */
    public TransactionSet getCurrentTransactionSet() {
        return currentTransactionSet;
    }

    /*
    Determine current X12 reader is expecting any envelope segement
    (ISA,GS,ST,SE,GE,IEA)
    */
    public boolean isEnvelopeSegmentExpected(){
        if(null == this.currenctInterchange) return true;
        if(null == this.currentGroup) return true;
        return null == this.currentTransactionSet;
    }

    public Interchange closeInterchange(SegmentData closeInterchangeSegment) {
        Interchange ich = this.currenctInterchange;
        
        if(null == ich){
            this.debug("Current interchange has been closed already.");
            return null;
        }
        
        this.warn("Interchange %s closed........................", 
            ich.getInterchangeControlNumber());
                
        if(null != closeInterchangeSegment){
            ich.setIEASegment(closeInterchangeSegment);
        }
        
        this.currenctInterchange = null;
        return ich;        
    }

    public Group closeGroup(SegmentData geSegment) {
        Group group = this.currentGroup;
        
        if(null != group){
            group.setCloseSegment(geSegment);
        }
        
        this.currentGroup = null;
        return group;
    }

    public TransactionSet closeTransactionSet(SegmentData seSegment) {
        TransactionSet current = this.currentTransactionSet;
        
        if(null != current){
            current.setCloseSegment(seSegment);
        }
        
        this.currentTransactionSet = null;
        return current;
    }

    /**
     * @return the segmentPositionInTS
     */
    public int increaseSegmentPositionInTS() {
        segmentPositionInTS++;
        
        return segmentPositionInTS;
    } 

    public void resetSegmentPosition(){
        this.segmentPositionInTS = 0;
    }
}
