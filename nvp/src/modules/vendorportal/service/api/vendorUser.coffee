angular.module("vp-api-vendorUser", ["ngResource"])
.factory('vendorUserAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/management/v2/vendor-user/:action1/:action2/:action3", {action1:'@action1',action2:'@action2',action3:'@action3'},
      registration:
        method: "POST"
        timeout:apiSetting.apiTimeOut.retrieve    
])
