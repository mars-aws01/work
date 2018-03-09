angular.module("vp-api-captcha", ["ngResource"])
.factory('captchaAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/captcha/v2/:action", {action:'@action'},
        search:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve
        validate:
          method:"POST"
          timeout:apiSetting.apiTimeOut.retrieve
])