angular.module("vf-cache-shipNotice", []).factory('shipNotice',
["$q","$filter","printer","orderAPI","shipNoticeAPI","common","$translate", ($q,$filter,printer,orderAPI,shipNoticeAPI,common,$translate) ->
  
  printTemplate = '/modules/vendorportal-vf/template/packagePrintTemplate.html'
  
  printPageSize = 6

  generatePrintPackageList = (shipNoticeList) ->
     originalPrintList = getOriginalPrintList(shipNoticeList)
     packageData = getPaggingPrintList(originalPrintList)
     printer.print(printTemplate,{ packages: packageData })
          
  getOriginalPrintList = (shipNoticeList) ->
      originalPrintList = []
      for ship in shipNoticeList
        for order in ship.OrderList
           for p in order.PackageList
               tempPackage = { 
                 trackingNumber : p.TrackingNumber 
                 printDate: new Date()
               }
               tempPackage.shipTo = {
                  name: ship.ShipToName
                  companyName: ship.CompanyName
                  country: ship.ShipToCountry
                  state: ship.ShipToState
                  city: ship.ShipToCity
                  adress: ship.ShipToAddress
                  zipCode: ship.ShipToZipCode
               }
               tempPackage.order = {
                  logoName: order.LogoName
                  webSiteURL: order.LogoName+".com"
                  webSiteName: order.LogoName
                  soNumber: order.SONumber
                  soDate: order.PODate
                  customerPONumber: order.CustomerPONumber
                  shipVia: ship.ShippedService
               }
               countryFilter(order,tempPackage)
               tempPackage.itemList = p.ItemList
               if(p.ItemList)
                 tempPackage.itemTotalCount = p.ItemList.length 
               else
                 tempPackage.itemTotalCount = 0
               tempPackage.itemTotalQty = 0
               angular.forEach(p.ItemList, (item,i) -> tempPackage.itemTotalQty += item.Quantity)
               if(!tempPackage.itemTotalQty)
                 tempPackage.itemTotalQty = 0
               originalPrintList.push(tempPackage)
      return originalPrintList

  
  countryFilter = (order,tempPackage) ->
    if(order.LogoName == 'NeweggBusiness')
        tempPackage.textNode1 = "If you need to return an item to NeweggBusiness, please obtain an RMA by contacting Customer Service at (888) 978-8988 or clicking 'My Account' on our web page."
        tempPackage.textNode2 = "http://www.neweggbusiness.com/Info/AllTermsAndConditions.aspx"
    else if(order.LogoName == 'NeweggCa')
        tempPackage.textNode1 = "If you need to return an item to Newegg, please obtain an RMA by contacting Customer Service at (800) 390-1119 or clicking 'My Account' on our web page."
        tempPackage.textNode2 = "http://www.newegg.com/CustomerService/StandardWarranty.asp"
        tempPackage.order.webSiteURL = "Newegg.ca"
        tempPackage.order.webSiteName = "Newegg"
    else
        tempPackage.textNode1 = "If you need to return an item to "+order.LogoName+", please obtain an RMA by contacting Customer Service at (800) 390-1119 or clicking 'My Account' on our web page."
        if(order.LogoName == 'NeweggFlash')
          tempPackage.textNode2 = "http://www.neweggflash.com/return-policy"
        else
          tempPackage.textNode2 = "http://www.newegg.com/CustomerService/StandardWarranty.asp"
        
  
  getPaggingPrintList = (originalPrintList) ->
     packageData = []
     angular.forEach(originalPrintList, (p,i) -> setPageSize(p))
     for p in originalPrintList
       if(p.paggingInfo.pageSize == 1)
         p.paggingInfo.pageIndex = 1
         packageData.push(p)
       else
         index = 0
         tempItemList = angular.copy(p.itemList)
         while index < p.paggingInfo.pageSize
           tempP = angular.copy(p)
           delete tempP.itemList
           tempP.itemList = tempItemList.slice(index * printPageSize, (index+1) * printPageSize)
           tempP.paggingInfo.pageIndex = index + 1
           packageData.push(tempP)
           index++
     return packageData
      
  setPageSize = (currentPackage) ->
     currentPackage.paggingInfo = { pageSize : 1 }
     if(currentPackage.itemTotalCount == 0) 
       return
     if(currentPackage.itemTotalCount <= printPageSize)
       return
     currentPackage.paggingInfo.pageSize = parseInt(currentPackage.itemTotalCount / printPageSize)
     if(currentPackage.itemTotalCount % printPageSize > 0)
       currentPackage.paggingInfo.pageSize = currentPackage.paggingInfo.pageSize + 1

  RequestPackageListAPI = (vendorNumber,poNumbers,shipNoticeID) ->
      deferred = $q.defer()
      result = []
      requestCount = 0
      for p in poNumbers
        deferred = $q.defer()
        requestItem = {
          vendorNumber: vendorNumber
          poNumber: p
        }
        if(shipNoticeID)
          requestItem.shipNoticeID = shipNoticeID
        shipNoticeAPI.getShipNotice(requestItem)
         .$promise.then (response) ->
           requestCount++
           if(response&&response.Succeeded&&response.ShipNoticeList&&response.ShipNoticeList.length>0)
              angular.forEach(response.ShipNoticeList, (s,i) -> result.push(s))
           if(requestCount == poNumbers.length)
              deferred.resolve(result)
         ,(error)->
           if(requestCount == poNumbers.length)
              deferred.resolve(result)
      return deferred.promise

  RequestOrderInfos = (vendorNumber,poNumbers) ->
    deferred = $q.defer()
    result = []
    requestCount = 0
    for p in poNumbers
      deferred = $q.defer()
      requestItem = {
        vendorNumber: vendorNumber
        poNumber: p
        withDetail: true
      }
      orderAPI.getOrder(requestItem)
        .$promise.then (response) ->
          requestCount++
          if(response&&response.Succeeded)
            for order in response.PurchaseOrderList
              result.push(order)
          if(requestCount == poNumbers.length)
            deferred.resolve(result)
        ,(error)->
          if(requestCount == poNumbers.length)
            deferred.resolve(result)
    return deferred.promise

  checkUnPackageOrders = (shipList,poNumbers) ->
    result = []
    for p in poNumbers
      filterOrders = $filter('filter')(shipList,(s) -> return s.OrderList[0].PONumber == p)
      if(!filterOrders || filterOrders.length == 0)
        result.push(p)
    return result
  

  mergeOrderShipNotice = (shipList,orderList) ->
    for order in orderList
        for item in order.ItemList
            if(typeof item.IsNeweggFlash=='undefined' || item.IsNeweggFlash==false)
                item.IsNeweggFlash=false
                item.IsNeweggFlashStyle = {display: "none"}
              else
                item.IsNeweggFlash=true  
                item.IsNeweggFlashStyle = {display: "normal"}
    result = []
    for ship in shipList
      filterOrders = $filter('filter')(orderList,(o) -> return o.PONumber == ship.OrderList[0].PONumber)
      if(filterOrders && filterOrders.length > 0)
        ship.ShipToName = filterOrders[0].ShipTo.Name
        ship.CompanyName = filterOrders[0].ShipTo.CompanyName
        ship.ShipToAddress = filterOrders[0].ShipTo.Address
        ship.ShipToCity = filterOrders[0].ShipTo.City
        ship.ShipToState = filterOrders[0].ShipTo.State
        ship.ShipToCountry = filterOrders[0].ShipTo.Country
        ship.ShipToZipCode = filterOrders[0].ShipTo.ZipCode
        ship.OrderList[0].LogoName = filterOrders[0].BusinessUnit
        ship.OrderList[0].CustomerPONumber = filterOrders[0].CustomerPONumber
        ship.OrderList[0].PODate = filterOrders[0].PODate
        for p in ship.OrderList[0].PackageList
          for item in p.ItemList
            filterItems = $filter('filter')(filterOrders[0].ItemList, (i) ->  i.VendorPartNumber == item.VendorPartNumber)
            if(filterItems && filterItems.length > 0)
              item.SONeweggItemNumber = filterItems[0].SONeweggItemNumber
              if(typeof filterItems[0].IsNeweggFlash=='undefined' || filterItems[0].IsNeweggFlash==false)
                item.IsNeweggFlash=false
                item.IsNeweggFlashStyle = {display: "none"}
              else
                item.IsNeweggFlash=true  
                item.IsNeweggFlashStyle = {display: "normal"}
        result.push(angular.copy(ship))
    return result

  mergeUnShippedOrderItems = (shipList,orderList) ->
    for ship in shipList
      ship.PONumber = ship.OrderList[0].PONumber
    result = angular.copy(shipList)
    for order in orderList
      filterOrderShipNotices = $filter('filter')(shipList,(ship) -> return ship.OrderList[0].PONumber == order.PONumber)
      if(filterOrderShipNotices && filterOrderShipNotices.length > 0)
        newShipnotice = {}
        newShipnotice.ShipToName = order.ShipTo.Name
        newShipnotice.CompanyName = order.ShipTo.CompanyName
        newShipnotice.ShipToAddress = order.ShipTo.Address
        newShipnotice.ShipToCity = order.ShipTo.City
        newShipnotice.ShipToState = order.ShipTo.State
        newShipnotice.ShipToCountry = order.ShipTo.Country
        newShipnotice.ShipToZipCode = order.ShipTo.ZipCode
        newShipnotice.ShippedService = order.ShipService
        newShipnotice.PONumber = order.PONumber
        newShipnotice.OrderList = [{}]
        newShipnotice.OrderList[0].LogoName = order.BusinessUnit
        newShipnotice.OrderList[0].SONumber = order.SONumber
        newShipnotice.OrderList[0].CustomerPONumber = order.CustomerPONumber
        newShipnotice.OrderList[0].PODate = order.PODate
        newShipnotice.OrderList[0].PackageList = [{}]
        tempItemList = createUnshippedItemList(order,filterOrderShipNotices)
        if(tempItemList && tempItemList.length > 0)
          newShipnotice.OrderList[0].PackageList[0].ItemList = tempItemList
          result.push(newShipnotice)
      else
        tempShip = {
                  VendorNumber : order.vendorNumber
                  ShippedService : order.ShipService
                  ShipToZipCode: order.ShipTo.ZipCode
                  ShipToAddress: order.ShipTo.Address
                  ShipToCity: order.ShipTo.City
                  ShipToState: order.ShipTo.State
                  ShipToCountry: order.ShipTo.Country
                  ShipToName: order.ShipTo.Name
                  CompanyName: order.ShipTo.CompanyName
                  OrderList: [
                    {
                      SONumber : order.SONumber
                      PONumber : order.PONumber
                      PODate : order.PODate
                      LogoName: order.BusinessUnit
                      CustomerPONumber : order.CustomerPONumber
                      PackageList : [
                        {
                          ItemList : order.ItemList
                        }
                      ]
                    }
                  ]
        }
        result.push(angular.copy(tempShip))
    result = $filter('orderBy')(result,'PONumber')
    return result

  createUnshippedItemList = (currentOrder,shipNoticeList) ->
    if(!currentOrder)
      return []
    if(!currentOrder.ItemList || currentOrder.ItemList.length <= 0)
      return []
    currentShipNotice = {}
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
    orderItemList = angular.copy(currentOrder.ItemList)
    pcackageItems = []
    for item in orderItemList
      filterPackageItems = $filter('filter')(allPackageItemList,(i) -> i.VendorPartNumber == item.VendorPartNumber)
      item.OrderQty = item.Quantity
      if(filterPackageItems && filterPackageItems.length > 0)
        item.Quantity = item.Quantity - filterPackageItems[0].Quantity
        if(item.Quantity > 0 && item.ItemACKStatus != 'Reject')
          pcackageItems.push(item)
      else
        if(item.ItemACKStatus != 'Reject')
          pcackageItems.push(item)
    return pcackageItems 

  clearRejectItems = (shipNoticeList) ->
    for ship in shipNoticeList
      for order in ship.OrderList
        for p in order.PackageList
          tempNotRejectItems = []
          for item in p.ItemList
            if(item.ItemACKStatus != 'Reject')
               tempNotRejectItems.push(item)
          p.ItemList = tempNotRejectItems

  hasRejectItems = (OrderList) ->
    for order in OrderList
        for item in order.ItemList
          if(item.ItemACKStatus == 'Reject')
              return true
    return false

  printPackageList = (vendorNumber,poNumbers) ->
     RequestPackageListAPI(vendorNumber,poNumbers).then((result) ->
         RequestOrderInfos(vendorNumber,poNumbers).then((result2) ->
             shipList = mergeOrderShipNotice(result,result2)
             if(hasRejectItems(result2) == true)
               common.confirmBox $translate('warning_orderlist.cancelledOrrejectedForPriting'),"", ->
                 newshipList = mergeUnShippedOrderItems(shipList,result2)
                 clearRejectItems(newshipList)
                 generatePrintPackageList(newshipList)  
             else
               newshipList = mergeUnShippedOrderItems(shipList,result2)
               clearRejectItems(newshipList)
               generatePrintPackageList(newshipList)  
         )
     )

  printPackageListWithShipNoticeList = (vendorNumber,poNumbers,shipNoticeList) ->
     RequestOrderInfos(vendorNumber,poNumbers).then((result) ->
             shipList = mergeOrderShipNotice(shipNoticeList,result)
             generatePrintPackageList(shipList)  
     )

  _shipServiceList = []
  loadShipService = (data)->
      _shipServiceList = []
      requestItem = {
        action: 'ship-service'
        vendorNumber : common.currentUser.VendorNumber
      }
      response = shipNoticeAPI.getShipService requestItem,
        ->
          if(response&&response.Succeeded)      
            for ship in response.ShipServiceList
              _shipServiceList.push({text:ship.ShipService,value:ship.ShipService})
            data.data = angular.copy(_shipServiceList)
           # data.data.unshift({text:'Please select a ship service'})

  return {
      loadShipService
      printPackageList
      printPackageListWithShipNoticeList
  }
 
])

