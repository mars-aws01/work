angular.module("vp-api-stocking-po", ["ngResource"])
.factory('stockingPOAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/management/v2/stocking-po-vendor/application-form/:action1", {action1:'@action1'},
      export:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.operation
 
])