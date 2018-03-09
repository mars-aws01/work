angular.module("vp-api-dashboard", ["ngResource"])
.factory('dashboardAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/report/v2/dashboard/:action1/:action2", {action1:'@action1',action2:'@action2'},
        searchOpenOrders:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve  
        searchMissingDoc:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve     
        searchSKUInfo:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve        
        searchVendorInfo:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve   
        searchCOGSInfo:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve    
        searchTopSKUInfo:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve           
        searchRejectedTopSKUInfo:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve  
        searchShippingDelayInfo:
          method: "POST" 
          timeout:apiSetting.apiTimeOut.retrieve                  
])
 