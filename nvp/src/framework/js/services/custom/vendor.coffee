negServices.factory('vendorAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/vendor/:action", {action:'@action'},
      search:
        method: "GET" 
        params:
          VendorNumber:'@VendorNumber'
          isWebformVendor:'@isWebformVendor'
          VendorType:'@VendorType'
        timeout:apiSetting.apiTimeOut.retrieve
      query:
        method:"POST"
        timeout: apiSetting.apiTimeOut.retrieve
      getType:
        method: "GET" 
        timeout: apiSetting.apiTimeOut.retrieve
])
