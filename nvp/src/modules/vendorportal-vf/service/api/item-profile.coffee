angular.module("vf-api-item-profile", ["ngResource"])
.factory('itemProfileAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/item/v2/item-profile/:action1", {action1:'@action1'},
        search:
          method: "POST"
          timeout:apiSetting.apiTimeOut.retrieve  
        getPropertys:
           method:"GET"
           timeout:apiSetting.apiTimeOut.retrieve  
        getDescription:
           method:"GET"
           timeout:apiSetting.apiTimeOut.retrieve  
])
