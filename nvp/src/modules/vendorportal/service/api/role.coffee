angular.module("vp-api-role", ["ngResource"])
.factory('roleAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/management/v2/role/:action1", {action1:'@action1'},
      search:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.retrieve
      deleteRole:
        method: "DELETE" 
        params:
          roleID: '@roleID'
        timeout:apiSetting.apiTimeOut.retrieve
      getRoleDetail:
        method: "GET" 
        params:
          roleID: '@roleID'
        timeout:apiSetting.apiTimeOut.retrieve
      addRole:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.operation
      updateRole:
        method: "PUT" 
        timeout:apiSetting.apiTimeOut.operation
])