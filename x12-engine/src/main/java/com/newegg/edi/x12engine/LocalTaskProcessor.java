/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine;

import com.newegg.edi.x12engine.ack.FunctionalAckGenerationContext;
import com.newegg.edi.x12engine.ack.FunctionalAckGenerator;
import com.newegg.edi.x12engine.assemble.OfflineControlNumberGenerator;
import com.newegg.edi.x12engine.disassemble.Disassembler;
import com.newegg.edi.x12engine.disassemble.X12Disassembler;
import com.newegg.edi.x12engine.disassemble.X12DisassemblerSetting;
import com.newegg.edi.x12engine.disassemble.edixml.EdiX12XmlGenerator;
import com.newegg.edi.x12engine.disassemble.edixml.EdiXmlGenerator;
import com.newegg.edi.x12engine.disassemble.edixml.EdiXmlGeneratorSetting;
import com.newegg.edi.x12engine.disassemble.events.DisassembleResultReportEvent;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultContainer;
import com.newegg.edi.x12engine.exceptions.ArgumentException;
import com.newegg.edi.x12engine.exceptions.X12EngineException;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import com.newegg.edi.x12engine.parsing.X12Reader;
import com.newegg.edi.x12engine.parsing.X12ReaderSetting;
import com.newegg.edi.x12engine.schema.LocalSchemaProvider;
import com.newegg.edi.x12engine.schema.X12SchemaVisitorFactory;
import com.newegg.edi.x12engine.tasks.ProcessTask;
import com.newegg.edi.x12engine.util.ArgumentContainer;
import com.newegg.edi.x12engine.util.FileInputStreamFactory;
import com.newegg.edi.x12engine.util.FileInputStreamReaderFactory;
import com.newegg.edi.x12engine.util.FileOutputStreamFactory;
import com.newegg.edi.x12engine.util.InputStreamReaderFactory;
import com.newegg.edi.x12engine.util.MarkableFileInputStreamFactory;
import com.newegg.edi.x12engine.util.NullOutputStreamFactory;
import com.newegg.edi.x12engine.util.OutputFilePathGenerator;
import com.newegg.edi.x12engine.util.OutputStreamFactory;
import com.newegg.edi.x12engine.util.PathGenerator;
import com.newegg.edi.x12engine.validators.DefaultValidatorFactory;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import org.yaml.snakeyaml.Yaml;

/**
 *
 * @author mm67
 */
public class LocalTaskProcessor implements TaskProcessor {
    
    private final Logger log = LoggerBuilder.getLogger("LCATSK");
       
    @Override
    public void Process(ArgumentContainer arguments) {
        // Deserialize ProcessTask from argument
        String taskFilePath = arguments.getArgumentValue(
            ArgumentContainer.LOCAL_TASK_ARGUMENT
            ); 
        
        try{
            
            initializeGlobalSetting(arguments);
            
            ProcessTask task = this.getTask(taskFilePath);
            
            execute(task);
            
        }
        catch(ArgumentException | IOException | URISyntaxException ex){
            log.error(ex);
        }
    }
    
    private ProcessTask getTask(String taskFilePath) 
        throws MalformedURLException, 
        URISyntaxException, 
        IOException,
        ArgumentException{
        
        log.info("Loading local task file: %s", taskFilePath);
        
        try(FileInputStream stream = new FileInputStream(
            new File(taskFilePath))){
            Yaml yaml = new Yaml();
            
            ProcessTask task = yaml.loadAs(stream, ProcessTask.class);
            
            if(null == task){
                throw new ArgumentException("Failed to load local task.");
            }
                       
            logTaskSummary(task);
            
            return task;
        }
    }

    private void logTaskSummary(ProcessTask task) {
        log.info("Task [ID:%s] was Loaded: ", 
            task.getTaskId());

        log.info("Task Summary:");
        log.info("  Task Type               : %s", task.getTaskType());
        log.info("  Source File             : %s", task.getSourceFileLocation());
        log.info("  Source File Encoding    : %s", task.getSourceFileEncoding());
        log.info("  Local Schema Store      : %s", task.getLocalSchemaStore());
        log.info("  Output Location         : %s", task.getOutputLocation());
        log.info("  Generate Functional ACK : %s", task.isGenerateFunctionalAck());
        log.info("  EDI Schema Validation   : %s", task.isEdiSchemaValidationEnabled());
    }

    private void execute(ProcessTask task) throws IOException {
        
        X12DisassemblerSetting setting = 
            new X12DisassemblerSetting();
        
        setting.setPerformEdiSchemaValidation(
            task.isEdiSchemaValidationEnabled()
            );
         
        EdiXmlGeneratorSetting genSetting = 
            new EdiXmlGeneratorSetting();
        
        genSetting.setOutputLocation(
            task.getOutputLocation());
        
        X12ReaderSetting readerSetting = 
            new X12ReaderSetting(
                task.getSourceFileEncoding(),
                task.getSourceFileLocation());
         
        try(
            final X12Reader readerInstance = new X12Reader(
                                    readerSetting, 
                                    buildInputFileStreamFactory());
            
            final Disassembler disassembler = new X12Disassembler(
                setting,
                new X12SchemaVisitorFactory(),
                new DefaultValidatorFactory(),
                ()-> readerInstance,
                ()-> new EdiX12XmlGenerator(genSetting, 
                            buildOutputStreamFactory(task),
                            buildPathGenerator()),
                ()-> new LocalSchemaProvider()
            );
            )
        { 
            if(task.isGenerateFunctionalAck()){
                disassembler.setResultReportEventHanlder(
                    e->resultReportEventHanlder(e, task));
            }

            disassembler.initialize(); 
            
            try {      
                disassembler.execute();                
            } catch (X12EngineException ex) {
                log.error(ex);
            }       
        } 
    }

    private void initializeGlobalSetting(ArgumentContainer arguments) {
        
        GlobalSetting setting = GlobalSetting.getInstance();
        setting.initialize(arguments);               
                
        setting.setSchemaFileNamePrefix("X12");
        setting.setSchemaFileNameSuffix("Schema.yml");
        
    }
    
    private void resultReportEventHanlder(
        DisassembleResultReportEvent e,
        ProcessTask task){
        ValidationResultContainer resultContainer = e.getResult();
        
        EdiXmlGeneratorSetting xmlGeneratorSetting = new EdiXmlGeneratorSetting();
        
        xmlGeneratorSetting.setOutputLocation(
            task.getOutputLocation());
        
        xmlGeneratorSetting.setDocumentRoot(
            FunctionalAckGenerator.DEFAULT_DOCUMENT_ROOT);
                 
        
        EdiXmlGenerator ediXmlGenerator =
            new EdiX12XmlGenerator(xmlGeneratorSetting,
                buildOutputStreamFactoryForFA(task),
                buildPathGenerator());
        
        FunctionalAckGenerationContext ctx =
            new FunctionalAckGenerationContext(
                ediXmlGenerator, 
                new OfflineControlNumberGenerator()
            );
        
        FunctionalAckGenerator ackGenerator = new FunctionalAckGenerator(ctx);
        
        try {
            
            ackGenerator.generate(resultContainer);
            
        } catch (X12EngineException ex) {
            log.error(ex);
        }
    }
    
    private OutputStreamFactory buildOutputStreamFactoryForFA(ProcessTask task) {
        
        if(!task.isGenerateFunctionalAck()){
            return new NullOutputStreamFactory();
        }
        
        return buildOutputStreamFactory(task);
    }

    private OutputStreamFactory buildOutputStreamFactory(ProcessTask task) {
        if(task.isForceDisableOutput()){
            
            log.warn("Output disabled by task, "
                + "use NullOutputStreamFactory, "
                + "will NOT generating output data!");
            
            return new NullOutputStreamFactory();
        }
        return new FileOutputStreamFactory();
    } 

    private PathGenerator buildPathGenerator() {
        return new OutputFilePathGenerator();
    }

    private InputStreamReaderFactory buildInputFileStreamFactory() {
        return new FileInputStreamReaderFactory(
            new FileInputStreamFactory()
        );
    }
}
