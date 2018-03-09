angular.module("vf-api-product-roadmap", ["ngResource"])
.factory('productRoadmapAPI',["$resource","apiSetting", ($resource,apiSetting) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/vendor-roadmap/:action", {action:'@action'},
      query:
         method: "POST"
         timeout:apiSetting.apiTimeOut.retrieve
      add:
         method: "POST"
         timeout:apiSetting.apiTimeOut.retrieve
      get:
         method: "GET"
         timeout:apiSetting.apiTimeOut.retrieve
      update:
         method: "PUT"
         timeout:apiSetting.apiTimeOut.retrieve
      remove:
         method: "DELETE"
         timeout:apiSetting.apiTimeOut.retrieve
])
