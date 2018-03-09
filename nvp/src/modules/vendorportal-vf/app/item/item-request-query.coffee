angular.module('vf-item-request-query',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.itemcreation.us)
    .translations('zh-cn',resources.vendorportal.itemcreation.cn)
    .translations('zh-tw',resources.vendorportal.itemcreation.tw)
    .translations('en-us',resources.vendorportal.itemupdate.us)
    .translations('zh-cn',resources.vendorportal.itemupdate.cn)
    .translations('zh-tw',resources.vendorportal.itemupdate.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/query-item-request",
      templateUrl: "/modules/vendorportal-vf/app/item/item-request-query.tpl.html"
      controller: 'ItemRequestQueryCtrl'
])

.controller('ItemRequestQueryCtrl',
["$scope","$filter","$q","messager","common","$translate","itemCreation","itemCreationAPI","manufacturerAPI","publisher","itemUpdateQueryAPI"
($scope,$filter,$q,messager,common,$translate,itemCreation,itemCreationAPI,manufacturerAPI,publisher,itemUpdateQueryAPI) ->
    publisher.clearAll()
    $scope.dataGridName = "itemRequestListGrid"
    $scope.refreshKey = "refresh.item-request-list"
    $scope.shouldInit = true
    $scope.uploadFilesDisabled = true
    $scope.config = itemCreation.config
    $scope.entity = {}
    $scope.requestTypeDatas = angular.copy(itemCreation.requestTypeDatas)
    $scope.requestStatusDatas = angular.copy( itemCreation.requestStatusDatas)
    $scope.hasAttachments = angular.copy(itemCreation.hasAttachments)
    $scope.checkAllCountry = false
    $scope.showDetails = false
    $scope.showUpadteDetails = false
    $scope.uploadAttachmentModal = false
    common.setCtrlReadOnly($("#itemRequestDetail")[0], 'input', true, ['unit1','unit2'])
    common.setCtrlReadOnly($("#itemRequestDetail")[0], 'select', true, [])
    common.setCtrlReadOnly($("#addOrigin")[0], 'button', true,['addOriginModalCancelBtn'])
    common.setCtrlReadOnly($("#addWarning")[0], 'button', true, ['addWarningCancelBtn'])
    common.setCtrlReadOnly($("#addAttachment")[0], 'button', true, ['addAttachmentCancelBtn'])

    $scope.setCategoryArrowDisabled = ->
        arrowCtrls = $("#itemRequestDetail").find(".arrows-select.arrows-down").css("display", "none")
    $scope.setCategoryArrowDisabled()
    $scope.setDimensionWeight =(newValue)->
        type = 'Metric'
        if newValue == 0
            type = 'Imperial'
        else if newValue = 1
            type = 'Metric'
        $scope.entity.ProductLength = $scope.entity['ProductLength' + type]
        $scope.entity.ProductWidth = $scope.entity['ProductWidth' + type]
        $scope.entity.ProductHeight = $scope.entity['ProductHeight' + type]
        $scope.entity.ProductWeight = $scope.entity['ProductWeight' + type]

        $scope.entity.PackageLength = $scope.entity['PackageLength' + type]
        $scope.entity.PackageWidth = $scope.entity['PackageWidth' + type]
        $scope.entity.PackageHeight = $scope.entity['PackageHeight' + type]
        $scope.entity.PackageWeight = $scope.entity['PackageWeight' + type]

    $scope.$watch 'entity.UnitMeasurement',(newValue,oldValue)->
        if newValue == 1 || newValue == 0
            $scope.setDimensionWeight(newValue)


    $scope.setDefaultQuery = ->
        $scope.query = {}

    $scope.setDefaultQuery()

    $scope.tempQuery = angular.copy($scope.query)

    $scope.getManufacturerList =->
        requestItem={VendorNumber:common.currentUser.VendorNumber}

        manufacturerAPI.search requestItem
        ,(response)->
            if(response)
                $scope.ManufacturerInfoList = response.ManufacturerInfoList

    $scope.changeVendor =->
        $scope.getManufacturerList()

    if common.currentUser.VendorNumber != "" && common.currentUser.VendorNumber!="0"
        $scope.getManufacturerList()

    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)

    $scope.preparePaging()

    $scope.loadAttachments = (itemCreationApplicationList, totalCount, pageIndex, pageSize) ->
        startIndex = (pageIndex-1)*pageSize 
        endIndex = pageIndex*pageSize - 1
        for item in itemCreationApplicationList
            if item.RequestType == 1
              index = itemCreationApplicationList.indexOf(item)
              if index>=startIndex && index<=endIndex
                $scope.attachmentAsyn(index, itemCreationApplicationList, totalCount)
                
    $scope.attachmentAsyn = (index, itemCreationApplicationList, totalCount)->
        requestItem = {
            action1: "attachment"
            requestid: itemCreationApplicationList[index].RequestID
            RetrieveCountOnly: true
        }
        #common.hideLoadingBar()
        itemCreationAPI.search requestItem
        ,(response)->
            if response && response.Succeeded
                itemCreationApplicationList[index].isUploading = false
                itemCreationApplicationList[index].attachmentNumber = response.TotalCount
                $scope.currentResponse.ItemCreationApplicationList = angular.copy(itemCreationApplicationList)
                $scope.callbackEvent({ItemCreationApplicationList: itemCreationApplicationList, TotalRecordCount: totalCount}) if $scope.callbackEvent
            else
                itemCreationApplicationList[index].isUploading = false
                itemCreationApplicationList[index].attachmentNumber = 0
                $scope.currentResponse.ItemCreationApplicationList = angular.copy(itemCreationApplicationList)
                $scope.callbackEvent({ItemCreationApplicationList: itemCreationApplicationList, TotalRecordCount: totalCount}) if $scope.callbackEvent
        ,(err)->
            itemCreationApplicationList[index].isUploading = false
            itemCreationApplicationList[index].attachmentNumber = 0
            $scope.currentResponse.itemCreationApplicationList = angular.copy(itemCreationApplicationList)
            $scope.callbackEvent({ItemCreationApplicationList: itemCreationApplicationList, TotalRecordCount: totalCount}) if $scope.callbackEvent
    
    $scope.currentResponse = {}
    $scope.currentItemUpdateResponse = {}
    
    $scope.isExport = false
    $scope.resultList = []
    
    $scope.queryAPI = ->
        return if common.currentUser.VendorNumber == 0
        requestItem = angular.copy($scope.query)
        if !$scope.dateIsSelected
            delete requestItem.RequestDateFrom
            delete requestItem.RequestDateTo
        else
            if requestItem.RequestDateTo
                requestDateTo = new Date(requestItem.RequestDateTo)
                requestDateTo.setDate(requestDateTo.getDate() + 1)
                requestItem.RequestDateTo = requestDateTo
        if requestItem.RequestStatus == null
            delete requestItem.RequestStatus
        requestItem.action1 = "request"
        requestItem.action2 = "query"
        requestItem.VendorNumber = common.currentUser.VendorNumber
        if !requestItem.SortInfo
            requestItem.SortInfo={SortField:"RequestDate",SortType: "DESC"}
        createPromise = $scope.queryItemCreationRequest(requestItem)
        updatePromise = $scope.queryItemUpdateRequest(requestItem)
        $q.all([createPromise,updatePromise]).then (()->
          if $scope.currentItemUpdateResponse.TotalRecordCount + $scope.currentResponse.TotalRecordCount > 500
            messager.warning($translate('view_query.exceededRecords'))
            $scope.callbackEvent({ItemCreationApplicationList: [], TotalRecordCount: 0}) if $scope.callbackEvent
            $(".k-loading-mask").hide()
            return
          else
            requestItem.PagingInfo.pageSize = 500
            createAgainPromise = $scope.queryItemCreationRequest(requestItem)
            updateAgainPromise = $scope.queryItemUpdateRequest(requestItem)
            $q.all([createAgainPromise,updateAgainPromise]).then (()->
              $scope.resultList = angular.copy($scope.currentResponse.ItemCreationApplicationList )
              $scope.resultList = $scope.resultList.concat($scope.currentItemUpdateResponse.ItemUpdateRequestList)
              $scope.resultList.sort((a,b)->
                re = /-?\d+/
                bm = re.exec(b.RequestDate)
                am = re.exec(a.RequestDate)
                bDate = new Date(parseInt(bm[0]))
                aDate = new Date(parseInt(am[0]))
                return bDate-aDate
              )
              $scope.callbackEvent({ItemCreationApplicationList: $scope.resultList, TotalRecordCount: $scope.resultList.length}) if $scope.callbackEvent
              $(".k-loading-mask").hide()
              $scope.loadAttachments($scope.resultList, $scope.resultList.length,$scope.PageIndex,$scope.PageSize)
            ),(error)->
              $scope.callbackEvent({ItemCreationApplicationList: [], TotalRecordCount: 0}) if $scope.callbackEvent
              $(".k-loading-mask").hide()
        ),(error)->


    $scope.queryItemCreationRequest = (requestItem)->
      $(".k-loading-mask").show()
      defered = $q.defer()
      requestItemCreate = angular.copy(requestItem)
      if requestItemCreate.RequestType == 2
        $scope.currentResponse.ItemCreationApplicationList = []
        $scope.currentResponse.TotalRecordCount = 0
        defered.resolve('')
        return defered.promise
      if requestItemCreate.RequestType == undefined
        requestItemCreate.RequestType = 1
      itemCreationAPI.query requestItemCreate
      ,(response)->
        if response && response.Succeeded
          $scope.currentResponse = angular.copy(response)
          defered.resolve('')
        else
          if(response.Errors && response.Errors.length > 0)
            errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
            messager.error(errorMsg)
            defered.reject('')
      ,(err)->
        if(err && err.data)
          messager.clear()
          messager.error(common.getValidationErrorMsg(err.data))
          defered.reject('')
      
      return defered.promise
      
    $scope.queryItemUpdateRequest = (requestItem)->
      $(".k-loading-mask").show()
      defered = $q.defer()
      requestItemUpdate = angular.copy(requestItem)
      if requestItemUpdate.RequestType == 1
        $scope.currentItemUpdateResponse.ItemUpdateRequestList = []
        $scope.currentItemUpdateResponse.TotalRecordCount = 0
        defered.resolve('')
        return defered.promise
      if requestItemUpdate.RequestType == undefined
        requestItemUpdate.RequestType = 2
      requestItemUpdate.action1 = "request"
      requestItemUpdate.action2 = "query"
      itemUpdateQueryAPI.query requestItemUpdate
      ,(response)->
        if response && response.Succeeded
          $scope.currentItemUpdateResponse = angular.copy(response)
          defered.resolve('')
        else
          if(response.Errors && response.Errors.length > 0)
            errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
            messager.error(errorMsg)
            defered.reject('')
      ,(err)->
        if(err && err.data)
          messager.clear()
          messager.error(common.getValidationErrorMsg(err.data))
          defered.reject('')
      
      return defered.promise
      
    $scope.PageSize = 20
    $scope.PageIndex = 1
    $scope.pageChanged = (p)->
        $scope.PageSize = p.pageSize
        $scope.PageIndex=p.page
        #common.setServerSorting($scope.query, p)
        #$scope.queryAPI()

    $scope.gridData = {
        columns: [
                {
                    field: "RequestID"
                    width: "100px"
                    title: "Request ID"
                    sortfield:"RequestID"
                    headerTemplate: "{{ 'view_query.requestId' | translate  }}"
                    template: kendo.template($("#tpl_itemRequestList_requestId").html())
                }
                {
                    field: "RequestType"
                    width: "100px"
                    title: "Request Type"
                    sortfield:"RequestType"
                    headerTemplate: "{{ 'view_query.requestType' | translate  }}"
                    template: kendo.template($("#tpl_itemRequestList_requestType").html())
                }
                {
                    field: "RequestStatus"
                    width: "100px"
                    title: "Request Status"
                    sortfield:"RequestStatus"
                    headerTemplate: "{{ 'view_query.requestStatus' | translate  }}"
                    template: kendo.template($("#tpl_itemRequestList_requestStatus").html())
                }
                {
                    field: "RequestDate"
                    width: "160px"
                    title: "Request Date"
                    sortfield:"RequestDate"
                    headerTemplate: "{{ 'view_query.requestDate' | translate  }}"
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }
                {
                    field: "CategoryName"
                    width: "100px"
                    title: "Category Name"
                    sortfield:"CategoryName"
                    headerTemplate: "{{ 'view_query.category' | translate  }}"
                    template: kendo.template($("#tpl_itemRequestList_pm").html())
                }
                {
                    field: "ManufacturerName"
                    width: "100px"
                    title: "Brand"
                    sortfield:"ManufacturerName"
                    headerTemplate: "{{ 'view_query.brand' | translate  }}"
                    template: kendo.template($("#tpl_itemRequestList_brand").html())
                }
                {
                    field: "ManufacturerPartNumber"
                    width: "100px"
                    title: "Manufacturer Part Number"
                    sortfield:"ManufacturerPartNumber"
                    headerTemplate: "{{ 'view_query.mfrPartNumber' | translate  }}"
                    template: kendo.template($("#tpl_itemRequestList_manufacturerpartnumber").html())
                }
                {
                    field: "UPCCode"
                    width: "100px"
                    title: "UPC/EAN"
                    sortfield:"UPCCode"
                    headerTemplate: "{{ 'view_query.upc' | translate  }}"
                    template: kendo.template($("#tpl_itemRequestList_upc").html())
                }
                {
                    field: "NeweggItemNumber"
                    width: "100px"
                    title: "Newegg Item #"
                    sortfield:"NeweggItemNumber"
                    headerTemplate: "{{ 'view_query.neweggItemNumebr' | translate  }}"
                    template: kendo.template($("#tpl_itemRequestList_neweggItemNumber").html())
                }
                {
                    title:""
                    width:"120px"
                    sortable:false
                    template:"<button type='button' class='btn btn-xs btn-primary' ng-hide='dataItem.RequestType==2' ng-disabled = 'attachmentButtonDisbabled(dataItem)' ng-click='uploadAttachmentsModal(dataItem)'> \
                    <i class='ace-icon icon-spinner icon-spin white ng-hide' ng-show='dataItem.isUploading'></i>{{ 'view_query.attachment' | translate }} \
                    <span ng-hide='dataItem.isUploading'>({{dataItem.attachmentNumber}})</span></button>"
                }
            ]
    }

    $scope.attachmentButtonDisbabled = (dataItem)->
        return dataItem.isUploading || (dataItem.RequestStatus != 'Pending' and dataItem.attachmentNumber == 0)

    $scope.itemRequestListOptions =
        height:common.getTableHeight(290) + "px"
        columnMenu: false
        checkBoxColumn:false
        dataSource:
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                       options.success d:
                         results: result.ItemCreationApplicationList or []
                         __count: result.TotalRecordCount
                     $scope.pageChanged(options.data)
                     if options.data.isExportAction_All || options.data.isExportAction
                       $scope.isExport = true
                     else
                       $scope.isExport = false
        filterable: false
        sortable:true
        pageable:{
          buttonCount: 5
          pageSizes: [
            5
            10
            20
            100
          ]
          pageSize: 20
          change: (e)-> $scope.loadAttachments($scope.resultList, $scope.resultList.length,e.sender.dataSource._page,e.sender.dataSource._pageSize)
        }
        columns: $scope.gridData.columns
        toolbar: ["excel","excelAll"]

    $scope.closeUploadAttachmentModal = ->
        $scope.uploadAttachmentModal = false

    $scope.uploadAttachmentsModal = (data)->
        $scope.uploadAttachmentModal = true
    
    $scope.search = ->
        $scope.showDetails = false
        $scope.showUpadteDetails = false
        $(".k-loading-mask").show()
        if $scope.query.RequestDateTo && $scope.query.RequestDateFrom
            if $scope.query.RequestDateFrom > $scope.query.RequestDateTo
                messager.error($translate('error.dateLarger'))
                return
        $scope.preparePaging()
        $scope.queryAPI()
        common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)

    $scope.getItemDetails = (item)->
        messager.clear()
        requestItem = {
            action1:"request"
            requestID : item.RequestID
        }
        itemCreationAPI.search requestItem
        ,(response)->
            if(response && response.Succeeded)
                $scope.entity = angular.copy(response.ItemCreationApplication)
                $scope.entity.RequestID = item.RequestID
                $scope.entity.RequestStatus = item.RequestStatus
                $scope.entity.RequestType = $scope.getRequestTypeName(item.RequestType)
                $scope.entity.RequestDate =$filter('date')(new Date(item.RequestDate),'MM/dd/yyyy h:mm:ss a')
                $scope.entity.NeweggItemNumber = item.NeweggItemNumber
                $scope.entity.UnitMeasurement = 0
                $scope.setDimensionWeight(0)
                $scope.setDefaultOriginCountry($scope.AllCountries)
                publisher.publish('vfCategory' + "detail",{Callback:'update',Param:$scope.entity.CategoryID})
                publisher.publish('vdImAttachments',{Callback:'update',Param:$scope.entity.AttachmentList})
                #锚点
                offset = $("#itemRequestDetail").offset()
                $('html, body').animate({
                    scrollTop: offset.top - 40,
                    scrollLeft: offset.left
                })
            else
                errs = []
                if(response.Errors)
                    errs.push(error.Message) for error in response.Errors
                messager.error(errs.join(';'))
        ,(err)->
            if(err && err.data)
                messager.clear()
                messager.error(common.getValidationErrorMsg(err.data))
                
      $scope.updateDetailEntity = { NeweggItemNumber:'' , old: {}, update:{} }
      $scope.updatePropertyList = []
      $scope.getUpdateItemDetails = (item)->
        messager.clear()
        delete $scope.RequestId
        requestItem = {
            action1:"request"
            requestID : item.RequestID
            NeweggItemNumber:item.NeweggItemNumber
        }
        itemUpdateQueryAPI.GetDetail requestItem
        ,(response)->
            if(response && response.Succeeded)
                $scope.updateDetailEntity.old = angular.copy(response.ItemCurrentyDetail)
                $scope.updateDetailEntity.update.ItemUpdateDetail = angular.copy(response.ItemUpdateDetail)
                $scope.updatePropertyList = angular.copy(response.ItemUpdateDetail.ItemProperties)
                $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = []
                $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = angular.copy(response.PropertyComparisonses)
                $scope.entity = angular.copy(response.ItemCreationApplication)
                $scope.updateDetailEntity.update.ItemUpdateDetail.RequestDate =$filter('date')(new Date(item.RequestDate),'MM/dd/yyyy h:mm:ss a')
                $scope.MergerCurrentProperties()
                $scope.RequestId = $scope.updateDetailEntity.update.ItemUpdateDetail.RequestId
                offset = $("#itemUpdateRequestDetail").offset()
                $('html, body').animate({
                    scrollTop: offset.top - 40,
                    scrollLeft: offset.left
                })
            else
                errs = []
                if(response.Errors)
                    errs.push(error.Message) for error in response.Errors
                messager.error(errs.join(';'))
        ,(err)->
            if(err && err.data)
                messager.clear()
                messager.error(common.getValidationErrorMsg(err.data))
    $scope.MergerCurrentProperties = ()->
      if $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties == undefined
        $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = []
      for property in $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties
        property.disable_pp = false
        property.disable_ip = false
        requsetItem = {
          action1: 'property'
          PropertyCode: property.PropertyCode
        }
        ((x1,x2) ->
            getPropertiesDataByAPI(x1,x2)
        )(property,requsetItem)
     
     
    getPropertiesDataByAPI = (entity,requsetItem) ->
      itemUpdateQueryAPI.getPropertyBunch requsetItem
      ,(response)->
        if response && response.Succeeded
          entity.propertyValueList = []
          entity.propertyValueList = angular.copy(response.Properties)
          
    $scope.showItemRequest = (item)->
        $scope.showDetails = false
        $scope.showUpadteDetails = false
        $scope.showDetails = true if item.RequestType == 1
        if item.RequestType == 2
            $scope.showUpadteDetails = true
            $scope.operateType = 'showDetail'
            $scope.getUpdateItemDetails(item)
            return
        $scope.getItemDetails(item)
        
    $scope.getRequestTypeName=(id)->
        result = $filter('filter')( $scope.requestTypeDatas, {value: id})
        if result && result.length > 0
            return result[0].text
        else
            return ''

    $scope.reset = ->
        $scope.dateIsSelected = false
        $scope.query = angular.copy($scope.tempQuery)
        publisher.publish('vfCategory' + "query",{Callback:'clear',Param:undefined})
        $scope.entity = angular.copy({})
        $scope.showDetails = false
        $scope.callbackEvent({ TotalRecordCount:0,ItemCreationApplicationList:[]} ) if $scope.callbackEvent
        $scope.query.RequestType = 1

    #attachment
    $scope.specTabActive = true
    $scope.manualTabActive = false
    $scope.requestEntity = {}
    $scope.isPending = true
    $scope.showAttention = false
    $scope.SIsChanged = false
    $scope.MIsChanged = false
    
    $scope.specTabSelected = ->
        $scope.specTabActive = true
        $scope.manualTabActive = false

    $scope.manualTabSelected = ->
        $scope.specTabActive = false
        $scope.manualTabActive = true

    $scope.SpecList = []
    $scope.ManualList = []

    $scope.closeUploadAttachmentModal = ->
        $scope.uploadAttachmentModal = false

    $scope.getCurrentItemAttachment = (dataItem)->
        requestItem = {
            action1: 'attachment'
            RequestID: dataItem.RequestID
        }
        itemCreationAPI.search requestItem
        ,(response)->
            if response && response.Succeeded
                $scope.SpecList = $filter('filter')(response.AttachmentList, {Type: 'SpecDescription'}, true)
                $scope.ManualList = $filter('filter')(response.AttachmentList, {Type: 'UserManual'}, true)
        ,(error)->
            if(error && error.data)
                messager.clear()
                messager.error(common.getValidationErrorMsg(err.data))
    
    $scope.disableButton =->
        $("#fileInput_spec a").addClass("disabled-achor")
        $("#fileInput_manual a").addClass("disabled-achor")
        common.setCtrlReadOnly($("#uploadAttachmentId")[0], 'button', true, ['modalCancle'])
        common.setCtrlReadOnly($("#uploadAttachmentId")[0], 'input', true, [])
    
    $scope.uploadAttachmentsModal = (data)->
        $scope.uploadAttachmentModal = true
        $scope.specTabActive = true
        $scope.manualTabActive = false
        $scope.isPending = true
        $scope.showAttention = false
        $scope.SIsChanged = false
        $scope.MIsChanged = false
        $scope.SpecList = []
        $scope.ManualList = []
        $scope.requestEntity = angular.copy(data)
        requestItem = {
            action1: 'request'
            RequestID: $scope.requestEntity.RequestID
            RequestStatusOnly: true
        }
        itemCreationAPI.search requestItem
        ,(response)->
            if response && response.Succeeded
                if response.ItemCreationApplication.RequestStatus == 'Pending'
                    $scope.isPending = false
                if response.ItemCreationApplication.RequestStatus == 'Approve' || response.ItemCreationApplication.RequestStatus == 'Decline'
                    $scope.showAttention = true
        ,(error)->
            if(error && error.data)
                messager.clear()
                messager.error(common.getValidationErrorMsg(err.data))
        $scope.getCurrentItemAttachment(data)

    $scope.checkRequestStatus = ()->
        deferred = $q.defer()
        requestItem = {
            action1: 'request'
            RequestID: $scope.requestEntity.RequestID
            RequestStatusOnly: true
        }
        itemCreationAPI.search requestItem
        ,(response)->
            if response && response.Succeeded
                if response.ItemCreationApplication.RequestStatus == 'Pending'
                    deferred.resolve('')
                else
                    deferred.reject('')
        ,(error)->

        return deferred.promise

    $scope.assembleAttachment = (attachmentList)->
        tempAttachmentList = []
        for attachment in attachmentList
            if attachment.ID == undefined
                tempAttachment = {
                    FileName: attachment.DFISFileName
                    Type: attachment.AttachmentType
                }
            else
                tempAttachment = {
                    ID: attachment.ID
                    FileName: attachment.FileName
                    Type: attachment.Type
                }
            tempAttachmentList.push(tempAttachment)
        return tempAttachmentList

    $scope.refreshSignalAttachment = (requestId)->
        itemCreationApplicationList = $scope.currentResponse.ItemCreationApplicationList
        item = $filter('filter')(itemCreationApplicationList, {RequestID: requestId}, true)
        index = itemCreationApplicationList.indexOf(item[0])
        itemCreationApplicationList[index].isUploading = true
        $scope.callbackEvent({ItemCreationApplicationList: itemCreationApplicationList, TotalRecordCount: $scope.currentResponse.TotalRecordCount}) if $scope.callbackEvent
        $scope.attachmentAsyn(index, itemCreationApplicationList, $scope.currentResponse.TotalRecordCount)
    
    $scope.saveAttachments = ->
        requestItem = {
            action1: 'attachment'
            RequestID: $scope.requestEntity.RequestID
        }
        requestItem.AttachmentList = []
        Array.prototype.push.apply(requestItem.AttachmentList, $scope.assembleAttachment($scope.SpecList))
        Array.prototype.push.apply(requestItem.AttachmentList, $scope.assembleAttachment($scope.ManualList))
        $scope.SIsChanged = false
        $scope.MIsChanged = false
        $scope.checkRequestStatus().then(
            (info)->
                itemCreationAPI.attachment requestItem
                ,(response)->
                    if response && response.Succeeded
                        $scope.uploadAttachmentModal = false
                        messager.success($translate('success.saveAttachment'))
                        $scope.refreshSignalAttachment(requestItem.RequestID)
                    else
                        messager.error($translate('error.saveAttachment'))
                        $scope.isPending = true
                        $scope.showAttention = true
                        $scope.SIsChanged = false
                        $scope.MIsChanged = false
                ,(error)->
                    messager.warning("Unknown Exception")
            ,(info)->
                $scope.isPending = true
                $scope.showAttention = true
                $scope.SIsChanged = false
                $scope.MIsChanged = false
            ,()->
        )
])
