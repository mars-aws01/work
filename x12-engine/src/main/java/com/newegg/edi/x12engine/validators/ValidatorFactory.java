/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.schema.X12SegmentDefinition;

/**
 *
 * @author mm67
 */
@FunctionalInterface
public interface ValidatorFactory {
    Validator build(X12SegmentDefinition def);
}
