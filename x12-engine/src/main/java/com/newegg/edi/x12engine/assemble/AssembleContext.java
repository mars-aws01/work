package com.newegg.edi.x12engine.assemble;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.common.ContextBase;
import com.newegg.edi.x12engine.common.X12PartnershipInfoContainer;
import com.newegg.edi.x12engine.common.X12Profile;
import com.newegg.edi.x12engine.schema.SchemaVisitorFactory;

import java.util.HashMap;
import java.util.List;

/**
 * The Context class contains data or generators that X12 Assembler needed.
 */
public class AssembleContext  extends ContextBase {

    // Contains the X12 profile used to generate X12 file content.
    private X12Profile profile;

    // Contains partnership used to retrieve multiple resources
    private X12PartnershipInfoContainer partnership;

    // Control Number Generators
    private HashMap<ControlNumberGeneratorType, ControlNumberGenerator> generators =
            new HashMap<>();

    // The EDI X12 Schema Visitor Factory
    private SchemaVisitorFactory schemaVisitorFactory;

    // Contains a list of EDI XML file url
    private List<String> ediXmlList;

    // Store the generated interchange control number.
    private String interchangeControlNumber;

    public AssembleContext(
            X12Profile profile,
            X12PartnershipInfoContainer partnership,
            SchemaVisitorFactory schemaVisitorFactory,
            ControlNumberGeneratorFactory generatorFactory){
        super(Constants.MODULE_CODE_X12_ASSEMBLER);
        this.profile = profile;
        this.partnership = partnership;
        this.schemaVisitorFactory = schemaVisitorFactory;

        this.generators.put(
                ControlNumberGeneratorType.Interchange,
                generatorFactory.getGenerator(
                        ControlNumberGeneratorType.Interchange,
                        profile.getInterchangeControlNumberLength()));

        this.generators.put(
                ControlNumberGeneratorType.Group,
                generatorFactory.getGenerator(
                        ControlNumberGeneratorType.Group,
                        profile.getGroupControlNumberLength()));

        this.generators.put(
                ControlNumberGeneratorType.TransactionSet,
                generatorFactory.getGenerator(
                        ControlNumberGeneratorType.TransactionSet,
                        profile.getTransactionSetControlNumberLength()));
    }

    public String generateControlNumber(ControlNumberGeneratorType type){
        return this.generators.get(type).getControlNumber(this.partnership);
    }

    public List<String> generateControlNumberList(ControlNumberGeneratorType type, int count){
        return this.generators.get(type).getControlNumberList(this.partnership, count);
    }

    public X12Profile getProfile() {
        return profile;
    }

    public X12PartnershipInfoContainer getPartnership() {
        return partnership;
    }

    public List<String> getEdiXmlList() {
        return ediXmlList;
    }

    public SchemaVisitorFactory getSchemaVisitorFactory() {
        return schemaVisitorFactory;
    }

    public void generateInterchangeControlNumber(){
        this.interchangeControlNumber =
                this.generateControlNumber(ControlNumberGeneratorType.Interchange);

        this.debug("Generated Interchange Control Number is %s", this.interchangeControlNumber);
    }

    public String getInterchangeControlNumber(){
        return this.interchangeControlNumber;
    }
}
