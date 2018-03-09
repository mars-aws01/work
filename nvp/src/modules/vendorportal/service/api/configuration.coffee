angular.module("vp-api-configuration", ["ngResource"])
.factory('configAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    #https://apis.newegg.com/vf/v1/configuration/:action1/:action2/:action3
    $resource  "#{NEG.VendorPortal_API}/configuration/v2/:action1/:action2/:action3", {action1:'@action1',action2:'@action2',action3:'@action3'},
        getInventoryReportCapability:
          method: "GET" 
          params:
            vendorNumber : '@vendorNumber'
            code: '@code'
          timeout:apiSetting.apiTimeOut.retrieve
        getDocumentSchedule:
          method: "GET" 
          params:
            vendorNumber : '@vendorNumber'
          timeout:apiSetting.apiTimeOut.retrieve
])
 