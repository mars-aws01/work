angular.module("app",
['framework-ctrl'
'system'
'system-feedback'
'system-translate'
'global-loading'
'ngRoute'
'ngSanitize'
'ngAnimate'
'ngCookies'
'pasvaz.bindonce'
'ngProgress'
'ui.utils'
'ui.bootstrap'
'ui.select2'
'ngDragDrop'
'angularFileUpload'
'angularFileUploadV2'
'angularUUID2'
'pascalprecht.translate'
'negServices'
'negDirectives'
#'kendo.directives'
'formatFilters'
'vendorportal'
'angulartics'
'angulartics.google.analytics'
])

.provider("negRouteWithRequireJS", () ->
    _self        = this 
    ignoreRouter = false
    options =
      urlParseFormart: /\/([^\/]*)/i
      waitTime: 7 * 1000
      basePath: "/assets/"
      loading: "/loading"
      providers: {}
      app:null

    config =
      baseUrl: options.basePath
      waitSeconds: options.waitTime / 1000
      shim: {}

    modules = {}

    getModule = (name) ->
      module = null;
      try  module = angular.module(name)
      catch e then module = null
      return module

    loadModule = (moduleName) ->
      module = angular.module(moduleName)
        
      if module.requires
        for item in module.requires 
          if(/ng[A-Z]/.test(item) || modules.hasOwnProperty(item))
            continue;
          loadModule(item);
        
      for item in module._invokeQueue
        provider = item[0]
        method   = item[1]
        args     = item[2]

        if (options.providers.hasOwnProperty(provider))
          creator = options.providers[provider]
          creator[method].apply(creator, args)

      if (module._runBlocks)
        angular.forEach(module._runBlocks,(block) ->
          options.providers.$injector.invoke(block)
        )
      modules[moduleName] = true
    

    this.setOptions = (settings) ->
      options = angular.extend(options, settings)
      config.baseUrl = options.basePath
      config.waitSeconds = options.waitTime / 1000

    this.$get = ['$injector',($injector) ->
      if(NEG.debug)
        return {
          attach:()->
            return
        };
      rootScope = $injector.get('$rootScope')
      location  = $injector.get('$location')
            
      return {
          rootScope: rootScope,
          location: location,
          attach: () ->
            rootScope = this.rootScope;
            location  = this.location;
            list      = [options.app];
            rootScope.isKendoLoaded = false

            while (list.length > 0)
              module = list.pop();
              if(!modules.hasOwnProperty(module.name))
                modules[module.name] = true;
              if (module.requires)
                for item in module.requires
                  list.push(angular.module(item))
                  
            rootScope.$on("negRouteProvider.ignore",()->
                ignoreRouter = true
            )
            
            clearDynamicCss = ()->
              dynamicCss = $("link[id^=cssPreloader_]").remove()
            
            loadCss = (url)->
              dynamicCss = $("link[id^=cssPreloader_]");
              isExist = false
              dynamicCss.each((index,item)->
                if($(item).href == url)
                  dynamicCss.replice(index,1)
                  isExist = true
                  return false
              )
              
              dynamicCss.remove()
              if(!isExist)
                 css.loadStylesheet(url,()->
                  return true
                 )

            rootScope.$on("$locationChangeStart", (evt) ->
              path = location.path()
              url  = location.url()
              if (path.toLowerCase() != options.loading.toLowerCase() && path.toLowerCase() != '/login'  && rootScope.isKendoLoaded == false)
                  evt.preventDefault()
                  moduleName = 'kendo.directives'
                  config.shim[moduleName] = { exports: moduleName }
                  config.waitSeconds = 0
                  #config.urlArgs='v=' + (new Date()).getTime()
                  requirejs.config(config)
                  require  ['https://ssl-images.newegg.com/EDI/VendorPortal/kendo.all.v2.0.0.js'] #['http://localhost:9000/assets/kendo.all.js']
                        , (kendo) ->
                            rootScope.isKendoLoaded = true
                            rootScope.$apply () ->
                             loadModule(moduleName)
                             location.url(url)
            )

            rootScope.$on("$locationChangeSuccess", (evt) ->
              if rootScope.refreshMenu
                 rootScope.refreshMenu()
              if(ignoreRouter)
                clearDynamicCss()
                ignoreRouter = false
                return
              
              path = location.path();
              url  = location.url();
              if(path.toLowerCase() == '/account-registration')
                return
              if(path.toLowerCase() == '/vendor-request')
                return
              if(path.toLowerCase() == '/forgot-password')
                return
              if(path.toLowerCase() == '/reset-password')
                return
              if(path.toLowerCase() == '/vendor-registration')
                return
              if(path.toLowerCase() == '/stocking-po-registration')
                return
              if(path.toLowerCase() == '/vendor-application')
                return
              clearDynamicCss()

              
            )
      };
    ];
    return
)

.config(['negRouteWithRequireJSProvider', 
         '$controllerProvider', 
         '$compileProvider', 
         '$filterProvider', 
         '$animateProvider', 
         '$provide',
         '$injector',
         '$routeProvider',
  (negRouteWithRequireJSProvider, 
   $controllerProvider, 
   $compileProvider, 
   $filterProvider, 
   $animateProvider, 
   $provide, 
   $injector,
   $routeProvider)->

    $routeProvider.when("/loading",{
      templateUrl: "/modules/system/app/module-loading/index.tpl.html"
      controller: ->
    })

    negRouteWithRequireJSProvider.setOptions({
      providers:
        $controllerProvider: $controllerProvider,
        $compileProvider: $compileProvider,
        $filterProvider: $filterProvider,
        $animateProvider: $animateProvider,
        $provide: $provide,
        $injector: $injector,
      app:
        angular.module("app")
    });
])

.config(["$locationProvider",($locationProvider) ->
    $locationProvider.html5Mode(true)
])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider.otherwise redirectTo: "/404"
])

.config(["$analyticsProvider", ($analyticsProvider) ->
    if NEG.Env isnt "prd"
      $analyticsProvider.developerMode(true)
    else
      $analyticsProvider.virtualPageviews(false)
  ])
  
#support l18n
.config(["$translateProvider",($translateProvider) ->
    $translateProvider.preferredLanguage(NEG.getQuery('language') || 'en-us')

    $translateProvider.useLocalStorage() if !NEG.getQuery('language')
    $translateProvider
      .translations('en-us',resources.framework.us)
      .translations('zh-cn',resources.framework.cn)
      .translations('zh-tw',resources.framework.tw)
])

#attach require
.run(["negRouteWithRequireJS",(negRouteWithRequireJS) ->
    negRouteWithRequireJS.attach()
])

.run(["$rootScope","progress", ($rootScope,progress) ->
    $rootScope.$on '$routeChangeStart', ->
      progress.complete()

])

#check page auth when route start to change
.run(["$rootScope","authorize","$location", ($rootScope,authorize,$location) ->
    $rootScope.$on '$routeChangeStart', (event, current)->
      if current && current.$$route && !authorize.canVisitPage(current.$$route.originalPath)
        $rootScope.$emit("negRouteProvider.ignore")
        $location.path("/401").replace()
      if current && current.$$route.originalPath == "/login"
        $rootScope.__login=false
        $rootScope.__logoff=true
        $rootScope._userRegiste=false
        $rootScope._vendorRegiste=false
        $rootScope.__themePath = '/framework/themes/ace/login.html'
        $location.path('/login')
])

#auto login
.run(["$rootScope","authorize","$location","$http", "userProfile","$q",'storage','messager','$compile'
($rootScope,authorize,$location,$http, userProfile, $q,storage,messager,$compile) ->
    current = $location.path()
    if current == '/account-registration'
        $rootScope.__login=false
        $rootScope.__logoff=false
        $rootScope._userRegiste=true
        $rootScope.__themePath = '/modules/vendorportal/app/account/account-registration.tpl.html'
        return

    if current == '/vendor-registration'
        $rootScope.__login=false
        $rootScope.__logoff=false
        $rootScope._vendorRegiste=true
        $rootScope.__themePath = '/modules/vendorportal/app/register/vendor-registration.tpl.html'
        return
        
    if current == '/vendor-application'
        $rootScope.__login=false
        $rootScope.__logoff=false
        $rootScope._vendorRegiste=true
        #$rootScope.__themePath = '/modules/vendorportal/app/register/stocking-po-registration.tpl.html'
        timer = setInterval(->
         if $rootScope.isKendoLoaded == true
            $http.get('/modules/vendorportal/app/register/vendor-application.tpl.html').success((template) ->
                el = angular.element($('#divContent_before'))
                el.html(template)
                $compile(el)($rootScope.$new())
            )
            clearInterval timer
        ,200)
        return
        
    if current == '/stocking-po-registration'
        $rootScope.__login=false
        $rootScope.__logoff=false
        $rootScope._vendorRegiste=true
        #$rootScope.__themePath = '/modules/vendorportal/app/register/stocking-po-registration.tpl.html'
        timer = setInterval(->
         if $rootScope.isKendoLoaded == true
            $http.get('/modules/vendorportal/app/register/stocking-po-registration.tpl.html').success((template) ->
                el = angular.element($('#divContent_before'))
                el.html(template)
                $compile(el)($rootScope.$new())
            )
            clearInterval timer
        ,200)
        return
        
    if current == '/forgot-password'
        $rootScope.__login=false
        $rootScope.__logoff=false
        $rootScope.__themePath = '/modules/vendorportal/app/account/forgot-password.tpl.html'
        timer = setInterval(->
            loadingMask = $("#target")
            if loadingMask
               $('#target').hide()
               clearInterval timer
        )
        return
    if current == '/vendor-request'
        $rootScope.__login=false
        $rootScope.__logoff=false
        $rootScope.__themePath = '/modules/vendorportal/app/vendor/vendor-request.tpl.html'
        timer = setInterval(->
            loadingMask = $("#target")
            if loadingMask
               $('#target').hide()
               clearInterval timer
        )
        return
    if current == '/reset-password'
        $rootScope.__login=false
        $rootScope.__logoff=false
        $rootScope.__themePath = '/modules/vendorportal/app/account/reset-password.tpl.html'
        timer = setInterval(->
            loadingMask = $("#target")
            if loadingMask
               $('#target').hide()
               clearInterval timer
        )
        return 
          
    if current != '/login'
      $rootScope.__returnUrl = current
    $rootScope.$emit("negRouteProvider.ignore")
    $location.path('/login').replace()
    authorize.autoLogin().then ()->
      $q.all([
        userProfile.init((authorize.accountInfo&&authorize.accountInfo.UserID)||authorize.userId||storage.session.get('login-user')||storage.local.get('login-user'))
      ])
      .then ->
        #获取用户设置
        currentProfile = userProfile.get("system") || {}
        $rootScope.__systemSetting = currentProfile
        $rootScope.$broadcast "loginSuccessed"
     ,(error)->
      $rootScope.__systemSetting = defaultProfile.system
      $rootScope.$broadcast "logoutSuccessed"
     
])
.run(["$rootScope","$location", "authorize", "$analytics",($rootScope,$location,authorize,$analytics) ->
  $rootScope.$on "loginSuccessed", ->
    if authorize.userInfo && authorize.userInfo.LoginName && authorize.userInfo.VendorNumber && authorize.userInfo.VendorType
       $analytics.setUsername("unknow") #authorize.userInfo.LoginName
       $analytics.setVendortype(authorize.userInfo.VendorType)
       $analytics.setVendornumber(authorize.userInfo.VendorNumber)
       $analytics.setUserID(authorize.userInfo.ID)
    $rootScope.__login=true
    $rootScope.__logoff=false
    $rootScope._userRegiste=false
    $rootScope._vendorRegiste=false
    $rootScope.login_submitting=false
    $rootScope.__themePath = '/framework/themes/ace/index.html'
    if not $rootScope.__aceInit? or $rootScope.__aceInit is false
      setTimeout((-> ace.handle_init($)),1000)
      setTimeout((-> ace.handle_scroll($)),1000)
      $rootScope.__aceInit = true
    
  $rootScope.$on "logoutSuccessed", ->
    $rootScope.__login=false
    $rootScope.__logoff=true
    $rootScope._userRegiste=false
    $rootScope._vendorRegiste=false
    $rootScope.__themePath = '/framework/themes/ace/login.html'
 
  $rootScope.$on "withoutPermission", ->
    $rootScope.__login=false
    $rootScope.__logoff=true
    $rootScope._userRegiste=false
    $rootScope._vendorRegiste=false
    $rootScope.__themePath = '/framework/themes/ace/login.html'
    $location.path('/login')
       
])
.run(['$route', ($route)->
    $route.reload()
])
