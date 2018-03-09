angular.module('vp-forgot-password',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/forgot-password",
      templateUrl: "/modules/vendorportal/app/account/forgot-password.tpl.html"
      controller: 'ForgotPasswordCtrl'
])
.config(["$locationProvider", ($locationProvider) ->
    $locationProvider.html5Mode(true)
])

.controller('ForgotPasswordCtrl',
["$scope","$rootScope","messager","common","captchaAPI","$q","userAPI","$window"
($scope,$rootScope,messager,common,captchaAPI,$q,userAPI,$window) ->

    $rootScope.__logoff=true
    $scope.style = {
        'height' : $window.innerHeight + "px"
    } 
    $scope.nowYear=new Date().getFullYear()
    $scope.captcha = {}
    $scope.requestSuccessed = false

    $scope.hideLoadingBar = ->
        timer = setInterval(->
        loadingMask = $("#target")
            if loadingMask
                $('#target').hide()
                clearInterval timer
        ) 

    $scope.getResetToken = ->
        captchaAPI.search {action:'refresh'},(response)->
            if (response && response.Captcha)
                $scope.captcha.ID = response.Captcha.ID
                $scope.captcha.Image = 'data:image/jpeg;base64,'+response.Captcha.Image
                $scope.hideLoadingBar()

    $scope.getResetToken()
    
    $scope.submitLoginName = ->
        $scope.submitting = true
        $scope.validation()
              .then (result)->        
                if(result)
                    $scope.resetPwdRequest()
                    

    $scope.validation = ->
        messager.clear()
        deferred = $q.defer()
        requestItem = {
            ID : $scope.captcha.ID,
            CaptchaCode: $scope.captcha.CaptchaCode,
            action:'validate',
        }
        
        captchaAPI.validate requestItem,(response)->
            if(response)
                if(response.IsValidationPassed)
                    deferred.resolve true
                else
                    messager.error(response.Message)
                    $scope.captcha.ID = response.Captcha.ID
                    $scope.captcha.Image = 'data:image/jpeg;base64,'+response.Captcha.Image
                    deferred.resolve false
            else
                deferred.reject false
            $scope.hideLoadingBar()

        deferred.promise 
        
    $scope.resetPwdRequest = ->
        requestItem = {
            LoginName:$scope.LoginName,
            action1:"reset-password-application"
        }
        
        userAPI.forgotPassword requestItem,(response)->
            if(response)
                $scope.submitting = false
                if( response.Succeeded)
                    $scope.requestSuccessed = true
                else
                    messager.error(common.getLocalizedErrorMsg(response.Errors[0]))     
            $scope.getResetToken()   
                
      
    
        
    $scope.backToLogin  =->
        $window.location.href='/login'

    
   
])