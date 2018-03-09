angular.module("vp-api-warehouse", ["ngResource"])
.factory('warehouseAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/configuration/v2/warehouse/:action", {action:'@action'},
        search:
          method: "GET" 
          params:
            vendorNumber : '@vendorNumber'
          timeout:apiSetting.apiTimeOut.retrieve
])
