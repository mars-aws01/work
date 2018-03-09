/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

import java.io.Serializable;

/**
 *
 * @author mm67
 */
public interface SegmentDataInfoContainer extends Serializable {

    int getDataCount();

    /**
     * @return the name
     */
    String getName();
    //
    //    /**
    //     * @param name the name to set
    //     */
    //    public void setName(String name) {
    //        this.name = name;
    //    }

    /**
     * @return the originalSegmentData
     */
    String getOriginalSegmentData();

    /**
     * Get the position of this segment within a transaction set
     * @return the position
     */
    int getPosition();
    
}
