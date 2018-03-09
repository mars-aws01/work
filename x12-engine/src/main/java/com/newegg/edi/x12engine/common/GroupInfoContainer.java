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
public interface GroupInfoContainer extends Serializable {

    String getControlVersion();

    /*
    GS01
     */
    String getFunctionalIdentifierCode();

    /*
    GS06
     */
    String getGroupControlNumber();

    /*
    GS03
     */
    String getReceiverId();

    /*
    GS02
     */
    String getSenderId();
    
}
