angular.module('vf-item-update',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.itemupdate.us)
    .translations('zh-cn',resources.vendorportal.itemupdate.cn)
    .translations('zh-tw',resources.vendorportal.itemupdate.tw)
])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/create-item-update",
      templateUrl: "/modules/vendorportal-vf/app/item/item-update.tpl.html"
      controller: 'ItemUpdateCtrl'
])

.controller("ItemUpdateCtrl",
["$scope","$filter","$q","messager","common","$translate","itemUpdateAPI","manufacturerAPI"
($scope,$filter,$q,messager,common,$translate,itemUpdateAPI,manufacturerAPI) ->

  $scope.dataGridName = "itemUpdateGrid"
  $scope.refreshKey = "refresh.item-update"

  $scope.query = {}
  $scope.queryBrand = {}
  $scope.operateType = 'updateRequest'
  $scope.showUpadteDetails = false
  $scope.RequestType=2

  $scope.preparePaging = ->
    $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)

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
    
  $scope.search = ->
    $scope.showUpadteDetails = false
    #if $scope.queryBrand != null then $scope.query.BrandCode = $scope.queryBrand.Code else delete $scope.query.BrandCode
    messager.clear()
    $scope.preparePaging()
    common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)

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

  $scope.queryAPI = ->
    requestItem = angular.copy($scope.query)
    requestItem.UploadDateFrom = $scope.toUTC($scope.formatParam($scope.query.UploadDateFrom))
    requestItem.UploadDateTo = $scope.toUTC($scope.formatParam($scope.query.UploadDateTo), true)
    requestItem.action1 = "item"
    requestItem.action2 = "query"
    if !requestItem.PagingInfo
      requestItem.PagingInfo = $scope.preparePaging()
    requestItem.VendorNumber = common.currentUser.VendorNumber 
    $scope.currentQuery = angular.copy(requestItem)
    itemUpdateAPI.queryNeweggItem requestItem, (response)->
            if(response&&response.Succeeded)
              $scope.callbackEvent({ TotalRecordCount:response.TotalRecordCount, Result:response.ItemList}) if $scope.callbackEvent
            else
              $scope.callbackEvent({ TotalRecordCount:0, Result:[]} ) if $scope.callbackEvent 
          ,(error)->
            $scope.callbackEvent({ TotalRecordCount:0, Result:[]} ) if $scope.callbackEvent 

  $scope.pageChanged = (p)->
    $scope.query.PagingInfo.pageSize = p.pageSize
    $scope.query.PagingInfo.startpageindex=p.page-1
    $scope.query.PagingInfo.endpageindex=p.page-1
    common.setServerSorting($scope.query, p)
    $scope.queryAPI()

  $scope.gridData = {
    columns: [
      {
        field: "BrandName"
        title: "Brand"
        width: "180px"
        sortfield: "BrandName"
        template: kendo.template($("#tpl_itemupdate_brand").html())
      }
      {
        field: "NeweggItemNumber"
        title: "Newegg"
        width: "150px"
        sortfield: "NeweggItemNumber"
        template: kendo.template($("#tpl_itemupdate_newegg").html())
      }
      {
        field: "ManufacturePartsNumber"
        title: "Mfr. Parts#"
        sortfield: "ManufacturePartsNumber"
        width: "160px"
      }
      {
        field: "UPCCode"
        title: "UPC/EAN"
        sortfield: "UPCCode"
        width: "160px"
      }
      {
        field: "CategoryName"
        title: "Category Name"
        sortfield: "CategoryName"
        width: "200px"
        sortable:false
      }
      {
        field: "WebDescription"
        title: "Web Description"
        sortfield: "WebDescription"
        template: kendo.template($("#tpl_itemupdate_description").html())
      }
     ]
    }

  $scope.itemUpdateListOptions = 
    height:common.getTableHeight(200) + "px"
    columnMenu: false
    toolbar:["excel"]
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

#***************************edit*********************************
  $scope.detailEntity = {}
  $scope.updateDetailEntity = { NeweggItemNumber:'' , old: {}, update:{} }
  $scope.config = {
    basic:{
      UPCCode : { type: "string", req:false, minlength:8,maxlength:14, pattern: /^(\d{8})$|^(\d{12,14})$/}
      ManufacturerPartNumber : { type:"string", req:false, maxlength:20}
      ItemWebDescription : { type:"string", req:false, maxlength:300}
      BulletDescription : { type:"string", req:false, maxlength:1000}
      UserInputted : { type:"string", req:false, maxlength:2000}
    }
  }

  scrollToDetail = () ->
    $('html, body').animate({
      scrollTop: window.innerHeight - 85
    }, 'slow');

  initDetailControlElement = ()->
    $scope.disable_mfr= false
    $scope.disable_upc= false
    $scope.disable_webDesc= false
    $scope.disable_bulletDesc= false
    $scope.disableApprove = false
    $scope.disableReset = false
    $scope.disableApprove = false
    $scope.disableReset = false
  
  $scope.showDetail = (dataItem)->
    $scope.operateType = 'updateRequest'
    $scope.detailEntity = {}
    #promise1 = $scope.getItemDetail(dataItem)
    promise2 = $scope.getItemProperty(dataItem)
    $q.all([promise2]).then (()->
      console.log $scope.operateType
      $scope.showUpadteDetails = true
      initDetailControlElement()
      scrollToDetail()
    ), (reason) ->
      messager.error reason
      $scope.showUpadteDetails = false
    $scope.updateDetailEntity.NeweggItemNumber = dataItem.NeweggItemNumber
    console.log($scope.updateDetailEntity.ItemNumber)
    return
 
  $scope.getItemDetail = (dataItem)->
    deferred = $q.defer()
    requestItem = {
      action1:'item'
      action2:'product'
      NeweggItemNumber:dataItem.NeweggItemNumber
    }
    itemUpdateAPI.getDetail requestItem
    ,(response)->
      if response && response.Succeeded
        $scope.updateDetailEntity.old=angular.copy(response.ItemProduct)
        $scope.updateDetailEntity.update.ItemUpdateDetail = angular.copy(response.ItemProduct)
        $scope.updateDetailEntity.update.ItemUpdateDetail.VendorNumber = common.currentUser.VendorNumber
        $scope.updateDetailEntity.update.ItemUpdateDetail.RequestUrgencyID = 3
        deferred.resolve('')
      else
        deferred.reject($scope.GetErrorMessage(response))
    ,(error)-> deferred.reject('Server Error')
    
    return deferred.promise
    
  $scope.getItemProperty = (dataItem)->
    deferred = $q.defer()
    requestItem = {
      action1:'item'
      action2:'property'
      NeweggItemNumber:dataItem.NeweggItemNumber
    }
    itemUpdateAPI.getProperty requestItem
    ,(response)->
      if response && response.Succeeded
        promise1 = $scope.getItemDetail(dataItem)
        promise1.then (()->
          $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = []
          $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = angular.copy(response.Properties)
          $scope.MergerCurrentProperties()
          deferred.resolve('')
        ), (reason)-> 
          #messager.error(reason)
          deferred.reject(reason)
      else
        deferred.reject($scope.GetErrorMessage(response))
    ,(error)-> deferred.reject('Server Error')
    
    return deferred.promise
  
  $scope.MergerCurrentProperties = ()->
    if $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties == undefined
      $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = []
    for property in $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties
      property.CurrentUserInputted = property.UserInputted
      property.CurrentValueCode = property.ValueCode
      property.CurrentValueName = property.ValueName
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
      itemUpdateAPI.getPropertyBunch requsetItem
      ,(response)->
        if response && response.Succeeded
          entity.propertyValueList = []
          entity.propertyValueList = angular.copy(response.Properties)
  
  $scope.GetErrorMessage = (response)->
    errorMessage=''
    if response && !response.Succeeded
      if response.Errors && response.Errors.length>0
        angular.forEach( response.Errors,(s,i) -> errorMessage += (s.Message + '\n'))
    return errorMessage
])