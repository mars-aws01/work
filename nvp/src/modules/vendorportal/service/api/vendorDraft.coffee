angular.module("vp-api-vendor-draft", ["ngResource"])
.factory('vendorDraftAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/po/:action", {action:'@action'},
        getRes:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve   
        save: 
          method:"POST"
          timeout:apiSetting.apiTimeOut.retrieve
])
 