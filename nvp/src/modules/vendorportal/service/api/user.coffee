angular.module("vp-api-user", ["ngResource"])
.factory('userAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/management/v2/user/:action1/:action2/:action3", {action1:'@action1',action2:'@action2',action3:'@action3'},
      invite:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.retrieve
      getUserList:
        method: "GET" 
        params:
          vendorNumber: '@vendorNumber'
        timeout:apiSetting.apiTimeOut.retrieve
      getRoleList:
        method:"GET"
        timeout:apiSetting.apiTimeOut.retrieve
      getPermission:
        method: "GET" 
        params:
          userID: '@userID'
        timeout:apiSetting.apiTimeOut.retrieve
      updatePermission:
        method: "PUT" 
        timeout:apiSetting.apiTimeOut.operation
      getInvitationById:
        method: "GET" 
        params:
          id: '@id'
        timeout:apiSetting.apiTimeOut.retrieve  
      registration:
        method: "POST"
        timeout:apiSetting.apiTimeOut.retrieve
      getCustomerNumber:
        method: "POST"
        timeout:apiSetting.apiTimeOut.retrieve
      queryUserList:
        method: "POST"
        timeout:apiSetting.apiTimeOut.retrieve
      addUser:
        method: "POST"
        timeout:apiSetting.apiTimeOut.retrieve
      addUserRole:
        method: "POST"
        timeout:apiSetting.apiTimeOut.retrieve
      updateUserRole:
        method: "PUT"
        timeout:apiSetting.apiTimeOut.retrieve
      activateVendor:
        method:"PUT"
        timeout:apiSetting.apiTimeOut.retrieve
      deactivateVendor:
        method:"PUT"
        timeout:apiSetting.apiTimeOut.retrieve    
      login:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.retrieve
      forgotPassword:
        method: "POST"
        timeout:apiSetting.apiTimeOut.retrieve 
      resetPassword:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.retrieve   
      resetPasswordvalidation:
        method:"GET"
        timeout:apiSetting.apiTimeOut.retrieve   
      validateUser:
        method:"POST"
        timeout:apiSetting.apiTimeOut.retrieve
      changePassword:
        method: "POST" 
        timeout:apiSetting.apiTimeOut.retrieve   
])
