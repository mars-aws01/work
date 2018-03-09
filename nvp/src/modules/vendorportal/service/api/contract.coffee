angular.module("vp-api-contract", ["ngResource"])
.factory('contractAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/contract/:action/:action1", {action:'@action',action1:'@action1'},
        getStandardTerms:
          method: "GET" 
          params:
            vendorType : '@vendorType'
            contractType : '@contractType'
          timeout:apiSetting.apiTimeOut.retrieve   
        exportStandardTerms: 
          method:"POST"
          timeout:apiSetting.apiTimeOut.retrieve
])
 