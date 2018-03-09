﻿NEG.namespace('resources.vendorportal.selftesting.cn',
  view_sf:
    prerequisiteStatus_1:"Prerequisite Status "
    prerequisiteStatus_2:"( You will need to complete all prerequisites before moving to connection and transaction setup )"
    connectionSetup_1:"Connection Setup "
    connectionSetup_2:"( You will need to create both test and production connections )"
    ediX12Setup:"EDI X12 Setup"
  header_sf:
    prerequisite:"Prerequisite"
    status:"Status"
    action:"Action"
    connectionName:"Connection Name"
    connectionProtocol:"Connection Protocol"
    type:"Connection Type"
    ediMessage:"EDI Message"
    label_edit:"Edit"
    label_delete:"Delete"
    label_test:"Test"
    label_goLive:"Go Live"
    label_survey:"Survey"
  guide_sf:
    header_1:"Survey"
    header_2:"X12 Standard"
    header_3:"X12 Samples"
    header_4:"Packing Slip"
    header_5:"Identifiers"
    header_6:"Test Items"
    header_1_desc:"General Survey"
    header_2_desc:"Download and review Newegg EDI X12 Standard"
    header_3_desc:"Download and review Newegg EDI X12 Samples"
    header_4_desc:"Download and review Newegg Packing Slip Requirements"
    header_5_desc:"Provide Identifiers"
    header_6_desc:"Provide Test Items"
    title_prerequisite:"Prerequisites Guide"
    survey_title:"General Survey"
    survey_title_1:"EDI Operating Essentials"
    survey_title_2:"Document Trading Protocol Communication"
    survey_title_3:"General Testing Requirements"
    survey_desc_1:"The setup of EDI between Newegg and your company is designed to take the normal business to business processes and automate them to help reduce costs and improve efficiency. To complete the survey and testing the EDI package (846, 850, 855, 856 and 810) version 4010 should take no more than 90 days from the time you start the survey until you have completed the testing. "
    survey_desc_2_1:"Vendor must be able to re-send EDI documents as necessary."
    survey_desc_2_2:"Vendor must be able to recognize order files by Newegg reference number (i.e. PO Number, Invoice Number)."
    survey_desc_2_3:"Vendor must send only one EDI envelope per transmitted file. If the messages are of the same type, there may be multiple messages in the envelope. If the messages are different, they will fail in Newegg systems."
    survey_desc_3:"Newegg expects that real product data will be used during the test phase and that all expected test scenarios will be executed. This will help to ensure that there are no issues when your company moves to production for EDI transactions. If a third party testing service will be conducting your testing, your Vendor Central administrator may invite them to join your Vendor Central account. Only EDI Self Setup and EDI Monitoring rights should be granted to them."
    survey_desc_4:"I can comply with the requirements above"
    common_desc_1:"Acknowledge"
    x12_title_1:"Newegg EDI X12 Standard"
    x12_title_2:"Newegg EDI X12 Samples"
    x12_file_1:"Inventory Inquiry Advice (846)"
    x12_file_2:"Purchase Order (850)"
    x12_file_3:"Purchase Order Acknowledgement (855)"
    x12_file_4:"Ship Notice (856)"
    x12_file_5:"Invoice (810)"
    x12_file_6:"Functional Acknowledgement (997)"
    x12_desc_1:"I have downloaded and reviewed all standards above"
    x12_desc_2:"I have downloaded and reviewed all samples above"
    slip_title:"Newegg Packing Slip Requirements"
    slip_desc:"I have downloaded and reviewed all requirements above"
    id_title:"Identifiers"
    id_title_1:"Newegg X12 Sender/Receiver Ids"
    id_title_2:"Please provide your X12 Sender/Receiver Ids"
    id_header_1:"Test Environment"
    id_header_2:"Production Environment"
    items_title:"Test Items"
    items_header_1:"Vendor Part #"
    items_header_2:"Manufacturer Part #"
    items_header_3:"UPC"
    items_header_4:"Description"
    items_header_5:"Cost"
    items_header_6:"Qty"
    items_header_7:"Expected Action"
    items_desc_1:"Newegg will use these test item to create EDI doucment that will be used later when you test EDI documents. These items will are only for testing purposes."
    items_desc_2:"Please enter at least one item; you will accept item(s) you provided here in your Purchase Order Acknowledgement by lineitem:"
    items_desc_3:"Please enter at least one item; you will reject item(s) you provided here in your Purchase Order Acknowledgement by lineitem:"
  connection_sf:
    title:"Connection Setup"
    title_1:"Connection Survey"
    desc_1: "You need to setup connection endpoints to be able exchange EDI documents with Newegg."
    desc_2: "Newegg Prefers AS2 as the connection method. AS2 is a method of exchanging data over the internet using secure internet protocols. If you are currently trading EDI via AS2, you should do so with Newegg. If your system doesn't support AS2, FTP may be used. We also support EDI Service Providers (VANs), if you have the need to go through them with no additional charge to Newegg."
    desc_3: "If you have a firewall and filter traffice by IP ranges, please whitelist the following Newegg IP ranges:"
    lb_1:"Which connection to add:"
    lb_2:"How to connect to Newegg:"
    lb_3:"Connection Name:"
    lb_4:"Upload your certificate:"
    lb_5:"Your Certificate:"
    lb_6:"Issued By:"
    lb_7:"Valid From:"
    lb_8:"Serial Number:"
    lb_9:"Signature Algorithm:"
    lb_10:"Issue To:"
    lb_11:"Subject:"
    lb_12:"Valid To:"
    lb_13:"ThumbPrint:"
    header_1:"Your AS2 Profile"
    header_2:"Newegg AS2 Profile"
    header_3:"Your FTP Profile"
    btn_save:"Save"
    btn_submit:"Submit"
    btn_dashboard:"Go to Dashboard"
    btn_downloadC:"Download Newegg Certificate"
    btn_downloadC2:"Download Your Certificate"
    btn_UploadC:"Upload Now"
    msg_1:"Attachment certificate file types are limited to cer."
    msg_2:"Please upload the valid certificates."
    msg_3:"Save successfully."
    msg_4:"Save failed."
    msg_5:"Submit successfully."
    msg_6:"Submit failed."
    msg_7:"Delete connection successfully."
    msg_8:"Delete connection failed."
    msg_9:"Certificate file upload successfully."
    warning_1:"Connection name can't be empty."
    warning_2:"certificate can't be empty."
    warning_3:"Continue operation will make the loss of data, do you want to continue?"
    warning_4:"Do you want to delete the connection?"
    warning_5:"Connection is deploying, please wait for a moment and refresh the page."
    warning_6:"'Incoming File Directory' should not be same as 'Outgoing File Directory'"
  connectionTest_sf:
    title:"Connection Testing"
    desc_1:"To complete the testing, Newegg will send a message to your sytem and you will need to send a message to Newegg."
    desc_2:"For test to pass the Newegg must be able to send the file successfully to your endpoint. "
    desc_3:"Please download the test file and send it to us. (You can also send any X12 file if you cannot download the test file)"
    desc_4:"For test to pass the Newegg must be able to receive the file successfully from your endpoint. "
    desc_5:"Newegg will send a test file to FTP. It may take up to 10 minutes."
    desc_6:"For test to pass the Newegg must be able to upload the file to FTP successfully."
    desc_7:"Newegg will send a test file to your endpoint. It may take up to 10 minutes to receive the file in your system."
    desc_8:"Please download the test file and upload to FTP.(You can also send any X12 file if you cannot download the test file)"
    desc_9:"For test to pass the Newegg must be able to receive the file successfully from FTP."
    lb_1:"Connection Type:"
    lb_2:"Connection Protocol:"
    lb_3:"Connection Name:"
    lb_4:"Inbound Test"
    lb_5:"Outbound Test"
    lb_6:"Step 1:"
    lb_7:"Step 2:"
    lb_AS2ID:"AS2 ID"
    lb_AS2URL:"AS2 URL"
    lb_encryption:"Encryption"
    lb_signing:"Signing"
    lb_url:"URL"
    lb_port:"Port"
    lb_userName:"User Name"
    lb_password:"Password"
    lb_incomingDirectory:"Incoming File Directory"
    lb_outgoingDirectory:"Outgoing File Directory"
    lb_passed:"Passed"
    lb_notPassed:"Not Passed"
    header_1:"Direction"
    header_2:"Attempt"
    header_3:"Is Passed"
    header_4:"Review"
    btn_send:"Send Test File"
    btn_download:"Download Test File"
    btn_check_inbound:"Check Inboud Status"
    btn_check_outbound:"Check Outbound Status"
    goLive_success:"The connection is live now."

  x12_sf:
    title:"EDI X12 Setup > Survey"
    title_1:"846"
    title_2:"850"
    title_3:"855"
    title_4:"856"
    title_5:"810"
    title_1_desc:"Inventory Inquiry Advice"
    title_2_desc:"Purchase Order"
    title_3_desc:"Purchase Order Acknowledgment"
    title_4_desc:"Ship Notice"
    title_5_desc:"Invoice"
    desc_846_1:"Please review the requirements and indicate your acknowledgement:"
    desc_846_2:"1. Can you report the inventory level at each DC by using your warehouse code in SDQ segment?"
    desc_846_3:"2. Can you provide a ZERO inventory when items are out of stock or discontinue instead of dropping it off the feed?"
    desc_846_4:"3. You are required to provide vendor part number (VP), manufacturer name (MF), manufacturer part number (MG) in PID segment; UPC (UP) is optional."
    desc_846_5:"4. No gap in between when there is a number not available."
    desc_846_6:"For example:"
    desc_846_7:"LIN*1*VP*010-00270-02***MG*010-00270-02~ (Incorrect)"
    desc_846_8:"LIN*1*VP*010-00270-02*MG*010-00270-02~ (Correct)"
    desc_846_9:"5. You are required to provide cost in 846."
    desc_850_1:"Please review the requirements and indicate your acknowledgement:"
    desc_850_2:"1. You are required to ship from the warehouse dictated in 850; you will need to reject the lineitem if it cannot be shipped form the warehouse."
    desc_850_3:"2. We will always transmit your part number qualified by VP and Newegg part number qualified by BP in 850."
    desc_850_4:"3. You are required to customize the packing slip with the acoording sales channel transmitted in 850's REF segment."
    desc_850_5:"4. You are required to map end customer's reference number transmitted in 850's REF segment to packing slip."
    desc_850_6:"5. You are required to recognize the following service level codes in TD505:"
    header_850_1:"TD505 Code"
    header_850_2:"Description"
    desc_855_1:"Please review the requirements and indicate your acknowledgement:"
    desc_855_2:"1. You are required to reject based on lineitem level. If you can fulfill a line completely, your system should accept the line; if you can only fulfill partial or cannot fulfill, your system should reject the line."
    desc_855_3:"2. You are required to reject lines that are on back order or can only partially fulfilled; Newegg does not allow any backorder or partial line to be shipped. "
    desc_855_4:"3. You can send a second 855 to reject the lines only when the first 855 accepted."
    desc_855_5:"4. To accept a lineitem, use \"IA\" in ACK01 & to reject a lineitem, use \"IR\" in ACK01; use \"RD\" in BAK02 when all lineitems are rejected, else use \"AT\"."
    desc_856_1:"Please review the requirements and indicate your acknowledgement:"
    desc_856_2:"1. You are required to use the following service level codes in TD505 to specify the actual service level used:"
    desc_856_3:"2. You are required to provide tracking number by package level; make sure to use \"2I\" at REF01  (Pack HL)."
    desc_856_4:"3. You are required to provide package dims or weight and specify the unit of measurement. (e..g metric units or imperial units)"
    desc_856_5:"4. Can you provide serial number?"
    desc_810_1:"Please review the requirements and indicate your acknowledgement:"
    desc_810_2:"1. Newegg only accept DI or DR in BIG07 at this moment."
    desc_810_3:"2. Newegg only accept D240 or H750 in SAC02 at this moment"
  x12Test_sf:
    title:"EDI X12 Setup > Testing"
    desc_846_1:"Please upload a 846 sample file with all warehouse(s) and item(s) below:"
    desc_846_2:"Warehouse(s):"
    desc_846_3:"Item(s):"
    header_846_1:"Warehouse Address"
    header_846_2:"Warehouse Code"
    desc_850_1:"Please download the following test 850 documents:"
    desc_855_1:"Please upload test 855 document for the following scenarios:"
    desc_856_1:"Please upload test 856 document for the following scenarios:"
    desc_810_1:"Please upload test 810 document for the following scenarios:"
    header_1:"Test PO #"
    header_2:"Test Scenarios"
    header_3:"Result"
    goLive_success:"The file is live now"
    survey_notFinished:"The survey of step {0} is not finished, you should finish the survey before test."
  common_sf:
    lb_yes:"Yes"
    lb_no:"No"
    lb_ack:"Acknowledge"
    btn_previous:"Previous"
    btn_next:"Next"
    btn_continue:"Save & Continue"
    btn_save:"Save"
    btn_dashboard:"Go to Dashboard"
    btn_home:"Go to Home"
    btn_test:"Go to Test"
    btn_download:"Download"
  warning_sf:
    guide_uncheckAcknowledge:"Please check the Acknowledge."
    guide_identifierInvalid:"There are some fields are required, please check and enter the value."
    guide_sameISAID:"The ISA ID of Test Environment is same as the ISA ID of Production Environment."
    guide_sameAsNewegg:"The value(ISA ID Qualifier + ISA ID) should not be same as the value of Newegg."
    guide_testItemInvalid:"All fields of item are required.Please complete or remove the item."
    guide_partNumberDuplicate:"The Vendor Part # should be different with others."
    guide_partNumberInvalid:"The Vendor Part # and UPC should not contain Chinese."
    guide_noVendorCertificate:"Please upload your certificate first."
  error_sf:
    save_failed:"Save data failed, please try again."
    goLive_failed:"Go live failed."
    sendFile_failed:"Send test file failed, please try again."
    goLive_invalidStatus:"Please finish Test first."
    goTest_invalidStatus:"Please finish Survey first."
    connection_invalidStatus:'Please enter correct connection and click "Submit" button in Connection Setup Page before test.And if you have clicked "Submit",please refresh connection later.'
    authorization_expired:"The provided authorization information has expired,please login again."
    goTest_prerequisiteNotFinish:"Please complete all prerequisites."
    uploadCheck_1:"Upload file could not have an extension with \".exe,.bin,.gz,.rar,.zip,.jpg,.jpeg,.png,.bmp \", please select a valid text file to upload."
  success_sf:
    sendFile_success:"Test file has sent to your system."
    uploadFile_success:"Upload file successfully. Pleare wait for a moment and refresh page to get test result."
)
