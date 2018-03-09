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
public interface SchemaVisitorFactory {
    SchemaVisitor build(X12SchemaDefinition parameter);
}
