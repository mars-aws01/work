angular.module("nvf-api-brand", ["ngResource"])
.factory('brandAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource "#{NEG.VendorPortal_API}/report/v2/brand", {},
    search:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
      timeout:apiSetting.apiTimeOut.retrieve
 
])
