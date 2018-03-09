angular.module('vf-product-roadmap',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.productRoadmap.us)
    .translations('zh-cn',resources.vendorportal.productRoadmap.cn)
    .translations('zh-tw',resources.vendorportal.productRoadmap.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/product-roadmap",
      templateUrl: "/modules/vendorportal-vf/app/item/product-roadmap.tpl.html"
      controller: 'UploadRoadmapCtrl'
])

.controller("UploadRoadmapCtrl",
["$scope","$filter","$q","messager","common","$translate","productRoadmapAPI",
($scope,$filter,$q,messager,common,$translate,productRoadmapAPI) ->
  
  $scope.config = {
    SpecFile:{
      MaxSize:10
      MaxCount:10
      Type:'VendorPortal'
      Group:'EDI'
      Rejects:["exe","bat","com"]
      FileNamePatternTip:"Please choose a valid file. For example: pdf,doc,docx,xls,xlsx,ppt,pptx,jpg,txt. "
    }
  }
  
  $scope.dataGridName = "roadmapGrid"
  $scope.refreshKey = "refresh.upload-roadmap"
  $scope.queryCategory = {}
  $scope.queryBrand = {}

  $scope.query = {}
  $scope.initDateRange = ->
    toDate = new Date()
    fromDate = new Date().setFullYear(toDate.getFullYear()-1)
    $scope.query.UploadDateFrom = new moment(fromDate).format('YYYY-MM-DD')
    $scope.query.UploadDateTo = new moment(toDate).format('YYYY-MM-DD')
  
  $scope.initDateRange()

  $scope.prepareSorting = ->
    if !$scope.query.SortInfo
      $scope.query.SortInfo = {
          SortField: 'InDate'
          SortType: 'desc'
      }

  $scope.preparePaging = ->
    $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)

  $scope.checkSearchForm = ->
    if($scope.query.UploadDateFrom && new Date($scope.query.UploadDateFrom).toString() == 'Invalid Date')
      messager.warning($translate('error.invalidDate'))
      return false
    if($scope.query.UploadDateTo && new Date($scope.query.UploadDateTo).toString() == 'Invalid Date')
      messager.warning($translate('error.invalidDate'))
      return false
    if $scope.query.UploadDateTo && $scope.query.UploadDateFrom && $scope.query.UploadDateFrom > $scope.query.UploadDateTo
      messager.warning($translate('error.startDatebigger'))
      return false
    return true

  $scope.formatParam = (p)->
    if p is ''
      return null
    else
      return p

  $scope.toUTC = (dateString, needAddOneDay)->
    tempDate
    ymd
    if dateString == null || dateString == '' || dateString == undefined
      return dateString
    ymd = new moment(dateString).format('MM/DD/YYYY')
    tempDate = new Date(ymd)
    if needAddOneDay
      tempDate = new Date(tempDate.setDate(tempDate.getDate() + 1))
    return tempDate.toUTCString().replace("UTC", "GMT")

  $scope.search = ->
    if !$scope.checkSearchForm()
      return
    if $scope.queryBrand != null
      $scope.query.BrandCode = $scope.queryBrand.Code
    else
      delete $scope.query.BrandCode
    if $scope.queryCategory != null
      $scope.query.CategoryCode = $scope.queryCategory.Code
    else
      delete $scope.query.CategoryCode
    if $scope.lastVendorNumber && $scope.lastVendorNumber != common.currentUser.VendorNumber
      delete $scope.query.CategoryCode
      delete $scope.query.BrandCode
    $scope.lastVendorNumber = angular.copy(common.currentUser.VendorNumber)
    messager.clear()
    $scope.preparePaging()
    common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)

  $scope.queryAPI = ->
    requestItem = angular.copy($scope.query)
    requestItem.UploadDateFrom = $scope.toUTC($scope.formatParam($scope.query.UploadDateFrom))
    requestItem.UploadDateTo = $scope.toUTC($scope.formatParam($scope.query.UploadDateTo), true)
    requestItem.action = "query"
    if !requestItem.PagingInfo
      requestItem.PagingInfo = $scope.preparePaging()
    requestItem.VendorNumber = common.currentUser.VendorNumber 
    $scope.currentQuery = angular.copy(requestItem)
    productRoadmapAPI.query requestItem, (response)->
            if(response&&response.Succeeded)
              $scope.callbackEvent({ TotalRecordCount:response.TotalRecordCount, Result:response.VendorRoadmapList}) if $scope.callbackEvent
            else
              $scope.callbackEvent({ TotalRecordCount:0, Result:[]} ) if $scope.callbackEvent 
          ,(error)->
            $scope.callbackEvent({ TotalRecordCount:0, Result:[]} ) if $scope.callbackEvent 

  $scope.pageChanged = (p)->
    $scope.query.PagingInfo.pageSize = p.pageSize
    $scope.query.PagingInfo.startpageindex=p.page-1
    $scope.query.PagingInfo.endpageindex=p.page-1
    common.setServerSorting($scope.query, p)
    $scope.prepareSorting()
    $scope.queryAPI()

  $scope.gridData = {
    columns: [
      {
        title:"Action"
        headerTemplate:"{{ 'view_list.action' | translate  }}"
        template:kendo.template($("#tpl_roadmap_action").html())
        sortable:false
        width:70
      }
      {
        field: "CategoryDescription"
        title: "Brand"
        headerTemplate: "{{ 'roadmap_common.category' | translate  }}"
        template: kendo.template($("#tpl_roadmap_category").html())
        sortable: false
      }
      {
        field: "BrandDescription"
        title: "Category"
        headerTemplate: "{{ 'roadmap_common.brand' | translate  }}"
        template: kendo.template($("#tpl_roadmap_brand").html())
        sortable: false
      }
      {
        field: "Description"
        title: "Description"
        sortfield:"Description"
        headerTemplate: "{{ 'roadmap_common.description' | translate  }}"
        template: kendo.template($("#tpl_roadmap_description").html())
        sortable: true
      }
      {
        field: "InDate"
        title: "Upload Date"
        sortfield:"InDate"
        headerTemplate: "{{ 'roadmap_common.upload_date' | translate  }}"
        #type: 'date'
        #format: "{0:MM/dd/yyyy h:mm:ss tt}"
        #template: '#= kendo.toString(new Date(InDate).toLocaleString(), "MM/dd/yyyy hh:mm:ss") #'
        format2: 'MM/DD/YYYY hh:mm:ss A'
        template: '<span>{{dataItem.InDate | moment:"MM/DD/YYYY hh:mm:ss A"}}</span>'
      }]
    }

  $scope.roadmapListOptions = 
    height:common.getTableHeight(205) + "px"
    checkBoxColumn:false
    columnMenu: false
    toolbar:["excel","excelAll"]
    dataSource:
      type: "odata"
      transport:
        read: (options) ->
          $scope.callbackEvent = (result) ->
            options.success d:
              results: result.Result or []
              __count: result.TotalRecordCount
          $scope.pageChanged(options.data)
      serverPaging: true
      serverSorting: true
    filterable: false
    columns: $scope.gridData.columns
  
  $scope.getSpecList = (specList)->
    resultSpeclist = []
    if !specList || specList.length == 0
      return resultSpeclist
    for item in specList
      tempFile = {}
      tempFile.FileName = item.FileName
      tempFile.FileDownloadUrl = item.DownloadUrl
      resultSpeclist.push(tempFile)
    return resultSpeclist

  $scope.setSpecList = (rspSpecList, specList)->
    return if !rspSpecList instanceof Array
    return if !specList instanceof Array
    if !rspSpecList || rspSpecList.length == 0
      return
    for item in rspSpecList
      tempFile = {}
      tempFile.FileName = item.FileName
      tempFile.DownloadUrl = item.FileDownloadUrl
      specList.push(tempFile)
    
  
  #Add
  $scope.addRoadmapModal = false
  $scope.newRoadmapEntity = {}
  $scope.addCategory = null
  $scope.addBrand = null
  $scope.add = ->
    $scope.addRoadmapModal = true
    $scope.newRoadmapEntity = {}
    $scope.SpecAddList = []
    $scope.addCategory = null
    $scope.addBrand = null

  $scope.closeAddRoadmapModal = ->
    $scope.addRoadmapModal = false

  $scope.SpecAddList = []

  $scope.checAddkForm = ->
    #console.log($scope.addRoadmapForm.$error)
    if $scope.addCategory == null
      messager.warning($translate('error.validCategory'))
      return false
    if $scope.addBrand == null
      messager.warning($translate('error.validBrand'))
      return false
    if $scope.newRoadmapEntity.VendorRoadmap == undefined
      $scope.newRoadmapEntity.VendorRoadmap = { Description:'' }
    else
      if $scope.newRoadmapEntity.VendorRoadmap.Description == undefined
        $scope.newRoadmapEntity.VendorRoadmap.Description = ''
    if !$scope.addRoadmapForm.$valid
      return false
    if !document.getElementsByName("addRoadmapForm")[0].checkValidity()
      return false
    return true

  $scope.getNewRoadmapEntity = ->
    $scope.newRoadmapEntity.VendorRoadmap.RoadmapFileList = $scope.getSpecList($scope.SpecAddList)
    $scope.newRoadmapEntity.VendorRoadmap.CategoryCode = $scope.addCategory.Code
    $scope.newRoadmapEntity.VendorRoadmap.CategoryDescription = $scope.addCategory.Description
    $scope.newRoadmapEntity.VendorRoadmap.BrandCode = $scope.addBrand.Code
    $scope.newRoadmapEntity.VendorRoadmap.BrandDescription = $scope.addBrand.Description
    $scope.newRoadmapEntity.VendorRoadmap.VendorNumber = common.currentUser.VendorNumber
    $scope.newRoadmapEntity.VendorRoadmap.VendorName = common.currentUser.VendorName

  $scope.addRoadmap = ->
    if !$scope.checAddkForm()
      return
    $scope.getNewRoadmapEntity()
    requestItem = angular.copy($scope.newRoadmapEntity)
    requestItem.RequestUser = common.currentUser.ID

    productRoadmapAPI.add requestItem, (response)->
            if(response&&response.Succeeded)
              $scope.addRoadmapModal = false
              $scope.search()
              messager.success($translate('success.addSuccess'))
            else
               if response&&!response.Succeeded
                 messager.error(response.Errors[0].Message)
               else
                 messager.error($translate('error.addFailed'))
          ,(error)->
            messager.error($translate('error.addFailed'))
  
  #Edit
  $scope.currentRoadmapEntity = {}
  $scope.editCategory = null
  $scope.editBrand = null
  $scope.editRoadmapModal = false
  $scope.SpecEditList = []

  $scope.edit = (dataItem)->
    $scope.SpecEditList = []
    $scope.editRoadmapModal = true
    $scope.currentRoadmapEntity = {}
    requestItem = {}
    requestItem.id = dataItem.ID
    productRoadmapAPI.get requestItem, (response)->
            if(response&&response.Succeeded)
              brandItem = {}
              categoryItem = {}
              $scope.currentRoadmapEntity = angular.copy(response)
              categoryItem.Code = response.VendorRoadmap.CategoryCode
              categoryItem.Description = response.VendorRoadmap.CategoryDescription
              brandItem.Code = response.VendorRoadmap.BrandCode
              brandItem.Description = response.VendorRoadmap.BrandDescription
              $scope.editBrand = angular.copy(brandItem)
              $scope.editCategory = angular.copy(categoryItem)
              $scope.setSpecList(response.VendorRoadmap.RoadmapFileList, $scope.SpecEditList)
            else
              messager.error($translate('error.getFailed'))
          ,(error)->
            messager.error($translate('error.getFailed'))
  
  $scope.closeEditRoadmapModal = ->
    $scope.editRoadmapModal = false

  $scope.checEditkForm = ->
    if $scope.currentRoadmapEntity.VendorRoadmap.Description == undefined
      $scope.currentRoadmapEntity.VendorRoadmap.Description = ''
    if $scope.editCategory == null
      messager.warning($translate('error.validCategory'))
      return false
    if $scope.editBrand == null
      messager.warning($translate('error.validBrand'))
      return false
    if !$scope.editRoadmapForm.$valid
      return false
    if !document.getElementsByName("editRoadmapForm")[0].checkValidity()
      return false
    return true

  $scope.getEditRoadmapEntity = ->
    $scope.currentRoadmapEntity.VendorRoadmap.RoadmapFileList = $scope.getSpecList($scope.SpecEditList)
    $scope.currentRoadmapEntity.VendorRoadmap.CategoryCode = $scope.editCategory.Code
    $scope.currentRoadmapEntity.VendorRoadmap.CategoryDescription = $scope.editCategory.Description
    $scope.currentRoadmapEntity.VendorRoadmap.BrandCode = $scope.editBrand.Code
    $scope.currentRoadmapEntity.VendorRoadmap.BrandDescription = $scope.editBrand.Description
    $scope.currentRoadmapEntity.VendorRoadmap.VendorNumber = common.currentUser.VendorNumber
    $scope.currentRoadmapEntity.VendorRoadmap.VendorName = common.currentUser.VendorName

  $scope.updateRoadmap = ->
    if !$scope.checEditkForm()
      return
    $scope.getEditRoadmapEntity()
    requestItem = angular.copy($scope.currentRoadmapEntity)
    requestItem.RequestUser = common.currentUser.ID
    productRoadmapAPI.update requestItem, (response)->
            if(response&&response.Succeeded)
              $scope.editRoadmapModal = false
              $scope.queryAPI()
              messager.success($translate('success.editSuccess'))
            else
              if response&&!response.Succeeded
                 messager.error(response.Errors[0].Message)
              else
                 messager.error($translate('error.editFailed'))
        ,(error)->
            messager.error($translate('error.editFailed'))

  $scope.deleteItem = (dataItem)->
    requestItem = {}
    requestItem.id = dataItem.ID
    common.confirmBox $translate('notice.deleteConfirm'),"", ->
            productRoadmapAPI.remove requestItem, (response)->
                if(response&&response.Succeeded)
                    $scope.search()
                    messager.success($translate('success.deleteSucess'))
                else
                    messager.error($translate('error.deleteFailed'))
            ,(error)->
                messager.error($translate('error.deleteFailed'))
        ,(error)->
    return
])