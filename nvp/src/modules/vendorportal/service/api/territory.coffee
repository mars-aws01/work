# CoffeeScript
angular.module("vp-api-territory", ["ngResource"])
.factory('terrirotyAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/:resource", {resource:'@resource'},
      getRes:
        method: "GET" 
        timeout:apiSetting.apiTimeOut.retrieve
])