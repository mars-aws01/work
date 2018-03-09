angular.module("framework-ctrl-login",['ngRoute','ngResource'])

.config(["$routeProvider","$httpProvider",
    ($routeProvider,$httpProvider) ->
      $routeProvider
      .when("/login",
          template: ""
          controller:->)
     # $httpProvider.defaults.headers.common['X-User-Agent'] = 'xxxxxxxx'
  ])

.controller('LoginCtrl',["$scope","$rootScope","authorize","userProfile","accountAPI","$q",'messager','$location','$window','$http','captchaAPI','uuid'
    ($scope,$rootScope,authorize, userProfile,accountAPI, $q,messager,$location,$window,$http,captchaAPI,uuid) ->
      $rootScope.__login=false
      $rootScope.__logoff=true

      $scope.validCodeStr=''
      $rootScope.title = NEG.title
      $rootScope.CaptchaImageUrl = null
      $rootScope.ValidateTransNo = null
      $rootScope.loginErrorType = null
      $rootScope.loginErrorMessage = null

      $scope.user = {}
      $scope.user.UserName = '' 
      $scope.user.Password = '' 
      $rootScope.ClientID = uuid.newguid()
      $scope.getResetToken = ->
        captchaAPI.search {action:'refresh'},(response)->
            if (response && response.Captcha)
                $rootScope.ValidateTransNo = response.Captcha.ID
                $rootScope.CaptchaImageUrl = 'data:image/jpeg;base64,'+response.Captcha.Image                

      $scope.login =  ->
        $scope.hasError=false
        $scope.error=''
        loginUser = {
          action:"login",
          LoginName:$scope.user.UserName,
          Password:$scope.user.Password,
          IsRememberMe:true,
          ValidatorTransationNumber:$rootScope.ValidateTransNo,
          ValidatorCode: $scope.user.ValidCode,
          ClientID: $rootScope.ClientID,
        }
        authorize.login(loginUser)
        .then (data)->
            $q.all([
              userProfile.init($scope.user.UserName||storage.session.get('login-user')||storage.local.get('login-user'))
            ])
            .then ->
              $scope.clearIECache()
              $rootScope.__systemSetting = userProfile.get("system") || {}
              $rootScope.$broadcast "loginSuccessed"
        , (response) ->
          $scope.user.Password=''
          $scope.user.ValidCode = ""
          $scope.showValid = true
          $scope.hasError = true
          if response.Captcha
             $rootScope.ValidateTransNo = response.Captcha.ID
             $rootScope.CaptchaImageUrl = 'data:image/jpeg;base64,'+response.Captcha.Image  
          else
             $scope.getResetToken()
          
      $scope.clearIECache = ->
          $http.defaults.cache = false
          if(!$http.defaults.headers.get)
              $http.defaults.headers.get = {}
              $http.defaults.headers.get['If-Modified-Since'] = 'Sat, 28 Nov 2009 01:00:00 GMT'
              
      $scope.clearIECache()      
        
      $scope.passwordRedirect= ()-> 
        $location.path('/forgot-password')
        $rootScope.__login=false
        $rootScope.__logoff=true
        $rootScope.__themePath = '/modules/vendorportal/app/account/forgot-password.tpl.html'
        timer = setInterval(->
            loadingMask = $("#target")
            if loadingMask
               $('#target').hide()
               clearInterval timer
          )

       $scope.vendorRequestRedirect= ()-> 
        $location.path('/vendor-request')
        $rootScope.__login=false
        $rootScope.__logoff=true
        $rootScope.__themePath = '/modules/vendorportal/app/vendor/vendor-request.tpl.html'
        timer = setInterval(->
            loadingMask = $("#target")
            if loadingMask
               $('#target').hide()
               clearInterval timer
          )       
])