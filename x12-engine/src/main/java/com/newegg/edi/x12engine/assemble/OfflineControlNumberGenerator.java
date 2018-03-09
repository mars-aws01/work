/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.assemble;

import com.newegg.edi.x12engine.common.X12PartnershipInfoContainer;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author mm67
 */
public class OfflineControlNumberGenerator 
        extends ControlNumberGeneratorBase
        implements ControlNumberGenerator{

    @Override
    public String getControlNumber(X12PartnershipInfoContainer partnership) {
        return generateNumberString(1, this.getLength());
    }
    
    private String generateNumberString(int number, int width){
        return String.format("%0"+width+"d", number);
    }

    @Override
    public List<String> getControlNumberList(X12PartnershipInfoContainer partnership, int count) {
        
        List<String> controlNumberList = new ArrayList<>();
        
        for(int i = 0; i< count; i++){
            controlNumberList.add(generateNumberString(i+1, this.getLength()));
        }
        return controlNumberList;
    }
}
