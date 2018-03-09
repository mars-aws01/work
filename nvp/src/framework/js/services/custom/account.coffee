negServices.factory('accountAPI',["$resource",($resource) ->
  $resource  "#{NEG.VendorPortal_API}/management/v2/user/:action", {action:'@action'},
  token:
      method: "GET"
      params:
        hasReferenceUrl:false
      isArray: false
      timeout:60000
  login:
      method: "POST"
      params:
        LoginName:'@loginName'
        Password:'@password'
        ValidateToken:'@validateToken'
        ValidateTransNo:'@validateTransNo'
        ValidateCode:'@validateCode'
      isArray: false
      timeout:60000
  logout:
      method: "GET"
      params:
        AuthorizationToken : '@AuthorizationToken'
      isArray: false
      timeout:60000
])
