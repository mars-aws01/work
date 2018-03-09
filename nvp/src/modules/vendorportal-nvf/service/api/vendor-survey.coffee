angular.module("nvf-api-vendor-survey", ["ngResource"])
.factory('vendorSurveyAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource "#{NEG.VendorPortal_API}/misc/v2/vendor-survey/:action1", {action1:'@action1'},
        search:
            method: "POST"
            timeout:apiSetting.apiTimeOut.retrieve
            
            


])