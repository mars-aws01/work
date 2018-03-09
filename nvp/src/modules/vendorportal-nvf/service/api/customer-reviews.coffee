angular.module("nvf-api-customer-reviews", ["ngResource"])
.factory('customerReviewsAPI',["$resource","apiSetting", ($resource,apiSetting) ->
    $resource "#{NEG.VendorPortal_API}/content/v2/customer-review/:action1/:action2", {action1:'@action1',action2:'@action2'},
    #$resource "http://10.1.24.130:3000/vendor-portal/content/v2/customer-review/:action1/:action2", {action1:'@action1',action2:'@action2'},
        search:
            method: "POST"
            timeout:apiSetting.apiTimeOut.retrieve
        getReply:
            method: "GET"
            params:
              ReviewID:'@ReviewID'
              VendorNumber:'@VendorNumber'
            isArray: false
            timeout:apiSetting.apiTimeOut.retrieve    
        createReply:
            method: "POST"
            timeout:apiSetting.apiTimeOut.retrieve   
        updateReply:
            method: "PUT"
            timeout:apiSetting.apiTimeOut.retrieve 
])