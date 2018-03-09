/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.newegg.edi.x12engine.validators;

import com.newegg.edi.x12engine.common.Constants;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultEntry;
import com.newegg.edi.x12engine.disassemble.validation.ValidationResultType;
import com.newegg.edi.x12engine.exceptions.validation.ValidationErrorCode;
import com.newegg.edi.x12engine.logging.Logger;
import com.newegg.edi.x12engine.logging.LoggerBuilder;
import com.newegg.edi.x12engine.schema.CodeDefinition;
import com.newegg.edi.x12engine.schema.X12Restriction;
import com.newegg.edi.x12engine.schema.X12SchemaDefinition;
import com.newegg.edi.x12engine.util.CollectionExtension;
import com.newegg.edi.x12engine.util.StringExtension;
import java.util.HashSet;
import java.util.Optional;
import java.util.function.Supplier;

/**
 * Validate segment against predefined enumerations
 * if the restriction if the segment definition is something like this:
 * 
 * A) in-line enumeration restriction:
 * 
 *      restriction:
 *        targetDataType: Enum
 *        enumerations:
 *           - 856
 *        
 * B) referenced enumeration restriction:
 * 
 *      restriction:
 *        targetDataType: Enum
 *        referenceCode: TransactionSetTypeCode
 * 
 *   Note: the reference code for reference enumeration is defined in the 
 *         sharedData section of the schema.
 * 
 *   For example:
 *     sharedData:
 *       codes:
 *         - name: TransactionSetTypeCode
 *           values: ["810", "856", "855", "832", "846"]
 *             
 * 
 * @author mm67
 */
public class EnumerationValidator extends ValidatorBase implements Validator{
        
    private final Logger logger = 
        LoggerBuilder.getLogger(Constants.MODULE_CODE_ENUMERATION_VALIDATOR);
    
    @Override
    public void validate(ValidationContext ctx){
        
        if(isOptional(ctx) && isValueNullOrEmpty(ctx)){
            return;
        }
        
        if(isInvalidForRequiredCheck(ctx)){
            return;
        }
        
        if(isReferencedEnumeration(ctx)){
           
            validateAgainstReferencedEnumerations(ctx);
            return;
        }
        
        if(isInlineEnumeration(ctx)){            
            validateAgainstInlineEnumerations(ctx);
        }
    }
    
    private boolean isReferencedEnumeration(ValidationContext ctx){
        
        X12Restriction restriction = 
            ctx.getElementDefinition().getRestriction();
        
        return !StringExtension.isNullOrEmpty(restriction.getReferenceCode());
    }
    
    private boolean isInlineEnumeration(ValidationContext ctx) {
        
        X12Restriction restriction = 
            ctx.getElementDefinition().getRestriction();
        
        if(null == restriction.getEnumerations()){
            return false;
        }
        
        return !restriction.getEnumerations().isEmpty();        
    }
    
    private void validateEnumerations(
        ValidationContext ctx,
        HashSet<String> codeSet,
        Supplier<String> messageBuilder){
                
        String normalizedValue = ctx.getNormalizedValue();
        
        boolean matches = codeSet.contains(normalizedValue);
        
        // If a code in the enumerations is matched with the value.
        // consider this value is valid.
        if(matches){           
            return;
        }
        
        ValidationResultEntry entry = new ValidationResultEntry(
            ctx.getSegment().getName(),
            ctx.getSegment().getPosition(),
            ctx.getElementPosition(),
            ValidationResultType.DATA_ELEMENT,
            ValidationErrorCode.ELEMENT_LEVEL_INVALID_ENUM_VALUE,
            messageBuilder.get()
        );
        
        entry.setElementData(ctx.getValue());
        
        ctx.getResultCollector().collect(entry);
    }

    private void validateAgainstInlineEnumerations(ValidationContext ctx) {
        X12Restriction restriction = 
            ctx.getElementDefinition().getRestriction();
        
        if(CollectionExtension.isEmpty(restriction.getEnumerations())){
            return;
        }
         
        validateEnumerations(
            ctx, 
            new HashSet(restriction.getEnumerations()),
            ()->String.format(
                    "The value [%s] of element [%s] "
                    + "was not found in the inline enumerations.",
                    ctx.getNormalizedValue(),
                    ctx.getElementDefinition().getName())
        );         
    }        
    
    private HashSet getReferenceCodes(
        X12SchemaDefinition schema,
        X12Restriction restriction){
        
        String key = buildCacheKey(schema, restriction);
        
        if(null == key) {
            return null;
        }
        
        HashSet codeSet = ReferenceCodeCache.getOrAdd(key,
            ()->{ 
                
                Optional<CodeDefinition> findResult = schema.getSharedData()
                    .getCodes()
                    .stream()
                    .filter(code->code.getName().equals(restriction.getReferenceCode()))
                    .findFirst();

                    // If not found
                    if(!findResult.isPresent()){
                        return null;
                    }
                return findResult.get().getValues();
            });
        
        return codeSet;        
    }
    
    private String buildCacheKey(X12SchemaDefinition schema, 
        X12Restriction restriction) {
        
        String schemaID = StringExtension.toUpperCase(schema.getId());
        
        String referenceCodeName = 
            StringExtension.toUpperCase(restriction.getReferenceCode());
        
        if(StringExtension.isNullOrWhitespace(schemaID)){
            logger.error("The SchemaID should not be EMPTY, "
                + "the schema is invalid or code bug detetced.");
            
            return null;
        }
        
        if(StringExtension.isNullOrWhitespace(referenceCodeName)){
            logger.error("The reference code for the restriction should not be EMPTY, "
                + "the schema is invalid or code bug detetced.");
            
            return null;
        }
        
        return schemaID + "-" + referenceCodeName;
    }
    
    private void validateAgainstReferencedEnumerations(ValidationContext ctx) {
        
        X12Restriction restriction = 
                    ctx.getElementDefinition().getRestriction();
        
        HashSet codeSet = getReferenceCodes(ctx.getSchema(), restriction);
        
        if(null == codeSet){
            return;
        }
        
        validateEnumerations(
            ctx,
            codeSet,
            ()->String.format(
                    "The value [%s] of element [%s] "
                    + "was not found in the referenced "
                    + "enumeration definition [%s].",
                    ctx.getNormalizedValue(),
                    ctx.getElementDefinition().getName(),
                    restriction.getReferenceCode())
        );
    }
}
