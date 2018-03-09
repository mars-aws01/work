angular.module("vf-api-batch-item-creation", ["ngResource"])
.factory('batchItemCreationAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/batch/v2/item-creation/:action", {action:'@action'},
        query:
           method:"POST"
           timeout:apiSetting.apiTimeOut.retrieve  
        submit:
           method:"POST"
           timeout:apiSetting.apiTimeOut.retrieve  
])
