angular.module('vf-self-testing-connection',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/self-testing-connection/:action",
      templateUrl: "/modules/vendorportal-vf/app/self-testing/connection.tpl.html"
      controller: 'SelfTestingConnectionCtrl'
    .when "/self-testing-connection/:action/:type/:protocol/:cid",
      templateUrl: "/modules/vendorportal-vf/app/self-testing/connection.tpl.html"
      controller: 'SelfTestingConnectionCtrl'
])

.controller('SelfTestingConnectionCtrl',
["$scope","$filter","$location","messager","common","$translate","$routeParams","vfSelfTesting","selfTestingAPI","$fileUploader","$window",
($scope,$filter,$location,messager,common,$translate,$routeParams,vfSelfTesting,selfTestingAPI,$fileUploader,$window) ->

    if !$routeParams.action
       $location.path('/self-testing-dashboard')
       return

    if $routeParams.action == 'edit' && !$routeParams.cid && !$routeParams.type && $routeParams.protocol
       $location.path('/self-testing-dashboard')
       return

    if(common.currentUser.VendorNumber == "0")
      $location.path('/self-testing-dashboard')
      return

    $scope.showSaveBtn = true
    $scope.showNoticeMessage = false
    $scope.noticeMessage = ''

    $scope.maxlength = {
      connectionName:100
      server:150
      userName:50
      password:50
      directory:250
      as2id:40
      as2url:128
    }

    $scope.forms = ['connectionForm']
    common.initTabFormsUnsavedConfirm($scope, $scope.forms)

    $scope.urlReg = /^(http(s?))\:\/\/[a-zA-Z0-9\-\._]+(\:[0-9]{1,5}){0,1}([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i

    $scope.directoryReg = /^(\/[^\\\./:\*\?\""<>\|]{1}[^\\/:\*\?\""<>\|]{0,250})+$/

    $scope.entity = {
        ConnectionType:"Test"
        ConnectionProtocol:"AS2"
    }

    $scope.neweggCerAddress = {
      Test:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg_Testing_AS2_Public.cer'
      Production:'https://ssl-images.newegg.com/EDI/VendorPortal/Newegg_Production_AS2_Public.cer'
    }

    $scope.initConnection = ->
      if($routeParams.action == 'edit')
        $scope.entity.ConnectionType = $routeParams.type
        $scope.entity.ConnectionProtocol = $routeParams.protocol

    $scope.initAS2Profile = ->
        if $scope.entity.ConnectionProtocol == "AS2" && !$scope.entity.VendorAS2Profile
           $scope.entity.VendorAS2Profile = {
               Encryption:"DES3"
               Signing:"SHA1"
           }

    # 下拉框
    $scope.connectionTypeList = [
            {text:'Test Connection', value:'Test'}
            {text:'Production Connection', value:'Production'}
    ]

    $scope.connectionProtocolList = [
        {text:'AS2', value:'AS2'}
        {text:'FTP', value:'FTP'}
    ]

    # 查询
    $scope.getRequestItem = ->
        result =  {
            action1:"connection"
            VendorNumber: common.currentUser.VendorNumber
            ConnectionType: $scope.entity.ConnectionType
            ConnectionProtocol: $scope.entity.ConnectionProtocol
        }
        result.ConnectionId = $routeParams.cid if $routeParams.action == 'edit' && $routeParams.cid
        return result

    $scope.initData = ->
        $scope.initConnection()
        requestItem = $scope.getRequestItem()
        selfTestingAPI.query requestItem
        ,(response)->
          if(response && response.Succeeded)
            $scope.entity = response
            if(response.NoticeMessage)
              $scope.showNoticeMessage = true
              $scope.noticeMessage = response.NoticeMessage
            $scope.showSaveBtn = $scope.isDeployStarted($scope.entity)
          if($routeParams.action == 'add' && $scope.entity.ConnectionProtocol == 'FTP')
            $scope.entity.VendorFtpProfile = {Port: '21'}
          $scope.initAS2Profile()

    $scope.change = ->
         $scope.entity.VendorAS2Profile.Url = '' if $scope.entity.VendorAS2Profile
         $scope.initData()
         $scope.connectionForm.$setPristine()

    $scope.initData()

    $scope.isDeployStarted = (connection)->
      if connection && connection.DeployStatus == 'NotStarted'
        $scope.showSaveBtn = true
      else if (typeof connection.DeployStatus == 'undefined')
        $scope.showSaveBtn = true
      else
        $scope.showSaveBtn = false

    ########### AS2 ###########
    #上传证书
    $scope.url = "defaultUrl.html"
    $scope.uploadurl = ""
    $scope.uploadHeader=common.initHeader(common.currentUser)
    $scope.isUploading = false

    clearUploadfileInput = () ->
        findElement = $("#fileInput_Cer")
        return if !findElement || findElement.length == 0
        btnFileInputRemove = findElement.find(".remove")[0]
        btnFileInputRemove.click()

    uploader=$scope.uploader=$fileUploader.create({
            scope: $scope
            url: $scope.uploadurl
            headers:$scope.uploadHeader
            removeAfterUpload:true
            queueLimit: 5
            autoUpload: true
            filters: [
                      (item)->
                            messager.clear()
                            valid=false
                            extensionName = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase()
                            if(extensionName in ['cer'])
                                valid=true
                            if(valid==false)
                                $scope.uploadCertificate = {}
                                messager.warning($translate('connection_sf.msg_1'))
                                return valid
                            uploader.url = common.apiURL.selfTestingUpload+ "?filename="+encodeURIComponent(item.name)+"&VendorNumber="+common.currentUser.VendorNumber+"&RequestUser="+common.currentUser.ID+"&GenerateUniqueSuffix=true&format=json";
                           # clearUploadfileInput()
                            $scope.isUploading = true
                            return valid;
                     ]
      })

    uploader.bind('success', (event, xhr, item, msg) ->
            $scope.isUploading = false
            message = ''
            if(msg.Succeeded)
               $scope.uploadSuccessProcess(msg)
            else
               $scope.uploadCertificate = { Succeed:false }
               if msg.ResponseCode is 'Authorization expired'
                    message = "The provided authorization information has expired,please login again."
               else
                    message = $translate('error_customer_reviews.upload')
                    message+=common.getLocalizedErrorMsg(msg.Errors[0])
            $scope.uploadCertificate.message = message
    )

    uploader.bind('error', (event, xhr, item, msg) ->
            $scope.isUploading = false
            $scope.uploadCertificate = {}
            clearUploadfileInput()
            message = ''
            if msg && msg.ResponseCode is 'Authorization expired'
               message = "The provided authorization information has expired,please login again."
            else if(msg && msg.data)
                message = $translate('error_customer_reviews.upload') + msg.data
            else
                message = $translate('error_customer_reviews.upload') + msg
            messager.error(message)
    )

    $scope.uploadSuccessProcess=(data)->
        if !data || !data.Certificate
           $scope.uploadCertificate = {}
        $scope.uploadCertificate = data.Certificate
        $scope.uploadCertificate.Succeed = data.Succeeded
        $scope.connectionForm.$pristine = false

    $scope.uploadCer = ->
        messager.clear()
        if $scope.uploadCertificate && $scope.uploadCertificate.Succeed == false
           messager.error($scope.uploadCertificate.message)
           $scope.uploadCertificate = {}
           return
        if !$scope.uploadCertificate || $scope.uploadCertificate == {} || !$scope.uploadCertificate.CertificateId
           messager.warning($translate('connection_sf.msg_2'))
           return
        $scope.entity.VendorCertificate = angular.copy($scope.uploadCertificate)
        $scope.uploadCertificate = {}
        messager.success($translate('connection_sf.msg_9'))
        #$scope.uploadCertificate = {}

    ########### Save & Submit ###########
    $scope.checkSave = ->
        if !$scope.entity.ConnectionName
           messager.warning($translate('connection_sf.warning_1'))
           return false
        return true

    $scope.checkSubmit = ->
        if $scope["connectionForm"].$valid == false
           return false
        if $scope.entity.ConnectionProtocol == "AS2" && !$scope.entity.VendorCertificate
           messager.warning($translate('connection_sf.warning_2'))
           return false
        if $scope.entity.DeployStatus && $scope.entity.DeployStatus == 'Processing'
           messager.warning($translate('connection_sf.warning_5'))
           return false
        if $scope.entity.ConnectionProtocol == 'FTP' && $scope.entity.VendorFtpProfile.InboundDirectory == $scope.entity.VendorFtpProfile.OutboundDirectory
           messager.warning($translate('connection_sf.warning_6'))
           return false
        return true

    $scope.getConnectionRequestItem = (entity,action2)->
      requestItem = angular.copy(entity)
      requestItem.action1 = "connection"
      requestItem.RequestUser = common.currentUser.ID
      requestItem.VendorNumber = common.currentUser.VendorNumber
      requestItem.action2 = action2 if action2
      return requestItem

    $scope.save = ->
       messager.clear()
       if $scope.checkSave() == false
          return
       requestItem = $scope.getConnectionRequestItem($scope.entity,false)
       selfTestingAPI.save requestItem
       ,(response)->
          if(response && response.Succeeded)
            $scope.entity.ConnectionId = response.ConnectionId
            $scope.connectionForm.$setPristine()
            messager.success($translate('connection_sf.msg_3'))
          else
            msg = $translate('connection_sf.msg_4')
            if(response.Errors)
              msg=msg + common.getLocalizedErrorMsg(response.Errors[0])
            messager.error(msg)

    $scope.submit = ->
       messager.clear()
       if $scope.checkSubmit() == false
          return
       requestItem = $scope.getConnectionRequestItem($scope.entity, "submit")
       selfTestingAPI.save requestItem
       ,(response)->
          if(response && response.Succeeded)
            $scope.connectionForm.$setPristine()
            $scope.showSaveBtn = false
            $scope.entity.ConnectionId = response.ConnectionId
            msg =$translate('connection_sf.msg_5')
            if(response.NoticeMessage)
              $scope.showNoticeMessage = true
              $scope.noticeMessage = response.NoticeMessage
              msg+= response.NoticeMessage
            messager.success(msg)
          else
            msg =$translate('connection_sf.msg_6')
            if(response.Errors)
              msg=msg + common.getLocalizedErrorMsg(response.Errors[0])
            messager.error(msg)

    $scope.backToDashboard =->
       common.isBackPage = true
       $location.path('/self-testing-dashboard')
       return

    $scope.downloadVendorCer =->
      if $scope.entity.VendorCertificate && $scope.entity.VendorCertificate.DownloadAddress
        $window.open($scope.entity.VendorCertificate.DownloadAddress)
        return true
      else
        messager.clear()
        messager.warning($translate('warning_sf.guide_noVendorCertificate'))

    $scope.shouldPreventPristine = false
    $scope.checkBoxClick =->
      if $scope.connectionForm.$pristine
        $scope.shouldPreventPristine = true
      else
        $scope.shouldPreventPristine = false

    $scope.checkBoxModelChanged = ->
      if $scope.shouldPreventPristine
        $scope.connectionForm.$setPristine()

    $scope.isMiddleWidth = false
    $(window).resize(() ->
      if ($(this).width() >= 1200)
        $scope.isMiddleWidth = false
      else if ($(this).width() < 1200 && $(this).width()>= 992)
        $scope.isMiddleWidth = true
      else
        $scope.isMiddleWidth = true
      $scope.$apply()
    )
])
