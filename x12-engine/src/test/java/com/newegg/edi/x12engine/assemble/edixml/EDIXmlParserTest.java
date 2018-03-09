/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.assemble.edixml;

import com.newegg.edi.x12engine.assemble.TransactionSetAssembler;
import com.newegg.edi.x12engine.schema.X12SchemaVisitor;
import com.newegg.edi.x12engine.util.TestBase;
import java.io.File;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.junit.Test;

/**
 *
 * @author mm67
 */
public class EDIXmlParserTest extends TestBase {
    
    private static final String EDI_XML_846_S = "edi-xml/X12_00401_846_001.xml";
    
    @Test
    public void testParsingEDIXml(){
        
        try{

            X12SchemaVisitor visitor = new X12SchemaVisitor(
                    super.getSchemaFromFile(SchemaFile846));

            visitor.initialize();

            File ediXmlFile = super.getSampleFile(EDI_XML_846_S);
            
            SAXParserFactory factory = SAXParserFactory.newInstance();
            SAXParser saxParser = factory.newSAXParser();
            
            TransactionSetAssembler handler = new TransactionSetAssembler();
            handler.setVisitor(visitor);
            saxParser.parse(ediXmlFile, handler);            
            
        } catch(Exception ex){
            ex.printStackTrace();
        }
        
    }
}
