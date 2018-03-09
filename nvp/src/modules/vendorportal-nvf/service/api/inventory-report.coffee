angular.module("nvf-api-inventory-report", ["ngResource"])
.factory('inventoryReportAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource "#{NEG.VendorPortal_API}/report/v2/inventory/:action1/:action2", {action1:'@action1',action2:'@action2'},
        search:
            method: "POST"
            timeout:apiSetting.apiTimeOut.retrieve
])