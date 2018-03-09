angular.module("vf-api-item-update", ["ngResource"])
.factory('itemUpdateAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/item/v2/item-update/:action1/:action2/:action3", {action1:'@action1',action2:'@action2',action3:'@action3'},
        queryNeweggItem:
          method: "POST"
          timeout:apiSetting.apiTimeOut.retrieve  
        getDetail:
           method:"GET"
           timeout:apiSetting.apiTimeOut.retrieve  
        getProperty:
           method:"GET"
           timeout:apiSetting.apiTimeOut.retrieve
        getPropertyBunch:
           method:"GET"
           timeout:apiSetting.apiTimeOut.retrieve
        create:
           method:"POST"
           timeout:apiSetting.apiTimeOut.retrieve  
        attachment:
            method:"PUT"
            timeout:apiSetting.apiTimeOut.retrieve
        search:
            method:"GET"
            timeout:apiSetting.apiTimeOut.retrieve
])
.factory('tempItemUpdateAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource  "http://10.16.75.25:8513/tlri39m/item-creation/request/query", {},
        query:
          method: "POST"
          timeout:apiSetting.apiTimeOut.retrieve  
])
.factory('imAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource  "https://apis.newegg.org/content/v1/:action1/:action2", {action1:'@action1',action2:'@action2'},
        getPropertys:
           method:"GET"
           timeout:apiSetting.apiTimeOut.retrieve  
        getPropertyValues:
           method:"GET"
           timeout:apiSetting.apiTimeOut.retrieve 
])