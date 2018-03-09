angular.module('vf-self-testing-prerequisite',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/self-testing-prerequisite/:step",
      templateUrl: "/modules/vendorportal-vf/app/self-testing/prerequisite.tpl.html"
      controller: 'SelfTestingPrerequisiteCtrl'
])

.controller('SelfTestingPrerequisiteCtrl',
["$scope","$filter","$location","messager","common","$translate","$routeParams","vfSelfTesting","selfTestingAPI",
($scope,$filter,$location,messager,common,$translate,$routeParams,vfSelfTesting,selfTestingAPI) ->

    $routeParams.step = 1 if(!$routeParams.step)

    if(common.currentUser.VendorNumber == "0")
      $location.path('/self-testing-dashboard')
      return

    $scope.isGSIDManualChanged={Test:false,Production:false}
    $scope.forms = []
    $scope.initForms = ->
      $scope.forms = ("stepForm_" + num for num in [1..6])

    $scope.initForms()
    common.initTabFormsUnsavedConfirm($scope, $scope.forms)

    $scope.stepInfo = {
        step1: false
        step2: false
        step3: false
        step4: false
        step5: false
        step6: false
    }
    $scope.identityMaxLength = 15
    $scope.partNumberMaxLength = 40
    $scope.upcMaxLength = 50
    $scope.descriptionMaxLength = 200
    # Newegg EDI X12 Standard
    $scope.x12StandardFileData = vfSelfTesting.ediX12StandardFileData
    # Newegg EDI X12 Samples
    $scope.x12SampleFileData = vfSelfTesting.ediX12SampleFileData
    # Newegg Packing Slip Requirements
    $scope.packingSlipData = vfSelfTesting.packingSlipData
    #ISAIDQualifier Data
    $scope.ISAIDQualifierData = vfSelfTesting.isaIDQualifierData

    $scope.setDefaultISAIDQulifier =()->
      if($scope.VendorPrerequsite.Identity.VendorIdentifier is undefined)
          $scope.VendorPrerequsite.Identity.VendorIdentifier = {
            Test:{ISAIDQualifier:'ZZ'}
            Production:{ISAIDQualifier:'ZZ'}
          }

    $scope.getNormalReg = ->
      reg = /^[a-zA-Z0-9_]{1,15}$/
      return reg

    $scope.getRequestItem = (action2)->
      requestItem = {
        action1:"prerequisite"
        VendorNumber: common.currentUser.VendorNumber
        RequestUser: common.currentUser.ID}
      if action2
        requestItem.action2 = action2
      return requestItem

    $scope.initData = ->
      requestItem = $scope.getRequestItem()
      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          $scope.VendorPrerequsite = response.VendorPrerequisite
          $scope.initStepInfo()
          $scope.initIsGSIDManualChanged()
          $scope.setDefaultISAIDQulifier()

    $scope.initStepInfo =->
      for own key, value of $scope.VendorPrerequsite
        switch key
          when "GeneralSurvey" then $scope.stepInfo.step1 = value.IsFinished
          when "X12Standard" then $scope.stepInfo.step2 = value.IsFinished
          when "X12Sample" then $scope.stepInfo.step3 = value.IsFinished
          when "PackingSlip" then $scope.stepInfo.step4 = value.IsFinished
          when "Identity" then $scope.stepInfo.step5 = value.IsFinished
          when "TestItem" then $scope.stepInfo.step6 = value.IsFinished

    $scope.initIsGSIDManualChanged = ->
      if($scope.VendorPrerequsite && $scope.VendorPrerequsite.Identity && $scope.VendorPrerequsite.Identity.IsFinished)
        $scope.isGSIDManualChanged={Test:true,Production:true}

    $scope.initData()
    $scope.currentStep = parseInt($routeParams.step)

    $scope.backToDashboard =->
      common.isBackPage = true
      $location.path('/self-testing-dashboard')
      return

    $scope.previous = ->
       if($scope.currentStep <= 1)
         return
       $scope.currentStep--

    $scope.next = ->
       if($scope.currentStep > 5)
         return
       $scope.currentStep++

    $scope.change = (step) ->
       $scope.currentStep = step

    $scope.removeItem = (list,index)->
      $scope[$scope.getFormName(6)].$pristine = false
      list.splice(index,1)

    $scope.addItem =(list)->
      $scope[$scope.getFormName(6)].$pristine = false
      list.push({})

    $scope.gsIdManualChanged=(type)->
      if(type in ['Test','Production'])
        $scope.isGSIDManualChanged[type] = true

    $scope.isaIdChanged = (type)->
      if(type in ['Test','Production'])
        if($scope.isGSIDManualChanged[type] == false )
          $scope.VendorPrerequsite.Identity.VendorIdentifier[type].GSID = $scope.VendorPrerequsite.Identity.VendorIdentifier[type].ISAID

    $scope.getFormName = (index) ->
      return "stepForm_" +index

    $scope.submit =(requestItem,stepIndex)->
      if(requestItem is undefined)
        return
      messager.clear()
      selfTestingAPI.save requestItem
      ,(response)->
        if( response && response.Succeeded)
          $scope.stepInfo['step'+stepIndex] = true
          $scope[$scope.getFormName(stepIndex)].$setPristine()
          messager.success($translate("connection_sf.msg_3"))
        else
          msg = $translate("error_sf.save_failed")
          if(response.Errors)
            msg=msg + common.getLocalizedErrorMsg(response.Errors[0])
          messager.error(msg)
      ,(err)->
        if(err && err.data)
          messager.clear()
          messager.error(common.getValidationErrorMsg(err.data))

    $scope.getGeneralSurvey = ()->
      requestItem = $scope.getRequestItem("general-survey")
      requestItem.GeneralSurvey = {IsAcknowledge:$scope.VendorPrerequsite.GeneralSurvey.IsAcknowledge}
      return requestItem

    $scope.getX12Standard = ()->
      requestItem = $scope.getRequestItem("x12-standard")
      requestItem.X12Standard = {IsAcknowledge:$scope.VendorPrerequsite.X12Standard.IsAcknowledge}
      return requestItem

    $scope.getX12Sample = ()->
      requestItem = $scope.getRequestItem("x12-sample")
      requestItem.X12Sample = {IsAcknowledge:$scope.VendorPrerequsite.X12Sample.IsAcknowledge}
      return requestItem

    $scope.getPackingSlip = ()->
      requestItem = $scope.getRequestItem("packing-slip")
      requestItem.PackingSlip = {IsAcknowledge:$scope.VendorPrerequsite.PackingSlip.IsAcknowledge}
      return requestItem

    $scope.getIdentifiers = ()->
      requestItem = $scope.getRequestItem("identity")
      requestItem.Identity = {
        VendorIdentifier: {
          Test: angular.copy($scope.VendorPrerequsite.Identity.VendorIdentifier.Test),
          Production: angular.copy($scope.VendorPrerequsite.Identity.VendorIdentifier.Production)
        }
      }
      return requestItem

    $scope.getTestItems = ()->
      requestItem = $scope.getRequestItem("test-item")
      acceptedItemList = []
      for item in $scope.VendorPrerequsite.TestItem.AcceptedItemList
        if(item.VendorPartNumber && item.ManufacturerPartNumber && item.UPC && item.Description && item.Cost)
          acceptedItemList.push(angular.copy(item))
      rejectedItemList = []
      for item in $scope.VendorPrerequsite.TestItem.RejectedItemList
        if(item.VendorPartNumber && item.ManufacturerPartNumber && item.UPC && item.Description && item.Cost)
          rejectedItemList.push(angular.copy(item))
      requestItem.TestItem = {
        AcceptedItemList: acceptedItemList,
        RejectedItemList: rejectedItemList
      }
      return requestItem

    $scope.isNormalFormValid = (step)->
      return $scope[$scope.getFormName(step)].$valid

    $scope.isAcknowledgeChecked =(step)->
      if($scope.VendorPrerequsite[step] && $scope.VendorPrerequsite[step].IsAcknowledge)
        return true
      else
        return false

    # Survey
    $scope.save_1 = ->
      if( $scope.isAcknowledgeChecked('GeneralSurvey') == false)
        messager.warning($translate("warning_sf.guide_uncheckAcknowledge"))
        return
      $scope.submit($scope.getGeneralSurvey(),1)

    $scope.save_2 = ->
      if( $scope.isAcknowledgeChecked('X12Standard') == false)
        messager.warning($translate("warning_sf.guide_uncheckAcknowledge"))
        return
      $scope.submit($scope.getX12Standard(),2)

    $scope.save_3 = ->
      if( $scope.isAcknowledgeChecked('X12Sample') == false)
        messager.warning($translate("warning_sf.guide_uncheckAcknowledge"))
        return
      $scope.submit($scope.getX12Sample(),3)

    $scope.save_4 = ->
      if( $scope.isAcknowledgeChecked('PackingSlip') == false)
        messager.warning($translate("warning_sf.guide_uncheckAcknowledge"))
        return
      $scope.submit($scope.getPackingSlip(),4)

    # Identifiers
    $scope.isSame = (id1,id2)->
      return id1 == id2

    $scope.isSameAsNewegg = ->
      neweggISA_test =$scope.VendorPrerequsite.Identity.NeweggIdentifier.Test.ISAIDQualifier + $scope.VendorPrerequsite.Identity.NeweggIdentifier.Test.ISAID
      neweggISA_prd =$scope.VendorPrerequsite.Identity.NeweggIdentifier.Production.ISAIDQualifier + $scope.VendorPrerequsite.Identity.NeweggIdentifier.Production.ISAID

      vendorISA_test =$scope.VendorPrerequsite.Identity.VendorIdentifier.Test.ISAIDQualifier + $scope.VendorPrerequsite.Identity.VendorIdentifier.Test.ISAID
      vendorISA_prd =$scope.VendorPrerequsite.Identity.VendorIdentifier.Production.ISAIDQualifier + $scope.VendorPrerequsite.Identity.VendorIdentifier.Production.ISAID

      return $scope.isSame(neweggISA_test,vendorISA_test) ||  $scope.isSame(neweggISA_test,vendorISA_prd) || $scope.isSame(neweggISA_prd,vendorISA_test) || $scope.isSame(neweggISA_prd,vendorISA_prd)

    $scope.save_5 = ->
      if($scope.isNormalFormValid(5) == false)
        messager.warning($translate("warning_sf.guide_identifierInvalid"))
        return
      if($scope.isSame($scope.VendorPrerequsite.Identity.VendorIdentifier.Test.ISAID,$scope.VendorPrerequsite.Identity.VendorIdentifier.Production.ISAID))
        messager.warning($translate("warning_sf.guide_sameISAID"))
        return
      if($scope.isSameAsNewegg())
        messager.warning($translate("warning_sf.guide_sameAsNewegg"))
        return
      $scope.submit($scope.getIdentifiers(),5)

    # Test Items
    $scope.isTestItemValid =(list)->
      isValid = true

      for item in list
        if(item.VendorPartNumber && item.ManufacturerPartNumber && item.UPC && item.Description && item.Cost)
          isValid = true
        else
          isValid = false
          break
      return isValid

    $scope.haveSameVendorPartNumber = (list)->
      isSame = false
      partNumberList = []
      for item in list
        if(item.VendorPartNumber not in partNumberList)
          partNumberList.push(item.VendorPartNumber)
      if(partNumberList.length != list.length)
        isSame = true
      return isSame

    $scope.containInvalidWords =(key)->
      isInvalid = false
      reg = /[\u4e00-\u9fa5]/
      if(reg.test(key))
        isInvalid = true
      return isInvalid

    $scope.isTestItemContentValid =(list) ->
      isValid = true
      for item in list
        if($scope.containInvalidWords(item.VendorPartNumber) || $scope.containInvalidWords(item.UPC))
          isValid = false
        break if isValid == false
      return isValid

    $scope.save_6 = ->
      if($scope.isTestItemValid($scope.VendorPrerequsite.TestItem.AcceptedItemList) == false || $scope.isTestItemValid($scope.VendorPrerequsite.TestItem.RejectedItemList) == false)
       messager.error($translate("warning_sf.guide_testItemInvalid"))
       return

      items = $scope.VendorPrerequsite.TestItem.AcceptedItemList.concat($scope.VendorPrerequsite.TestItem.RejectedItemList)
      if($scope.haveSameVendorPartNumber(items))
        messager.error($translate("warning_sf.guide_partNumberDuplicate"))
        return
      if(!$scope.isTestItemContentValid(items))
        messager.error($translate("warning_sf.guide_partNumberInvalid"))
        return
      $scope.submit($scope.getTestItems(),6)

])
