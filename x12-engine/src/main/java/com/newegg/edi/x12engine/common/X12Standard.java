package com.newegg.edi.x12engine.common;

/**
 *
 * @author mm67
 */
public final class X12Standard {
   
    public static final char LF = '\n'; // 0x0A
    public static final char CR = '\r'; // 0x0D
    
    private static final char[] TERMINATOR_CR = { CR };
    private static final char[] TERMINATOR_LF = { LF };
    private static final char[] TERMINATOR_CRLF = { CR, LF };
    
    protected static final char[][] SUPPORTED_TERMINATORS =
    {
        TERMINATOR_CR,
        TERMINATOR_LF,
        TERMINATOR_CRLF
    };
    
    public static final String ISA = "ISA"; // Interchange Start Segment Name
    public static final String GS = "GS";   // Group Start Segment Name
    public static final String ST = "ST";   // Transaction Set Start Segment Name
    public static final String SE = "SE";   // Transaction Set End Segment Name
    public static final String GE = "GE";   // Group End Segment Name
    public static final String IEA = "IEA"; // Interchange End Segment Name
        
    public static final int ISA_SEGMENT_LENGTH = 106;
    public static final int ISA_SEGMENT_LENGTH_WITHOUT_SEGMENT_SEPARATOR = 105;
    public static final int ELEMENT_SEPARATOR_INDEX = 3;
    public static final int SEGMENT_SEPARATOR_INDEX = 105;
    
    private static final int ISA_CHAR_INDEX_00 = 0;   // Segment Name
    private static final int ISA_CHAR_INDEX_01 = 4;   // Authorization Information Qualifier
    private static final int ISA_CHAR_INDEX_02 = 7;   // Authorization Information
    private static final int ISA_CHAR_INDEX_03 = 18;  // Security Information Qualifier
    private static final int ISA_CHAR_INDEX_04 = 21;  // Security Information
    private static final int ISA_CHAR_INDEX_05 = 32;  // Interchange ID Qualifier
    private static final int ISA_CHAR_INDEX_06 = 35;  // Interchange Sender ID
    private static final int ISA_CHAR_INDEX_07 = 51;  // Interchange ID Qualifier
    private static final int ISA_CHAR_INDEX_08 = 54;  // Interchange Receiver ID
    private static final int ISA_CHAR_INDEX_09 = 70;  // Interchange Date  YYMMDD
    private static final int ISA_CHAR_INDEX_10 = 77;  // Interchange Time  HHMM
    private static final int ISA_CHAR_INDEX_11 = 82;  // Repetition Separator Usage
    private static final int ISA_CHAR_INDEX_12 = 84;  // Interchange Control Version Number
    private static final int ISA_CHAR_INDEX_13 = 90;  // Interchange Control Number
    private static final int ISA_CHAR_INDEX_14 = 100; // Technical Acknowledgment Required
    private static final int ISA_CHAR_INDEX_15 = 102; // Interchange Indicator
    private static final int ISA_CHAR_INDEX_16 = 104; // Component Element Separator
    private static final int ISA_CHAR_INDEX_17 = 105; // Segment Separator
    
    /*
    The length of ISA segment, including segment name
    */
    public static final int ISA_ELEMENTS_COUNT = 17;
    
    public static final int ISA_LENGTH_00 = 3;  // Segment Name ISA
    public static final int ISA_LENGTH_01 = 2;  // Authorization Information Qualifier Length
    public static final int ISA_LENGTH_02 = 10; // Authorization Information Length
    public static final int ISA_LENGTH_03 = 2;  // Security Information Qualifier Length
    public static final int ISA_LENGTH_04 = 10; // Security Information Length
    public static final int ISA_LENGTH_05 = 2;  // Interchange ID Qualifier Length
    public static final int ISA_LENGTH_06 = 15; // Interchange Sender ID Length
    public static final int ISA_LENGTH_07 = 2;  // Interchange ID Qualifier Length
    public static final int ISA_LENGTH_08 = 15; // Interchange Receiver ID Length
    public static final int ISA_LENGTH_09 = 6;  // Interchange Date  YYMMDD Length
    public static final int ISA_LENGTH_10 = 4;  // Interchange Time  HHMM Length
    public static final int ISA_LENGTH_11 = 1;  // Repetition Separator Usage
    public static final int ISA_LENGTH_12 = 5;  // Interchange Control Version Number
    public static final int ISA_LENGTH_13 = 9;  // Interchange Control Number
    public static final int ISA_LENGTH_14 = 1;  // Technical Acknowledgment Required
    public static final int ISA_LENGTH_15 = 1;  // Interchange Indicator
    public static final int ISA_LENGTH_16 = 1;  // Component Element Separator
    
    public static final int ISA01_ELEMENT_INDEX = 1;  // Authorization Information Qualifier
    public static final int ISA02_ELEMENT_INDEX = 2;  // Authorization Information
    public static final int ISA03_ELEMENT_INDEX = 3;  // Security Information Qualifier
    public static final int ISA04_ELEMENT_INDEX = 4;  // Security Information
    public static final int ISA05_ELEMENT_INDEX = 5;  // Interchange ID Qualifier
    public static final int ISA06_ELEMENT_INDEX = 6;  // Interchange Sender ID
    public static final int ISA07_ELEMENT_INDEX = 7;  // Interchange ID Qualifier
    public static final int ISA08_ELEMENT_INDEX = 8;  // Interchange Receiver ID
    public static final int ISA09_ELEMENT_INDEX = 9;  // Interchange Date  YYMMDD
    public static final int ISA10_ELEMENT_INDEX = 10; // Interchange Time  HHMM
    public static final int ISA11_ELEMENT_INDEX = 11; // Repetition Separator Usage
    public static final int ISA12_ELEMENT_INDEX = 12; // Interchange Control Version Number
    public static final int ISA13_ELEMENT_INDEX = 13; // Interchange Control Number
    public static final int ISA14_ELEMENT_INDEX = 14; // Technical Acknowledgment Required
    public static final int ISA15_ELEMENT_INDEX = 15; // Interchange Indicator
    public static final int ISA16_ELEMENT_INDEX = 16; // Component Element Separator
    
    public static final int ISA_MAX_ELEMENT_INDEX = ISA16_ELEMENT_INDEX;

    public static final int GS01 = 1; // Functional Identifier Code, a code contains two chars
    public static final int GS02 = 2; // Sender Id
    public static final int GS03 = 3; // Receiver Id
    public static final int GS04 = 4; // Date (Format CCYYMMDD/YYMMDD)
    public static final int GS05 = 5; // Time (Format HHMM/HHMMSS)
    public static final int GS06 = 6; // Group Control Number
    public static final int GS07 = 7; // Response Agency Code (X/T, X is recommended)
    public static final int GS08 = 8; // Control Version

    public static final int ST01 = 1; // Transaction Set Type
    public static final int ST02 = 2; // Transaction Set Control Number

    public static final int GE01 = 1; // TS Count in the group
    public static final int GE02 = 2; // Group Control Number
    
    protected static final int[] ISA_ELEMENT_LOCATIONS =
        {
            ISA_CHAR_INDEX_00,
            ISA_CHAR_INDEX_01,
            ISA_CHAR_INDEX_02,
            ISA_CHAR_INDEX_03,
            ISA_CHAR_INDEX_04,
            ISA_CHAR_INDEX_05,
            ISA_CHAR_INDEX_06,
            ISA_CHAR_INDEX_07,
            ISA_CHAR_INDEX_08,
            ISA_CHAR_INDEX_09,
            ISA_CHAR_INDEX_10,
            ISA_CHAR_INDEX_11,
            ISA_CHAR_INDEX_12,
            ISA_CHAR_INDEX_13,
            ISA_CHAR_INDEX_14,
            ISA_CHAR_INDEX_15,
            ISA_CHAR_INDEX_16,
            ISA_CHAR_INDEX_17
        };
    
    private X12Standard(){
        
    }    
}
