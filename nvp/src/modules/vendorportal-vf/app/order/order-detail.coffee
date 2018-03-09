angular.module('vf-orderdetail',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.orderdetail.us)
    .translations('zh-cn',resources.vendorportal.orderdetail.cn)
    .translations('zh-tw',resources.vendorportal.orderdetail.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/orderdetail/:poNumber/:vendorNumber",
      templateUrl: "/modules/vendorportal-vf/app/order/order-detail.tpl.html"
      controller: 'OrderDetailCtrl'
    .when "/orderdetail/:poNumber/:vendorNumber/:option",
      templateUrl: "/modules/vendorportal-vf/app/order/order-detail.tpl.html"
      controller: 'OrderDetailCtrl'
])

.controller('OrderDetailCtrl',
["$scope","$window","$routeParams","messager","common","order","orderAPI","orderAckAPI","uuid","warehouseAPI","$translate"
($scope,$window,$routeParams,messager,common,order,orderAPI,orderAckAPI,uuid,warehouseAPI,$translate) ->
  if(!$routeParams.poNumber)
    message.error($translate('error_orderdetail.poNumberEmpty'))
    return
    
  $scope.dataGridHeightStyle =  { height: ($window.innerHeight-600) + 'px' }
  $scope.tmpOrder = {}      
  $scope.currentOrder = {}
  $scope.WarehouseList = []
  $scope.tmpOrder.vendorNumber =$routeParams.vendorNumber
  $scope.tmpOrder.PONumber = $routeParams.poNumber
  $scope.option = if $routeParams.option!=undefined then $routeParams.option.toLowerCase() else $routeParams.option    
  $scope.currentSelectedItems = []
  $scope.removeableItem=false
  $scope.OrderACKCode = "R"
  $scope.AckItemList = []
  $scope.WareHouseID = ""
  $scope.itemRemoved = false
  $scope.lang = $translate.uses()||'en-us';
  $scope.common = common
  
  $scope.$on('$translateChangeSuccess',->
    $scope.lang = $translate.uses()||'en-us';
  )
         
  $scope.queryOrderDetail = (tmpOrder) ->    
    requestOrder = {
      action:"query"
      vendorNumber:  $scope.tmpOrder.vendorNumber
      poNumber: tmpOrder.PONumber
      WithDetail:"true"
    }
    response = orderAPI.search requestOrder,
       ->
          if(response&&response.Succeeded)     
             $scope.currentOrder = angular.copy(response.PurchaseOrderList[0])
             if($scope.currentOrder? and $scope.currentOrder.ItemList?)
                for item in $scope.currentOrder.ItemList
                    item.tempImgUrl = "https://a248.e.akamai.net/f/248/9241/30d/images1.newegg.com/ProductImageCompressAll300/"+item.NeweggItemNumber+"-02.jpg"
                    item.canRemoved=if (item.QuantityShipped>0||item.QuantityInvoiced>0||(item.Quantity == item.ACKQuantity && item.ACKCode=='R')) then false else true
                    if(typeof item.ItemACKStatus!='undefined' &&item.ItemACKStatus != null && item.ItemACKStatus == 'Reject')
                        item.ItemACKCode = 'R' 
             $scope.removeable()
             $scope.queryWarehouse(tmpOrder)
    ,(error)->  
      
  $scope.queryOrderDetail($scope.tmpOrder) 
  
  $scope.queryWarehouse = (tmpOrder) ->    
    requestWarehouse = {     
      vendorNumber: $scope.tmpOrder.vendorNumber   
    }        
             
    response = warehouseAPI.search requestWarehouse,
       ->    
          if(response && response.Warehouses && response.Warehouses.length>0)        
             $scope.WarehouseList = angular.copy(response.Warehouses)   
             for index of $scope.WarehouseList
               if ($scope.WarehouseList[index].WarehouseNumber == $scope.currentOrder.WarehouseNumber)
                 $scope.WareHouseID =  $scope.WarehouseList[index].VendorWarehouseNumber
                 return
               else 
                 $scope.WareHouseID = "None"                
    ,(error)->  
  
  $scope.removeable=->      
    if ($scope.option == "view")  
      $scope.removeableItem=false
    if ($scope.option == "edit")   
      if $scope.currentOrder?
          if($scope.currentOrder.OrderStatus=="Canceled"||$scope.currentOrder.OrderStatus=="Completed")
            $scope.removeableItem=false
          else
            $scope.removeableItem=true  
        
  $scope.PushSelectItemToArray=->
    $scope.currentSelectedItems=[]
    for item in $scope.currentOrder.ItemList
        if(item.isChecked==true)
            $scope.currentSelectedItems.push(item)
  
  $scope.RemoveSingleItem = (selectedItem) ->
    messager.clear()
    if($scope.currentOrder.OrderStatus=="Canceled"||$scope.currentOrder.OrderStatus=="Completed")
      messager.error($translate('error_orderdetail.cantRemoveItem'))
      return            
    if(selectedItem.ItemACKStatus=="Reject" && selectedItem.Quantity == selectedItem.ACKQuantity)
      messager.error($translate('error_orderdetail.removedItem'))     
      return
    selectedItem.isRemoved = true
    selectedItem.QuantityRemoved = selectedItem.Quantity
    selectedItem.HasError = false
    $scope.itemRemoved = true
    if($scope.itemRemoved==true)
        messager.success($translate('success_orderdetail.removeMarked'))  

  $scope.ResetSingleItem= (selectedItem) ->
    messager.clear()
    if(selectedItem.isRemoved)
       selectedItem.isRemoved = false
       selectedItem.QuantityRemoved = 0
       selectedItem.HasError = false
    tempBool=false        
    for item in $scope.currentOrder.ItemList
        if(item.isRemoved==true)
            tempBool=true
    $scope.itemRemoved=tempBool  
        
  $scope.RemoveItem = ->
    messager.clear()
    $scope.PushSelectItemToArray()
    if($scope.currentOrder.OrderStatus=="Canceled"||$scope.currentOrder.OrderStatus=="Completed")
      messager.error($translate('error_orderdetail.cantRemoveItem'))
      return      
    if(!$scope.currentSelectedItems || $scope.currentSelectedItems.length == 0)
        messager.error($translate('error_orderdetail.selectNone'))
        return         
    for index of  $scope.currentSelectedItems
      if($scope.currentSelectedItems[index].ItemACKStatus=="Reject" && $scope.currentSelectedItems[index].Quantity == $scope.currentSelectedItems[index].ACKQuantity)
        messager.error($translate('error_orderdetail.removedItem'))     
        return   
    for index of $scope.currentSelectedItems
        $scope.currentSelectedItems[index].isRemoved = true
        $scope.currentSelectedItems[index].QuantityRemoved = $scope.currentSelectedItems[index].Quantity
        $scope.currentSelectedItems[index].HasError = false
        $scope.currentSelectedItems[index].isChecked = false
        $scope.itemRemoved = true
    if($scope.itemRemoved==true)
        messager.success($translate('success_orderdetail.removeMarked'))  
    $scope.refreshCheckbox($scope.currentOrder.ItemList)         
 
  $scope.ResetItem=->
    messager.clear()
    $scope.PushSelectItemToArray()
    if($scope.currentSelectedItems==null||$scope.currentSelectedItems.length==0)
        messager.error($translate('error_orderdetail.resetNone'))
        return
    for item in $scope.currentSelectedItems
        item.isChecked = false
        item.QuantityRemoved = 0
        item.HasError = false
        if(item.isRemoved)
            item.isRemoved = false
    $scope.refreshCheckbox($scope.currentOrder.ItemList)             
    tempBool=false        
    for item in $scope.currentOrder.ItemList
        if(item.isRemoved==true)
            tempBool=true
    $scope.itemRemoved=tempBool 
  
  $scope.SubmittheChange=->
    messager.clear()    
    $scope.PushSelectItemToArray()
    if(!$scope.itemRemoved)
        messager.error($translate('error_orderdetail.removeNone'))
        return
    if(!$scope.QtyToRemoveValid($scope.currentOrder.ItemList))
        messager.error($translate('error_orderdetail.submitQtyNotValid'))
        return
    msg = $translate('confirm_ordertail.remove')
    common.confirmBox msg,"", ->  
        $scope.BuildItem($scope.currentOrder.ItemList)       
        requestOrder = {
          RequestInfo:{        
            SystemSource: "VendorPortal",
            UserID: common.currentUser.ID,
            RequestTimeUtc: new Date(),
            RequestGuid: uuid.newguid()
          }
          PurchaseOrderACK:{
            VendorNumber : common.currentUser.VendorNumber
            poNumber : $scope.currentOrder.PONumber
            OrderACKCode : $scope.OrderACKCode 
            ItemList : $scope.AckItemList
          }
        }
        response = orderAckAPI.update requestOrder,
           ->
              if(response&&response.Succeeded)   
                  $scope.itemRemoved=false     
                  messager.success($translate('success_orderdetail.remove'))
                  #UPDATE ITEM'S AckCode
                  #Start Modify by Doris.X.Tang 02/24/2016
                  $scope.BuildItemStatusCode($scope.AckItemList,$scope.currentOrder.ItemList)
                  #common.autoBack()
                  #End Modify
                  #$scope.queryOrderDetail($scope.tmpOrder) 
              else
                if(response.Errors && response.Errors.length > 0)
                  errorMsg =  common.getLocalizedErrorMsg(response.Errors[0])
                  messager.error($translate('error_orderdetail.remove')+errorMsg)   
              $scope.currentSelectedItems = []          
        ,(error)->

   
   $scope.verifyQtyToRemove=(item)->
     if item.QuantityRemoved == null or item.QuantityRemoved == '' or item.QuantityRemoved < 1 or item.QuantityRemoved > item.Quantity
        item.HasError = true
     else
        item.HasError = false
   
   $scope.QtyToRemoveValid =(ItemList)->
     for index of  ItemList
       if(ItemList[index].HasError)
          return false
     return true    
   
   $scope.BuildItem=(ItemList)->  
     $scope.AckItemList=[]   
     for index of  ItemList
       if(ItemList[index].canRemoved && ItemList[index].isRemoved)
         ItemList[index].ItemACKCode="R"  
         tempItem = angular.copy(ItemList[index])
         tempItem.Quantity = ItemList[index].QuantityRemoved
         $scope.AckItemList.push(tempItem)      
       else
         if !ItemList[index].ItemACKStatus? or ItemList[index].ItemACKStatus=="None" or ItemList[index].ItemACKStatus=="Accept"
           ItemList[index].ItemACKCode="A"
           $scope.AckItemList.push(angular.copy(ItemList[index]))     
           $scope.OrderACKCode = "A"   
     isAllReject=true    
     for item in ItemList when item.ItemACKCode!='R' 
         isAllReject=false
     $scope.OrderACKCode= if isAllReject then 'R' else 'A'            
 
  $scope.BuildItemStatusCode=(AckItem,ItemList)->
     if AckItem? and ItemList?
         for index of AckItem
           for index2 of ItemList
              if AckItem[index].VendorPartNumber==ItemList[index2].VendorPartNumber
                 ItemList[index2].ItemACKStatus=if AckItem[index].ItemACKCode=='R' then 'Reject' else 'Accept'
                 ItemList[index2].ItemStatusMeaning= AckItem[index].ItemACKCode
                 ItemList[index2].ACKQuantity = AckItem[index].Quantity                 
                 ItemList[index2].canRemoved=false if ItemList[index2].Quantity==ItemList[index2].ACKQuantity && ItemList[index2].ItemStatusMeaning=='R'
                 ItemList[index2].isRemoved = false
                 ItemList[index2].isChecked = false
                    
  $scope.isCheckedAll = false   
  $scope.checkAll = (itemList) ->
    $scope.isCheckedAll=!$scope.isCheckedAll
    angular.forEach(itemList, (item,i) -> item.isChecked = $scope.isCheckedAll&&item.canRemoved ) 
     
  $scope.itemCheck = (itemList,item) ->
    item.isChecked = !item.isChecked
    $scope.refreshCheckbox(itemList)

  $scope.refreshCheckbox = (itemList) ->
    isAll = true
    for item in itemList
      if(!item.isChecked || item.isChecked == false)
        isAll = false
    $scope.isCheckedAll = isAll     
])