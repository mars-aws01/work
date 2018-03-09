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
public class GeneralControlNumberGenerator
    extends ControlNumberGeneratorBase
    implements ControlNumberGenerator {

    @Override
    public String getControlNumber(
        X12PartnershipInfoContainer partnership) {
        
        List<String> controlNumber = 
            getControlNumberList(partnership, 1);
        
        return controlNumber.get(0);
    }

    @Override
    public List<String> getControlNumberList(
        X12PartnershipInfoContainer partnership, int count) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
