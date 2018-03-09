angular.module("vp-api-registration", ["ngResource"])
.factory('registrationAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/po/:resource", {resource:'@resource'},
      getRes:
        method: "GET" 
        timeout:apiSetting.apiTimeOut.retrieve
      getContract:
        method: "GET"
        params:
            vendorNumber : '@vendorNumber'
        timeout:apiSetting.apiTimeOut.retrieve
])