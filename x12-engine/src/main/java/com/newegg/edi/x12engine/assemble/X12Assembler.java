package com.newegg.edi.x12engine.assemble;

import com.newegg.edi.x12engine.exceptions.X12EngineException;

import java.io.IOException;

public class X12Assembler implements Assembler {
    private AssembleContext ctx;

    @Override
    public void close() throws IOException {

    }

    @Override
    public void execute() throws X12EngineException {
        // Basic validation on context

        // Generate interchange control number
        this.ctx.generateInterchangeControlNumber();

        // Create X12 Writer

        // Write X12 Headers (Profile and generated interchange control number)
        // Indicating the interchange begins

        // Initialize a queue to store EDI XML and its business type

        for (String ediXmlUrl : this.ctx.getEdiXmlList()){
            // Load EDI XML, determine the business type (Document Root / TransactionSetType)
            // Determine the Functional Identifier Code for the beginning of a group

            // If current group is not set (The first group)
            //      Create group with profile (Generate group control number)

            // Else
            //      If group type (Functional Identifier Code) match with EDI XML business type
            //

        }
    }

    @Override
    public void initialize() {
        // done some initialize stuff
    }
}
