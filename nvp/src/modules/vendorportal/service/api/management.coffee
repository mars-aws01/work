angular.module("vp-api-management", ["ngResource"])
.factory('managementAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/management/v2/:action/:action1", {action:'@action',action1:'@action1'},
        search:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve
        validate:
          method:"POST"
          timeout:apiSetting.apiTimeOut.retrieve
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