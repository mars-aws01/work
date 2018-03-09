angular.module('vp-change-password',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/change-password",
      templateUrl: "/modules/vendorportal/app/account/change-password.tpl.html"
      controller: 'ChangePasswordCtrl'
])
.controller('ChangePasswordCtrl',
["$scope","messager","common","$window",'userAPI',"$location","$http","$interval",
($scope,messager,common,$window,userAPI,$location,$http,$interval) ->

    $scope.password = ''
    $scope.nowYear=new Date().getFullYear()
    $scope.isCompleted = false
    $scope.showErrorMsg = false
    $scope.resetIDValid = false
    $scope.resetID = $location.search().ResetID
    $scope.commonMsg = "You need to provide effective reset id. You can email to VF@newegg.com for help."
             
    $scope.changePwd = ->
        messager.clear()
        return if $scope['changePasswordForm'].$valid == false
        if $scope.password isnt $scope.passwordCopy
            messager.error 'The new passwords are different,please input correct new password.'
            return
        #API
        requestItem = {
            UserID : common.currentUser.ID,
            CurrentPassword : $scope.oldPassword
            NewPassword : angular.copy($scope.password)
            action1:'change-password'
        }
        
        userAPI.changePassword requestItem ,(response)->
            if( response)
                if (response.Succeeded)
                    $scope.isCompleted = true
                    messager.success('Change password is successful.')
                else   
                    messager.error common.getLocalizedErrorMsg(response.Errors[0])
            else
                messager.error('Change password failed,please try again later.')
       
            
    $scope.$watch 'password',(newValue,oldValule)->
        if $scope.showErrorMsg
            $scope.showErrorMsg = false
            $scope.errorMsg = ''
            
    $scope.$watch 'passwordCopy',(newValue,oldValule)->
        if $scope.showErrorMsg
            $scope.showErrorMsg = false
            $scope.errorMsg = ''

        
])