angular.module('vf-shipnotice',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.shipnotice.us)
    .translations('zh-cn',resources.vendorportal.shipnotice.cn)
    .translations('zh-tw',resources.vendorportal.shipnotice.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/shipnotice/:poNumber/:action",
      templateUrl: "/modules/vendorportal-vf/app/shipment/shipNotice.tpl.html"
      controller: 'ShipNoticeCtrl'
    .when "/shipnotice/:poNumber/:shipNoticeID/:action",
      templateUrl: "/modules/vendorportal-vf/app/shipment/shipNotice.tpl.html"
      controller: 'ShipNoticeCtrl'
])

.controller('ShipNoticeCtrl',
["$rootScope","$scope","$filter","$window","$routeParams","uuid","messager","common","printer","order","shipNotice","orderAPI","shipNoticeAPI","addressAPI","configAPI","$translate","apiTrace","$location",
($rootScope,$scope,$filter,$window,$routeParams,uuid,messager,common,printer,order,shipNotice,orderAPI,shipNoticeAPI,addressAPI,configAPI,$translate,apiTrace,$location) ->
  
  if(!$routeParams.poNumber)
    messager.error($translate('error_shipnotice.poNumberEmpty'))
    return

  common.initUnSavedConfirm($scope)
  $scope.common = common

  $scope.action = $routeParams.action

  if(!$scope.action)
    $scope.action = 'view'

  $scope.isSumbited = false
  $scope.currentOrder = null
  $scope.currentShipNotice = null
  $scope.warehouseLevel = false
  $scope.shipServiceList = {}
  $scope.allTrackingNumbers = []
  $scope.currentPackageCreateToCopy = {}

  $scope.loadOrderInfo = ->    
    requestItem = {
      vendorNumber: common.currentUser.VendorNumber
      poNumber: $routeParams.poNumber
      withDetail:true
    }
    response = orderAPI.getOrder requestItem,
       ->
        if(response&&response.Succeeded&&response.PurchaseOrderList)        
           $scope.currentOrder = angular.copy(response.PurchaseOrderList[0])
           $scope.loadShipNoticeInfo()

  $scope.loadShipNoticeInfo = ->    
    requestItem = {
      vendorNumber: common.currentUser.VendorNumber
      poNumber: $routeParams.poNumber
      shipNoticeID: $routeParams.shipNoticeID
      withDetail:true
    }
    response = shipNoticeAPI.getShipNotice requestItem,
       ->
          if(response&&response.Succeeded&&response.ShipNoticeList)  
             if($scope.action == 'create')  
                 $scope.currentShipNotice = {
                      ControlNumber:uuid.newguid().split("-").join("")
                      ShippingDate:moment().format('YYYY-MM-DD')
                      ShippedService:$scope.currentOrder.ShipService
                 }
                 $scope.mergeItemDataByCreate(response.ShipNoticeList)
             else
               $scope.currentShipNotice = response.ShipNoticeList[0]
               if($scope.currentShipNotice.ShippingDate)
                 $scope.currentShipNotice.ShippingDate = moment($scope.currentShipNotice.ShippingDate).format('YYYY-MM-DD')
               $scope.mergeItemData()

  $scope.loadAllTrackingNumbersByPONumber = ->    
    requestItem = {
      vendorNumber: common.currentUser.VendorNumber
      poNumber: $routeParams.poNumber
      withDetail:true
    }
    response = shipNoticeAPI.getShipNotice requestItem,
       ->
         if(response&&response.Succeeded&&response.ShipNoticeList)  
             for ship in response.ShipNoticeList
               if(ship.OrderList && ship.OrderList.length > 0)
                  for p in ship.OrderList[0].PackageList
                     if($scope.action == 'edit')
                        if(ship.ShipNoticeID.toString() != $routeParams.shipNoticeID)
                           $scope.allTrackingNumbers.push({trackingNumber:p.TrackingNumber})
                     else
                       $scope.allTrackingNumbers.push({trackingNumber:p.TrackingNumber})

  $scope.mergeItemDataByCreate = (shipNoticeList) ->
    if(!$scope.currentOrder)
      return
    if(!$scope.currentOrder.ItemList || $scope.currentOrder.ItemList.length <= 0)
      return
    allPackageItemList = []
    for ship in shipNoticeList
      for order in ship.OrderList
        for p in order.PackageList
          for item in p.ItemList
            filterPackageItems = $filter('filter')(allPackageItemList,(i) -> i.VendorPartNumber == item.VendorPartNumber )
            if(filterPackageItems && filterPackageItems.length > 0)
              filterPackageItems[0].Quantity += item.Quantity
            else
              allPackageItemList.push(item)
    orderItemList = angular.copy($scope.currentOrder.ItemList)
    pcackageItems = []
    for item in orderItemList
      filterPackageItems = $filter('filter')(allPackageItemList,(i) -> i.VendorPartNumber == item.VendorPartNumber )
      item.OrderQty = item.Quantity
      if(filterPackageItems && filterPackageItems.length > 0)
        item.Quantity = item.Quantity - filterPackageItems[0].Quantity
        if(item.Quantity > 0 && item.ItemACKStatus != 'Reject')
          pcackageItems.push(item)
      else
        if(item.ItemACKStatus != 'Reject')
          pcackageItems.push(item)
    newPackage = { ItemList: pcackageItems }
    newOrder = { 
      SONumber: $scope.currentOrder.SONumber
      PONumber: $scope.currentOrder.PONumber
      CompanyCode: $scope.currentOrder.CompanyCode
      PackageList: [newPackage]
    }
    $scope.currentShipNotice.OrderList = [newOrder]
    $scope.currentPackageCreateToCopy = angular.copy(newPackage)


  $scope.mergeItemData = ->
    if(!$scope.currentOrder)
      return
    if(!$scope.currentOrder.ItemList || $scope.currentOrder.ItemList.length <= 0)
      return
    orderItemList = angular.copy($scope.currentOrder.ItemList)
    if($scope.currentShipNotice && $scope.currentShipNotice.OrderList && $scope.currentShipNotice.OrderList.length > 0)
      if($scope.currentShipNotice.OrderList[0].PackageList && $scope.currentShipNotice.OrderList[0].PackageList.length > 0)
         for p in $scope.currentShipNotice.OrderList[0].PackageList
           for item in p.ItemList
              filterOrderItemList = $filter('filter')(orderItemList,{ VendorPartNumber: item.VendorPartNumber })
              if(filterOrderItemList && filterOrderItemList.length > 0)
                item.NeweggItemNumber = filterOrderItemList[0].NeweggItemNumber
                item.Manufacturer = filterOrderItemList[0].Manufacturer
                item.ManufacturerPartNumber = filterOrderItemList[0].ManufacturerPartNumber
                item.UPC = filterOrderItemList[0].UPC
                item.Description = filterOrderItemList[0].Description
                item.OrderQty = filterOrderItemList[0].Quantity
                item.ItemACKStatus = filterOrderItemList[0].ItemACKStatus
  #  $scope.scrollToBottom()

  $scope.loadWarehouseLevel = ->
    requestItem = {
      action1: 'vendor-portal-setting'
      vendorNumber: common.currentUser.VendorNumber
      code: 'InventoryReportCapability'

    }
    response = configAPI.getInventoryReportCapability requestItem,
     ->
       if(response&&response.Succeeded&&response.Settings && response.Settings.length > 0)  
         if(response.Settings[0].Value == 'WarehouseLevel')
            $scope.warehouseLevel = true

  $scope.initData = ->
    $scope.loadAllTrackingNumbersByPONumber()
    $scope.loadWarehouseLevel()
    shipNotice.loadShipService($scope.shipServiceList)
    $scope.loadOrderInfo()
    
  $scope.initData()

  #Submit Ship Notice
  $scope.submitShipNotice = ->
    if(!$scope.checkShipNotice())
      return
    #填充 重量或长宽高单位 以及 shipfrom
    $scope.fillUnit()
    $scope.setShipFormTo()
    if($scope.action == 'create')
      $scope.createShipNotice()
    else if($scope.action == 'edit')
      $scope.updateShipNotice()

  $scope.setShipFormTo = ->
    $scope.currentShipNotice.VendorNumber = common.currentUser.VendorNumber
    $scope.currentShipNotice.ShipFromZipCode = $scope.currentOrder.ShipFrom.ZipCode
    $scope.currentShipNotice.ShipFromAddress = $scope.currentOrder.ShipFrom.Address
    $scope.currentShipNotice.ShipFromCity = $scope.currentOrder.ShipFrom.City
    $scope.currentShipNotice.ShipFromState = $scope.currentOrder.ShipFrom.State
    $scope.currentShipNotice.ShipFromCountry = $scope.currentOrder.ShipFrom.Country
    $scope.currentShipNotice.ShipToZipCode = $scope.currentOrder.ShipTo.ZipCode
    $scope.currentShipNotice.ShipToAddress = $scope.currentOrder.ShipTo.Address
    $scope.currentShipNotice.ShipToCity = $scope.currentOrder.ShipTo.City
    $scope.currentShipNotice.ShipToState = $scope.currentOrder.ShipTo.State
    $scope.currentShipNotice.ShipToCountry = $scope.currentOrder.ShipTo.Country

  $scope.fillUnit = ->
    if(!$scope.currentShipNotice.OrderList[0].PackageList)
      return
    for p in $scope.currentShipNotice.OrderList[0].PackageList
      if(p.GrossWeightPerPack)
        p.WeightMeasurementCode = common.currentProfile.WeightMeasurementCode
      else
        delete p.WeightMeasurementCode
      if(p.Length || p.Width || p.Height)
        p.LWHMeasurementCode = common.currentProfile.LengthMeasurementCode
      else
        delete p.LWHMeasurementCode

  $scope.logArray = []
  $scope.traceLog = (msg) ->
     requestItem = {
        APIUrl: 'ShipnoticePage:' + msg
        HttpMethod: 'LOG'
        PageUrl: $location.path()
        APIRequestTimeUtc: moment().format('YYYY-MM-DD hh:mm:ss')
        VendorNumber: common.currentUser.VendorNumber
        UserID: common.currentUser.ID
        LoginName: common.currentUser.LoginName
     }
     apiTrace.send requestItem

  $scope.checkShipNotice = ->
    messager.clear()
    shipDate = new Date($scope.currentShipNotice.ShippingDate)
    if(shipDate.toString() == 'Invalid Date')
      messager.warning($translate('error_shipnotice.shipDateInvalid'))
      return false
    poDate1 = new moment($scope.currentOrder.PODate)
    poDate2 = new moment($scope.currentOrder.PODate)
    minDate = new Date(poDate1.add('months', -3).format('YYYY-MM-DD'))
    currentDate = new Date()
    maxDate = new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),23,59,59)
    if(shipDate < minDate || shipDate > maxDate) 
      messager.warning($translate('warning_shipnotice.shipDateRange'))
      return false
    trackingNumberList = []
    packageList = $scope.currentShipNotice.OrderList[0].PackageList
    if(!packageList || packageList.length == 0)
      messager.warning($translate('warning_shipnotice.packageNone'))
      return false    
    for i of packageList
      continue if isNaN(parseInt(i))
      #check duplicate tracking number
      duplicateTrackingNumbers = $filter('filter')(trackingNumberList, (value) -> return value == packageList[i].TrackingNumber)
      if(duplicateTrackingNumbers&&duplicateTrackingNumbers.length > 0)
        messager.warning($translate('warning_shipnotice.trackNumberDuplicateStart')+packageList[i].TrackingNumber+$translate('warning_shipnotice.trackNumberDuplicateEnd'))
        return false
      else
        trackingNumberList.push(packageList[i].TrackingNumber)
      #check package info
      packageIndex = parseInt(i)+1
      if(!packageList[i].ItemList || packageList[i].ItemList.length == 0)
        msgrStr = $translate('warning_shipnotice.itemNoneStart')
        msg = msgrStr.concat(packageIndex,$translate('warning_shipnotice.itemNoneEnd'))
        messager.warning(msg)
        if isNaN(packageIndex)
           $scope.logArray.push('i='+i+'')
           $scope.logArray.push('packageListLen='+packageList.length+'')
           tempLogStr = $scope.logArray.join(';')
           $scope.traceLog tempLogStr
        return false
      if !packageList[i].GrossWeightPerPack && common.currentUser.WarehouseCountryCode != 'USA' && common.currentUser.WarehouseCountryCode != 'CAN' && common.currentUser.WarehouseCountryCode != 'USB' 
        messager.warning('Package weight cannot be empty.')
        return false
      if(!packageList[i].GrossWeightPerPack && (!packageList[i].Length || !packageList[i].Width || !packageList[i].Height))
        msgrStr = $translate('warning_shipnotice.lessThanZeroStart')
        msg = msgrStr.concat(packageIndex,$translate('warning_shipnotice.lessThanZeroEnd'))
        messager.warning(msg)
        return false
      for item in packageList[i].ItemList
        if(item.SerialNumberList && item.Quantity && item.SerialNumberList.length > item.Quantity)
           msgrStr = $translate('warning_shipnotice.extraSerialNumber')
           msg = msgrStr.concat(packageIndex," - " + item.VendorPartNumber + $translate('warning_shipnotice.symbolEnd'))
           messager.warning(msg)
           return false
    for number in trackingNumberList
       duplicateTrackingNumbers = $filter('filter')($scope.allTrackingNumbers, (p) -> return p.trackingNumber == number)
       if(duplicateTrackingNumbers&&duplicateTrackingNumbers.length > 0)
          messager.warning($translate('warning_shipnotice.existTrackingNumber')+number+$translate('warning_shipnotice.symbolEnd'))
          return false  
    return true


  $scope.updateShipNotice = ->
    if($scope.currentOrder.OrderStatus=='Completed')
      messager.warning($translate('warning_shipnotice.orderCompleted'))
      return
    common.confirmBox $translate('confirm_shipnotice.updateShipNotice'),"", ->
      requestItem = {
          RequestInfo: {
            SystemSource: "VendorPortal",
            UserID: common.currentUser.ID,
            RequestGuid:  uuid.newguid(),
            RequestTimeUtc: new Date()
          }
          ShipNotice: $scope.currentShipNotice
      }
      response = shipNoticeAPI.updateShipNotice requestItem,
          ->
            if(response&&response.Succeeded) 
                if(response.Results && response.Results.length > 0)     
                   if(response.Results[0].IsDuplicate == true)
                     messager.error($translate('error_shipnotice.isDuplicate'))
                     return
                $scope.isSumbited = true
                $rootScope.isSumbitSuccess = true
                messager.success($translate('success_shipnotice.update'))
                #Start Modify by Doris.X.Tang 02/25/2016
                #common.autoBack()
                #End Modify
            else
                messager.error($translate('error_shipnotice.update'))

  $scope.createShipNotice = ->
    common.confirmBox $translate('confirm_shipnotice.createShipNotice'),"", ->
      requestItem = {
          RequestInfo: {
            SystemSource: "VendorPortal",
            UserID: common.currentUser.ID,
            RequestGuid:  uuid.newguid(),
            RequestTimeUtc: new Date()
          }
          ShipNotice: $scope.currentShipNotice
      }
      response = shipNoticeAPI.createShipNotice requestItem,
          ->
            if(response&&response.Succeeded)    
                if(response.Results && response.Results.length > 0)     
                   if(response.Results[0].IsDuplicate == true)
                     messager.error($translate('error_shipnotice.isDuplicate'))
                     return  
                $scope.isSumbited = true
                $rootScope.isSumbitSuccess = true
                messager.success($translate('success_shipnotice.create'))
                #Start Modify by Doris.X.Tang 02/25/2016
                #common.autoBack()
                #End Modify
            else
                messager.error($translate('error_shipnotice.create'))

  #Delete Ship Notice
  $scope.deleteShipNotice = ->
    if($scope.currentOrder.OrderStatus=='Completed')
      messager.warning($translate('warning_shipnotice.orderCompleted'))
      return
    common.confirmBox $translate('confirm_shipnotice.deleteShipNotice'),"", ->
        requestItem = {
          vendorNumber: common.currentUser.VendorNumber
          shipNoticeID: $routeParams.shipNoticeID
        }
        response = shipNoticeAPI.deleteShipNotice requestItem,
           ->
              if(response&&response.Succeeded)      
                 messager.success($translate('success_shipnotice.deleteShipNotice'))
                 $rootScope.isSumbitSuccess = true
                 $scope.isSumbited = true
                 #Modify by Doris.X.Tang 02/25/2016
                 #common.autoBack()
                 #End Modify
              else
                 messager.error($translate('error_shipnotice.deleteShipNotice'))

  #Address List
  $scope.currentAddressList = []
  $scope.hasDefaultAddress = false
  $scope.currentSelectedAddress = {}

  $scope.openAddressList = ->
    $scope.currentSelectedAddress = {}
    $scope.currentAddressList = []
    $scope.hasDefaultAddress = false
    $scope.addressListModal = true
    $scope.getAddressList()

  $scope.closeAddressList = ->
    $scope.addressListModal = false

  $scope.getAddressList = ->
    requestItem = {
      vendorNumber: common.currentUser.VendorNumber
    }
    response = addressAPI.search requestItem,
      ->
        if(response&&response.Succeeded)     
           for address in response.ShipAddressList
             if(address.IsDefault == true)
               $scope.hasDefaultAddress = true
           $scope.currentAddressList = $filter('orderBy')(response.ShipAddressList,'IsDefault',true) 
           $scope.loadDefaultAddress()

  $scope.loadDefaultAddress = ->
    if(!$scope.currentOrder.ShipFrom.Address)
      return
    filterAdresses = $filter('filter')($scope.currentAddressList,{ Address: $scope.currentOrder.ShipFrom.Address, ZipCode: $scope.currentOrder.ShipFrom.ZipCode  })
    if(filterAdresses && filterAdresses.length > 0)
      filterAdresses[0].isSelected = true
      $scope.currentSelectedAddress = angular.copy(filterAdresses[0])

  $scope.selectAddressRow = (address) ->
    angular.forEach($scope.currentAddressList, (a,i) -> a.isSelected = false)     
    address.isSelected = true
    $scope.currentSelectedAddress = angular.copy(address)

  $scope.addressList_Default = ->
    filterAdresses = $filter('filter')($scope.currentAddressList,{ IsDefault: true })
    $scope.currentOrder.ShipFrom.Address = filterAdresses[0].Address
    $scope.currentOrder.ShipFrom.City = filterAdresses[0].City
    $scope.currentOrder.ShipFrom.State = filterAdresses[0].State
    $scope.currentOrder.ShipFrom.Country = filterAdresses[0].Country
    $scope.currentOrder.ShipFrom.ZipCode = filterAdresses[0].ZipCode
    $scope.closeAddressList()

  $scope.addressList_OK = ->
    if(!$scope.currentSelectedAddress.Address)
      messager.error($translate('error_shipnotice.addressInvalid'))
      return
    $scope.currentOrder.ShipFrom.Address = $scope.currentSelectedAddress.Address
    $scope.currentOrder.ShipFrom.City = $scope.currentSelectedAddress.City
    $scope.currentOrder.ShipFrom.State = $scope.currentSelectedAddress.State
    $scope.currentOrder.ShipFrom.Country = $scope.currentSelectedAddress.Country
    $scope.currentOrder.ShipFrom.ZipCode = $scope.currentSelectedAddress.ZipCode
    $scope.closeAddressList()
  #Package List
  $scope.addPackage = ->
   if($scope.action == 'update')
       if(!$scope.currentShipNotice.OrderList[0].PackageList)
         $scope.currentShipNotice.OrderList[0].PackageList = []
       packageItemList = []
       for p in $scope.currentShipNotice.OrderList[0].PackageList
         for item in p.ItemList
           if(p.TrackingNumber)
             filterItems = $filter('filter')(packageItemList,{ VendorPartNumber:item.VendorPartNumber })
             if(filterItems && filterItems.length > 0)
               filterItems[0].Quantity += item.Quantity
             else
               packageItemList.push(angular.copy(item))
       for item in packageItemList
         filterItems = $filter('filter')($scope.currentOrder.ItemList,{ VendorPartNumber:item.VendorPartNumber })
         if(filterItems && filterItems.length > 0)
            item.Quantity = filterItems[0].Quantity - item.Quantity
            if(item.Quantity < 0)
               item.Quantity = 0
       $scope.currentShipNotice.OrderList[0].PackageList.push({ItemList:packageItemList})
   else
       $scope.currentShipNotice.OrderList[0].PackageList.push(angular.copy($scope.currentPackageCreateToCopy))
   $scope.scrollToBottom()
   $scope.logArray.push('addP')

  $scope.scrollToBottom = ->
     duration = Math.min(500, Math.max(100, parseInt(ace.helper.scrollTop() / 3)))
     $('html,body').animate({scrollTop: 100000}, duration)

  $scope.removePackage = (index) ->
    msgStr1 = $translate('confirm_shipnotice.removePackStart')
    msg = msgStr1.concat(index+1,$translate('confirm_shipnotice.removePackEnd'))
    common.confirmBox msg,"", ->
      $scope.currentShipNotice.OrderList[0].PackageList.splice(index, 1)
      $scope.logArray.push('removeP')
      $scope.$apply()

  $scope.printPackage = (currentShipNotice,currentTrackingNumber,currentPackage) ->
    tempShipNotice = angular.copy(currentShipNotice)
    tempPackage = {}
    tempPackageList = []
    if(currentTrackingNumber)
      for index of tempShipNotice.OrderList[0].PackageList
        if(tempShipNotice.OrderList[0].PackageList[index].TrackingNumber == currentTrackingNumber)
           tempPackage = tempShipNotice.OrderList[0].PackageList[index]
           tempPackageList.push(tempPackage)
      tempShipNotice.OrderList[0].PackageList = tempPackageList
    else
      tempPackage = angular.copy(currentPackage)
      tempPackageList.push(tempPackage)

    tempShipNotice.OrderList[0].PackageList = tempPackageList
    if(tempPackage.TrackingNumber)
      $scope.print(tempShipNotice)
    else
      common.confirmBox $translate('confirm_shipnotice.printPackList'),"", ->
        $scope.print(tempShipNotice)
        $scope.$apply()

  $scope.print = (currentShipNotice) ->
    shipNoticeList = []
    shipNoticeList.push(currentShipNotice)
    shipNotice.printPackageListWithShipNoticeList(common.currentUser.VendorNumber,[ $scope.currentOrder.PONumber ],shipNoticeList)

  #Item List Modal
  $scope.currentPackage = {}
  $scope.currentPackageIndex = null
  $scope.currentItemList = null

  $scope.openItemList = (selectedPackage,index) ->
    $scope.currentPackage = selectedPackage
    $scope.currentPackage.isCheckedAll_modal = false
    $scope.currentPackageIndex = index
    $scope.currentItemList = $scope.filterDuplicateItem($scope.currentPackage.ItemList)
    $scope.itemListModal = true

  $scope.closeItemList = ->
    messager.clear()
    $scope.itemListModal = false

  $scope.AddItem = ->
    selectedItems = $filter('filter')($scope.currentItemList,{ isChecked : true})
    if(!selectedItems || selectedItems.length == 0)
      messager.warning($translate('warning_shipnotice.addNoItem'))
      return 
    rejectItems = $filter('filter')(selectedItems,{ ItemACKStatus : 'Reject'})
    if(!rejectItems || rejectItems.length > 0)
      $scope.logArray.push('addICfm')
      common.confirmBox $translate('confirm_shipnotice.addRejectItem'),"", ->
        angular.forEach(selectedItems, (item,i) -> item.isChecked = false)
        $scope.addItemNow(selectedItems)
        $scope.$apply()
    else
      $scope.addItemNow(selectedItems)
    

  $scope.addItemNow = (selectedItems) ->
      angular.forEach(selectedItems, (item,i) -> item.isChecked = false)
      if(!$scope.currentPackage.ItemList)
        $scope.currentPackage.ItemList = []
      $scope.currentPackage.ItemList.push.apply($scope.currentPackage.ItemList,angular.copy(selectedItems))
      $scope.currentPackage.isCheckedAll = false
      $scope.closeItemList()
      $scope.logArray.push('addI')

  $scope.removeItem = (currentPackage) ->
    if(!currentPackage.ItemList || currentPackage.ItemList.length == 0)
      messager.warning($translate('warning_shipnotice.removeNoItem'))
      return 
    checkedItems = $filter('filter')(currentPackage.ItemList,{isChecked : true})
    if(!checkedItems || checkedItems.length == 0)
      messager.warning($translate('warning_shipnotice.removeNoItem'))
      return 
    $scope.logArray.push('removeICfm')
    common.confirmBox $translate('confirm_shipnotice.removeItemFromPack'),"", ->
      $scope.$apply(()->
        tempItemList = []
        for item in currentPackage.ItemList
          if(item.isChecked != true)
             tempItemList.push(item)
        currentPackage.ItemList = tempItemList
        currentPackage.isCheckedAll = false
        $scope.logArray.push('removeI')
      )

  $scope.filterDuplicateItem = (currentPackageItemList) ->
    resultItemList = []
    for item in $scope.currentOrder.ItemList
      filterItems = $filter('filter')(currentPackageItemList,{ VendorPartNumber:item.VendorPartNumber }) 
      if(!filterItems || filterItems.length == 0)
        tempItem = angular.copy(item)
        tempItem.isChecked = false
        tempItem.OrderQty = item.Quantity
        delete tempItem.Quantity
        resultItemList.push(tempItem)
    return resultItemList

  $scope.checkAll = (currentPackage,itemList,checkAllName) ->
    currentPackage[checkAllName] = !currentPackage[checkAllName] 
    angular.forEach(itemList, (item,i) -> item.isChecked = currentPackage[checkAllName] ) 
     
  $scope.itemCheck = (currentPackage,itemList,item,checkAllName) ->
    item.isChecked = !item.isChecked
    $scope.refreshCheckbox(currentPackage,itemList,checkAllName)

  $scope.refreshCheckbox = (currentPackage,itemList,checkAllName) ->
    isAll = true
    for item in itemList
      if(!item.isChecked || item.isChecked == false)
        isAll = false
    currentPackage[checkAllName] = isAll

  #Serial Number List Modal
  $scope.currentItem_serial = {}
  $scope.currentItem_serial_real = {}

  $scope.openSerialNumberList= (selectedItem) ->
    $scope.currentItem_serial_real = selectedItem
    $scope.currentItem_serial = angular.copy(selectedItem)
    $scope.currentItem_serial.SerialNumberList2 = []
    angular.forEach($scope.currentItem_serial.SerialNumberList, (s,i) -> $scope.currentItem_serial.SerialNumberList2.push({serialNumber:s}))
    $scope.serialNumberListModal = true

  $scope.closeSerialNumberList = ->
    messager.clear()
    $scope.serialNumberListModal = false

  $scope.addSerialNumber = ->
    if($scope.currentItem_serial.SerialNumberList2.length >= $scope.currentItem_serial.Quantity)
        messager.warning($translate('warning_shipnotice.serialNumberStart')+$scope.currentItem_serial.Quantity+$translate('warning_shipnotice.serialNumberEnd'))
        return
    $scope.currentItem_serial.SerialNumberList2.push({serialNumber:''})

  $scope.removeSerialNumber = (index) ->
    $scope.currentItem_serial.SerialNumberList2.splice(index,1)

  $scope.clearSerialNumberList = ->
    $scope.currentItem_serial.SerialNumberList2 = []

  $scope.serialNumberList_OK = ->
    messager.clear()
    filterEmptySerialList = $filter('filter')($scope.currentItem_serial.SerialNumberList2, (s) -> return s.serialNumber == "")
    if(filterEmptySerialList && filterEmptySerialList.length > 0)
      messager.warning($translate('warning_shipnotice.serialNumberInvalid'))
      return
    tempSerialList = []
    angular.forEach($scope.currentItem_serial.SerialNumberList2,(s,i) -> tempSerialList.push(s.serialNumber))
    oldCount = tempSerialList.length
    if(oldCount == 0)
      $scope.currentItem_serial_real.SerialNumberList = []
      $scope.closeSerialNumberList()
    else
      if(oldCount != $.unique(tempSerialList).length)
        messager.warning($translate('warning_shipnotice.serialNumberDuplicate'))
        return
      $scope.currentItem_serial_real.SerialNumberList = tempSerialList.reverse()
      $scope.closeSerialNumberList()
        
      

])