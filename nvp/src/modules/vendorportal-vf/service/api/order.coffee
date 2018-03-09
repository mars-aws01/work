angular.module("vf-api-order", ["ngResource"])
.factory('orderAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource  "#{NEG.VendorPortal_API}/order/v2/purchase-order/:action", {action:'@action'},
    search:
      method: "POST"
      timeout:apiSetting.apiTimeOut.queryLimit
      
    getOrder:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        poNumber:'@poNumber'
        withDetail:'@withDetail'
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve
      
    getItems:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        poNumber:'@poNumber'
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve

    refreshStatus:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        dateRange:'@dateRange'
      isArray: false
      timeout:apiSetting.apiTimeOut.max

])
