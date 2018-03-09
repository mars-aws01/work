angular.module('vf-self-testing-x12-test',['ngRoute','pascalprecht.translate'])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/self-testing-x12-test/:step",
      templateUrl: "/modules/vendorportal-vf/app/self-testing/x12-test.tpl.html"
      controller: 'SelfTestingX12TestCtrl'
])

.controller('SelfTestingX12TestCtrl',
["$scope","$filter","$location","messager","common","$translate","$routeParams","$fileUploader","selfTestingAPI","vfSelfTesting",
($scope,$filter,$location,messager,common,$translate,$routeParams,$fileUploader,selfTestingAPI,vfSelfTesting) ->

    $routeParams.step = 1 if(!$routeParams.step)

    if(common.currentUser.VendorNumber == "0")
      $location.path('/self-testing-dashboard')
      return
    $scope.stepInfo = {
        step1: false
        step2: false
        step3: false
        step4: false
        step5: false
    }

    $scope.cacheObj = {}
    $scope.getEdiFileSetup = ->
      requestItem = {
        action1:"edi-file-setup"
        action2:"list"
        VendorNumber: common.currentUser.VendorNumber}
      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          $scope.cacheObj = response.SetupList
    $scope.getEdiFileSetup()

    $scope.initForms = ->
      $scope.forms = ("stepForm_" + num for num in [1..5])

    $scope.initForms()
    common.initTabFormsUnsavedConfirm($scope, $scope.forms)
    $scope.queues = {
      inventoryQueue:[]
      ackQueue:[
        {
          poNumber:'101-00001'
          queue:[]
        }
        {
          poNumber:'101-00002'
          queue:[]
        }
        {
          poNumber:'101-00003'
          queue:[]
        }
      ]
      shipmentQueue:[
        {
          poNumber:'101-00001'
          queue:[]
        }
        {
          poNumber:'101-00002'
          queue:[]
        }
        {
          poNumber:'101-00003'
          queue:[]
        }
      ]
      invoiceQueue:[
        {
          poNumber:'101-00001'
          queue:[]
        }
        {
          poNumber:'101-00002'
          queue:[]
        }
        {
          poNumber:'101-00003'
          queue:[]
        }
      ]
    }

    $scope.getQueue = (item,poNumber)->
      queue = []
      if (item == 'inventory')
        queue = $scope.queues.inventoryQueue
      else
        if (item == 'purchase-order-ack')
          queue = $scope.queues['ackQueue']
        else
          queue = $scope.queues[item+'Queue']
        array = $filter('filter')(queue,{poNumber:poNumber})
        if array and array.length > 0
          return array[0].queue
        else
          return []


    $scope.currentStep = parseInt($routeParams.step)

    $scope.setDefaultQueue = ()->
      switch $scope.currentStep
        when 1 then $scope.currentUploadItem = {item: 'inventory', poNumber: null}
        when 3 then $scope.currentUploadItem = {item: 'purchase-order-ack', poNumber: null}
        when 4 then $scope.currentUploadItem = {item: 'shipment', poNumber: null}
        when 5 then $scope.currentUploadItem = {item: 'invoice', poNumber: null}

    $scope.setDefaultQueue()

    $scope.entity = {}

    fill855Data = (data) ->
      if data && data.length == 3
        $scope.entity.PurchaseOrderAckTest = data
        return
      tempList = [{BusinessNumber:'101-00001',IsPassed:false},{BusinessNumber:'101-00002',IsPassed:false},{BusinessNumber:'101-00003',IsPassed:false}]
      if data
          for index of tempList
              filterItems = $filter('filter')(data, (i) -> i.BusinessNumber == tempList[index].BusinessNumber)
              tempList[index] = filterItems[0] if filterItems && filterItems.length > 0
      $scope.entity.PurchaseOrderAckTest = tempList

    fill856Data = (data) ->
      if data && data.length == 2
        $scope.entity.ShipmentTest = data
        return
      tempList = [{BusinessNumber:'101-00001',IsPassed:false},{BusinessNumber:'101-00002',IsPassed:false}]
      if data
          for index of tempList
              filterItems = $filter('filter')(data, (i) -> i.BusinessNumber == tempList[index].BusinessNumber)
              tempList[index] = filterItems[0] if filterItems && filterItems.length > 0
      $scope.entity.ShipmentTest = tempList

    fill810Data = (data) ->
      if data && data.length == 2
        $scope.entity.InvoiceTest = data
        return
      tempList = [{BusinessNumber:'101-00001',IsPassed:false},{BusinessNumber:'101-00002',IsPassed:false}]
      if data
          for index of tempList
              filterItems = $filter('filter')(data, (i) -> i.BusinessNumber == tempList[index].BusinessNumber)
              tempList[index] = filterItems[0] if filterItems && filterItems.length > 0
      $scope.entity.InvoiceTest = tempList

    $scope.isAllPassed = (list)->
      if (!list)
        return false
      result = $filter('filter')(list,{'IsPassed':false})
      if(result && result.length == 0)
        return true
      else
        return false

    $scope.setTapStatus = (entity)->
      if(entity.InventoryTest)
        $scope.stepInfo.step1 = entity.InventoryTest.IsPassed
      else
        $scope.stepInfo.step1 = false
      $scope.stepInfo.step3 = $scope.isAllPassed(entity.PurchaseOrderAckTest)
      $scope.stepInfo.step4 = $scope.isAllPassed(entity.ShipmentTest)
      $scope.stepInfo.step5 = $scope.isAllPassed(entity.InvoiceTest)
      if($scope.cacheObj)
        setup = $filter('filter')($scope.cacheObj,{FileType: "PurchaseOrder",SetupStatus: "NotStarted"})
        if(setup && setup.length > 0)
          $scope.stepInfo.step2 = false
        else
          $scope.stepInfo.step2 = true
      else
        $scope.stepInfo.step2 = false

    $scope.initData = ->
      requestItem = {
        action1:"edi-file-setup"
        action2:"testing"
        VendorNumber:common.currentUser.VendorNumber
      }
      selfTestingAPI.query requestItem
      ,(response)->
        if (response && response.Succeeded)
          $scope.entity = response
          fill855Data(response.PurchaseOrderAckTest)
          fill856Data(response.ShipmentTest)
          fill810Data(response.InvoiceTest)
          $scope.setTapStatus($scope.entity)

    $scope.initData()

    $scope.getSurveyItem = (item)->
      result = $filter('filter')($scope.cacheObj,{FileType:item})
      if (result && result.length > 0)
        return result[0]
      else
        return undefined


    $scope.getSurveyStatusByStep = (step)->
      item = {}
      switch step
        when 1 then item = $scope.getSurveyItem('Inventory')
        when 2 then item = $scope.getSurveyItem('PurchaseOrder')
        when 3 then item = $scope.getSurveyItem('PurchaseOrderAck')
        when 4 then item = $scope.getSurveyItem('Shipment')
        when 5 then item = $scope.getSurveyItem('Invoice')
      if item
        return item.SetupStatus
      else
        return undefined

    $scope.canNext = (step)->
      return $scope.getSurveyStatusByStep(step) != 'NotStarted'

    $scope.previous = ->
       messager.clear()
       if($scope.currentStep <= 1)
         return
       if($scope.canNext($scope.currentStep - 1) == false)
        messager.error(common.formatString($translate('x12Test_sf.survey_notFinished'),[$scope.currentStep-1]))
        return
       $scope.currentStep--


    $scope.next = ->
       messager.clear()
       if($scope.currentStep > 4)
         return
       if($scope.canNext($scope.currentStep + 1) == false)
        messager.error(common.formatString($translate('x12Test_sf.survey_notFinished'),[$scope.currentStep+1]))
        return
       $scope.currentStep++

    $scope.change = (step) ->
       messager.clear()
       if($scope.canNext(step) == false)
        messager.error(common.formatString($translate('x12Test_sf.survey_notFinished'),[step]))
        return
       $scope.currentStep = step

    $scope.backToDashboard =->
      common.isBackPage = true
      $location.path('/self-testing-dashboard')
      return
    #data
    $scope.x12TestData2 = vfSelfTesting.x12TestData2

    $scope.testScenarios = [
      {
        poNumber:"101-00001",
        Text:{
          "en-us": "All lineitems are fulfilled; you will need to upload EDI document(s) in response to this test PO."
          "zh-cn":"All lineitems are fulfilled; you will need to upload EDI document(s) in response to this test PO."
          "zh-tw":"All lineitems are fulfilled; you will need to upload EDI document(s) in response to this test PO."
        }
      }
      {
        poNumber:"101-00002",
        Text:{
          "en-us": "One of the lineitems cannot be fulfilled and the rest can be fulfilled; you will need to upload EDI document(s) in response to this test PO."
          "zh-cn":"One of the lineitems cannot be fulfilled and the rest can be fulfilled; you will need to upload EDI document(s) in response to this test PO."
          "zh-tw":"One of the lineitems cannot be fulfilled and the rest can be fulfilled; you will need to upload EDI document(s) in response to this test PO."
        }
      }
      {
        poNumber:"101-00003",
        Text:{
          "en-us": "All lineitems are rejected; you will need to upload EDI document(s) in response to this test PO."
          "zh-cn":"All lineitems are rejected; you will need to upload EDI document(s) in response to this test PO."
          "zh-tw":"All lineitems are rejected; you will need to upload EDI document(s) in response to this test PO."
        }
      }
    ]

    $scope.getTestScenarios = (poNumber)->
      array =  $filter('filter')($scope.testScenarios,{poNumber: poNumber})
      if(array && array.length > 0)
        return array[0].Text
      else
        return null

    #上传文件
    $scope.url = "defaultUrl.html"
    $scope.uploadurl = ""
    $scope.uploadHeader=common.initHeader(common.currentUser)
    $scope.currentUploadItem = {}
    $scope.queue = []

    clearUploadfileInput = (item,poNumber) ->
        eid = '#'+item
        eid+=poNumber if poNumber
        findElement = $(eid)
        return if !findElement || findElement.length == 0
        btnFileInputRemove = findElement.find(".remove")[0]
        btnFileInputRemove.click()

    eventListener = (id)->
      eid = id
      item = $scope.currentUploadItem.item
      poNumber = $scope.currentUploadItem.poNumber
      click:()->
        $scope.currentUploadItem.item = item
        $scope.currentUploadItem.poNumber = poNumber
        currentQueue = $scope.getQueue(item, poNumber)
        $scope.removeEventListener(eid)
        if(currentQueue.length == 0)
          return
        uploader.clearQueue()
        currentQueue.pop()
        $scope.setFormPristine(currentQueue)


    $scope.eventList = []
    $scope.bindClickForRemoveBtn =(item,poNumber)->
      eid = '#'+item
      eid+=poNumber if poNumber
      findElement = $(eid)
      return if !findElement || findElement.length == 0
      btnFileInputRemove = findElement.find(".remove")[0]
      listener = {}
      listener = new eventListener(eid)
      $scope.eventList.push(listener)
      btnFileInputRemove.addEventListener("click",listener.click)

    $scope.removeEventListener = (eid)->
      findElement = $(eid)
      return if !findElement || findElement.length == 0
      btnFileInputRemove = findElement.find(".remove")[0]

      listener = {}
      for e in $scope.eventList
        if (e.eid = eid)
          listener = e
          break

      btnFileInputRemove.removeEventListener("click",listener.click)
      index = $scope.eventList.indexOf(listener)
      $scope.eventList.splice(index,1)

    uploader=$scope.uploader=$fileUploader.create({
            scope: $scope
            url: $scope.url
            headers:$scope.uploadHeader
            removeAfterUpload:true
            queueLimit: 5
            autoUpload: false
            queue: $scope.queue
            filters: [
                      (item)->
                            messager.clear()
                            valid=true
                            extensionName = item.name.slice(item.name.lastIndexOf('.') + 1).toLowerCase()
                            if(extensionName in ['exe','bin','gz','rar','zip','jpg','jpeg','png','bmp'])
                                valid=false
                            if(valid==false)
                                messager.warning($translate('error_sf.uploadCheck_1'))
                            if((item.size / 1024 / 1024) > 5)
                                messager.warning($translate('warning_customer_reviews.uploadCheck_2'))
                                valid=false
                            poNumber = ''
                            poNumber = '?PONumber=' + $scope.currentUploadItem.poNumber if $scope.currentUploadItem.poNumber
                            param = ''
                            if $scope.currentUploadItem.item == 'inventory'
                              param = "/"+ $scope.currentUploadItem.item + "?VendorNumber="+ common.currentUser.VendorNumber + "&filename="+encodeURIComponent(item.name) + "&DFISFileGroup=VendorPortalAttachment&DFISFileType=ReviewReply&GenerateUniqueSuffix=true&format=json"
                            else
                              param = "/"+ $scope.currentUploadItem.item + poNumber + "&VendorNumber="+ common.currentUser.VendorNumber + "&filename="+encodeURIComponent(item.name) + "&DFISFileGroup=VendorPortalAttachment&DFISFileType=ReviewReply&GenerateUniqueSuffix=true&format=json"
                            uploader.url = common.apiURL.selfTestingX12Upload+ param
                            if valid
                              item.FileType=$scope.currentUploadItem.item
                              item.PoNumber=$scope.currentUploadItem.poNumber
                            return valid;
                     ]
      })

    $scope.$watchCollection('queue',(newQueue,oldQueue)->
      return if $scope.currentUploadItem.item == undefined
      currentQueue = $scope.getQueue($scope.currentUploadItem.item, $scope.currentUploadItem.poNumber)
      if(newQueue.length == 0)
        if currentQueue.length > 0
          currentQueue.pop()
      else
        currentQueue.push(item) for item in newQueue
        $scope.bindClickForRemoveBtn($scope.currentUploadItem.item, $scope.currentUploadItem.poNumber)
      $scope.setFormPristine(currentQueue)
    )

    $scope.setFormPristine = (currentQueue)->
      if $scope.currentUploadItem.item
        if $scope.currentUploadItem.item == 'inventory'
          $scope['stepForm_'+$scope.currentStep].$pristine = currentQueue.length <= 0
        else
          if (item == 'purchase-order-ack')
            queue = $scope.queues['ackQueue']
          else
            queue = $scope.queues[$scope.currentUploadItem.item+'Queue']
          return if !queue
          pristine = true
          for item in queue
            if item.queue.length > 0
              pristine = false
              break
          $scope['stepForm_'+$scope.currentStep].$pristine = pristine

    uploader.bind('success', (event, xhr, item, msg) ->
        if(msg.Succeeded)
            $scope.uploadSuccessProcess(msg)
        else
           messager.clear()
           if msg.ResponseCode is 'Authorization expired'
                messager.error($translate('error_sf.authorization_expired'))
           else
                info = $translate('error_customer_reviews.upload')
                if(msg.Errors)
                  info=info + common.getLocalizedErrorMsg(msg.Errors[0])
                messager.error(info)
        uploader.queue = $scope.queue
        clearUploadfileInput(item.file.FileType,item.file.PoNumber)
    )

    uploader.bind('error', (event, xhr, item, msg) ->
        messager.clear()
        if msg && msg.ResponseCode is 'Authorization expired'
           messager.error($translate('error_sf.authorization_expired'))
           return
        if(msg&&msg.data)
            messager.error($translate('error_customer_reviews.upload'),msg.data)
        else
            messager.error($translate('error_customer_reviews.upload'),msg)
        uploader.queue = $scope.queue
        clearUploadfileInput(item.file.FileType,item.file.PoNumber)
    )

    $scope.uploadSuccessProcess=(data)->
        messager.clear()
        if (data.Succeeded)
          $scope['stepForm_'+$scope.currentStep].$pristine = true
          messager.success($translate('success_sf.uploadFile_success'))
          $scope.refresh()

    $scope.setCurrentUploadItem = (item,poNumber)->
      $scope.currentUploadItem = {item: item, poNumber: poNumber}

    $scope.uploadFile = (item,poNumber)->
      currentQueue = $scope.getQueue(item, poNumber)
      if(currentQueue.length == 0)
        return
      uploader.queue= currentQueue
      uploader.uploadItem(currentQueue[0])

    $scope.refreshInventoryTest =->
      requestItem = {
        action1:"edi-file-setup"
        action2:"testing"
        action3:"inventory"
        VendorNumber:common.currentUser.VendorNumber
      }

      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          $scope.entity.InventoryTest = response.InventoryTest
          $scope.stepInfo.step1 = response.InventoryTest.IsPassed

    $scope.refreshInvoiceTest =->
      requestItem = {
        action1:"edi-file-setup"
        action2:"testing"
        action3:"invoice"
        VendorNumber:common.currentUser.VendorNumber
      }

      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          fill810Data(response.InvoiceTest)
          $scope.stepInfo.step5 = $scope.isAllPassed($scope.entity.InvoiceTest)

    $scope.refreshPurchaseOrderAckTest =->
      requestItem = {
        action1:"edi-file-setup"
        action2:"testing"
        action3:"purchase-order-ack"
        VendorNumber:common.currentUser.VendorNumber
      }

      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          fill855Data(response.PurchaseOrderAckTest)
          $scope.stepInfo.step3 = $scope.isAllPassed($scope.entity.PurchaseOrderAckTest)

    $scope.refreshShipmentTest =->
      requestItem = {
        action1:"edi-file-setup"
        action2:"testing"
        action3:"shipment"
        VendorNumber:common.currentUser.VendorNumber
      }

      selfTestingAPI.query requestItem
      ,(response)->
        if(response && response.Succeeded)
          fill856Data(response.ShipmentTest)
          $scope.stepInfo.step4 = $scope.isAllPassed($scope.entity.ShipmentTest)

    $scope.refresh = ()->
      switch $scope.currentStep
        when 1 then $scope.refreshInventoryTest()
        when 3 then $scope.refreshPurchaseOrderAckTest()
        when 4 then $scope.refreshShipmentTest()
        when 5 then $scope.refreshInvoiceTest()

    $scope.downloadFile =(poNumber)->
      requestItem = {
        action1:'edi-file-setup'
        action2:'testing'
        action3:'purchase-order'
        PONumber:poNumber
        VendorNumber: common.currentUser.VendorNumber
        format:'json'
      }
      selfTestingAPI.downloadFile requestItem
      ,(response)->
       if(response)
          result = ''
          for key,value of response
            if key not in ['$promise','$resolved','$get','$save','$query','$remove','$delete','$deleteConnection','$downloadFile']
              result += value
          common.saveFile(result,"Test.File.850."+poNumber+".x12")
          return

])
