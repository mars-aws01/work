angular.module('vp-account-registration',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/account-registration",
      templateUrl: "/modules/vendorportal/app/account/account-registration.tpl.html"
      controller: 'AccountRegistrationCtrl'
])
.config(["$locationProvider", ($locationProvider) ->
    $locationProvider.html5Mode(true)
])

.controller('AccountRegistrationCtrl',
["$scope","$window","messager","common","$location","userAPI","accountAPI","$interval","vendorUserAPI","authorize"
($scope,$window,messager,common,$location,userAPI,accountAPI,$interval,vendorUserAPI,authorize) ->

    $scope.aggrementAreaShow=false
    $scope.illicitAreaShow=false
    $scope.registrationAreaShow=false
    $scope.transferAreaShow=false
    $scope.invitationID = $location.search().InvitationID
    $scope.tab1={}
    $scope.tab2={}
    $scope.creationErrorMsg=''
    $scope.loginErrorMsg=''
    $scope.creationEntity = { create_email1:'',create_email2:'',create_pwd1:'',create_pwd2:''}
    $scope.loginEntity = { login_email1:'',login_pwd1:''}
    $scope.nowYear=new Date().getFullYear()
    $scope.password = ''
    #auto navigate
    $scope.autoJump = ->
        if($scope.seconds == 0)
            $scope.$on('$destroy', $interval.cancel($scope.timer))
            $window.location.href='/login'
        else
            $scope.seconds--

    $scope.registerSucceed=->
        $scope.registrationAreaShow=false
        $scope.transferAreaShow=true
        authorize.clearToken(NEG.PortalTokenKey)
        authorize.clearToken('hasRemember')
        authorize.clearToken('login-user')
        $scope.seconds = 10
        $scope.timer = $interval($scope.autoJump,1000)

    $scope.getInvitation = (invitationID)->
        if(typeof invitationID == "undefined" || invitationID == null || invitationID.trim()=='')
           $scope.illicitAreaShow=true
           #$scope.registerSucceed()
           return
        guidPattern=/^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/
        if(invitationID.match(guidPattern)==null)
            messager.error("Invalid invitation id.")
            return
        request = {}
        request.id=invitationID
        request.action1 = 'invitation'
        request.action2 = 'internal'
        userAPI.getInvitationById request
            ,(response) ->
                if(response?&&response.Succeeded)
                    if(response.Invitation?)
                        if(response.Invitation.Status.toLowerCase()=='unused')
                            $scope.aggrementAreaShow = true
                            $scope.creationEntity.create_email1 = response.Invitation.Email
                            return
                        else
                            $scope.illicitAreaShow = true
                            return
                $scope.illicitAreaShow = true
            ,(error) ->

    $scope.getInvitation($scope.invitationID);

    $scope.termsConditionsClick=->
        $scope.aggrementAreaShow=false
        $scope.registrationAreaShow=true

    $scope.accountCreationBackClick=->
        $scope.aggrementAreaShow=true
        $scope.registrationAreaShow=false

    $scope.creationFormSubmit=->
#        if($scope.creationEntity.create_email1==undefined||$scope.creationEntity.create_email2==undefined||$scope.creationEntity.create_pwd1==undefined||$scope.creationEntity.create_pwd2==undefined)
#            $scope.creationErrorMsg='Email or Password is required and can not be whitespace.'
#            return
        if($scope.creationEntity.create_email1==undefined||$scope.creationEntity.create_pwd1==undefined||$scope.creationEntity.create_pwd2==undefined)
            $scope.creationErrorMsg='Password is required and can not be whitespace.'
            return
#        if($scope.creationEntity.create_email1!=$scope.creationEntity.create_email2)
#            $scope.creationErrorMsg='Confirm Email Address is not equal to Email Address.'
#            return
        $scope.creationEntity.create_pwd1 = angular.copy($scope.password)
        if($scope.creationEntity.create_pwd1!=$scope.creationEntity.create_pwd2)
            $scope.creationErrorMsg='Confirm Password is not equal to Password.'
            return
        if($scope.creationEntity.create_pwd1.length<8)
            $scope.creationErrorMsg='Password should be 8-30 characters long.'
            return
        $scope.creationErrorMsg=''
        $scope.register(null,false)
        #$scope.getCustomerNumber()

    #get exists customer number
    $scope.getExistsCustomerNumber=->
        customerNumberRequest={'action3':'customer-registration','LoginName':$scope.loginEntity.login_email1,'Password':$scope.loginEntity.login_pwd1,'InvitationID':$scope.invitationID,'Type':1,'CountryCode':'USA','ValidatorCode':$scope.loginEntity.validCode,'ValidatorToken':$scope.ValidateToken,'ValidatorTransationNumber':$scope.ValidateTransNo}
        userAPI.getCustomerNumber customerNumberRequest
            ,(response)->
                if(response?&&response.Succeeded)
                    $scope.register(response.CustomerNumber,true)
                else if(response.Errors&&response.Errors.length>0)
                    $scope.loginErrorMsg='Register failed. '+response.Errors[0].Message
                   # $scope.getLoginToken()
                else
                    $scope.loginErrorMsg='The interface said that the login was succeeded, but no customer information provided.'
            ,(error)->
                $scope.loginErrorMsg='Internal has occur exception,Please retry after a minute or contact support team.'
               # $scope.getLoginToken()

    #get customer number
    $scope.getCustomerNumber=->
        customerNumberRequest={'action3':'customer-registration','LoginName':$scope.creationEntity.create_email1,'Password':$scope.creationEntity.create_pwd1,'InvitationID':$scope.invitationID,'Type':0,'CountryCode':'USA',}
        userAPI.getCustomerNumber customerNumberRequest
            ,(response)->
                if(response?&&response.Succeeded)
                    $scope.register(response.CustomerNumber,false)
                else if(response.Errors&&response.Errors.length>0)
                    $scope.creationErrorMsg='Register failed. '+response.Errors[0].Message
                   # $scope.getLoginToken()
                else
                    $scope.creationErrorMsg='The interface said that the login was succeeded, but no customer information provided.'
            ,(error)->
                $scope.creationErrorMsg='Internal has occur exception,Please retry after a minute or contact support team.'
               # $scope.getLoginToken()

    #do register
    $scope.register=(customerNumber,isExistsCustomer)->
        loginName=if isExistsCustomer then $scope.loginEntity.login_email1 else $scope.creationEntity.create_email1
        #registrationRequest = {'action1':'registration','InvitationID':$scope.invitationID,'LoginName':loginName,'CustomerNumber':customerNumber,RequestUser:customerNumber}
        registrationRequest = {'action1':'registration','InvitationID':$scope.invitationID,'LoginName':loginName,'Password':$scope.creationEntity.create_pwd1}
        vendorUserAPI.registration registrationRequest
            ,(response)->
                if(response?&&response.Succeeded)
                    $scope.registerSucceed()
                else
                    if(isExistsCustomer)
                        $scope.loginErrorMsg='Register failed. '+response.Errors[0].Message
                    else
                        $scope.creationErrorMsg='Register failed. '+response.Errors[0].Message
                  #  $scope.getLoginToken()
            ,(error)->
               # $scope.getLoginToken()

    $scope.loginFormSubmit=->
        if($scope.loginEntity.login_email1==undefined||$scope.loginEntity.login_pwd1==undefined||$scope.loginEntity.validCode==undefined)
            $scope.loginErrorMsg='Email or Password or Validation Code is required and can not be whitespace.'
            return
        $scope.loginErrorMsg=''
        $scope.getExistsCustomerNumber()


    $scope.getLoginToken = ->
        accountAPI.token { action:"loginvalidator" }
            ,(response) ->
                if(response&&response.Code=='000'&& response.Body)
                    $scope.CaptchaImageUrl = response.Body.CaptchaImageUrl
                    $scope.ValidateTransNo = response.Body.ValidateTransNo
                    $scope.ValidateToken = response.Body.ValidateToken
            ,(error) ->
                    # messager.error('Request login validator error.')

    #$scope.getLoginToken()

    $scope.termsDisagree=->
        $window.location.href='/login'


])
