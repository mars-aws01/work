angular.module("vf-api-orderAck", ["ngResource"])
.factory('orderAckAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource  "#{NEG.VendorPortal_API}/order/v2/purchase-order-ack", {},
    update:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve

])
