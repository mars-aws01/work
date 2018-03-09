angular.module("vf-api-self-testing", ["ngResource"])
.factory('selfTestingAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource  "#{NEG.VendorPortal_API}/edi-self-service/v2/:action1/:action2/:action3/:action4", {action1:'@action1',action2:'@action2',action3:'@action3',action4:'@action4'},
    query:
      method: "GET"
      timeout:apiSetting.apiTimeOut.retrieve
    save:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve
    deleteConnection:
      method: "Delete"
#      params:
#        ConnectionId:'@connectionId'
#        VendorNumber:'@vendorNumber'
#        ConnectionType:'@connectionType'
#        ConnectionProtocol:'@connectionProtocol'
      isArray: false
      timeout:apiSetting.apiTimeOut.operation

    downloadFile:
      method: "GET"
      timeout:apiSetting.apiTimeOut.retrieve
])
