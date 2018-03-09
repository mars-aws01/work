angular.module('vp-reset-password',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/reset-password",
      templateUrl: "/modules/vendorportal/app/account/reset-password.tpl.html"
      controller: 'ResetPasswordCtrl'
])
.config(["$locationProvider", ($locationProvider) ->
    $locationProvider.html5Mode(true)
])

.controller('ResetPasswordCtrl',
["$scope","messager","common","$window",'userAPI',"$location","$http","$interval",
($scope,messager,common,$window,userAPI,$location,$http,$interval) ->

    $scope.style = {
        'height' : ($window.innerHeight) + "px"
    } 
    #fixed IE cache bug
    $http.defaults.cache = false
    if(!$http.defaults.headers.get)
        $http.defaults.headers.get = {}
        $http.defaults.headers.get['If-Modified-Since'] = 'Sat, 28 Nov 2009 01:00:00 GMT'
        
    $scope.password = ''
    $scope.nowYear=new Date().getFullYear()
    $scope.isCompleted = false
    $scope.showErrorMsg = false
    $scope.resetIDValid = false
    $scope.resetID = $location.search().ResetID
    $scope.commonMsg = "You need to provide effective reset id. You can email to VF@newegg.com for help."
    
    $scope.resetCheck = ->
        requestItem = {
            ResetID:$scope.resetID
            action1:'reset-password-application'
        }
        userAPI.resetPasswordvalidation requestItem
            ,(response)->
                if(response&&response.Succeeded)
                    if(response.ResetPasswordApplication.ResetStatus== "Discarded")
                        $scope.errorMsg =  "The reset ID has expired, please enter Login page and click 'Forgot your password?' for a new reset ID."
                        $scope.resetIDValid = false
                        $scope.showErrorMsg = true
                    else if(response.ResetPasswordApplication.ResetStatus== "Used")
                        $scope.errorMsg =  $scope.commonMsg
                        $scope.resetIDValid = false
                        $scope.showErrorMsg = true
                    else if(response.ResetPasswordApplication.ResetStatus == 'Unused')
                        $scope.resetIDValid = true
                    else
                        $scope.errorMsg =  $scope.commonMsg
                        $scope.resetIDValid = false
                        $scope.showErrorMsg = true                    
                else
                    $scope.errorMsg  = $scope.commonMsg
                    $scope.resetIDValid = false
                    $scope.showErrorMsg = true
                $scope.hideLoadingBar()
            ,(error)->
                    $scope.errorMsg  = $scope.commonMsg
                    $scope.resetIDValid = false
                    $scope.showErrorMsg = true
                    $scope.hideLoadingBar()
                
    if(!$scope.resetID)
        $scope.errorMsg = $scope.commonMsg
        $scope.showErrorMsg = true
        $scope.resetIDValid = false
    else
        #$scope.showErrorMsg = false
        #$scope.resetIDValid = true
        $scope.resetCheck()
                           
    $scope.resetPwd = ->
        if $scope.password isnt $scope.passwordCopy
            messager.error 'The passwords are different,please input correct password.'
            return
        #API
        requestItem = {
            ResetID : angular.copy( $scope.resetID),
            NewPassword : angular.copy($scope.password)
            action1:'reset-password'
        }
        
        userAPI.resetPassword requestItem ,(response)->
            if( response)
                if (response.Succeeded)
                    $scope.isCompleted = true
                    $scope.hideLoadingBar()
                    $scope.resetSucceed()
                else   
                    messager.error  common.getLocalizedErrorMsg(response.Errors[0])
            else
                messager.error('Reset password failed,please try again later.')
            $scope.hideLoadingBar()
        ,(error) ->
            $scope.hideLoadingBar()
            
    $scope.$watch 'password',(newValue,oldValule)->
        if $scope.showErrorMsg
            $scope.showErrorMsg = false
            $scope.errorMsg = ''
            
    $scope.$watch 'passwordCopy',(newValue,oldValule)->
        if $scope.showErrorMsg
            $scope.showErrorMsg = false
            $scope.errorMsg = ''
    
    $scope.hideLoadingBar = ->
        timer = setInterval(->
        loadingMask = $("#target")
            if loadingMask
                $('#target').hide()
                clearInterval timer
        )
    
    #auto navigate
    $scope.autoJump = ->
        if($scope.seconds == 0)
            $scope.$on('$destroy', $interval.cancel($scope.timer))
            $window.location.href='/login'
        else  
            $scope.seconds--
        
    $scope.resetSucceed=->  
        $scope.seconds = 10
        $scope.timer = $interval($scope.autoJump,1000)        
        
])