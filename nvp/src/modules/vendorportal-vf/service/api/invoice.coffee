angular.module("vf-api-invoice", ["ngResource"])
.factory('invoiceAPI',["$resource","apiSetting", ($resource,apiSetting) ->

  $resource  "#{NEG.VendorPortal_API}/order/v2/invoice/:action", {action:'@action'},
    search:
      method: "POST"
      timeout:apiSetting.apiTimeOut.retrieve
    GetItems:
      method: "GET"
      params:
        vendorNumber:'@vendorNumber'
        poNumber:'@poNumber'
        invoiceNumber:'@invoiceNumber'
      isArray: false
      timeout:apiSetting.apiTimeOut.retrieve
    Create:
      method: "POST"
      timeout:apiSetting.apiTimeOut.limit  
    Update:
      method: "PUT"
      timeout:apiSetting.apiTimeOut.limit  
    Delete:
      method: "Delete"
      params:
        vendorNumber:'@vendorNumber'
        poNumber:'@poNumber'
        invoiceNumber:'@invoiceNumber'
      timeout:apiSetting.apiTimeOut.limit  
])
