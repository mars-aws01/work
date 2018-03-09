
X12 Engine for EDI Core 
(Prototype)

Code Analysis Result: http://scmisediapp01:31900/dashboard?id=com.newegg.edi%3AX12Engine

Project Code Structure:

```
└─src
   └─main
      └─java
         └─com.newegg.edi.x12engine
            ├─ack               Functional ACK Generator 
            │  └─codes          Error Code definitions
            ├─assemble          X12 Assembler (EDIXML to X12)
            │  └─events         Related events
            ├─cfg               [Unused]
            ├─common            X12 Data Structure definition
            ├─disassemble       X12 Disassembler (X12 to EDIXML)
            │  ├─edixml         EDI XML Generator
            │  ├─events         Related events
            │  └─validation     EDI XML Validation results containers
            ├─events            Common Events and related helpers
            ├─exceptions        Customized exceptions
            │  └─validation     Validation related exceptions
            ├─health            [Unused]
            ├─logging           Simple console logger
            ├─modules           [Unused]
            ├─parsing           X12Reader (Parsing X12 data)
            ├─resources         [Unused]
            ├─schema            X12 Schema definition entities and Visitor implementations
            │  └─events         Related events
            ├─services          [Unused]
            ├─tasks             X12 Engine Process Tasks
            ├─util              Helper utilities
            └─validators        Validators for X12 Schema validation
```