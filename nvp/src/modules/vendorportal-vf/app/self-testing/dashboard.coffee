angular.module('vf-self-testing-dashboard',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.selftesting.us)
    .translations('zh-cn',resources.vendorportal.selftesting.cn)
    .translations('zh-tw',resources.vendorportal.selftesting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/self-testing-dashboard",
      templateUrl: "/modules/vendorportal-vf/app/self-testing/dashboard.tpl.html"
      controller: 'SelfTestingDashboardCtrl'
])

.controller('SelfTestingDashboardCtrl',
["$scope","$filter","$q","messager","common","$translate","vfSelfTesting","$location","selfTestingAPI",
($scope,$filter,$q,messager,common,$translate,vfSelfTesting,$location,selfTestingAPI) ->

    $scope.PrerequsiteItemList = {}
    $scope.prerequsiteIsFinished = false
    $scope.connectionDisabled = false
    $scope.ediX12SetupData = vfSelfTesting.ediX12SetupData

    $scope.getEdiFileDesc = (fileType)->
      files = $filter('filter')($scope.ediX12SetupData, {text:fileType})
      if(files && files.length > 0)
        return files[0].value
      else
        return ''

    $scope.getRequestItem = (action1,action2)->
      requestItem = {
        action1:action1
        action2:action2
        VendorNumber: common.currentUser.VendorNumber      }
      return requestItem

    $scope.initPrerequsiteItemList = ->
      $scope.prerequsiteIsFinished = false
      requestItem = $scope.getRequestItem("prerequisite","list")
      $scope.query(requestItem).then(
        (response)->
          $scope.PrerequsiteItemList = response.PrerequisiteItemList
          $scope.prerequsiteIsFinished = response.IsFinished
          $scope.connectionDisabled =  $scope.addConnectionDisabled($scope.VendorConnectionList)
      )

    $scope.initConnectionList = ->
      $scope.connectionDisabled = false
      requestItem = $scope.getRequestItem("connection","list")
      $scope.query(requestItem).then(
        (response)->
          $scope.VendorConnectionList = response.VendorConnectionList
          $scope.connectionDisabled =  $scope.addConnectionDisabled($scope.VendorConnectionList)
      )

    $scope.initEdiFileSetup = ->
      requestItem = $scope.getRequestItem("edi-file-setup","list")
      $scope.query(requestItem).then(
        (response)->
          $scope.SetupList = response.SetupList
      )

    $scope.query = (requestItem)->
      deferred = $q.defer()
      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          deferred.resolve(response)
        else
          deferred.reject(response)
      return deferred.promise

    $scope.initData = ->
      if(common.isBackPage == true)
        cacheObj = common.getPageCache()
        common.clearBackPage()
        common.isBackPage = false
        common.currentUser.VendorNumber = cacheObj.query
      $scope.initPrerequsiteItemList()
      $scope.initConnectionList()
      $scope.initEdiFileSetup()

    $scope.initData()
    # Prerequisite Status
    $scope.prerequisiteStatusColorMap = {
      Completed : "green"
      NoCompleted : "red2"
    }

    $scope.getPrerequisiteStatusColor = (status) ->
        return $scope.prerequisiteStatusColorMap[status]

    $scope.addConnectionDisabled =(VendorConnectionList)->
      if(VendorConnectionList && VendorConnectionList.length>1)
        return true
      else
        return false || $scope.prerequsiteIsFinished == false

    # Connection Setup
    $scope.connectionStatusColorMap = {
      Started : "red2"
      ReadyToTest : "red2"
      ReadyToLive : "red2"
      Live : "green"
    }

    $scope.getConnectionStatusColor = (status) ->
        return $scope.connectionStatusColorMap[status]

    $scope.goConnection = (item) ->
      $scope.navigate('/self-testing-connection/edit',item.ConnectionType + '/' + item.ConnectionProtocol + '/' + item.ConnectionId)

    $scope.goConnectionTest = (item) ->
      if(item.ConnectionStatus == 'Started')
        messager.error($translate('error_sf.connection_invalidStatus'))
        return
      $scope.navigate('/self-testing-connection-test',item.ConnectionType + '/' + item.ConnectionProtocol + '/' + item.ConnectionId)

    $scope.removeConnection = (item)->
      messager.clear()
      requestItem = {
        action1 : "connection"
        ConnectionId : item.ConnectionId
        VendorNumber : item.VendorNumber
        ConnectionType : item.ConnectionType
        ConnectionProtocol : item.ConnectionProtocol
        RequestUser: common.currentUser.ID
      }
      common.confirmBox $translate('connection_sf.warning_4'),"", ->
        selfTestingAPI.deleteConnection requestItem
        ,(response)->
          if(response && response.Succeeded)
             messager.success($translate('connection_sf.msg_7'))
             $scope.initConnectionList()
          else
             msg = $translate('connection_sf.msg_8')
             if(response.Errors)
               msg=msg + common.getLocalizedErrorMsg(response.Errors[0])
             messager.error(msg)
      return

    $scope.connectionGoLive =(item) ->
      requestItem = $scope.getRequestItem('connection','live')
      requestItem.ConnectionId = item.ConnectionId
      requestItem.ConnectionProtocol = item.ConnectionProtocol
      requestItem.ConnectionType = item.ConnectionType
      selfTestingAPI.save requestItem
      ,(response)->
        if(response && response.Succeeded)
          messager.success $translate('connectionTest_sf.goLive_success')
          $scope.initConnectionList()
        else
          msg = $translate('error_sf.goLive_failed')
          if(response.Errors)
            msg=msg + common.getLocalizedErrorMsg(response.Errors[0])
          messager.error(msg)

    # EDI X12 Setup
    $scope.x12StatusColorMap = {
      NotStarted : "red2"
      ReadyToTest : "red2"
      ReadyToLive : "red2"
      Live : "green"
    }

    $scope.ediFileGoLive = (item)->
      messager.clear()
      if(item.SetupStatus not in ["ReadyToLive","Live"])
        messager.error($translate('error_sf.goLive_invalidStatus'))
        return
      requestItem = $scope.getRequestItem('edi-file-setup','live')
      requestItem.EdiFileType = item.FileType
      selfTestingAPI.save requestItem
      ,(response)->
        if(response && response.Succeeded)
          messager.success $translate('x12Test_sf.goLive_success')
          item.SetupStatus = 'Live'
          item.SetupStatusDesc = 'Live'
          $scope.initConnectionList()
        else
          msg = $translate('error_sf.goLive_failed')
          if(response.Errors)
            msg=msg + common.getLocalizedErrorMsg(response.Errors[0])
          messager.error(msg)

    $scope.getX12StatusColor = (status) ->
        return $scope.x12StatusColorMap[status]

    $scope.navigate =(url,step)->
      $scope.savePageCache()
      $location.path(url+'/'+step)

    $scope.navigateToSurvey = (url,item,step)->
      hasTestConnection = false
      if($scope.VendorConnectionList)
        conn = $filter('filter')($scope.VendorConnectionList,{ConnectionType:'Test',ConnectionStatus: "ReadyToTest"})
        if(conn && conn.length > 0)
          hasTestConnection = true
        else
          hasTestConnection = false
      else
        hasTestConnection = false

      common.addCacheObject('edi_x12_testing_is_prestep_finished',$scope.prerequsiteIsFinished && hasTestConnection)

      $scope.savePageCache()
      $location.path(url+'/'+step)

    $scope.navigateToX12Testing = (url,item,step)->
      messager.clear()
      if(!$scope.prerequsiteIsFinished)
        messager.error($translate('error_sf.goTest_prerequisiteNotFinish'))
        return
      requestItem = {
        action1:"edi-file-setup"
        action2:"testing"
        VendorNumber:common.currentUser.VendorNumber
      }
      selfTestingAPI.query requestItem
      ,(response)->
        if (response && response.Succeeded)
          if(item.SetupStatus == "NotStarted")
            messager.error($translate('error_sf.goTest_invalidStatus'))
            return
          $scope.savePageCache()
          $location.path(url+'/'+step)
        else
          if(response.Errors)
            messager.error(common.getLocalizedErrorMsg(response.Errors[0]))


    $scope.savePageCache =->
      common.savePageCache(common.currentUser.VendorNumber,null)
      common.isBackPage = false

])
