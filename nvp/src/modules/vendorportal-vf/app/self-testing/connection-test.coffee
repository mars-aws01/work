angular.module('vf-self-testing-connection-test',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/self-testing-connection-test/:type/:protocol/:cid",
      templateUrl: "/modules/vendorportal-vf/app/self-testing/connection-test.tpl.html"
      controller: 'SelfTestingConnectionTestCtrl'
])

.controller('SelfTestingConnectionTestCtrl',
["$scope","$filter","$location","messager","common","$translate","$routeParams","vfSelfTesting","$fileUploader","selfTestingAPI","$window",
($scope,$filter,$location,messager,common,$translate,$routeParams,vfSelfTesting,$fileUploader,selfTestingAPI,$window) ->

    if(!$routeParams.protocol || !$routeParams.type || !$routeParams.cid)
      $location.path('/self-testing-dashboard')
      return

    if(common.currentUser.VendorNumber == "0")
      $location.path('/self-testing-dashboard')
      return

    $scope.entity = {
        ConnectionType: $routeParams.type
        ConnectionProtocol: $routeParams.protocol
    }

    $scope.isInboundTestPassed = false
    $scope.isOutboundTestPassed = false

    $scope.getRequestItem = (entity,action2,action3)->
      requestItem = angular.copy(entity)
      requestItem.action1 = 'connection';
      requestItem.action2 = action2 if action2
      requestItem.action3 = action3 if action3

      return requestItem

    $scope.initData =->
      entity = {
        ConnectionId:$routeParams.cid
        ConnectionType:$routeParams.type
        ConnectionProtocol:$routeParams.protocol
        VendorNumber:common.currentUser.VendorNumber
      }

      requestItem = $scope.getRequestItem(entity,'test')
      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          $scope.entity = response
          $scope.isInboundTestPassed = response.IsInboundTestPassed
          $scope.isOutboundTestPassed = response.IsOutboundTestPassed

    $scope.initData()

    $scope.backToDashboard =->
      common.isBackPage = true
      $location.path('/self-testing-dashboard')
      return

    $scope.sendTestFile =->
      entity = {
        VendorNumber: common.currentUser.VendorNumber
        ConnectionId: $scope.entity.ConnectionId
        ConnectionProtocol: $scope.entity.ConnectionProtocol
        ConnectionType: $scope.entity.ConnectionType
      }
      requestItem = $scope.getRequestItem(entity,'test','inbound-test')
      selfTestingAPI.save requestItem
      ,(response)->
        if(response && response.Succeeded)
          $scope.isInboundTestPassed = false
          $scope.entity.InboundTestResult = null
          messager.success($translate('success_sf.sendFile_success'))
        else
          messager.error($translate('error_sf.sendFile_failed'))

    $scope.checkInboundStatus =->
      entity = {
        VendorNumber: common.currentUser.VendorNumber
        ConnectionId: $scope.entity.ConnectionId
        ConnectionProtocol: $scope.entity.ConnectionProtocol
        ConnectionType: $scope.entity.ConnectionType
      }
      requestItem = $scope.getRequestItem(entity,'test','inbound-test')
      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          $scope.entity.InboundTestResult =response.TestResult
          if response.TestResult
            $scope.isInboundTestPassed = response.TestResult.IsPassed
          else
            $scope.isInboundTestPassed = false

    $scope.checkOutboundStatus =->
      entity = {
        VendorNumber: common.currentUser.VendorNumber
        ConnectionId: $scope.entity.ConnectionId
        ConnectionProtocol: $scope.entity.ConnectionProtocol
        ConnectionType: $scope.entity.ConnectionType
      }
      requestItem = $scope.getRequestItem(entity,'test','outbound-test')
      selfTestingAPI.save requestItem
      ,(response)->
        if(response && response.Succeeded)
          $scope.entity.OutboundTestResult =response.TestResult
          if response.TestResult
            $scope.isOutboundTestPassed = response.TestResult.IsPassed
          else
            $scope.isOutboundTestPassed = false

    $scope.downloadTestFile =->
      entity = {
        VendorNumber: common.currentUser.VendorNumber
        ConnectionType: $scope.entity.ConnectionType
        format:'json'
      }
      requestItem = $scope.getRequestItem(entity,'test', 'outbound-test')
      selfTestingAPI.downloadFile requestItem
      ,(response)->
       if(response)
          result = ''
          for key,value of response
            if key not in ['$promise','$resolved','$get','$save','$query','$remove','$delete','$deleteConnection','$downloadFile']
              result += value
          common.saveFile(result,"Connection.Test.File.997.x12")
          return
])
