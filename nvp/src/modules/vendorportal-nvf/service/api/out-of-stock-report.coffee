angular.module("nvf-api-out-of-stock", ["ngResource"])
.factory('outOfStockAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource "#{NEG.VendorPortal_API}/report/v2/out-of-stocking-report/:action", {action:'@action'},
        search:
            method: "POST"
            timeout:apiSetting.apiTimeOut.retrieve
])