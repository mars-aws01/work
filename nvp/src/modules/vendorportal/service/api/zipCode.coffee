angular.module("vp-api-zipCode", ["ngResource"])
.factory('zipCodeAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/zip-code/:action", {action:'@action'},
      getZipCodeList:
        method: "GET"
        timeout:apiSetting.apiTimeOut.retrieve
      queryZipCodeList:
        method: "POST"
        timeout:apiSetting.apiTimeOut.retrieve     
])
