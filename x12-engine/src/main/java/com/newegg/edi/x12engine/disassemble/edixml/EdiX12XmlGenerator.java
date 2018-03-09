/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.disassemble.edixml;

import com.newegg.edi.x12engine.common.Constants; 
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import com.newegg.edi.x12engine.util.OutputFilePathGenerator;
import com.newegg.edi.x12engine.util.OutputStreamFactory;
import com.newegg.edi.x12engine.util.PathGenerator;
import com.newegg.edi.x12engine.util.StringExtension;
import java.io.IOException;
import java.io.OutputStream;
import java.util.ArrayDeque;
import java.util.Deque;
import javax.xml.stream.XMLOutputFactory;
import javax.xml.stream.XMLStreamException;
import javax.xml.stream.XMLStreamWriter;

/**
 * The X12 EDI XML generator implementation
 * @author mm67
 */
public class EdiX12XmlGenerator implements EdiXmlGenerator{
    
    private final Logger logger;
    private final EdiXmlGeneratorSetting setting;
    
    private final OutputStreamFactory outputStreamFactory;
    private final PathGenerator outputFilePathGenerator;
    
    private OutputStream outputStream;     
    private XMLStreamWriter xmlStreamWriter; 
    private String outputFilePath;
    private final XMLOutputFactory xof = XMLOutputFactory.newInstance();
    private final Deque<String> elementNameStack = new ArrayDeque<>();
    private String transactionSetType;
    private String transactionSetControlNumber;
    
    public EdiX12XmlGenerator(
            EdiXmlGeneratorSetting setting, 
        OutputStreamFactory streamFactory,
        PathGenerator pathGenerator){
        this.setting = setting;
        this.logger = LoggerBuilder.getLogger(Constants.MODULE_CODE_EDI_XML_GENERATOR);
        this.outputStreamFactory = streamFactory;
        this.outputFilePathGenerator = pathGenerator;
    }

    @Override
    public EdiXmlGeneratorSetting getSetting() {
        return setting;
    }
    
    @Override
    public void createDocument(
            String transactionSetType, 
            String transactionSetControlNumber) throws X12EngineException {
                        
        try {
            
            outputFilePath = 
                generateOutputFilePath(
                        transactionSetType, 
                        transactionSetControlNumber);
            
            outputStream = this.outputStreamFactory.getOutputStream(
                outputFilePath);
            
            this.transactionSetType = transactionSetType;
            this.transactionSetControlNumber = transactionSetControlNumber;
            
            xmlStreamWriter =                 
                xof.createXMLStreamWriter(outputStream, 
                this.setting.getEncoding());      
            
            String documentRoot = this.getSetting().getDocumentRoot();
            
            xmlStreamWriter.writeStartElement(
                    documentRoot);
            
            elementNameStack.push(documentRoot);
            
            this.logger.debug(">>> Document [Root:%s] TS Type: %s "
                    + "Ctrl#: %s is ready for writing.",
                    documentRoot,
                    this.transactionSetType,
                    this.transactionSetControlNumber);
            
        } catch (IOException | XMLStreamException ex) {
            throw new X12EngineException(
                String.format(
                    "Failed to create document stream with "
                            + "root element %s due to %s",
                    this.getSetting().getDocumentRoot(),
                    ex.getMessage()),
                    ex
            );
        }
    }

    private String generateOutputFilePath(
        String transactionSetType, 
        String transactionSetControlNumber) throws IOException {
        
        String path = outputFilePathGenerator.getPath(
                transactionSetType, 
                transactionSetControlNumber, 
                setting.getOutputLocation());
        
        if(StringExtension.isNullOrWhitespace(path)){
            throw new IOException(
                String.format("Failed to generate output file path "
                    + "for transaction set %s [CTRL#:%s] at [%s]", 
                    transactionSetType,
                    transactionSetControlNumber,
                    setting.getOutputLocation())
            );
        }
        
        return path;
    }

    @Override
    public void writeStartElement(String name) throws X12EngineException {
        try {
            
            xmlStreamWriter.writeStartElement(name);
            elementNameStack.push(name);
            
        } catch (XMLStreamException ex) {
            throw new X12EngineException(
                String.format(
                    "Failed to write the start XML element for [%s] due to %s",
                    name,
                    ex.getMessage()),
                    ex
            );
        }
    }
    
    private void writeElementTextValue(String name, String text) 
        throws X12EngineException, XMLStreamException{
        boolean startElementIsSucceeded = false;
        try{
            xmlStreamWriter.writeStartElement(name);
            startElementIsSucceeded = true;

            xmlStreamWriter.writeCharacters(text);
        }
        catch(XMLStreamException ex){
            throw new X12EngineException(
                    String.format("Failed to write element [name: %s] "
                            + "with text value [%s] due to %s",
                            name,
                            text,
                            ex.getMessage()),
                ex
            );
        }
        finally{
            if(startElementIsSucceeded){
                // Make sure the started element is closed.
                xmlStreamWriter.writeEndElement();
            }
        }
    }
    
    @Override
    public <T> void writeElementWithValue(String name, T value) 
        throws X12EngineException {
        
        if(null == value){
            return;
        }
        
        writeElementWithText(name, value.toString());
        
    }
    
    @Override
    public void writeElementWithText(String name, String text) 
            throws X12EngineException {
        
        try{
            if(null == text){                
                return;
            } 
            
            writeElementTextValue(name, text);
        }
        catch(X12EngineException xex){
            throw xex;
        }
        catch(XMLStreamException ex){
            throw new X12EngineException(
                    String.format("Failed to write element [name: %s] "
                            + "with text value [%s] due to %s",
                            name,
                            text,
                            ex.getMessage()),
                ex
            );
        }        
    }

    @Override
    public void closeElement() throws X12EngineException {        
        if(elementNameStack.isEmpty()){
            throw new X12EngineException(
                    "There is no element can be ended."
            );
        }
        
        String currentElement = elementNameStack.pop();
        
        try {
            
            xmlStreamWriter.writeEndElement(); 
            
        } catch (XMLStreamException ex) {
            throw new X12EngineException(
                String.format(
                    "Failed to close XML element for [%s] (should be) due to %s",
                    currentElement,
                    ex.getMessage()),
                    ex
            );
        }
    }

    @Override
    public void closeDocument() throws X12EngineException  {
        logger.info(
            "Closing document %s [Type:%s Ctrl#:%s]", 
                this.getSetting().getDocumentRoot(),
                this.transactionSetType,
                this.transactionSetControlNumber);
        
        try{
            this.xmlStreamWriter.writeEndDocument();   
            this.xmlStreamWriter.flush();
            this.xmlStreamWriter.close();
            
            logger.info("File is ready : " + outputFilePath);
        }
        catch (XMLStreamException ex) {
            throw new X12EngineException(
                String.format(
                    "Failed to close Document Root for [%s] due to %s",
                    this.getSetting().getDocumentRoot(),
                    ex.getMessage()),
                    ex
            );
        } 
    }

    @Override
    public void saveDocument() throws X12EngineException {
        try
        { 
            logger.info("Saving current EDI XML document.");
            
            this.outputStream.flush();
            this.outputStream.close();
            
        } catch (IOException ex) {
            throw new X12EngineException(
                String.format(
                    "Failed to save document due to %s",
                    ex.getMessage()),
                    ex
            );
            
        }
    }         
}
