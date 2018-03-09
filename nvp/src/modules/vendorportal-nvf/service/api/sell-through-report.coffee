angular.module("nvf-api-sell-through-report", ["ngResource"])
.factory('sellThroughReportAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource "#{NEG.VendorPortal_API}/report/v2/sell-through/:action1/:action2", {action1:'@action1',action2:'@action2'},
        search:
            method: "POST"
            timeout:apiSetting.apiTimeOut.retrieve
])