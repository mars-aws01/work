angular.module("nvf-api-category-v2", ["ngResource"])
.factory('categoryV2API',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource "#{NEG.VendorPortal_API}/misc/v2/category", {},
    search:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        IsActive:'@IsActive'
      timeout:apiSetting.apiTimeOut.retrieve
 
])
