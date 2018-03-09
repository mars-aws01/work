/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

/**
 *
 * @author mm67
 */
public final class Constants {

    public static final String MODULE_CODE_SCHAM_LOADER = "SCHLDR";
    public static final String MODULE_CODE_X12_READER = "X12RDR";
    public static final String MODULE_CODE_X12_SCHEMA_VISITOR = "SCHVTR";
    public static final String MODULE_CODE_X12_DISASSEMBLER = "DISASM";
    public static final String MODULE_CODE_X12_ASSEMBLER = "ASMBLR";
    public static final String MODULE_CODE_LOOP = "LOOPPR";
    public static final String MODULE_CODE_EDI_XML_GENERATOR = "XMLGTR";
    public static final String MODULE_CODE_ACK_GENERATOR = "ACKGTR";
    
    public static final String MODULE_CODE_SCHAM_FINDER = "SCHFDR";
    public static final String MODULE_CODE_SCHAM_PVIDR = "SCHPDR";
    
    public static final String MODULE_CODE_INPUTSTREAM_FACTORY = "INPTSF";
    public static final String MODULE_CODE_OUTPUT_FILE_PATH_GTR = "OPTHGR";
    public static final String MODULE_CODE_MKABLE_INPUT_STREAM = "MKSTRM";
    public static final String MODULE_CODE_ENUMERATION_VALIDATOR = "EUMVLD";
    
    public static final int MINIMUM_VALUE = 0;
    public static final int NULL_VALUE = -1;
    public static final int UNLIMITED = -2;
    
    private Constants() {
        // Prevent instantiate
    }    
}
