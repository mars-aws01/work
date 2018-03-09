angular.module("vp-cache-monitor", []).config(['$httpProvider',($httpProvider) ->
    $httpProvider.interceptors.push('timeMarker');
    $httpProvider.interceptors.push('monitorHttpResponseInterceptor');
])
.factory('timeMarker', [ ->
  timestampMarker = 
    request: (config) ->
      config.requestTimeUI = (new Date).toUTCString().replace("UTC", "GMT")
      config
    response: (response) ->
      response.config.responseTimeUI = (new Date).toUTCString().replace("UTC", "GMT")
      response
  timestampMarker
 ]).factory('monitorHttpResponseInterceptor',
['$q','$location','$filter','messager','$rootScope','$timeout','$injector','storage',
($q,$location,$filter,messager,$rootScope,$timeout,$injector,storage) ->
   
   retryStorageKey = "vendorportal_retryAPIList"
   expirationTime = 1   # minute
   maxRetries = 3
   waitTimeout = 1500    # 毫秒
   apiList = ['order/invoice','order/ship-notice','order/purchase-order-ack','item/catalog-inventory']
   deleteRefreshApiList = ['order/invoice','order/ship-notice']
   specialPageAPIMapping = [{
      page:'query-program-contract'
      apis:['vendor-survey/query','latest-update/query']
   }]
   closeLoading = ->
       $(".modal").css( "display", "none" )
       $(".modal-backdrop").css( "display", "none" )
       
   closeLoading2 = ->
     timer = setInterval(->
            loadingMask = $("#target")
            if loadingMask
               $('#target').hide()
               clearInterval timer
          )

   isPassAuth = (rejection) ->
     return false if(!rejection || !rejection.config || !rejection.config.url)
     filterPages = $filter('filter')(specialPageAPIMapping, (i) -> $location.path().indexOf(i.page) >=0)
     if(filterPages && filterPages.length > 0)
       filterPage = filterPages[0]
       filterApis = $filter('filter')(filterPage.apis, (i) -> rejection.config.url.indexOf(i) >=0)
       if(filterApis && filterApis.length > 0)
         return true
     return false

   authReject = (rejection) ->
       if $location.path() == '/home'
          return
       if isPassAuth(rejection) == true
          return
       messager.clear()
       messager.error('Sorry, your login has expired, please login again!')
       closeLoading()
       $rootScope.$broadcast "withoutPermission"
       $rootScope.__returnUrl = $location.path()
   
   createRetryEntity = (config) ->
        return {
            url:config.method+"_"+config.url
            timestamp:new Date()
            retries:1
          }
          
   getRetryList = () ->
       tempData = storage.local.get(retryStorageKey)
       return null if !tempData
       return JSON.parse(tempData)
           
   getRetryEntity = (key) ->
       retryListData = getRetryList()
       return null if !retryListData
       filterData = $filter('filter')(retryListData,(item)-> return item.url == key) 
       if filterData && filterData.length > 0
          return filterData[0]
       else
          return null
          
   checkExpiration = (data) ->
       return true if !data
       now = new Date()
       expiration = new Date(data.timestamp)
       expiration.setMinutes(expiration.getMinutes() + expirationTime)
       xx = now.getTime()
       yy = expiration.getTime()
       if now.getTime() > expiration.getTime()
          cc = 1
       return true if now.getTime() > expiration.getTime()   
       return false
            
   retry_saveData = (config) ->
       tempData = getRetryList()
       if !tempData
          tempData = []
          tempData.push(createRetryEntity(config))
          storage.local.set(retryStorageKey,JSON.stringify(tempData),{path:'/'})
       else
          key = config.method+"_"+config.url
          filterData = $filter('filter')(tempData,(item)-> return item.url == key)
          if filterData && filterData.length > 0
             filterData[0].timestamp = new Date() if checkExpiration(filterData[0]) == true
             if filterData[0].retries < 3
                filterData[0].retries = filterData[0].retries + 1
             else 
                filterData[0].retries = 1
          else
             tempData.push(createRetryEntity(config))
          storage.local.set(retryStorageKey,JSON.stringify(tempData),{path:'/'})
             
   retry_isRetryNow = (rejection) ->
       config = rejection.config
       data = getRetryEntity(config.method+"_"+config.url)
       isRetry = checkExpiration(data)
       return false if data && data.retries >= 3 && isRetry == false
       retry_saveData(config)
       return true  
                    
   retry = (rejection) ->
       isRetry = retry_isRetryNow(rejection)
       if isRetry == true
          xx = 1
#          $timeout(->
#              $http = $injector.get('$http')
#              $http(rejection.config)
#          ,waitTimeout)
   
   hasAPI = (list,url) ->
        return false if url.indexOf("/query") >= 0
        filterData = $filter('filter')(list, (item) -> return url.indexOf(item) >= 0);
        return true if filterData && filterData.length > 0
        return false
        
   warrning = (rejection) ->
        return if rejection.config.method == "GET" 
        return if hasAPI(apiList,rejection.config.url) == false
        messager.clear()
        messager.warning('Oops! Your operation was failed, please go ahead and submit it again.')
        refresh(rejection.config)
        #closeLoading()
        
   refresh = (config) ->
        if config.method == "DELETE" && hasAPI(deleteRefreshApiList,config.url) == true
           $route = $injector.get('$route')
           $route.reload()
   
   trace = (rejection) ->
      common = $injector.get('common')
      return if !rejection.config || !rejection.config.url || !common.currentUser || rejection.config.url.indexOf("api-trace") >= 0
      $route = $injector.get('$route')
      requestItem = {
        APIUrl: rejection.config.url
        HttpMethod: rejection.config.method
        PageUrl: $route.current.originalPath
        APIRequestTimeUtc: rejection.config.requestTimeUI
        VendorNumber: common.currentUser.VendorNumber
        UserID: common.currentUser.ID
        LoginName: common.currentUser.LoginName
        ResponseCode: rejection.status
      }
      if rejection.data && rejection.data.Message
         requestItem.ResponseBody = rejection.data.Message
      closeLoading2()
      apiTrace = $injector.get('apiTrace')
      apiTrace.send requestItem
          
              
   response: (response) ->
      response || $q.when response

   responseError: (rejection) ->
     if(rejection.status == 403 || rejection.status==401)
       authReject(rejection)
     else
       warrning(rejection)
       trace(rejection)
     $q.reject rejection
      
])
