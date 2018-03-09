angular.module("nvf-api-vendor-rma-queue-report", ["ngResource"])
.factory('vendorRmaQueueReportAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource "#{NEG.VendorPortal_API}/report/v2/vendor-rma-queue/:action1/:action2", {action1:'@action1',action2:'@action2'},
        search:
            method: "POST"
            timeout:apiSetting.apiTimeOut.retrieve
])