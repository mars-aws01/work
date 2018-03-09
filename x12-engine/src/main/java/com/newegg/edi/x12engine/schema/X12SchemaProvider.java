/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

/**
 * The interface for X12SchemaProvider, implement this interface to provide 
 functionality to retrieve X12SchemaDefinition from a certain data source,
 for example, from an X12SchemaDefinition YML file, or from X12Schema-
 Definition management API.
 * @author mm67
 */
public interface X12SchemaProvider {
    /**
     * Find a criteria by the given X12Schema Criteria
     * 
     * @param criteria
     * @return SchemaDefinition
     */
    X12SchemaDefinition search(X12SchemaCriteria criteria);
}
