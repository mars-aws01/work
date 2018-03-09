angular.module("vf-api-item", ["ngResource"])
.factory('itemAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/item/v2/catalog-inventory/:action", {action:'@action'},
        search:
          method: "POST"
          timeout:apiSetting.apiTimeOut.queryLimit 
        save:
          method: "POST"
          timeout:apiSetting.apiTimeOut.limit
        create:
          method: "POST"
          timeout:apiSetting.apiTimeOut.limit  
])
