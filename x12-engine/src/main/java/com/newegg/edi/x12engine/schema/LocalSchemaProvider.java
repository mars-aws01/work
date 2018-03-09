/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import java.io.File;
import java.io.IOException;
import java.net.URISyntaxException;
import java.nio.file.Paths; 

/**
 *
 * @author mm67
 */
public class LocalSchemaProvider implements X12SchemaProvider{
    
    private final Logger logger = 
        LoggerBuilder.getLogger(Constants.MODULE_CODE_SCHAM_PVIDR);

    @Override
    public X12SchemaDefinition search(X12SchemaCriteria criteria){
        
        try {
            // Ensure local schema store location exists
            String schemaLocation = criteria.getSchemaStore();
            
            // targetSchema File name will be generated by the criteria
            String schemaFileName = buildTargetSchemaName(criteria);
            
            String schemaPath = Paths.get(schemaLocation, schemaFileName)
                .toString();
            
            logger.debug("Loading schema from [%s] ...", schemaPath);
            
            return X12SchemaLoader.loadSchema(new File(schemaPath));
            
        } catch (IOException | URISyntaxException ex) {            
            logger.error(ex);
            
        }
        
        return null;
    }

    private String buildTargetSchemaName(X12SchemaCriteria criteria) {
        // X12 + _ + 00401 + _ + FA + _ + Schema.yml
        return criteria.getSchemaFileNamePrefix() + 
            "_" + criteria.getGroupControlVersion() + 
            "_" + criteria.getFunctionalIdentifierCode() + 
            "_" + criteria.getSchemaFileNameSuffix();
    }
    
}
