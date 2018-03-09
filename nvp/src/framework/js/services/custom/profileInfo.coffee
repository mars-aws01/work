negServices.factory('profileApi',["$resource", ($resource) ->

    $resource  "#{NEG.VendorPortal_API}/misc/v2/vendor/profile",{},
        search:
          method: "GET" 
          params:
                VendorNumber:'@VendorNumber'
          timeout:60000
])
