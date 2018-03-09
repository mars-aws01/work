angular.module("vf-api-orderStatus", ["ngResource"])
.factory('orderStatusAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource  "#{NEG.VendorPortal_API}/order/v2/refresh-order-status", {},
    refreshStatus:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        dateRange:'@dateRange'
      isArray: false
      timeout:apiSetting.apiTimeOut.max

])
