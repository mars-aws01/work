/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.GlobalSetting;
import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.common.Group;
import com.newegg.edi.x12engine.common.Interchange;
import com.newegg.edi.x12engine.common.InterchangeHeader;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;

/**
 *
 * @author mm67
 */
public class SchemaFinder {
    
    public static X12SchemaDefinition retrievingX12Schema(
            X12SchemaProvider schemaProvider,
            Interchange ich,
            Group group
            ) throws X12EngineException{
        
        Logger logger = LoggerBuilder.getLogger(Constants.MODULE_CODE_SCHAM_FINDER);
                
        logger.info("Retrieving X12DefinitionSchema by :");
         
        if(null == schemaProvider){
            throw new X12EngineException(
                "The X12SchemaProvider must be "
                        + "specified.");
        }
        
        X12SchemaCriteria criteria = buildSchemaCriteria(ich, group);
        // schemaProvider should throw X12EngineException when schema was not found.
        X12SchemaDefinition currentSchema = schemaProvider.search(
                criteria);
        
        if(null == currentSchema){
            throw new X12EngineException(
                    String.format("Unable to find schema by [%s]",
                            criteria));
        }
        
        
        logger.info("%s was retrieved successfully.", 
                currentSchema);
        
        return currentSchema;
    }

    private static X12SchemaCriteria buildSchemaCriteria(
            Interchange ich, 
            Group group) {
        
        InterchangeHeader header = ich.getHeader();
        
        X12SchemaCriteria criteria = new X12SchemaCriteria();
        
        criteria.setSenderIdQualifier(header.getSenderIdQualifier());
        criteria.setSenderId(header.getSenderId());
        criteria.setReceiverIdQualifier(header.getReceiverIdQualifier());
        criteria.setReceiverId(header.getReceiverId());
        
        criteria.setGroupSenderId(group.getSenderId());
        criteria.setGroupReceiverId(group.getReceiverId());
        
        criteria.setFunctionalIdentifierCode(group.getFunctionalIdentifierCode());
        criteria.setInterchangeControlVersion(header.getControlVersion());
        criteria.setGroupControlVersion(group.getControlVersion());
        
        criteria.setSchemaStore(GlobalSetting.getInstance().getSchemaStore());
        criteria.setSchemaFileNamePrefix(GlobalSetting.getInstance().getSchemaFileNamePrefix());
        criteria.setSchemaFileNameSuffix(GlobalSetting.getInstance().getSchemaFileNameSuffix());
         
        Logger logger = LoggerBuilder.getLogger(Constants.MODULE_CODE_SCHAM_FINDER);
        
        criteria.log(logger);
        
        return criteria;
    }
}
