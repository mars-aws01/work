/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.common;

import com.newegg.edi.x12engine.exceptions.X12EngineException;

/**
 *
 * @author mm67
 */
public class InterchangeHeader 
        extends SegmentData 
        implements InterchangeInfoContainer{
    
    public InterchangeHeader(
            X12MetaData metaData, 
            String segmentData) throws X12EngineException {
        
        super(metaData, segmentData);
    }
    
    public String getAuthorizationInformationQualifier()
    {
            return getDataElement(X12Standard.ISA01_ELEMENT_INDEX);
    }
    public String getAuthorizationInformation()
    {
            return getDataElement(X12Standard.ISA02_ELEMENT_INDEX);
    }
    public String getSecurityInformationQualifier()
    {
            return getDataElement(X12Standard.ISA03_ELEMENT_INDEX);
    }
    public String getSecurityInformation()
    {
            return getDataElement(X12Standard.ISA04_ELEMENT_INDEX);
    }

    @Override
    public String getSenderIdQualifier()
    {
            return getDataElement(X12Standard.ISA05_ELEMENT_INDEX);
    }

    @Override
    public String getSenderId()
    {
            return getDataElement(X12Standard.ISA06_ELEMENT_INDEX);
    }

    @Override
    public String getReceiverIdQualifier()
    {
            return getDataElement(X12Standard.ISA07_ELEMENT_INDEX); 
    }

    @Override
    public String getReceiverId()
    {
            return getDataElement(X12Standard.ISA08_ELEMENT_INDEX); 
    }

    public String getInterchangeDate()
    {
            return getDataElement(X12Standard.ISA09_ELEMENT_INDEX);
    }
    public String getInterchangeTime()
    {
            return getDataElement(X12Standard.ISA10_ELEMENT_INDEX);
    }
    public String getRepetitionSeparatorUsage()
    {
            return getDataElement(X12Standard.ISA11_ELEMENT_INDEX);
    }

    @Override
    public String getControlVersion()
    {
            return getDataElement(X12Standard.ISA12_ELEMENT_INDEX); 
    }

    @Override
    public String getInterchangeControlNumber()
    {
            return getDataElement(X12Standard.ISA13_ELEMENT_INDEX);
    }

    public String getTA1Required()
    {
            return getDataElement(X12Standard.ISA14_ELEMENT_INDEX);
    }
    public String getInterchangeIndicator()
    {
            return getDataElement(X12Standard.ISA15_ELEMENT_INDEX);
    }
    public String getComponentElementSeparator()
    {
            return getDataElement(X12Standard.ISA16_ELEMENT_INDEX);
    } 
}
