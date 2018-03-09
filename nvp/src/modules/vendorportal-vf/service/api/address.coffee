angular.module("vf-api-address", ["ngResource"])
.factory('addressAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/order/v2/ship-notice/address", {},
      search:
         method: "GET" 
         timeout:apiSetting.apiTimeOut.retrieve

])
