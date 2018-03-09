angular.module("nvf-api-sub-category", ["ngResource"])
.factory('subCategoryAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource "#{NEG.VendorPortal_API}/misc/v2/sub-category", {},
    search:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        isRetrivedAll:'@isRetrivedAll'
      timeout:apiSetting.apiTimeOut.retrieve
 
])
