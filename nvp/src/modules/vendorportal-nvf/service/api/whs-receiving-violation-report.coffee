angular.module("nvf-api-whs-receiving-violation", ["ngResource"])
.factory('whsReceivingViolationAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource "#{NEG.VendorPortal_API}/report/v2/warehouse-receiving-violation/:action1/:action2", {action1:'@action1',action2:'@action2'},
        search:
            method: "POST"
            timeout:apiSetting.apiTimeOut.retrieve
])