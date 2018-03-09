angular.module("vp-api-application-form", ["ngResource"])
.factory('applicationFormAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/management/v2/stocking-po-vendor/application-form/:action1", {action1:'@action1'},
      get:
        method: "GET" 
        params:
          OriginalRequestID: '@OriginalRequestID'
        timeout:apiSetting.apiTimeOut.retrieve
      query:
        method: "GET" 
        params:
          vendorNumber: '@vendorNumber'
        timeout:apiSetting.apiTimeOut.retrieve
      save:
        method: "PUT" 
        timeout:apiSetting.apiTimeOut.operation
      submit:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.operation
        
])