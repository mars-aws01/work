angular.module("vp-api-eims", ["ngResource"])
.factory('eimsAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/eims/:action/:action1", {action:'@action',action1:'@action1'},
        getRebateType:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve 
          isArray: false
        getStatus:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve 
          isArray: false
        getStatusHistory:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve
          isArray: false
        queryProgramContract:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve   
        getContractDetail:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve   
        getDFISProperty:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve   
        getAttachmentList:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve  
          isArray: false
        updateAttachment:
          method: "PUT" 
          timeout:apiSetting.apiTimeOut.retrieve   
        insertAttachment:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve  
        getEventLogList:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve  
          isArray: true
        approve:
          method: "PUT" 
          timeout:apiSetting.apiTimeOut.retrieve
        reject:
          method: "PUT" 
          timeout:apiSetting.apiTimeOut.retrieve    
        createEventlog:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve 
        getUserDetail:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve
        getNeweggCentralUrl:
          method: "GET" 
          timeout:apiSetting.apiTimeOut.retrieve
])
 