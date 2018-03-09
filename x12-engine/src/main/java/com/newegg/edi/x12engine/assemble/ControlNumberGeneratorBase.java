/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.assemble;

import com.newegg.edi.x12engine.common.X12Profile;

/**
 *
 * @author mm67
 */
public abstract class ControlNumberGeneratorBase {
    public static final long MAX_CTRL_NUMBER = 99999999;
    public static final long MIN_CTRL_NUMBER = 1;


    private ControlNumberGeneratorType type;
    private int length = X12Profile.DEFAULT_CONTROL_NUMBER_LENGTH;

    public ControlNumberGeneratorType getType(){
        return this.type;
    }

    public void setType(ControlNumberGeneratorType type) {
        this.type = type;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }
}
