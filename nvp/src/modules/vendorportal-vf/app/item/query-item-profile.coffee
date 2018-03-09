angular.module('vf-item-profile',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.productRoadmap.us)
    .translations('zh-cn',resources.vendorportal.productRoadmap.cn)
    .translations('zh-tw',resources.vendorportal.productRoadmap.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/query-item-profile",
      templateUrl: "/modules/vendorportal-vf/app/item/query-item-profile.tpl.html"
      controller: 'ItemProfileCtrl'
])

.controller("ItemProfileCtrl",
["$scope","$filter","$q","messager","common","$translate","itemProfileAPI",
($scope,$filter,$q,messager,common,$translate,itemProfileAPI) ->

  $scope.dataGridName = "itemProfileGrid"
  $scope.refreshKey = "refresh.item-profile"
  $scope.operateType="readonly"
  $scope.query = {}
  $scope.queryBrand = {}
  $scope.showUpadteDetails = false

  $scope.itemStatusList = [
     {text:"All"}
     {text:"Active", value:true}
     {text:"Inactive", value:false}
  ]

  $scope.preparePaging = ->
    $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)

  $scope.search = ->
    if(!$scope.brandControlData || $scope.brandControlData.length == 0)
       console.log("brand data is empty.")
       return
    $scope.showUpadteDetails = false
    if $scope.queryBrand && $scope.queryBrand.Code
       $scope.query.Manufactory = $scope.queryBrand.Code 
    else 
       $scope.query.Manufactory = getAllBrandCode()
    if !$scope.query.Manufactory
       alert("brand data is empty! please contract Administrator.")
       return      
    messager.clear()
    $scope.preparePaging()
    common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)

  getAllBrandCode = ->
    tmp = []
    for item in $scope.brandControlData
        tmp.push(item.Code)
    return tmp.join(" ")

  $scope.queryAPI = ->
    requestItem = angular.copy($scope.query)
    requestItem.action1 = "query"
    if !requestItem.PagingInfo
      requestItem.PagingInfo = $scope.preparePaging()
    requestItem.VendorNumber = common.currentUser.VendorNumber 
    itemProfileAPI.search requestItem, (response)->
            if(response&&response.Succeeded)
              for item in response.ResultValue
                  item.ViewItemStatus = if item.NeweggItemMark == true then "Active" else "Inactive"
              $scope.callbackEvent({ TotalRecordCount:response.ResultCount, Result:response.ResultValue}) if $scope.callbackEvent
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
        field: "ManufacturerName"
        title: "Brand"
        template: '<span title="{{dataItem.ManufacturerName}}">{{dataItem.ManufacturerName}}</span>'
      }
      {
        field: "Item"
        title: "Newegg Item #"
        width: "150px"
        template: kendo.template($("#tpl_itemprofile_newegg").html())
      }
      {
        field: "GroupName"
        title: "Category"
        template: '<span title="{{dataItem.GroupName}}">{{dataItem.GroupName}}</span>'
      }
      {
        field: "ViewItemStatus"
        title: "Item Status"
        width: "90px"
        template: '<span title="{{dataItem.ViewItemStatus}}">{{dataItem.ViewItemStatus}}</span>'
      }
      {
        field: "AdsPartNumber"
        title: "Mfr. Parts#"
        template: '<span title="{{dataItem.AdsPartNumber}}">{{dataItem.AdsPartNumber}}</span>'
      }
      {
        field: "UPCCode"
        title: "UPC/EAN"
        template: '<span title="{{dataItem.UPCCode}}">{{dataItem.UPCCode}}</span>'
      }
      {
        field: "WebDescription"
        title: "Web Description"
        template: '<span title="{{dataItem.WebDescription}}">{{dataItem.WebDescription}}</span>'
      }
     ]
    }

  $scope.itemProfileOptions = 
    height:common.getTableHeight(233) + "px"
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

#***************************edit*********************************
  $scope.detailEntity = {}

  scrollToDetail = () ->
    $('html, body').animate({
      scrollTop: window.innerHeight - 45
    }, 'slow');

  $scope.showDetail = (dataItem)->
    $scope.detailEntity = angular.copy(dataItem)
    $scope.detailEntity.NeweggItemNumber = dataItem.Item
    $scope.showUpadteDetails = true
    scrollToDetail()
    return
 
])