angular.module("vf-api-shipnotice", ["ngResource"])
.factory('shipNoticeAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource  "#{NEG.VendorPortal_API}/order/v2/ship-notice/:action", {action:'@action'},
    search:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve
    getShipNotice:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        poNumber:'@poNumber'
        shipNoticeID:'@shipNoticeID'
        withDetail:true
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve
    deleteShipNotice:
      method: "Delete"
      params:
        vendorNumber:'@vendorNumber'
        shipNoticeID:'@shipNoticeID'
      isArray: false
      timeout:apiSetting.apiTimeOut.limit
    createShipNotice:
      method: "POST"
      isArray: false
      timeout:apiSetting.apiTimeOut.limit
    updateShipNotice:
      method: "PUT"
      isArray: false
      timeout:apiSetting.apiTimeOut.limit
    getShipService:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve
    getShipAddress:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve
])
