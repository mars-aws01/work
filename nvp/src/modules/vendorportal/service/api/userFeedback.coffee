angular.module("vp-api-userFeedback", ["ngResource"])
.factory('userFeedbackAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/management/v2/user-feedback", {},
      addFeedback:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.operation
])