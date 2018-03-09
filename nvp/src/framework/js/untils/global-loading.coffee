angular.module("global-loading", [])

.constant('global-loading-app', {})

.config(['$httpProvider', 'global-loading-app',($httpProvider, app) ->
    # global loading status
    status =
      count: 0
      loading: false
      cancel : ->
        status.count = 0
        status.loading = false
        app.loading(false)

    # ajax begin
    $httpProvider.defaults.transformRequest.push (data) ->
      status.count += 1
      if !status.loading
        if !status.loading and status.count > 0
          status.loading = true
          app.loading(true)
      return data

    # ajax end
    $httpProvider.defaults.transformResponse.push (data) ->
      status.count -= 1
      status.cancel()  if status.loading and status.count is 0
      return data

    $httpProvider.responseInterceptors.push ["$rootScope", "$q", "messager", ($rootScope, $q, messager) ->
      success = (response) ->
        response
      error = (response) ->
        if(!(response.status is 401 || response.status is 403))               
            if angular.isObject(response.data)
              if response.data.Message?
                if(response.data.StackTrace.indexOf("CatalogInventoryQueryService.OnPost") > 0 && response.data.Message.indexOf("Validation Errors") > 0 )
                  return
                if(response.data.Message)
                  messager.error response.data.Message
              else if response.data.message?
                if(response.data.Message)
                  messager.error response.data.message
              else
                msg = JSON.stringify response.data
                if(msg)
                  messager.error msg
            else
              if(response.data)
                messager.error response.data
       
        status.cancel()
        $q.reject(response)
      (promise) ->
        promise.then success, error
    ]
  ])

#register global ajax loading
.run(["$rootScope","global-loading-app", ($rootScope, app) ->
    app.loading = (val) ->
      $rootScope.loading = val
      if(val)
        gridLoading = $(".k-loading-mask")
        return if(gridLoading && gridLoading.length > 0)
        $('#target').show()


])

