negServices.factory "authorize", ["$http", "$q","$translate","$filter","$location","converter","$window","storage","accountAPI","messager","$rootScope","uuid",
($http, $q,$translate,$filter,$location,converter,$window,storage,accountAPI,messager,$rootScope,uuid) ->

  currentToken:->
     storage.session.get(NEG.PortalTokenKey) || storage.local.get(NEG.PortalTokenKey)

  autoLogin: () ->
    self = this
    deferred = $q.defer()
    token = self.currentToken();
    if(token)
        self.loadAuthData().then(
          ->deferred.resolve "OK",
          (err)->deferred.reject err
        )
    else deferred.reject 'No Token'
    deferred.promise

  loadAuthData:()->
      self=@
      deferred = $q.defer()
      @getAuthData()
      .then(
       (authData)->
          $rootScope.login_submitting = false
          if(authData.MenuPermissionList)
            self.functionList = $filter('orderBy')(authData.MenuPermissionList,'MenuOrder')
            self.newFunctionList = self.loadNewFunctionList(self.functionList)
          self.userInfo = authData.UserInfo
          converData=converter.convert(authData).vendorPortal()
          menuList = converData.menus()
          menu.MenuOrder = parseInt(menu.MenuOrder) for menu in menuList
          self.menus = $filter('orderBy')(menuList,'MenuOrder')
          deferred.resolve "OK"
       ,(err)-> 
         $rootScope.login_submitting = false
         deferred.reject err
       )
      deferred.promise

  ###private method###
  loadNewFunctionList: (menuList) ->
    newFunctionList = []
    for menu in menuList
      if(menu.PermissionFunctionList && menu.PermissionFunctionList.length > 0)
        for p in menu.PermissionFunctionList
          temp = p
          temp.MenuURL = menu.MenuURL
          newFunctionList.push(temp)
      if(menu.SubMenuList && menu.SubMenuList.length > 0)
        for sub in menu.SubMenuList
          if(sub.PermissionFunctionList && sub.PermissionFunctionList.length > 0)
            for p in sub.PermissionFunctionList
              temp = p
              temp.MenuURL = sub.MenuURL
              newFunctionList.push(temp)
    return newFunctionList

  getAuthData:()->
    $rootScope.login_submitting=true
    self = this
    deferred = $q.defer()
    currentLang=$translate.uses()
    loginToken=@currentToken()
    requestUser = {}
    if(self.loginUser && self.loginUser.LoginName)
      requestUser = angular.copy(self.loginUser)
    else
      requestUser.AuthorizationToken = loginToken
    requestUser.action = 'login'
    requestUser.ClientID = $rootScope.ClientID
    accountAPI.login(requestUser)
    .$promise.then (response) ->
         if(response&&response.Succeeded)
             isRMe = self.loginUser.IsRememberMe if self.loginUser
             self.loginUser = angular.copy(response.UserInfo)
             self.loginUser.IsRememberMe = true if isRMe
             self.setStorage(response.AuthorizationToken)
             deferred.resolve response
         else
            if response.Errors && !response.Succeeded
               deferred.reject response
    ,(error) ->
         deferred.reject error
    deferred.promise

  clearToken:(key)->
    $.removeCookie(key)
    storage.local.del(key)
    storage.session.del(key)
    delete $http.defaults.headers.common[key]
    if ($.cookie(key))
       $.cookie(key,null,{path: '/'});

  logout: () ->
    self = this
    deferred = $q.defer()
    loginToken=@currentToken()
    requestUser = {
      AuthorizationToken : loginToken
      action : 'logout'
    }
    accountAPI.logout(requestUser)
    .$promise.then (response) ->
         if(response&&response.Succeeded)
            self.menus = undefined
            self.loginUser=undefined
            #clear local info.
            self.clearToken(NEG.PortalTokenKey)
            self.clearToken('hasRemember')
            self.clearToken('login-user')
         else
            deferred.reject 'Logout failed.'
    ,(error) ->
         deferred.reject error
    deferred.promise

  login: (user)->
    self = this
    deferred = $q.defer()
    self.loginUser = angular.copy(user)
    self.loadAuthData().then(
           ->
             deferred.resolve "OK",
           (err)-> deferred.reject err
        )
    deferred.promise

  setStorage: (newAuthToken) ->
    self = this
    remember = null
    if(self.loginUser&&self.loginUser.LoginName)
      remember=self.loginUser.IsRememberMe
    if(storage.local.get('hasRemember') == "true")
      remember = true
    tokenKey = NEG.PortalTokenKey
    $http.defaults.headers.common['AuthorizationToken']= newAuthToken
    if(remember)
        storage.local.set('hasRemember',true)
        storage.session.del(tokenKey)
        storage.session.del('login-user')
        if(self.loginUser && self.loginUser.LoginName)
          storage.local.set('login-user',self.loginUser.LoginName,{path:'/',expires:3 * 24 * 60 * 60})
        #为了兼容cookies 所以需要加过期后缀，对storage是没有影响的
        storage.local.set(tokenKey,newAuthToken,{path:'/',expires:3 * 24 * 60 * 60})
    else
        storage.local.del('hasRemember')
        storage.local.del(tokenKey)
        if(self.loginUser)
          storage.local.del('login-user')
          storage.session.set('login-user',self.loginUser.LoginName)
          storage.session.set(tokenKey,newAuthToken)

  getUrlObj:(url)->
     sourceUrl=url.substring(1,url.length)
     sourceUrl=sourceUrl.substring(sourceUrl.indexOf('/'),sourceUrl.length)
     if !@urls
        return false
     if @urls instanceof Array then $filter('filter')(@urls,(urlItem)->
         urlItem==url or urlItem==sourceUrl
     )[0] else @urls[url]||@urls[sourceUrl]


  canVisitPage: (url) ->
    #modify by clark add array object support of authorize urls.
    #Impact files: framework-MainCtrl.js
    #Impact functions:use function:[setFavorite] at generate bradcrumb.
    urlInfo=@getUrlObj(url)
    if (!urlInfo)
      return true
    else
      func =urlInfo.AuthKey
      app = urlInfo.ApplicationId
      if not func? or func is ''
        return true
      else
        return @hasFunction func, app


  hasFunction: (functionName, applicationId) ->
    if not @functions?
      return false
    else
      #modify by clark add functionName element's array support
      if @functions instanceof Array and @functions.indexOf(functionName) >=0
         return true

      for f in @functions
         if f.Name is functionName and f.ApplicationId is applicationId
            return f

    return false

  getApplicationIds: ->
    applicationIds = []
    for name, id of NEG.Applications
      applicationIds.push id
    applicationIds

  getCurrentUrlInfo:->
    currentPath=$location.path();
    this.urls[currentPath]||$filter('filter')(@urls,{Url:currentPath})[0]

  author: (strMark,domObj)->
      self=this
      authKey=if typeof domObj is 'object' then strMark else ''
      if(!domObj)
         domObj=angular.element(strMark)
      if(typeof(domObj) is 'function' && arguments.length is 2)
         authKey=strMark
      callback=arguments[arguments.length-1]

      if !authKey
         authKey= domObj&&domObj.length&&domObj.data('auth-key')
      callback=if typeof callback is 'function' then callback else false
      currentUrlInfo=self.getCurrentUrlInfo()
      appId=currentUrlInfo&&currentUrlInfo.ApplicationId

      hasAuth=self.hasFunction(authKey,appId);
      if !hasAuth || hasAuth.Behavior is 'hidden' || !callback
         if(!callback)
           domObj.hide();
         else
           callback(false);
         return false

      if typeof hasAuth is 'object'
         callback && callback(hasAuth.Behavior,domObj); return false

      callback&&callback(true);

  hasRoles: ()->
      appId=this.getCurrentUrlInfo().ApplicationId
      $filter('filter')(this.roles,{ApplicationId:appId})
]
