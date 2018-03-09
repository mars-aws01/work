/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.assemble;

import com.newegg.edi.x12engine.common.X12PartnershipInfoContainer;
import java.util.List;

/**
 *
 * @author mm67
 */
public interface ControlNumberGenerator {

    ControlNumberGeneratorType getType();

    /**
     * Retrieve single control number
     * @param partnership
     * @return
     */
    String getControlNumber(X12PartnershipInfoContainer partnership);
    
    /**
     * Retrieve a list of control numbers
     * @param partnership
     * @param count How many control numbers should be retrieved
     * @return A list of generated control numbers
     */
    List<String> getControlNumberList(X12PartnershipInfoContainer partnership, int count);
    
}
