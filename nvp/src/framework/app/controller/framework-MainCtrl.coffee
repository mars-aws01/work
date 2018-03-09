angular.module("framework-ctrl-main",[])

.controller('MainCtrl',["$scope","$rootScope","$http","$location","common","authorize", "systemRoute", "userProfile", "$route", "$window","$filter","vendorAPI"
($scope,$rootScope,$http,$location,common,authorize,systemRoute,userProfile, $route, $window,$filter,vendorAPI) ->
  $scope.nowYear=(new Date).getFullYear()
  #alert($scope.nowYear)
  #debugger
  #Sidebar
  loadMenu = ->
    data = systemRoute.buildMenuTree()
    $rootScope.isTopMenu = false
    tempVal = angular.copy(data)
    if tempVal && tempVal.length > 0
         for item in tempVal
            if item.SubMenus && item.SubMenus.length > 0
              tempSubMenus = []
              for sub in item.SubMenus
                tempSubMenus.push(sub) if sub.IsVisible == true 
              item.SubMenus = tempSubMenus 
             
    $rootScope.__menus = tempVal
    if not $rootScope.__aceMenuInit? or $rootScope.__aceMenuInit is false
      setTimeout((-> ace.handle_side_menu($)),1000)
      $rootScope.__aceMenuInit = true

  $scope.loginUser = {}
  $scope.notPremissions=['/login','/404']
  refreshFrameData=->
    currentPath = $location.path()
    menus = authorize.menus
    $scope.loginUser = angular.copy(authorize.userInfo)
    $rootScope.isLoginSucceed = true
    common.currentUser = authorize.userInfo
    common.currentUser.isCurrentUser = true
    common.currentUser.functionList = authorize.functionList
    common.currentUser.newFunctionList = authorize.newFunctionList

    common.resetAgentVendor(currentPath,common.currentUser)
    if common.currentUser.VendorNumber == 0 || common.currentUser.VendorNumber == '0'
       common.currentUser.VendorName = 'Administrator'
    else
        if(!common.currentUser.VendorName && common.currentUser.Type=='Vendor')
              vendorAPI.search {VendorNumber:common.currentUser.VendorNumber}
                  ,(response)->
                      if(response&&response.Succeeded&&response.VendorList&&response.VendorList.length > 0)
                          common.currentUser.VendorName=response.VendorList[0].VendorName
                          common.currentUser.CountryCode = response.VendorList[0].CountryCode
                          common.currentUser.WarehouseCountryCode = response.VendorList[0].WarehouseCountryCode
                          common.updateProfile(common.currentUser.VendorNumber)
                      
    if(!common.currentUser.agentVendor)
      common.currentUser.agentVendor = {
        hasSelected : false
        hasFocus: false 
      }
    $scope.loginUser.Name = common.currentUser.LoginName
    routePath = $scope.routePath
    if routePath? and routePath.length > 0
      for item in routePath
        item.isOpen = item.isSelected = false
    routePath = []
    if systemRoute.isFrameworkPage currentPath, routePath
      $scope.routePath = routePath
    else
      $scope.routePath = systemRoute.generateRoute(currentPath, menus)
    $scope.PageDescription = ''
    generateBradcrumb()
    #systemRoute.addMostUsed($scope.routePath)

  $rootScope.$on "$routeChangeSuccess" , ->
    menus = $(".vendorportal-temp-menu")
    for m in menus
      if m.outerHTML && (m.outerHTML.indexOf('style="display: block;') > 0 || m.outerHTML.indexOf('display: block;"') > 0)
         $(m).hide()
    refreshFrameData()
  
  $scope.authUrlPermission=(functionList,url)->
    return false if !functionList or functionList.length==0
    return false if !url
    urlLower="/"+url.toLowerCase().split("/")[1]   
    urlLower = "/customer-reviews" if urlLower == "/product-reviews"
    #urlLower = "/dashboard" if urlLower == "/vendor-survey"
    urlLower = "/self-testing-dashboard" if urlLower.indexOf("/self-testing-") >= 0
    urlLower = "/home" if urlLower == "/pay" || urlLower == "/change-password" || urlLower == "/vendor-survey"
    filterurl=$filter('filter')($scope.notPremissions,(f) -> return f==urlLower)
    return true if filterurl and filterurl.length>0
    for index of functionList
      item=functionList[index]
      return true if item.Type=='Page' and item.MenuURL and item.MenuURL.toLowerCase()==urlLower and $scope.JudgePagePermission(item.PermissionFunctionList)
      if item.SubMenuList and item.SubMenuList.length>0
        for num of item.SubMenuList
          subitem=item.SubMenuList[num]
          return true if subitem.Type=='Page' and subitem.MenuURL and subitem.MenuURL.toLowerCase()==urlLower and $scope.JudgePagePermission(subitem.PermissionFunctionList)
    return false  
  
  $scope.JudgePagePermission=(permissionList)->
    return false if !permissionList
    for index of permissionList
      item=permissionList[index]
      return true if item.FunctionType!='None' and item.IsAssigned
    return false
                  
  $rootScope.$on "loadMenuSuccessed" , ->
    loadMenu()
    refreshFrameData()

  $rootScope.$on "$locationChangeSuccess", (event,next,current) ->
     return $location.url("/login") if !common.currentUser
 
  $rootScope.$on "$locationChangeStart",(event,next,current)->
     $scope.count=5
     if next.indexOf('forgot-password') > 0 || next.indexOf('vendor-request') > 0
       return
     if !$scope.authUrlPermission(authorize.functionList,$location.url())
       event.preventDefault()
       msg = "You don't have permission,So the page will redirect after <b>5</b> seconds automatically?"
       showMessage= '<div class="row"><label class="col-sm-12 vp-confirm-title" >'+msg+'</label></div>';
       $scope.CountDown()
       bootbox.dialog {
         message: showMessage,
         title: "No Permission"
       }
  $scope.CountDown=()->
       if $scope.count>0 
            $scope.count--
            setTimeout($scope.CountDown, 1000) 
       if $scope.count==0
           if !$scope.authUrlPermission(authorize.functionList,"/home")
               bootbox.hideAll()           
               $scope.signout()
           else
               window.location.href="/home"
  #Breadcrumb
  $scope.toggle = ()->
    isExist = false
    checkUrl=$scope.breads[$scope.breads.length - 1].Url
    for item,i in $scope.links when item is checkUrl || item.Url is checkUrl
      isExist = true
      $scope.links.splice(i,1)
      break
    if !isExist
      $scope.links.push $scope.breads[$scope.breads.length - 1]
    userProfile.set("favor-link", $scope.links)
    setFavorite()
    generateBradcrumb()

  generateTitle = ->
    if $scope.breads? and $scope.breads.length > 0
      $rootScope.title = NEG.title  + " - " +  $scope.breads[$scope.breads.length - 1]["en-us"]
    else
      $rootScope.title = NEG.title

  generateBradcrumb = ->
    $scope.breads = $scope.routePath
    generateTitle()
    $scope.isShow = $scope.routePath? and $scope.routePath.length > 0 and !systemRoute.isFrameworkPage($location.path())
    $scope.isExist = ->
      #update by clark change check logic
      checkUrl=$scope.breads.length&&$scope.breads[$scope.breads.length - 1].Url
      return false if not $scope.links? || $scope.links.length==0 || not $scope.breads? || $scope.breads.length==0
      return true for item in $scope.links when item is checkUrl ||  item.Url is checkUrl
      return false

  $scope.$on "editLastBreadCrumb", (event, lastbread) ->
    $scope.breads = $scope.breads || []
    newbread = {}
    if typeof lastbread is "string"
      for lan of NEG.languages
        newbread[lan] = lastbread
    else
      for lan of NEG.languages
        newbread[lan] = lastbread[lan]
    if $scope.breads.length > 0
      $scope.breads.pop()

    $scope.breads.push newbread
    generateTitle()

  $scope.$on "editLastBreadCrumb_Description", (event, desc) ->
    $scope.PageDescription = desc
    
  #reset password
  $scope.showResetPassword = ->
    $scope.resetPasswordModal = true
    
  $scope.closeResetPassword = ->
    $scope.resetPasswordModal = false
    
  #shurt cuts
  setFavorite = ->
    favUrls = userProfile.get("favor-link") || []
    $scope.links = []
    for fl in favUrls
      #modify by clark add array object support of authorize urls.
      if(authorize.urls instanceof Array)
         filterUrl=$filter('filter')(authorize.urls,(url)->
            if(typeof fl is 'string') 
               return false
            else if(typeof fl is 'object') 
               return url is fl.Url || url.Url is fl.Url
         )
                   
      authUrl=if filterUrl and filterUrl.length>0 then fl else fl #authorize.urls[fl.Url]
      
      $scope.links.push authUrl if authUrl
  
  $rootScope.refreshMenu = ->
     if $rootScope.__menus
           for menu1 in $rootScope.__menus
             if(menu1.SubMenus && menu1.SubMenus.length > 0)
               for sub in menu1.SubMenus
                   sub.isSelected = false
                   menu1.isSelected = false
           $rootScope.__menus[0].isHome = false
           for menu1 in $rootScope.__menus
              if($location.$$path=='/home')
                 $rootScope.__menus[0].isHome = true
              if(menu1.SubMenus && menu1.SubMenus.length > 0)
                filterItems = $filter('filter')(menu1.SubMenus, (sub) -> sub.Url == $location.$$path)
                if(filterItems && filterItems.length > 0)
                   filterItems[0].isSelected = true
                   menu1.isSelected = true
                   $rootScope.lastMenuID = menu1.$$hashKey

  $scope.back = ->
    common.pageInfo.isBackPage = true
    $window.history.go(-1)

  $scope.forward = ->
    common.pageInfo.isBackPage = true
    $window.history.forward() 

  $scope.favoriteToUrl=(url)->    
    #$location.path(url)
    common.navigate(url)

  $scope.home = ->
    $location.path("/home")

  $scope.refresh = ->
    $route.reload()

  #header
  setUserProfile = ->
    #获取用户信息
    $scope.user = authorize.accountInfo

  setToolbars = ->   
    $scope.toolbars = defaultProfile.toolbars

  $scope.signout = ->
    if(common.currentScope && (common.checkFormChanged(common.currentScope) == true) && $rootScope.isSumbitSuccess == false)
       if(!confirm("You have unsaved changes, continue to jump will be lost the data?")) 
         return
    $location.path('/login')
    common.currentUser = {}
    common.pageInfo = {}
    authorize.logout()
    $rootScope.$broadcast "logoutSuccessed"
    
    
    
    #$rootScope.__returnUrl = $location.path()
    

  #init
  init = ->
    #Back to page.
    url = $rootScope.__returnUrl
    if url? and url isnt "/"
      if url=='/vendor-request'
         $location.path('/home').replace()
      else
         $rootScope.__returnUrl = null
         $location.path(url).replace()
    else if $location.path()=='/login' || $location.path()=='/vendor-request'
         $location.path('/home').replace()

    loadMenu()
    setFavorite()
    setUserProfile()
    setToolbars()


  if $rootScope.__login? and $rootScope.__login is true
    init()

  $rootScope.$on "loginSuccessed", ->
    init()
])

