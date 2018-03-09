angular.module("vp-api-trace", ["ngResource"])
.factory('apiTrace',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/api-trace", {},
      send:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.operation
        
])