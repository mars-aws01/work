/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.validation;

import com.newegg.edi.x12engine.disassemble.disassembler.X12DisassemblerTestBase;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import com.newegg.edi.x12engine.validators.DefaultValidatorFactory;
import com.newegg.edi.x12engine.validators.ValidatorFactory;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.URISyntaxException;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 *
 * @author mm67
 */
public abstract class ShipNoticeValidationTestBase extends X12DisassemblerTestBase {
 
    @Override
    protected ValidatorFactory getValidatorFactory(){
        return new DefaultValidatorFactory();
    }
    
    @Override
    protected void fakeSchema()
     throws FileNotFoundException, IOException, URISyntaxException {
       X12SchemaDefinition schema = buildFakeSchema(SchemaFileName_0401_856);
       when(fakeX12SchemaProvider.search(any())).thenReturn(schema); 
    }
    
    protected void dumpValidationResult(ValidationResultContainer result){
        testOutput("Validation Result report for Interchange [%s] Group Count: %d",
                        result.getInterchangeControlNumber(),
                        result.getValidationResultGroupList().size());
        
        result.getValidationResultGroupList().stream().map((group) -> {
            
            testOutput(String.format(" >>>Result: %s", 
                group.toString()));
            
            return group;          
            
        }).forEachOrdered((group) -> {
            
            group.getTransactionSetList().stream().map((ts) -> {
                testOutput(String.format("    >>>Result: %s", 
                    ts.toString()));
                
                return ts;            
                
            }).forEachOrdered((ts) -> {
                
                ts.getResultEntryList().forEach((entry) -> {
                    
                    testOutput(String.format("[%s(POS:[%d]/%d)] MSG: %s",   
                        entry.getSegmentName(),
                        entry.getElementPosition(),
                        entry.getSegmentPosition(), 
                        entry.getResultMessage()));
                });
            });
        });
    }
}
