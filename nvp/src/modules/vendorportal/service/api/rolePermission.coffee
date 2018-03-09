angular.module("vp-api-rolePermission", ["ngResource"])
.factory('rolePermissionAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/management/v2/role-permission/:action1", {action1:'@action1'},
      search:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.retrieve
])