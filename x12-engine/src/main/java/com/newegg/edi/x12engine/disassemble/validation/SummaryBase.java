/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

/**
 *
 * @author mm67
 */
public abstract class SummaryBase {

    protected String ackCode;
    private String errorCode1;
    private String errorCode2;
    private String errorCode3;
    private String errorCode4;
    private String errorCode5;

    /**
     * @return the ackCode
     */
    public String getAckCode() {
        return ackCode;
    }

    /**
     * @param ackCode the ackCode to set
     */
    public void setAckCode(String ackCode) {
        this.ackCode = ackCode;
    }
    
   

    /**
     * @return the errorCode1
     */
    public String getErrorCode1() {
        return errorCode1;
    }

    /**
     * @param errorCode1 the errorCode1 to set
     */
    public void setErrorCode1(String errorCode1) {
        this.errorCode1 = errorCode1;
    }

    /**
     * @return the errorCode2
     */
    public String getErrorCode2() {
        return errorCode2;
    }

    /**
     * @param errorCode2 the errorCode2 to set
     */
    public void setErrorCode2(String errorCode2) {
        this.errorCode2 = errorCode2;
    }

    /**
     * @return the errorCode3
     */
    public String getErrorCode3() {
        return errorCode3;
    }

    /**
     * @param errorCode3 the errorCode3 to set
     */
    public void setErrorCode3(String errorCode3) {
        this.errorCode3 = errorCode3;
    }

    /**
     * @return the errorCode4
     */
    public String getErrorCode4() {
        return errorCode4;
    }

    /**
     * @param errorCode4 the errorCode4 to set
     */
    public void setErrorCode4(String errorCode4) {
        this.errorCode4 = errorCode4;
    }

    /**
     * @return the errorCode5
     */
    public String getErrorCode5() {
        return errorCode5;
    }

    /**
     * @param errorCode5 the errorCode5 to set
     */
    public void setErrorCode5(String errorCode5) {
        this.errorCode5 = errorCode5;
    }
    
}
