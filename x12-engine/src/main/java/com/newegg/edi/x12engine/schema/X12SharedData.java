/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.schema;

import java.util.List;

/**
 *
 * @author mm67
 */
public class X12SharedData {
    private List<CodeDefinition> codes;

    /**
     * @return the codes
     */
    public List<CodeDefinition> getCodes() {
        return codes;
    }

    /**
     * @param codes the codes to set
     */
    public void setCodes(List<CodeDefinition> codes) {
        this.codes = codes;
    }
}
