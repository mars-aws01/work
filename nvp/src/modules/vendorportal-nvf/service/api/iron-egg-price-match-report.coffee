angular.module("nvf-api-iron-egg-price-report", ["ngResource"])
.factory('ironEggPriceAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource "#{NEG.VendorPortal_API}/report/v2/iron-egg-price-match/:action1/:action2", {action1:'@action1',action2:'@action2'},
        search:
            method: "POST"
            timeout:apiSetting.apiTimeOut.retrieve
])