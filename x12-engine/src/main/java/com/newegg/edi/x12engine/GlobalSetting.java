/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine;

import com.newegg.edi.x12engine.util.ArgumentContainer;

/**
 *
 * @author mm67
 */
public class GlobalSetting {
    
    public static final String CMDARG_SCHEMA_STORE = "schema-store";
    public static final String CMDARG_DEBUG = "debug";
     
    private String schemaStore;
    private String schemaFileNamePrefix;
    private String schemaFileNameSuffix;
    
    private boolean debugLogEnabled;
     
    private static GlobalSetting setting;
    
    public static void initialize(GlobalSetting settingInstance){
        setting = settingInstance;
    }
    
    public void initialize(ArgumentContainer arguments){
        this.setSchemaStore(
            arguments.getArgumentValue(CMDARG_SCHEMA_STORE));
        
        this.setDebugLogEnabled(
            "true".equalsIgnoreCase(
                arguments.getArgumentValue(CMDARG_DEBUG, "false")));
    }
    
    public static GlobalSetting getInstance(){ 
        
        if(null == setting){
            setting = new GlobalSetting();
            setting.setSchemaFileNamePrefix("X12");
            setting.setSchemaFileNameSuffix("_Schema.yml");
            setting.setDebugLogEnabled(true);
        }
        
        return setting;
    } 

    /**
     * @return the schemaFileNamePrefix
     */
    public String getSchemaFileNamePrefix() {
        return schemaFileNamePrefix;
    }

    /**
     * @param schemaFileNamePrefix the schemaFileNamePrefix to set
     */
    public void setSchemaFileNamePrefix(String schemaFileNamePrefix) {
        this.schemaFileNamePrefix = schemaFileNamePrefix;
    }

    /**
     * @return the schemaFileNameSuffix
     */
    public String getSchemaFileNameSuffix() {
        return schemaFileNameSuffix;
    }

    /**
     * @param schemaFileNameSuffix the schemaFileNameSuffix to set
     */
    public void setSchemaFileNameSuffix(String schemaFileNameSuffix) {
        this.schemaFileNameSuffix = schemaFileNameSuffix;
    }

    /**
     * @return the schemaStore
     */
    public String getSchemaStore() {
        return schemaStore;
    }

    /**
     * @param schemaStore the schemaStore to set
     */
    public void setSchemaStore(String schemaStore) {
        this.schemaStore = schemaStore;
    }

    /**
     * @return the debugLogEnabled
     */
    public boolean isDebugLogEnabled() {
        return debugLogEnabled;
    }

    /**
     * @param debugLogEnabled the debugLogEnabled to set
     */
    public void setDebugLogEnabled(boolean debugLogEnabled) {
        this.debugLogEnabled = debugLogEnabled;
    }
}
