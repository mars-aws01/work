angular.module('vf-self-testing-x12',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/self-testing-x12/:step",
      templateUrl: "/modules/vendorportal-vf/app/self-testing/x12.tpl.html"
      controller: 'SelfTestingX12Ctrl'
])

.controller('SelfTestingX12Ctrl',
["$scope","$filter","$location","messager","common","$translate","$routeParams","selfTestingAPI",
($scope,$filter,$location,messager,common,$translate,$routeParams,selfTestingAPI) ->

    $routeParams.step = 1 if(!$routeParams.step)

    if(common.currentUser.VendorNumber == "0")
      $location.path('/self-testing-dashboard')
      return

    $scope.isPreStepFinished = common.getCacheObject('edi_x12_testing_is_prestep_finished')

    $scope.forms = []

    $scope.entity = {
      InventorySurvey :{}
      PurchaseOrderSurvey :{}
      PurchaseOrderAckSurvey :{}
      ShipmentSurvey :{}
      InvoiceSurvey :{}
    }

    $scope.stepInfo = {
        step1: false
        step2: false
        step3: false
        step4: false
        step5: false
    }

    $scope.initForms = ->
      $scope.forms = ("stepForm_" + num for num in [1..5])

    $scope.initForms()
    common.initTabFormsUnsavedConfirm($scope, $scope.forms)

    $scope.getRequestItem = (action1,action2)->
      requestItem = {
        action1 : action1
        VendorNumber : common.currentUser.VendorNumber
      }
      requestItem.action2 = action2 if action2
      return requestItem

    $scope.initData =->
      requestItem = $scope.getRequestItem('edi-file-setup','survey')
      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          if response.InventorySurvey
            $scope.entity.InventorySurvey = response.InventorySurvey
            $scope.stepInfo.step1 = true
          if response.PurchaseOrderSurvey
            $scope.entity.PurchaseOrderSurvey = response.PurchaseOrderSurvey
            $scope.stepInfo.step2 = true
          if response.PurchaseOrderAckSurvey
            $scope.entity.PurchaseOrderAckSurvey = response.PurchaseOrderAckSurvey
            $scope.stepInfo.step3 = true
          if response.ShipmentSurvey
            $scope.entity.ShipmentSurvey = response.ShipmentSurvey
            $scope.stepInfo.step4 = true
          if response.InvoiceSurvey
            $scope.entity.InvoiceSurvey = response.InvoiceSurvey
            $scope.stepInfo.step5 = true
          $scope.entity.ShipViaList = response.ShipViaList
        else
          msg = $translate('connection_sf.msg_4')
          if(response.Errors)
            msg=msg + common.getLocalizedErrorMsg(response.Errors[0])
          messager.error(msg)
          $location.path('/self-testing-dashboard')
          return

    $scope.initData()
    $scope.currentStep = parseInt($routeParams.step)

    $scope.previous = ->
       if($scope.currentStep <= 1)
         return
       messager.clear()
       $scope.currentStep--

    $scope.next = ->
       messager.clear()
       if($scope.currentStep > 4)
         return
       $scope.currentStep++

    $scope.change = (step) ->
       messager.clear()
       $scope.currentStep = step

    $scope.backToDashboard =->
      common.isBackPage = true
      $location.path('/self-testing-dashboard')
      return

    $scope.save =(requestItem, stepIndex)->
      messager.clear()
      selfTestingAPI.save requestItem
      ,(response)->
        if(response && response.Succeeded)
          $scope.stepInfo['step'+stepIndex] = true
          $scope['stepForm_' + stepIndex].$setPristine()
          messager.success($translate("connection_sf.msg_3"))
        else
          msg = $translate("error_sf.save_failed")
          if(response.Errors)
            msg=msg + common.getLocalizedErrorMsg(response.Errors[0])
          messager.error(msg)

    $scope.getSurveyItem = (action3)->
      requestItem = {
        VendorNumber : common.currentUser.VendorNumber
        action1 : 'edi-file-setup'
        action2 : 'survey'
        action3 : action3
      }
      return requestItem

    # 846
    $scope.save_846 = ->
      requestItem = $scope.getSurveyItem("inventory")
      requestItem.InventorySurvey = angular.copy($scope.entity.InventorySurvey)
      $scope.save(requestItem,1)

    # 850
    $scope.save_850 = ->
      requestItem = $scope.getSurveyItem("purchase-order")
      requestItem.PurchaseOrderSurvey = angular.copy($scope.entity.PurchaseOrderSurvey)
      $scope.save(requestItem,2)

    # 855
    $scope.save_855 = ->
      requestItem = $scope.getSurveyItem("purchase-order-ack")
      requestItem.PurchaseOrderAckSurvey = angular.copy($scope.entity.PurchaseOrderAckSurvey)
      $scope.save(requestItem,3)

    # 856
    $scope.save_856 = ->
      requestItem = $scope.getSurveyItem("shipment")
      requestItem.ShipmentSurvey = angular.copy($scope.entity.ShipmentSurvey)
      $scope.save(requestItem,4)
    # 810
    $scope.save_810 = ->
      requestItem = $scope.getSurveyItem("invoice")
      requestItem.InvoiceSurvey = angular.copy($scope.entity.InvoiceSurvey)
      $scope.save(requestItem,5)
])
