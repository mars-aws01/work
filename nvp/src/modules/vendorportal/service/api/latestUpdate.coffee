angular.module("vp-api-latest-update", ["ngResource"])
.factory('latestUpdateAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/latest-update/:action", {action:'@action'},
        query:
          method: "POST"
          timeout:apiSetting.apiTimeOut.retrieve   
        get: 
          method:"GET"
          timeout:apiSetting.apiTimeOut.retrieve
])
 