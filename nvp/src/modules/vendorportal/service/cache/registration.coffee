angular.module("vp-cache-registration", []).factory('registration',
["$q","$filter","registrationAPI","terrirotyAPI",($q,$filter,registrationAPI,terrirotyAPI) ->
 
  # config
  config = {
         CompanyInformation : {
             VendorType : { type:"string", req:true,}
             CompanyName : {type:"string", req:true, maxlength:160 }
             DBA : {type:"string",  maxlength:80 }
             WebsiteURL : {type:"string", maxlength:50 }
             TaxID : {type:"string", req:true, maxlength:20, pattern: /^[A-Za-z0-9]+([-\s]*[A-Za-z0-9]+)*$/ }
             EmployeesNumber : {type:"number", req:true, maxlength:9, min:0, max:999999999, pattern: /^\d{1,9}$/ }
             PreferredPayMethod : {type:"string", req:true, maxlength:4 }
             PreferredCurrency : {type:"string", req:true, maxlength:3 }
             DunsNumber : {type:"string",  maxlength:11, pattern: /^(\d{2}[-]\d{3}[-]\d{4})?$/ }
             IncorporationState : {type:"string", maxlength:3 }
             BusinessType : {type:"string", maxlength:30 }
             PublicCompanyStockSymbol : {type:"string", maxlength:100 }
             EstablishedYear : {type:"number",  min:0, max:9999, pattern:/^\d{0,4}$/ }
             TotalAnnualRevenue : {type:"number", min:0, max:9999999999.99, pattern:/(^\d{0,10}([.]\d{1,2})?)$/ }
             ProjectRevenue : {type:"number", min:0, max:9999999999.99, pattern:/(^\d{0,10}([.]\d{1,2})?)$/ }
             InvolvedDescription : {type:"string", maxlength:2000 }
         }
         StandardLegalTerms : {
             SignBy : {type:"string", req:true, maxlength:15 }
             Title : {type:"string", req:true, maxlength:20 }
             PrintedName : {type:"string", req:true, maxlength:30 }
             Date : {req:true}
         }
         SupportingDocument : {
            BankInformation : {
               BankCountry : {type:"string", req:true, maxlength:3 }
               BankKey : {type:"string", req:true, maxlength:24 }
               BankName : {type:"string", req:true, maxlength:60 }
               Region : {type:"string", req:true, maxlength:3 }
               Street : {type:"string", req:true, maxlength:35 }
               City : {type:"string", req:true, maxlength:35 }
               BankBranch : {type:"string", req:true, maxlength:100 }
               BankContactPhoneNumber : {type:"string", req:true, maxlength:18 }
               SwiftCode : {type:"string", req:true, maxlength:11 }
               NameOnAccount : {type:"string", req:true, maxlength:60 }
               AccountNumber : {type:"string", req:true, maxlength:18 }
               IBAN : {type:"string", req:true, maxlength:34 }
               ValidFrom : {req:true}
               IntermediaryBankRouting : {type:"string", maxlength:50 }
               IntermediaryBank : {type:"string", maxlength:50 }
            }
         }
         Address:{
            Address1 : {type:"string", req:true, maxlength:100 }
            Address2 : {type:"string", maxlength:100 }
            City : {type:"string", req:true, maxlength:45 }
            StateProvince : {type:"string", req:true, maxlength:32 }
            ZipPostalCode : {type:"string", req:true, maxlength:10}
            Country : {type:"string", req:true, maxlength:15 }
         }
         Contact:{
            Name : {type:"string", req:true, maxlength:80 }
            JobTitle : {type:"string", maxlength:80 }
            Email : {type:"string", req:true, maxlength:80 }
            Phone : {type:"string", req:true, maxlength:20 }
         }
         UploadFile:{
            maxCount:5
            maxSize:10
            rejects:["exe","bat","com"]
            filenamePattern:/^[^\u4e00-\u9fa5]{1,75}$/
            filenamePatternTip:"File name cannot contain Chinese and length less than 75."
            attachmentType_w9:"05"
            attachmentType_terms:"10"
            attachmentType_void:"14"
            attachmentType_bank:"15"
            attachmentType_2year:"13"
            attachmentType_db:"11"
            attachmentType_standard:"02"
         }
    }
    
  # Commbox 
  poData = {
    vendortype:[]
    paymethod:[]
    currency:[]
    country:[]
    state:[]
    usaState:[]
    businessentity:[]
    territory:[]
  }
  
  get_vendortype = ->
    deferred = $q.defer()
    registrationAPI.getRes { resource : 'vendor-type' }
       ,(response)->
         if(response&&response.TotalCount > 0)
           poData.vendortype = response.VendorTypeList
         deferred.resolve "OK"
    deferred.promise  
     
  get_paymethod = ->
    deferred = $q.defer()
    registrationAPI.getRes { resource : 'paymethod' }
       ,(response)->
         if(response&&response.TotalCount > 0)
           poData.paymethod = response.Paymethods
         deferred.resolve "OK"  
    deferred.promise 
        
  get_currency = ->
    deferred = $q.defer()
    registrationAPI.getRes { resource : 'currency' }
       ,(response)->
         if(response&&response.TotalCount > 0)
           poData.currency = response.CurrencyList
         deferred.resolve "OK" 
    deferred.promise    
       
  get_country = ->
    deferred = $q.defer()
    registrationAPI.getRes { resource : 'country' }
       ,(response)->
         if(response&&response.TotalCount > 0)
           poData.country = response.CountryList
         deferred.resolve "OK"    
    deferred.promise  
       
  get_state = ->
    deferred = $q.defer()
    registrationAPI.getRes { resource : 'state' }
       ,(response)->
         if(response&&response.TotalCount > 0)
           poData.state = angular.copy(response.StateList)
           poData.usaState = $filter('filter')(response.StateList, (i) -> i.Country == 'USA')
         deferred.resolve "OK"   
    deferred.promise  
         
  get_businessentity = ->
    deferred = $q.defer()
    registrationAPI.getRes { resource : 'business-entity' }
       ,(response)->
         if(response&&response.TotalCount > 0)
           poData.businessentity = response.BusinessEntityList
         deferred.resolve "OK"  
    deferred.promise
               
  get_territory = ->
    deferred = $q.defer()
    terrirotyAPI.getRes { resource : 'territory' }
       ,(response)->
         if(response&&response.TotalCount > 0)
           poData.territory = $filter('orderBy')(response.TerritoryList,"TerritoryDescription")
           for terr in poData.territory
             terr.isChecked = false
         deferred.resolve "OK"
    deferred.promise    
         
  initData = (callback) ->
    $q.all([
       get_vendortype() , get_paymethod() , get_currency() , get_country() , get_state() , get_businessentity() , get_territory()
    ])
    .then ->
        callback()
                                                                         
  return {
    config
    poData
    get_vendortype
    get_paymethod
    get_currency
    get_country
    get_state
    get_businessentity
    get_territory
    initData
  }

])

