angular.module("nvf-api-brand-v2", ["ngResource"])
.factory('brandV2API',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource "#{NEG.VendorPortal_API}/misc/v2/brand", {},
    search:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        IsActive:'@IsActive'
      timeout:apiSetting.apiTimeOut.retrieve
 
])
