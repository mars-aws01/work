/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.disassemble.DisassembleContext;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import java.io.IOException;
import java.util.List;
import org.junit.Assert;
import org.junit.Test;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when; 

/**
 *
 * @author mm67
 */
public class MissingSegmentValidationTest extends ShipNoticeValidationTestBase{

    @Override
    protected void fakeOutputStream() throws IOException{
        when(fakeOutputStreamFactory.getOutputStream(any()))
            .thenReturn(outputStreamEdiXml1);
    }

    @Override
    protected String getTestX12Content() {
        final String X12_DATA = 
"ISA*00*          *00*          *01*004919486CA    *ZZ*5626958823CVF  *170404*1516*U*00401*000119072*0*P*>~\n" +
"GS*SH*004919486CA*5626958823CVF*20170404*1516*25050*X*004010~\n" +
"ST*856*250500001~\n" +
//"BSN*00*4017734112017040*20170404*151008~\n" +
"HL*1*0*S*1~\n" +
"TD1*CTN*1****G*1*LB~\n" +
"TD5*O*2*PRLA*M*PURO GRND~\n" +
"REF*CN*JFV245892153~\n" +
"DTM*011*20170404~\n" +
"N1*SF*INGRAM MICRO  CANADA*91*40~\n" +
"N3*INGRAM MICRO  CANADA*88 FOSTER CRESCENT~\n" +
"N4*MISSISSAUGA*ON*L5R4A2*CA~\n" +
"N1*ST*MUJEEBUR SULAIMALEBBE~\n" +
"N3*880 ELLESMERE ROAD UNIT 106~\n" +
"N4*SCARBOROUGH*ON*M1P2W6*CA~\n" +
"HL*2*1*O*1~\n" +
"PRF*101-292842576***20170404~\n" +
"REF*IV*401773411~\n" +
"HL*3*2*P*1~\n" +
"TD1*CTN*1****G*1*LB~\n" +
"REF*2I*JFV245892153~\n" +
"HL*4*3*I*0~\n" +
"LIN*000001*VP*8397DD*MG*USB433ACD1X1*BP*0XM-0076-000*UP*0065030863773~\n" +
"SN1**1*EA**1*EA**AC~\n" +
"PID*X****DUAL-BAND NANO WL ADAPTER      WRLS 1~\n" +
"CTT*5*1~\n" +
"SE*29*250500001~\n" +
"GE*1*25050~\n" +
"IEA*1*000119072~";    
        
        return X12_DATA;
    }
    
    private ValidationResultContainer resultContainer = null;
     
    @Test
    public void test_missing_mandatory_segment() throws X12EngineException {
        
        this.fakePathGenerator();
        
        this.disassembler.setResultReportEventHanlder(
            e->{
                ValidationResultContainer result = e.getResult();
                DisassembleContext ctx = e.getCtx();
                
                dumpValidationResult(result);
                resultContainer = result;
            }
        );
        
        this.disassembler.initialize();
        this.disassembler.execute();
        
        Assert.assertNotNull(resultContainer);
        
        Assert.assertEquals("00401",resultContainer.getControlVersion());
        Assert.assertEquals("000119072",resultContainer.getInterchangeControlNumber());
        
        Assert.assertEquals("01",resultContainer.getSenderIdQualifier());
        Assert.assertEquals("004919486CA    ",resultContainer.getSenderId());
        Assert.assertEquals("ZZ",resultContainer.getReceiverIdQualifier());
        Assert.assertEquals("5626958823CVF  ",resultContainer.getReceiverId());
        
        List<ValidationResultGroup> groups = resultContainer.getValidationResultGroupList();
        
        Assert.assertNotNull(groups);
        Assert.assertEquals(1, groups.size());
        
        ValidationResultGroup group = groups.get(0);
        
        Assert.assertEquals("SH", group.getFunctionalIdentifierCode());
        Assert.assertEquals("25050", group.getGroupControlNumber());
        Assert.assertEquals("004010", group.getControlVersion());
        Assert.assertEquals("004919486CA",group.getSenderId());
        Assert.assertEquals("5626958823CVF",group.getReceiverId());
        
        List<ValidationResultTransactionSet> tsList = group.getTransactionSetList();
        
        Assert.assertNotNull(tsList);
        Assert.assertEquals(1, tsList.size());
        
        ValidationResultTransactionSet ts = tsList.get(0);
        
        Assert.assertEquals("856", ts.getTransactionSetType());
        Assert.assertEquals("250500001", ts.getControlNumber());
        
        List<ValidationResultEntry> resultList = ts.getResultEntryList();
        
        Assert.assertNotNull(resultList);
        Assert.assertEquals(1, resultList.size());
        
        ValidationResultEntry result = resultList.get(0);
        
        Assert.assertEquals("BSN",result.getSegmentName());
        Assert.assertEquals(2, result.getSegmentPosition());
        Assert.assertEquals(Constants.NULL_VALUE, result.getElementPosition());
        Assert.assertEquals(Constants.NULL_VALUE, result.getComponentPosition());
        
        Assert.assertEquals(
            ValidationErrorCode.SEGMENT_LEVEL_MANDATORY_SEGMENT_MISSING,
            result.getErrorCode());
        
        Assert.assertEquals(ValidationResultType.SEGMENT,
            result.getResultType());
        
    }
}
