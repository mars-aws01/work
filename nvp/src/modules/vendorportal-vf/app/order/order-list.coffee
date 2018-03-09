angular.module('vf-orderlist',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.orderlist.us)
    .translations('zh-cn',resources.vendorportal.orderlist.cn)
    .translations('zh-tw',resources.vendorportal.orderlist.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/orderlist",
      templateUrl: "/modules/vendorportal-vf/app/order/order-list.tpl.html"
      controller: 'OrderListCtrl'
    .when "/orderlist/:vendorNumber/:quickSearchType",
      templateUrl: "/modules/vendorportal-vf/app/order/order-list.tpl.html"
      controller: 'OrderListCtrl'
])

.controller('OrderListCtrl',
["$scope","$rootScope","$location","$window","$routeParams","$filter","uuid","messager","common","printer","order","shipNotice","orderAPI","invoiceAPI","shipNoticeAPI","orderExceptionAPI", "orderAckAPI","$translate","configAPI","$q","orderStatusAPI",
($scope,$rootScope,$location,$window,$routeParams,$filter,uuid,messager,common,printer,order,shipNotice,orderAPI,invoiceAPI,shipNoticeAPI,orderExceptionAPI,orderAckAPI,$translate,configAPI,$q,orderStatusAPI) ->
  
  $scope.dataGridName = "orderListGrid"
  $scope.refreshKey = "refresh.orders"
  $scope.jumpSearchType = $routeParams.quickSearchType
  $scope.jumpVendorNumber = $routeParams.vendorNumber
  $scope.schedule810=0
  $scope.schedule856=0
  $scope.schedule855=0
  $scope.common = common
  
  if($scope.jumpSearchType)
    common.pageInfo.isBackPage=false
    $rootScope.orderList_backDoSearch=false  
    
  $scope.hasFilterRow = ->
    if(!$scope.advancedQuery)
      return false
    if($scope.myOrders||$scope.exceptionalOrders||$scope.advancedQuery.updatedDateFrom||$scope.advancedQuery.updatedDateTo||$scope.advancedQuery.createdDateFrom||$scope.advancedQuery.createdDateTo||$scope.advancedQuery.orderStatus||$scope.advancedQuery.invoiceStatus||$scope.advancedQuery.shipmentStatus||$scope.advancedQuery.OrderProcessUser)
      return true
    return false
   
  $scope.orderStatusList = order.orderStatusList
  $scope.shipmentStatusList = order.shipmentStatusList
  $scope.invoiceStatusList = order.invoiceStatusList

  $scope.advancedkeyList = angular.copy(order.keyList)
  $scope.advancedQuery = angular.copy(order.advancedQuery)
  $scope.advancedSearchTextOutput={} 
  
  if(common.pageInfo.isBackPage == true)
    cacheObj = common.getPageCache()
    if(cacheObj)
      $scope.advancedQuery = angular.copy(cacheObj.query)
      $scope.exceptionalOrders = true if $scope.advancedQuery.isExceptionalOrdersOnly == 'Y'
      $scope.myOrders = true if $scope.advancedQuery.OrderProcessUser
      $scope.advancedSearchTextOutput = angular.copy(cacheObj.key)
    else
      $scope.advancedQuery.PagingInfo = common.getPagging($scope.advancedQuery.PagingInfo) if !$scope.advancedQuery.PagingInfo
      
  $scope.preparePaging = ->
    subHeight2 =  (if $scope.hasFilterRow() == true then 32 else 0)
    if(common.pageInfo.isBackPage == true)
      common.clearBackPage()
    else
      $scope.advancedQuery.PagingInfo = common.getPagging($scope.advancedQuery.PagingInfo)

  $scope.currentQuery = angular.copy(order.advancedQuery)
  $scope.currentSelectedItems = []

  $scope.search = ->
     if($scope.jumpSearchType)
        $rootScope.orderList_backDoSearch=true
        $rootScope.orderList_backUrl=$location.$$path
     else
        $rootScope.orderList_backDoSearch=false
        $rootScope.orderList_backUrl=null   
     $scope.jumpSearchType=null
     messager.clear()
     $scope.preparePaging()
     common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.advancedQuery.PagingInfo)

  $scope.jump = ->
     messager.clear()
     $scope.preparePaging()
     common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.advancedQuery.PagingInfo)
     
  #*****************************Jump from Dashboard Start***********************************
  $scope.getDocumentSchedule=->
    deferred = $q.defer()
    request={action1:"edi-document-schedule",vendorNumber: $scope.jumpVendorNumber}
    configAPI.getDocumentSchedule request
        ,(response)->
            if(response&&response.Succeeded&&response.Settings && response.Settings.length > 0)
                for item in response.Settings
                    if(item.Step=="810")
                        $scope.schedule810=item.Schedule
                    else if(item.Step=="855")      
                        $scope.schedule855=item.Schedule      
                    else if(item.Step=="856")      
                        $scope.schedule856=item.Schedule  
            return deferred.resolve('')                      
        ,(error)->
            return deferred.resolve('')
    
    
  $scope.getPassDueDateRequest=->
    today = new Date()
    preday = new Date(today)
    preday.setDate(today.getDate()-2)
    return preday.toUTCString().replace("UTC","GMT") 
    
  $scope.getMissingDocDateRequest=(hour)->
    today = new Date()
    preday = new Date(today)
    preday.setHours(today.getHours()-hour)
    return preday.toUTCString().replace("UTC","GMT") 
  
  $scope.getRequetBody=->
    if($scope.jumpSearchType=='openorder')
        return {action:'query',VendorNumber:$scope.jumpVendorNumber,Condition:{PropertyName:'OrderStatus',PropertyType:'StringList',LogicalOperator:'In',Value:'New,Processing'},IsExactMatch:'Y',SortInfo:{SortField:'PODate',SortType:'DESC'},PagingInfo:null}    
    if($scope.jumpSearchType=='pastdueorder')
        return {action:'query',VendorNumber:$scope.jumpVendorNumber,Condition:{GroupOperator:'And',Conditions:[{PropertyName:'OrderStatus',PropertyType:'StringList',LogicalOperator:'In',Value:'New,Processing'},{PropertyName:'PODate',PropertyType:'DateTime',LogicalOperator:'LessThan',DateTimeValue:$scope.getPassDueDateRequest()}]},IsExactMatch:'Y',SortInfo:{SortField:'PODate',SortType:'DESC'},PagingInfo:null}
    if($scope.jumpSearchType=='exceptionalorder')
        return {action:'query',VendorNumber:$scope.jumpVendorNumber,Condition:{GroupOperator:'And',Conditions:[{PropertyName:'OrderStatus',PropertyType:'StringList',LogicalOperator:'In',Value:'New,Processing'},{GroupOperator:'Or',Conditions:[{PropertyName:'HasACKException',PropertyType:'Boolean',LogicalOperator:'EqualTo',Value:'true'},{PropertyName:'HasInvoiceException',PropertyType:'Boolean',LogicalOperator:'EqualTo',Value:'true'},{PropertyName:'HasShipmentException',PropertyType:'Boolean',LogicalOperator:'EqualTo',Value:'true'}]}]},IsExactMatch:'Y',SortInfo:{SortField:'PODate',SortType:'DESC'},PagingInfo:null}        
    if($scope.jumpSearchType=='missingacknowledgement')
        return {action:'query',VendorNumber:$scope.jumpVendorNumber,Condition:{GroupOperator:'And',Conditions:[{PropertyName:'OrderStatus',PropertyType:'StringList',LogicalOperator:'In',Value:'New,Processing'},{GroupOperator:'And',Conditions:[{PropertyName:'PODate',PropertyType:'DateTime',LogicalOperator:'LessThan',DateTimeValue:$scope.getMissingDocDateRequest($scope.schedule855)},{GroupOperator:'Or',Conditions:[{PropertyName:'OrderACKStatus',PropertyType:'DBNull',LogicalOperator:'IsNull'},{PropertyName:'OrderACKStatus',PropertyType:'StringList',LogicalOperator:'In',Value:'Unknown,Waiting,Missing'}]}]}]},IsExactMatch:'Y',SortInfo:{SortField:'PODate',SortType:'DESC'},PagingInfo:null}
    if($scope.jumpSearchType=='missingtrackingnumber')
        return {action:'query',VendorNumber:$scope.jumpVendorNumber,Condition:{GroupOperator:'And',Conditions:[{PropertyName:'OrderStatus',PropertyType:'StringList',LogicalOperator:'In',Value:'New,Processing'},{GroupOperator:'And',Conditions:[{PropertyName:'PODate',PropertyType:'DateTime',LogicalOperator:'LessThan',DateTimeValue:$scope.getMissingDocDateRequest($scope.schedule856)},{PropertyName:'ShipmentStatus',PropertyType:'String',LogicalOperator:'EqualTo',Value:'Unshipped'}]}]},IsExactMatch:'Y',SortInfo:{SortField:'PODate',SortType:'DESC'},PagingInfo:null} 
    if($scope.jumpSearchType=='missinginvoice')
        return {action:'query',VendorNumber:$scope.jumpVendorNumber,Condition:{GroupOperator:'And',Conditions:[{PropertyName:'OrderStatus',PropertyType:'StringList',LogicalOperator:'In',Value:'New,Processing'},{GroupOperator:'And',Conditions:[{PropertyName:'PODate',PropertyType:'DateTime',LogicalOperator:'LessThan',DateTimeValue:$scope.getMissingDocDateRequest($scope.schedule810)},{PropertyName:'InvoiceStatus',PropertyType:'String',LogicalOperator:'EqualTo',Value:'Uninvoiced'}]}]},IsExactMatch:'Y',SortInfo:{SortField:'PODate',SortType:'DESC'},PagingInfo:null} 
    if($scope.jumpSearchType=='missingall')
        return {action:'query',VendorNumber:$scope.jumpVendorNumber,Condition:{GroupOperator:'And',Conditions:[{PropertyName:'OrderStatus',PropertyType:'StringList',LogicalOperator:'In',Value:'New,Processing'},{GroupOperator:'And',Conditions:[{PropertyName:'PODate',PropertyType:'DateTime',LogicalOperator:'LessThan',DateTimeValue:$scope.getMissingDocDateRequest($scope.schedule855)},{GroupOperator:'Or',Conditions:[{PropertyName:'OrderACKStatus',PropertyType:'DBNull',LogicalOperator:'IsNull'},{PropertyName:'OrderACKStatus',PropertyType:'StringList',LogicalOperator:'In',Value:'Unknown,Waiting,Missing'}]}]},{GroupOperator:'And',Conditions:[{PropertyName:'PODate',PropertyType:'DateTime',LogicalOperator:'LessThan',DateTimeValue:$scope.getMissingDocDateRequest($scope.schedule856)},{PropertyName:'ShipmentStatus',PropertyType:'String',LogicalOperator:'EqualTo',Value:'Unshipped'}]},{GroupOperator:'And',Conditions:[{PropertyName:'PODate',PropertyType:'DateTime',LogicalOperator:'LessThan',DateTimeValue:$scope.getMissingDocDateRequest($scope.schedule810)},{PropertyName:'InvoiceStatus',PropertyType:'String',LogicalOperator:'EqualTo',Value:'Uninvoiced'}]}]},IsExactMatch:'Y',SortInfo:{SortField:'PODate',SortType:'DESC'},PagingInfo:null}
    else
        return null
        
  $scope.jumpSearchProcess=->
      request = $scope.getRequetBody();
      if(request==null) 
        return
      request.PagingInfo=angular.copy($scope.advancedQuery.PagingInfo)
      $scope.queryAPIJump(request)  
            
  $scope.jumpSearch=->
      if($scope.jumpSearchType=='missingacknowledgement'||$scope.jumpSearchType=='missingtrackingnumber'||$scope.jumpSearchType=='missinginvoice'||$scope.jumpSearchType=='missingall')
        $scope.getDocumentSchedule().$promise.then($scope.jumpSearchProcess)
      else
        $scope.jumpSearchProcess()    
      
  #*****************************Jump from Dashboard End***********************************  
  $scope.convertExactMatch=(query)->
     if(query.ExactMatch == true)
        query.IsExactMatch = 'Y'
     else
        query.IsExactMatch = 'N'

  $scope.advancedSearch = ->
     if($scope.advancedQuery.createdDateFrom && new Date($scope.advancedQuery.createdDateFrom).toString() == 'Invalid Date')
          messager.error($translate('error_orderlist.createdFromDateInvalid'))
          return 
     if($scope.advancedQuery.createdDateTo && new Date($scope.advancedQuery.createdDateTo).toString() == 'Invalid Date')
          messager.error($translate('error_orderlist.createdToDateInvalid'))
          return 
     if($scope.advancedQuery.updatedDateFrom && new Date($scope.advancedQuery.updatedDateFrom).toString() == 'Invalid Date')
          messager.error($translate('error_orderlist.updateFromDateInvalid'))
          return 
     if($scope.advancedQuery.updatedDateTo && new Date($scope.advancedQuery.updatedDateTo).toString() == 'Invalid Date')
          messager.error($translate('error_orderlist.updateToDateInvalid'))
          return 
     common.setQueryFieldFromVdSearchControl($scope.advancedQuery,$scope.advancedSearchTextOutput) 
     $scope.convertExactMatch($scope.advancedQuery)
     if($scope.exceptionalOrders == true)
        $scope.advancedQuery.isExceptionalOrdersOnly = 'Y'
     else
        delete $scope.advancedQuery.isExceptionalOrdersOnly

     if($scope.myOrders == true)
        $scope.advancedQuery.OrderProcessUser = common.currentUser.ID
     else
        delete $scope.advancedQuery.OrderProcessUser 
     if($scope.advancedQuery.PagingInfo.isExportAction_All != true)   
        common.savePageCache($scope.advancedQuery,$scope.advancedSearchTextOutput)
     $scope.executeSearch($scope.advancedQuery)

  $scope.executeSearch = (query) ->
     requestItem = angular.copy(query)
     if(requestItem.createdDateFrom=='')
        delete requestItem.createdDateFrom
     if(requestItem.createdDateTo=='')
        delete requestItem.createdDateTo
     if(requestItem.updatedDateFrom=='')
        delete requestItem.updatedDateFrom
     if(requestItem.updatedDateTo=='')
        delete requestItem.updatedDateTo      
     if(requestItem.createdDateFrom)
        requestItem.createdDateFrom2 = angular.copy(requestItem.createdDateFrom)
        requestItem.createdDateFrom=common.convertToDatetime(requestItem.createdDateFrom,false)
     if(requestItem.createdDateTo)
        requestItem.createdDateTo2 = angular.copy(requestItem.createdDateTo)
        requestItem.createdDateTo=common.convertToDatetime(requestItem.createdDateTo,true)
     if(requestItem.updatedDateFrom)
        requestItem.updatedDateFrom2 = angular.copy(requestItem.updatedDateFrom)
        requestItem.updatedDateFrom=common.convertToDatetime(requestItem.updatedDateFrom,false)
     if(requestItem.updatedDateTo)
        requestItem.updatedDateTo2 = angular.copy(requestItem.updatedDateTo)
        requestItem.updatedDateTo=common.convertToDatetime(requestItem.updatedDateTo,true)
     $scope.queryAPI(requestItem)
     
  $scope.queryAPIJump = (requestItem) ->
     requestItem.action = "query"
     if(!requestItem.PagingInfo)
       requestItem.PagingInfo = $scope.preparePaging()
     requestItem.vendorNumber = common.currentUser.VendorNumber
     requestItem = common.getRequestQuery(requestItem,$scope) 
     response = orderAPI.search requestItem,
       ->
          if(response&&response.Succeeded)
             for item in response.PurchaseOrderList
                item.PODateForExport=common.convertToLocalTime(item.PODate,'MM/DD/YYYY h:mm:ss A') 
             $scope.data = response.PurchaseOrderList
             $scope.currentSelectedItems = []
             $scope.callbackEvent(response) if $scope.callbackEvent  
             
  $scope.queryAPI = (requestItem) ->
     requestItem.action = "query"
     if(!requestItem.PagingInfo)
       requestItem.PagingInfo = $scope.preparePaging()
     requestItem.vendorNumber = common.currentUser.VendorNumber
     requestItem = common.getRequestQuery(requestItem,$scope) 
     response = orderAPI.search requestItem,
       ->
          if(response&&response.Succeeded) 
             for item in response.PurchaseOrderList
                item.PODateForExport=common.convertToLocalTime(item.PODate,'MM/DD/YYYY h:mm:ss A')
             $scope.data = response.PurchaseOrderList
             $scope.currentSelectedItems = []
             $scope.callbackEvent(response) if $scope.callbackEvent  
       ,(error) ->
          $scope.callbackEventError(error) if $scope.callbackEventError 
        
  if($scope.jumpVendorNumber)  
     common.currentUser.VendorNumber=$scope.jumpVendorNumber
     if(common.currentUser.agentVendor.hasSelected==false)
        common.currentUser.agentVendor.hasSelected=true
  if(common.currentUser.VendorNumber != '0')
     if($scope.jumpVendorNumber)  
        $scope.jump()
     else
        $scope.search()    
    
  $scope.removeQueryFiled = (filedName) ->
    if(filedName == 'all')
      delete $scope.advancedQuery['orderStatus']
      delete $scope.advancedQuery['invoiceStatus']
      delete $scope.advancedQuery['shipmentStatus']
      delete $scope.advancedQuery['createdDateFrom']
      delete $scope.advancedQuery['createdDateTo']
      delete $scope.advancedQuery['updatedDateFrom']
      delete $scope.advancedQuery['updatedDateTo']
      $scope.exceptionalOrders = false
      $scope.myOrders = false
    else if(filedName == 'exceptionalOrders')
      $scope.exceptionalOrders = false
    else if(filedName == 'myOrders')
      $scope.myOrders = false
    else
      delete $scope.advancedQuery[filedName]
    $scope.search()

  $scope.getSelectedItems = ->
    dataList = $("#"+$scope.dataGridName+"").data("kendoGrid").dataSource.data()
    result = []
    for order in dataList
      if(order.selected == true)
        result.push(angular.copy(order))
    return result
  #******************** confirm / void order(s) ********************
  $scope.confirmOrder = (currentOrder) ->
    $scope.currentOrderList=[]
    tmpOrder = {
      vendorNumber: common.currentUser.VendorNumber
      poNumber: currentOrder.PONumber
      orderACKCode: "A"
    }
    $scope.currentOrderList.push(tmpOrder)
    common.confirmBox $translate('confirm_orderlist.confirmOrder'),"", ->
       $scope.orderAction($scope.currentOrderList,"confirm")

  $scope.cancelOrder = (currentOrder) ->
    $scope.currentOrderList=[]
    tmpOrder = {
      vendorNumber: common.currentUser.VendorNumber
      poNumber: currentOrder.PONumber
      orderACKCode: "R"
    }
    $scope.currentOrderList.push(tmpOrder)
    if(currentOrder.ShipmentStatus == 'PartialShipped' || currentOrder.ShipmentStatus == 'Shipped' || currentOrder.InvoiceStatus == 'PartialInvoiced' || currentOrder.InvoiceStatus == 'Invoiced')
      common.confirmBox $translate('confirm_orderlist.cancelShippedOrder'),"", ->
         $scope.orderAction($scope.currentOrderList,"cancel")
    else
      common.confirmBox $translate('confirm_orderlist.cancelOrder'),"", ->
         $scope.orderAction($scope.currentOrderList,"cancel")

  $scope.orderAction = (currentOrderList,action) ->
    requestItem = {
      OrderList  : currentOrderList 
      RequestInfo : {
        systemSource: "VendorPortal"
        userID: common.currentUser.ID
        requestGUID: uuid.newguid()
        requestTimeUtc: new Date()
      }
    }
    response = orderAckAPI.update requestItem,
       ->
         if(response&&response.Succeeded)  
           if (action == "confirm")      
             messager.success($translate('success_orderlist.confirmOrder'))
           if (action == "cancel")      
             messager.success($translate('success_orderlist.cancelOrder'))
           #$scope.queryAPI($scope.currentQuery)
           common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.advancedQuery.PagingInfo)
         else
           if(response.Errors && response.Errors.length>0)           
             if (action == "confirm")     
               messager.error($translate('error_orderlist.confirmOrder')+common.getLocalizedErrorMsg(response.Errors[0]))
             if (action == "cancel")       
               messager.error($translate('error_orderlist.cancelOrder')+common.getLocalizedErrorMsg(response.Errors[0]))

  $scope.confirmOrderList = -> 
     $scope.currentSelectedItems = $scope.getSelectedItems()
     for index of $scope.currentSelectedItems
       if ($scope.currentSelectedItems[index].OrderStatus == "Completed" ||$scope.currentSelectedItems[index].OrderStatus == "Canceled")
         messager.warning($translate('warning_orderlist.statusInvalidConfirm'))
         return 
     $scope.buildOrderList("A")
     messager.clear()
     if(!$scope.currentSelectedItems || $scope.currentSelectedItems.length == 0)
        messager.warning($translate('warning_orderlist.invalidOrderConfirm'))
        return 
     common.confirmBox $translate('confirm_orderlist.confirmOrderConfirm'),"", ->
         $scope.orderAction($scope.currentOrderList,"confirm") 

  $scope.cancelOrderList = ->
     hasShippedShippedOrderItem = false
     $scope.currentSelectedItems = $scope.getSelectedItems()
     for index of $scope.currentSelectedItems
       if ($scope.currentSelectedItems[index].OrderStatus == "Completed" ||$scope.currentSelectedItems[index].OrderStatus == "Canceled")
         messager.warning($translate('warning_orderlist.statusInvalidCancel'))
         return 
       if($scope.currentSelectedItems[index].ShipmentStatus == 'PartialShipped' || $scope.currentSelectedItems[index].ShipmentStatus == 'Shipped' || $scope.currentSelectedItems[index].InvoiceStatus == 'PartialInvoiced' || $scope.currentSelectedItems[index].InvoiceStatus == 'Invoiced')
         hasShippedShippedOrderItem = true

     $scope.buildOrderList("R")
     messager.clear()
     if(!$scope.currentSelectedItems || $scope.currentSelectedItems.length == 0)
        messager.warning($translate('warning_orderlist.invalidOrderCancel'))
        return 
     if(hasShippedShippedOrderItem == true)
       common.confirmBox $translate('confirm_orderlist.cancelShippedOrder'),"", ->
          $scope.orderAction($scope.currentOrderList,"cancel") 
     else
       common.confirmBox $translate('confirm_orderlist.cancelOrderConfirm'),"", ->
          $scope.orderAction($scope.currentOrderList,"cancel") 

  $scope.buildOrderList = (AckCode) ->
    $scope.currentSelectedItems = $scope.getSelectedItems()
    $scope.currentOrderList=[]
    for index of $scope.currentSelectedItems 
        tmpOrder = {
          vendorNumber: common.currentUser.VendorNumber
          poNumber: $scope.currentSelectedItems[index].PONumber
          orderACKCode: AckCode
        }
        $scope.currentOrderList.push(tmpOrder)
    
    
  #********************Print Package slip ********************
  $scope.print = ->
    messager.clear()
    $scope.currentSelectedItems = $scope.getSelectedItems()
    if(!$scope.currentSelectedItems || $scope.currentSelectedItems.length == 0)
        messager.warning($translate('warning_orderlist.noItemForPrinting'))
        return
    poNumbers = []
    hasCanceledRejectedOrder = false
    hasCanceledOrderCount = 0
    angular.forEach($scope.currentSelectedItems, (p,i) -> 
       if(p.OrderStatus != 'Canceled') 
          poNumbers.push(p.PONumber)
       else
          hasCanceledRejectedOrder = true
          hasCanceledOrderCount++
       if(p.OrderACKStatus == 'Reject')
          hasCanceledRejectedOrder = true
    )
    if(hasCanceledOrderCount == $scope.currentSelectedItems.length)
      messager.warning($translate('warning_orderlist.noPackageForPriting'))
      return
    if(hasCanceledRejectedOrder == true)
      common.confirmBox $translate('confirm_orderlist.printConfirm'),"", ->
        shipNotice.printPackageList(common.currentUser.VendorNumber,poNumbers)  
    else
      shipNotice.printPackageList(common.currentUser.VendorNumber,poNumbers)

  #******************** Refresh ********************
  $scope.refresh = ->
    messager.clear()
    requestItem = {
      vendorNumber: common.currentUser.VendorNumber
      dateRange: 30
    }
    response = orderStatusAPI.refreshStatus requestItem,
       ->
         if(response&&response.Succeeded)
            messager.success($translate('success_orderlist.refreshOrder'))
            #$scope.search()
         else
            messager.error($translate('error_orderlist.refreshOrder'))
               
  #******************** Show Item List ********************
  $scope.showItemList = (currentOrder, isReload) ->
    if(!currentOrder && !isReload)
      return
    if(!currentOrder.itemList || isReload)
      requestItem = {
        action: "item"
        vendorNumber: common.currentUser.VendorNumber
        poNumber: currentOrder.PONumber
      }
      response = orderAPI.getItems requestItem,
       ->
          if(response&&response.Succeeded)        
             currentOrder.itemList = response.ItemList
             totalPrice = 0
             for item in currentOrder.itemList
                if(item.ItemACKStatus=='None')
                    item.ItemACKStatus=''    
                totalPrice += item.Quantity * item.UnitPrice
             currentOrder.itemTotalPrice = totalPrice
             $scope.detailCallbackEvent(currentOrder.itemList) if $scope.detailCallbackEvent 

  #*****************************New Data Grid***********************************

  $scope.pageChanged = (p)->
    return if common.currentUser.VendorNumber == "0"
    $scope.advancedQuery.PagingInfo.isExportAction = p.isExportAction
    $scope.advancedQuery.PagingInfo.isExportAction_All = p.isExportAction_All 
    $scope.advancedQuery.PagingInfo.pageSize = p.pageSize
    $scope.advancedQuery.PagingInfo.startpageindex=p.page-1
    $scope.advancedQuery.PagingInfo.endpageindex=p.page-1
    common.setServerSorting($scope.advancedQuery, p)
    if $scope.jumpSearchType
        $scope.jumpSearch() 
    else
        $scope.advancedSearch() 
  
  $scope.orderListOptions =
    height:common.getTableHeight(120) + "px"
    checkBoxColumn:true
    columnMenu: false
    toolbar: ["excel","excelAll"]
    dataSource: 
        type: "odata"
        transport:
            read: (options) ->
                 $scope.callbackEvent = (result) ->
                        options.success d:
                              results: result.PurchaseOrderList or []
                              __count: result.TotalRecordCount 
                 common.queryCallbackEventError($scope,options)
                 $scope.pageChanged(options.data)   
        serverPaging: true
        serverSorting: true
    detailInit: (e) ->
            kendo.ui.progress(e.sender.element, false)
    filterable: true
    columns: [
                {
                    title: "{{ 'header_orderlist.action' | translate  }}"
                    width: "85px"
                    template: kendo.template($("#tpl_orderList_action").html())
                }
                {
                    field: "OrderStatus"
                    title: "Order Status"
                    headerTemplate:"{{ 'header_orderlist.orderStatus' | translate }}"
                    width: "120px"
                    template: kendo.template($("#tpl_orderList_orderStatus").html())
                }
                {
                    field: "ShipmentStatus"
                    title: "Shipment Status"
                    headerTemplate: "{{ 'header_orderlist.shipmentStatus' | translate }}"
                    width: "140px"
                    template: kendo.template($("#tpl_orderList_shipmentStatus").html())
                }
                {
                    field: "InvoiceStatus"
                    title: "Invoice Status"
                    headerTemplate: "{{ 'header_orderlist.invoiceStatus' | translate }}"
                    width: "130px"
                    template: kendo.template($("#tpl_orderList_invoiceStatus").html())
                }
                {
                    field: "PONumber"
                    width: "140px"
                    title: "PO Number"
                    headerTemplate: "{{ 'header_orderlist.poNumber' | translate }}",
                    template: kendo.template($("#tpl_orderList_poNumber").html())
                }
                {
                    field: "PODateForExport"
                    title: "PO Date"
                    sortfield: "PODate",
                    headerTemplate: "{{ 'header_orderlist.poDate' | translate }}",
                    width: "160px"
                   # template: kendo.template($("#tpl_orderList_poDate").html())
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }
                {
                    field: "ShipFrom.VendorWarehouseNumber"
                    title: "Ship From"
                    sortfield: "VendorWarehouseNumber",
                    headerTemplate: "{{ 'header_orderlist.shipFrom' | translate }}",
                    width: "100px"
                    template: "<div> {{ dataItem.ShipFrom.VendorWarehouseNumber }} </div>"
                }
                {
                    field: "ShipService"
                    title: "Expected Ship Service"
                    sortfield: "ShipService",
                    headerTemplate: "{{ 'header_orderlist.expectedShipService' | translate }}",
                    template: "<div> {{ dataItem.ShipService }} </div>"
                }
             ]
             

  $scope.orderDetailOptions = (parentDataItem) ->
      dataSource: 
        type: "odata"
        transport:
            read: (options) ->
                 $scope.detailCallbackEvent = (result) ->
                        options.success d:
                              results: result or []
                 $scope.showItemList(parentDataItem) 
        serverPaging: true
      pageable: false
      sortable: true
      scrollable: false
      resizable: true
      otherDetailTemplate: "<div class='pull-left underline' ng-click='showItemList(dataItem,true)' style='margin: 5px 0;cursor:pointer'>Refresh</div><div class='pull-right' ng-show='dataItem.itemTotalPrice' style='margin: 5px 0;'> <span class='grid-blue' style='font-weight: bold'>{{ 'header_orderlist.subTotal' | translate }} <vd-profile-label type=\"{{ 'CurrencyCode' }}\"></vd-profile-label>:&nbsp;&nbsp;{{ dataItem.itemTotalPrice | currency:'':2 }}</span></div>"
      columns: [
        {
          field: "VendorPartNumber"
          headerTemplate: "{{ 'header_orderlist.vendorPartNumber' | translate }}"
          sortable: false
        }
        {
          field: "Description"
          headerTemplate: "{{ 'header_orderdetail.description' | translate  }}"
          sortable: false
        }
        {
          field: "ItemACKStatus"
          headerTemplate: "{{ 'header_orderdetail.ackStatus' | translate  }}"
          sortable: false
        }
        {
          field: "Quantity"
          headerTemplate: "{{ 'header_orderlist.quantity' | translate }}"
          template:"<div class='text-right'>{{dataItem.Quantity}}</div>"
          width: "90px"
          sortable: false
        }
        {
          field: "UnitPrice"
          headerTemplate: "<div>{{ 'header_orderlist.unitPrice' | translate }}<vd-profile-label type=\"{{ 'CurrencyCode' }}\"></vd-profile-label></div>"
          template:"<div class='text-right'>{{dataItem.UnitPrice | currency:'':2}}</div>"
          width: "90px"
          sortable: false
        }
        {
          field: "lineTotal"
          headerTemplate: "<div>{{ 'header_orderlist.lineTotal' | translate }}<vd-profile-label type=\"{{ 'CurrencyCode' }}\"></vd-profile-label></div>"
          template:"<div class='text-right'>{{dataItem.UnitPrice * dataItem.Quantity  | currency:'':2}}</div>"
          width: "110px"
          sortable: false
        }
      ] 
      
                                                                                       
])