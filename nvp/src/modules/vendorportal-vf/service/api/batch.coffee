angular.module("vf-api-batch", ["ngResource"])
.factory('batchAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource  "#{NEG.VendorPortal_API}/batch/v2/:action1/:action2", {action1:'@action1',action2:'@action2'},
    seachDownloadHistory:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve 
    seachUploadHistory:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve 
    addDownloadRequest:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve
    addUploadRequest:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve
])
