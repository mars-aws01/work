package com.newegg.edi.x12engine.common;

public class X12Profile {

    public static final int DEFAULT_CONTROL_NUMBER_LENGTH = 9;

    private char elementDelimiter;
    private char segmentTerminator;
    private String segmentSeparator;
    private SegmentTerminatorSuffixType segmentTerminatorSuffix;
    private String componentElementSeparator;

    private String authorizationInformationQualifier;
    private String authorizationInformation;

    private String securityInformationQualifier;
    private String securityInformation;

    private String interchangeSenderIDQualifier;
    private String interchangeSenderID;
    private String interchangeReceiverIDQualifier;
    private String interchangeReceiverID;

    private String repetitionSeparatorUsage;
    private String interchangeControlVersionNumber;
    private String technicalAcknowledgmentRequired;
    private String interchangeIndicator;


    private String groupSenderID;
    private String groupReceiverID;
    private String groupDateFormat;
    private String groupTimeFormat;
    private String groupResponseAgencyCode;
    private String groupControlVersion;

    private int interchangeControlNumberLength;
    private int groupControlNumberLength;
    private int transactionSetControlNumberLength;

    /**
     * @return The Element delimiter (The character between ISA01 and ISA02)
     */
    public char getElementDelimiter() {
        return elementDelimiter;
    }

    public void setElementDelimiter(char elementDelimiter) {
        this.elementDelimiter = elementDelimiter;
    }

    /**
     * @return Segment terminator
     */
    public char getSegmentTerminator() {
        return segmentTerminator;
    }

    public void setSegmentTerminator(char segmentTerminator) {
        this.segmentTerminator = segmentTerminator;
    }

    public String getSegmentSeparator() {
        return segmentSeparator;
    }

    public void setSegmentSeparator(String segmentSeparator) {
        this.segmentSeparator = segmentSeparator;
    }

    public SegmentTerminatorSuffixType getSegmentTerminatorSuffix() {
        return segmentTerminatorSuffix;
    }

    public void setSegmentTerminatorSuffix(SegmentTerminatorSuffixType segmentTerminatorSuffix) {
        this.segmentTerminatorSuffix = segmentTerminatorSuffix;
    }

    public String getComponentElementSeparator() {
        return componentElementSeparator;
    }

    public void setComponentElementSeparator(String componentElementSeparator) {
        this.componentElementSeparator = componentElementSeparator;
    }

    public String getAuthorizationInformationQualifier() {
        return authorizationInformationQualifier;
    }

    public void setAuthorizationInformationQualifier(String authorizationInformationQualifier) {
        this.authorizationInformationQualifier = authorizationInformationQualifier;
    }

    public String getAuthorizationInformation() {
        return authorizationInformation;
    }

    public void setAuthorizationInformation(String authorizationInformation) {
        this.authorizationInformation = authorizationInformation;
    }

    public String getSecurityInformationQualifier() {
        return securityInformationQualifier;
    }

    public void setSecurityInformationQualifier(String securityInformationQualifier) {
        this.securityInformationQualifier = securityInformationQualifier;
    }

    public String getSecurityInformation() {
        return securityInformation;
    }

    public void setSecurityInformation(String securityInformation) {
        this.securityInformation = securityInformation;
    }

    public String getInterchangeSenderIDQualifier() {
        return interchangeSenderIDQualifier;
    }

    public void setInterchangeSenderIDQualifier(String interchangeSenderIDQualifier) {
        this.interchangeSenderIDQualifier = interchangeSenderIDQualifier;
    }

    public String getInterchangeSenderID() {
        return interchangeSenderID;
    }

    public void setInterchangeSenderID(String interchangeSenderID) {
        this.interchangeSenderID = interchangeSenderID;
    }

    public String getInterchangeReceiverIDQualifier() {
        return interchangeReceiverIDQualifier;
    }

    public void setInterchangeReceiverIDQualifier(String interchangeReceiverIDQualifier) {
        this.interchangeReceiverIDQualifier = interchangeReceiverIDQualifier;
    }

    public String getInterchangeReceiverID() {
        return interchangeReceiverID;
    }

    public void setInterchangeReceiverID(String interchangeReceiverID) {
        this.interchangeReceiverID = interchangeReceiverID;
    }

    public String getRepetitionSeparatorUsage() {
        return repetitionSeparatorUsage;
    }

    public void setRepetitionSeparatorUsage(String repetitionSeparatorUsage) {
        this.repetitionSeparatorUsage = repetitionSeparatorUsage;
    }

    public String getInterchangeControlVersionNumber() {
        return interchangeControlVersionNumber;
    }

    public void setInterchangeControlVersionNumber(String interchangeControlVersionNumber) {
        this.interchangeControlVersionNumber = interchangeControlVersionNumber;
    }

    public String getTechnicalAcknowledgmentRequired() {
        return technicalAcknowledgmentRequired;
    }

    public void setTechnicalAcknowledgmentRequired(String technicalAcknowledgmentRequired) {
        this.technicalAcknowledgmentRequired = technicalAcknowledgmentRequired;
    }

    public String getInterchangeIndicator() {
        return interchangeIndicator;
    }

    public void setInterchangeIndicator(String interchangeIndicator) {
        this.interchangeIndicator = interchangeIndicator;
    }

    public String getGroupSenderID() {
        return groupSenderID;
    }

    public void setGroupSenderID(String groupSenderID) {
        this.groupSenderID = groupSenderID;
    }

    public String getGroupReceiverID() {
        return groupReceiverID;
    }

    public void setGroupReceiverID(String groupReceiverID) {
        this.groupReceiverID = groupReceiverID;
    }

    public String getGroupDateFormat() {
        return groupDateFormat;
    }

    public void setGroupDateFormat(String groupDateFormat) {
        this.groupDateFormat = groupDateFormat;
    }

    public String getGroupTimeFormat() {
        return groupTimeFormat;
    }

    public void setGroupTimeFormat(String groupTimeFormat) {
        this.groupTimeFormat = groupTimeFormat;
    }

    public String getGroupResponseAgencyCode() {
        return groupResponseAgencyCode;
    }

    public void setGroupResponseAgencyCode(String groupResponseAgencyCode) {
        this.groupResponseAgencyCode = groupResponseAgencyCode;
    }

    public String getGroupControlVersion() {
        return groupControlVersion;
    }

    public void setGroupControlVersion(String groupControlVersion) {
        this.groupControlVersion = groupControlVersion;
    }

    public int getInterchangeControlNumberLength() {
        if(interchangeControlNumberLength<=0) {
            return DEFAULT_CONTROL_NUMBER_LENGTH;
        }
        return interchangeControlNumberLength;
    }

    public void setInterchangeControlNumberLength(int interchangeControlNumberLength) {
        this.interchangeControlNumberLength = interchangeControlNumberLength;
    }

    public int getGroupControlNumberLength() {
        if(groupControlNumberLength<=0) {
            return DEFAULT_CONTROL_NUMBER_LENGTH;
        }
        return groupControlNumberLength;
    }

    public void setGroupControlNumberLength(int groupControlNumberLength) {
        this.groupControlNumberLength = groupControlNumberLength;
    }

    public int getTransactionSetControlNumberLength() {
        if(transactionSetControlNumberLength<=0) {
            return DEFAULT_CONTROL_NUMBER_LENGTH;
        }
        return transactionSetControlNumberLength;
    }

    public void setTransactionSetControlNumberLength(int transactionSetControlNumberLength) {
        this.transactionSetControlNumberLength = transactionSetControlNumberLength;
    }
}