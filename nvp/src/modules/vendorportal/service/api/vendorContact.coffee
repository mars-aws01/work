angular.module("vp-api-vendorContact", ["ngResource"])
.factory('vendorContactAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource  "#{NEG.VendorPortal_API}/management/v2/vendor-contact/:action", {action:'@action'},
    search:
      method: "GET" 
      timeout:apiSetting.apiTimeOut.retrieve
          
    GetVendorContact:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber' 
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve
      
    Create:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve  
    Update:
      method: "PUT"
      timeout:apiSetting.apiTimeOut.retrieve  
    Delete:
      method: "Delete"
      params:
        ContactNumber:'@vendorNumber' 
      timeout:apiSetting.apiTimeOut.retrieve  
])
