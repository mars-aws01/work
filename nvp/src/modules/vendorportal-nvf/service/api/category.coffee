angular.module("nvf-api-category", ["ngResource"])
.factory('categoryAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource "#{NEG.VendorPortal_API}/report/v2/category", {},
    search:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
      timeout:apiSetting.apiTimeOut.retrieve
 
])
