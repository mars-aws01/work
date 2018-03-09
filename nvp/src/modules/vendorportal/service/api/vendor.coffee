# CoffeeScript
angular.module("vp-api-vendormgr", ["ngResource"])
.factory('vendorMgrAPI',["$resource","apiSetting", ($resource,apiSetting) ->
  $resource  "#{NEG.VendorPortal_API}/management/v2/vendor/:action1/:action2/:action3", {action1:'@action1',action2:'@action2',action3:'@action3'},
    search:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve 
    getVenderList:
      method:"GET"
      timeout:apiSetting.apiTimeOut.retrieve 
    getVenderRoles:
      method:"GET"
      timeout:apiSetting.apiTimeOut.retrieve 
    saveRoles:
      method:"PUT"
      timeout:apiSetting.apiTimeOut.retrieve
    inviteVendor:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve
    inviteCheck:
      method: "GET"
      timeout:apiSetting.apiTimeOut.retrieve
    register:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve                     
])