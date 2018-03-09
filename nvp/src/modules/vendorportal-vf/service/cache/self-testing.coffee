angular.module("vf-cache-self-testing", []).factory('vfSelfTesting',
[() ->

 td505List = [
    {code:"FEDXOVR", desc:"FedEx Standard Overnight"},
    {code:"FEDX2", desc:"FedEx 2Day"},
    {code:"FEDXSVR", desc:"FedEx Express Saver"},
    {code:"UPS3", desc:"UPS 3 DAYS"},
    {code:"UPS2", desc:"UPS 2nd Day"},
    {code:"UPSR", desc:"UPS Next Day Air Saver"},
    {code:"UPSG", desc:"UPS Ground"},
    {code:"AITWG", desc:"AIT White Glove Delivery"},
    {code:"AITIH", desc:"AIT In Home Delivery"},
    {code:"AITFD", desc:"AIT Front Door Delivery"},
    {code:"UPSMI", desc:"UPS Mail Innovations"}
 ]

 # mock data

 ediX12SetupData  = [
   {text:'Inventory',value:'Inventory Inquiry Advice (846)'},
   {text:'PurchaseOrder',value:'Purchase Order (850)'},
   {text:'PurchaseOrderAck',value:'Purchase Order Acknowledgment (855)'},
   {text:'Shipment',value:'Ship Notice (856)'},
   {text:'Invoice',value:'Invoice (810)'}
 ]

 ediX12StandardFileData  = [
   {text:'Inventory Inquiry Advice (846)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg 846 Inventory Inquiry Advice.pdf'},
   {text:'Purchase Order (850)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg 850 Purchase Order.pdf'},
   {text:'Purchase Order Acknowledgment (855)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg 855 Purchase Order Acknowledgment.pdf'},
   {text:'Ship Notice (856)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg 856 Ship Notice.pdf'},
   {text:'Invoice (810)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg 810 Invoice & Credit Memo.pdf'}
   {text:'Functional Acknowledgement (997)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg 997 Functional Acknowledgement.pdf'}
 ]

 ediX12SampleFileData  = [
   {text:'Inventory Inquiry Advice (846)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg.VF.846.x12'},
   {text:'Purchase Order (850)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg.VF.850.x12'},
   {text:'Purchase Order Acknowledgment (855)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg.VF.855.x12'},
   {text:'Ship Notice (856)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg.VF.856.x12'},
   {text:'Invoice (810)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg.VF.810.x12'}
   {text:'Functional Acknowledgement (997)',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg.VF.997.x12'}
 ]

 packingSlipData  = [
   {text:'Packing Slip Requirements for .com',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg PackingSlip.pdf'},
   {text:'Packing Slip Requirements for .b2b',value:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg PackingSlip-B2B.pdf'},
 ]

 x12TestData = [
   {text1:'WH1001 Address',text2:'1001'},
   {text1:'WH1002 Address',text2:'1002'},
 ]

 x12TestData2 = [
   {text1:'101-00001',text2:'all lineitems are fulfilled; you will need to upload EDI document(s) in response to this test PO'},
   {text1:'101-00002',text2:'one of the lineitems cannot be fulfilled and the rest can be fulfilled; you will need to upload EDI document(s) in response to this test PO'},
   {text1:'101-00003',text2:'all lineitems are rejected; you will need to upload EDI document(s) in response to this test PO'}
 ]

 isaIDQualifierData = [
   {text:"01",value:"01",description:"D-U-N-S (Dun & Bradstreet)"},
   {text:"02",value:"02",description:"SCAC (Standard Carrier Alpha Code) (X12)"},
   {text:"03",value:"03",description:"Federal Maritime Commission"},
   {text:"04",value:"04",description:"IATA (International Air Transport Association)"},
   {text:"07",value:"07",description:"Global Location Number (GLN)"},
   {text:"08",value:"08",description:"UCC Communications ID (Uniform Code Council Communications)"},
   {text:"09",value:"09",description:"X.121 (CCITT)"},
   {text:"10",value:"10",description:"Department of Defense"},
   {text:"11",value:"11",description:"Drug Enforcement Administration"},
   {text:"12",value:"12",description:"Telephone Number"},
   {text:"13",value:"13",description:"UCS Code"},
   {text:"14",value:"14",description:"Duns Plus Suffix"},
   {text:"15",value:"15",description:"Petroleum Accountants Society of Canada Company Code"},
   {text:"16",value:"16",description:"D&B D-U-N-S Number plus 4-character suffix"},
   {text:"17",value:"17",description:"American Bankers Association"},
   {text:"18",value:"18",description:"Association of American Railroads (AAR) Standard Distribution Code"},
   {text:"19",value:"19",description:"EDI Council of Australia (EDICA) Communications ID Number (COMM ID)"},
   {text:"20",value:"20",description:"Health Industry Number"},
   {text:"21",value:"21",description:"Integrated Postsecondary Education Data System, or (IPEDS)"},
   {text:"22",value:"22",description:"Federal Interagency Commission on Education, or FICE"},
   {text:"23",value:"23",description:"National Center for Education Statistics Common Core of Data 12-Digit Number for Pre-K-Grade 12 Institutes, or NCES"},
   {text:"24",value:"24",description:"The College Board's Admission Testing Program 4-Digit Code of Postsecondary Institutes, or ATP"},
   {text:"25",value:"25",description:"ACT, Inc. 4-Digit Code of Postsecondary Institutions"},
   {text:"26",value:"26",description:"Statistics of Canada List of Postsecondary Institutions"},
   {text:"27",value:"27",description:"Health Care Financing Administration Carrier ID"},
   {text:"28",value:"28",description:"Health Care Financing Administration Fiscal Intermediary"},
   {text:"29",value:"29",description:"Health Care Financing Administration Medicare Provider"},
   {text:"30",value:"30",description:"U.S. Federal Tax Identification Number"},
   {text:"31",value:"31",description:"Jurisdiction Identification Number Plus 4 as assigned by the International Association of Industrial Accident Boards and Commissions (IAIABC)"},
   {text:"32",value:"32",description:"U.S. Federal Employer Identification Number"},
   {text:"33",value:"33",description:"National Association of Insurance Commissioners Company Code (NAIC)"},
   {text:"34",value:"34",description:"Medicaid Provider and Supplier Identification Number as assigned by individual State Medicaid Agencies in conjunction with Health Care Financing Administration (HCFA)"},
   {text:"35",value:"35",description:"Statistics Canada Canadian College Student Information System Institution Codes"},
   {text:"36",value:"36",description:"Statistics Canada University Student Information System Institution Codes"},
   {text:"37",value:"37",description:"Society of Property Information Compilers and Analysts"},
   {text:"38",value:"38",description:"The College Board and ACT, Inc. 6-Digit Code List of Secondary Institutions"},
   {text:"AM",value:"AM",description:"Association Mexicana del Codigo de Producto (AMECOP) Communication ID"},
   {text:"BT",value:"BT",description:"BizTalk EDI Identity (Deprecated)"},
   {text:"NR",value:"NR",description:"National Retail Merchants Association"},
   {text:"SA",value:"SA",description:"User Identification Number as assigned by the Safety and Fitness Electronic Records (SAFER) System"},
   {text:"SN",value:"SN",description:"Standard Address Number"},
   {text:"ZZ",value:"ZZ",description:"Mutually Defined (X12)"}
 ]

 return {
       td505List
       ediX12SetupData
       ediX12StandardFileData
       ediX12SampleFileData
       packingSlipData
       x12TestData
       x12TestData2
       isaIDQualifierData
     }

])

