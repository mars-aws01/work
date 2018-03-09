angular.module("vf-api-item-creation", ["ngResource"])
.factory('itemCreationAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/item/v2/item-creation/:action1/:action2/:action3", {action1:'@action1',action2:'@action2',action3:'@action3'},
        search:
          method: "GET"
          timeout:apiSetting.apiTimeOut.retrieve  
        query:
           method:"POST"
           timeout:apiSetting.apiTimeOut.retrieve  
        create:
           method:"POST"
           timeout:apiSetting.apiTimeOut.retrieve  
        attachment:
            method:"PUT"
            timeout:apiSetting.apiTimeOut.retrieve
])
.factory('itemUpdateQueryAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource  "#{NEG.VendorPortal_API}/item/v2/item-update/:action1/:action2/:action3", {action1:'@action1',action2:'@action2',action3:'@action3'},
        query:
          method: "POST"
          timeout:apiSetting.apiTimeOut.retrieve
        GetDetail:
          method: "GET"
          timeout:apiSetting.apiTimeOut.retrieve 
        getPropertyBunch:
           method:"GET"
           timeout:apiSetting.apiTimeOut.retrieve 
])