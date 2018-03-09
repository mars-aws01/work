angular.module("vf-api-manufacturer", ["ngResource"])
.factory('manufacturerAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource "#{NEG.VendorPortal_API}/misc/v2/manufacturer", {},
    search:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
      timeout:apiSetting.apiTimeOut.retrieve
 
])
