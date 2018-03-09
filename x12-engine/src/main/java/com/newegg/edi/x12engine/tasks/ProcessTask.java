/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.tasks;

/**
 *
 * @author mm67
 */
public class ProcessTask {
    
    public static final String TASK_TYPE_DISASSEMBLE = "Disassemble";
    public static final String TASK_TYPE_ASSEMBLE = "Assemble";
    
    private String taskId;
    private String taskType; // Disassemble / Assemble
     
    private String sourceFileLocation;
    private String sourceFileEncoding;
    private String sourceFileHash;
    
    private String localSchemaStore;
    
    private String sourceSchemaHash;   
    
    private String outputLocation;
    
    private boolean ediSchemaValidationEnabled;
    private boolean generateFunctionalAck;
    
    /**
     *  Disable the disassemble/assemble output,
     *  this will not product the output XML/X12 data file
     */
    private boolean forceDisableOutput;
    
    public ProcessTask(){
        
    }
    
    /**
     * For disassemble task
     * @param taskId
     * @param sourceFileLocation
     * @param localSchemaStore
     * @param outputLocation
     * @param generateFunctionalAck 
     */
    public ProcessTask(String taskId, 
        String sourceFileLocation, 
        String localSchemaStore,
        String outputLocation,
        boolean generateFunctionalAck){
                
        this.taskId = taskId;
        this.taskType = TASK_TYPE_DISASSEMBLE;
        this.sourceFileLocation = sourceFileLocation;
        this.localSchemaStore = localSchemaStore;
        this.generateFunctionalAck = generateFunctionalAck;     
        this.outputLocation = outputLocation;
    }
    
    /**
     * For assemble task
     * @param taskId
     * @param sourceFileLocation 
     * @param localSchemaStore 
     * @param outputLocation 
     */
    public ProcessTask(String taskId, 
        String sourceFileLocation, 
        String localSchemaStore,
        String outputLocation){
        
        this.taskId = taskId;
        this.taskType = TASK_TYPE_ASSEMBLE;
        this.sourceFileLocation = sourceFileLocation;
        this.localSchemaStore = localSchemaStore;   
        this.outputLocation = outputLocation;
    }

    /**
     * @return the taskId
     */
    public String getTaskId() {
        return taskId;
    }
 
    /**
     * @return the sourceFileLocation
     */
    public String getSourceFileLocation() {
        return sourceFileLocation;
    }
 

    /**
     * @return the sourceFileHash
     */
    public String getSourceFileHash() {
        return sourceFileHash;
    }
 
    /**
     * @return the sourceSchemaHash
     */
    public String getSourceSchemaHash() {
        return sourceSchemaHash;
    }

    /**
     * @return the taskType
     */
    public String getTaskType() {
        return taskType;
    }

    /**
     * @return the generateFunctionalAck
     */
    public boolean isGenerateFunctionalAck() {
        return generateFunctionalAck;
    } 

    /**
     * @param taskId the taskId to set
     */
    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    /**
     * @param taskType the taskType to set
     */
    public void setTaskType(String taskType) {
        this.taskType = taskType;
    }

    /**
     * @param sourceFileLocation the sourceFileLocation to set
     */
    public void setSourceFileLocation(String sourceFileLocation) {
        this.sourceFileLocation = sourceFileLocation;
    }

    /**
     * @param sourceFileHash the sourceFileHash to set
     */
    public void setSourceFileHash(String sourceFileHash) {
        this.sourceFileHash = sourceFileHash;
    }

    /**
     * @param sourceSchemaHash the sourceSchemaHash to set
     */
    public void setSourceSchemaHash(String sourceSchemaHash) {
        this.sourceSchemaHash = sourceSchemaHash;
    }

    /**
     * @param generateFunctionalAck the generateFunctionalAck to set
     */
    public void setGenerateFunctionalAck(boolean generateFunctionalAck) {
        this.generateFunctionalAck = generateFunctionalAck;
    }

    /**
     * @return the outputLocation
     */
    public String getOutputLocation() {
        return outputLocation;
    }

    /**
     * @param outputLocation the outputLocation to set
     */
    public void setOutputLocation(String outputLocation) {
        this.outputLocation = outputLocation;
    }

    /**
     * @return the localSchemaStore
     */
    public String getLocalSchemaStore() {
        return localSchemaStore;
    }

    /**
     * @param localSchemaStore the localSchemaStore to set
     */
    public void setLocalSchemaStore(String localSchemaStore) {
        this.localSchemaStore = localSchemaStore;
    }

    /**
     * @return the sourceFileEncoding
     */
    public String getSourceFileEncoding() {
         
        return sourceFileEncoding;
    }

    /**
     * @param sourceFileEncoding the sourceFileEncoding to set
     */
    public void setSourceFileEncoding(String sourceFileEncoding) {
        this.sourceFileEncoding = sourceFileEncoding;
    }

    /**
     * @return the ediSchemaValidationEnabled
     */
    public boolean isEdiSchemaValidationEnabled() {
        return ediSchemaValidationEnabled;
    }

    /**
     * @param ediSchemaValidationEnabled the ediSchemaValidationEnabled to set
     */
    public void setEdiSchemaValidationEnabled(boolean ediSchemaValidationEnabled) {
        this.ediSchemaValidationEnabled = ediSchemaValidationEnabled;
    }

    /**
     * @return the forceDisableOutput
     */
    public boolean isForceDisableOutput() {
        return forceDisableOutput;
    }

    /**
     * @param forceDisableOutput the forceDisableOutput to set
     */
    public void setForceDisableOutput(boolean forceDisableOutput) {
        this.forceDisableOutput = forceDisableOutput;
    }
}
