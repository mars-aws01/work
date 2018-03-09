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
public class X12SchemaVisitorFactory implements SchemaVisitorFactory {

    @Override
    public SchemaVisitor build(X12SchemaDefinition parameter) {
        if(parameter == null){
            throw new IllegalArgumentException("The parameter cannot be null.");
        }
                
        return new X12SchemaVisitor(parameter);
    }
    
}
