angular.module("vf-cache-item-creation", []).factory('itemCreation',
[() ->

  config = {
    basic:{
        SubCategory : { type: "string", req: true, maxlength: 45}
        Brand : { type: "string", req: true}
        ManufacturerPartNumber : { type:"string", req:false, maxlength:20}
        UPCCode : { type: "string", req:false, minlength:8,maxlength:14, pattern: /^(\d{8})$|^(\d{12,14})$/}
        ItemDescription : { type :"string", req:true, maxlength:35}
        ProductPageHyperlink : { type :"string",req:true, maxlength:256, pattern:/^(https?:\/\/(www\.)?)?[-a-zA-Z0-9@:%._\+~#=-]{2,256}\.+[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/ }
        SellToNeweggPrice:{type:"number", req:false, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
        SuggestdSellingPrice:{type:"number", req:false, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
        PM:{ type: "string", req: true}
        ItemCategory:{ type: "string", req: true}
        PacksOrSets:{ type : "number", req:true, min:1,max:2147483647, pattern:/^\d+$/}
    }
    specification:{
        InputtedValue : { type: "string", req: false, maxlength: 2000 }
    }
    DimensionWeight:{
        UnitMeasurement : { type: "radio" , req: true, pattern:/^(\d{1,5})(\.\d{1,2})?$/ }
        ProductLength:{type:"number", req:true, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
        ProductWidth:{type:"number", req:true, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
        ProductHeight:{type:"number", req:true, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
        ProductWeight:{type:"number", req:true, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
        PackageLength:{type:"number", req:true, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
        PackageWidth:{type:"number", req:true, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
        PackageHeight:{type:"number", req:true, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
        PackageWeight:{type:"number", req:true, pattern:/^(\d{1,5})(\.\d{1,2})?$/}
    }
    warranty:{
        CountryCode : { type:"string", req:true}
        ThirdPartyProvider : { type:"string",  maxlength:200}
        PartsDays : { type:"number",req:true, min:0, max:99999, pattern: /^[0-9]{0,5}$/ }
        LaborDays : { type:"number", min:0, max:99999, pattern: /^[0-9]{0,5}$/ }
        ContactPhone : { type:"string", maxlength:20, pattern: /^[0-9]+(-[0-9]+)*$/ }
        ContactEmail : { type:"string", maxlength:100,  }
        SupportURL : { type:"string", req:true, maxlength:250, pattern: /^http[s]?[:]\/\/.+$/ }
    }
    other:{
        ItemVersion: { type: "radio", req: true}
        IsOEM : { type: "radio", req: true}
        IsShippingRestriction:  { type: "radio", req: false}
        isInternational:{ type: "radio", req: false}
        IsARSOL:  { type: "radio", req: true}
        IsBATT:  { type: "radio", req: true}
        IsBATTT:  { type: "radio", req: true}
        IsLBULB:  { type: "radio", req: true}
        IsELECT:  { type: "radio", req: true}
        USAHarmonizedCode: { type: "string", req: true, maxlength:10}
        CANHarmonizedCode: { type: "string", req: false, maxlength:10}
        HarmonizedCode:{ type: "string", req: false, maxlength:10}
        BatteryMass:{ pattern:/^[0](\.[1-9])$|^[0](\.[0-9][1-9])$|^([1-9][0-9]{0,4})(\.\d{1,2})?$/ }
        inte: { pattern:/^[1-9]\d{0,6}$/ }
    }
    SpecFile:{
        MaxSize:10
        Type:'SpecDescription'
        Group:'IMCreation'
        FileNamePattern:/.(pdf|txt|docx?|xlsx?|pptx?|jpg)$/
        FileNamePatternTip:"Please choose a valid file. For example: pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,txt. "
    }
    ManualFile:{
        MaxSize:10
        Type:'UserManual'
        Group:'IMCreation'
        FileNamePattern:/.(pdf|docx?)$/
        FileNamePatternTip:"Please choose a valid file. For example: pdf,doc,docx. "
    }
  }

  requestTypeDatas = [
        {text:'All'}
        {text:"Item Creation", value:1}
        {text:"Item Update", value:2}
  ]

  requestStatusDatas = [
        {text:"Approve", value:"Approve"},
        {text:"Decline", value:"Decline"},
        {text:"Pending", value:"Pending"}
  ]

  hasAttachments = [
        {text:"All"},
        {text:"Yes", value:true},
        {text:"No", value:false}
  ]

  return {
    config
    requestTypeDatas
    requestStatusDatas
    hasAttachments
  }

])

