angular.module("vf-api-orderException", ["ngResource"])
.factory('orderExceptionAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource  "#{NEG.VendorPortal_API}/order/v2/exception/:action", {action:'@action'},
    summary:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        poNumber:'@poNumber'
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve
    items:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        poNumber:'@poNumber'
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve
    detail:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        poNumber:'@poNumber'
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve
])
