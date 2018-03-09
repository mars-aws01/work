angular.module('vf-invoice',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.invoice.us)
    .translations('zh-cn',resources.vendorportal.invoice.cn)
    .translations('zh-tw',resources.vendorportal.invoice.tw)
])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/invoice/:poNumber/:option",
      templateUrl: "/modules/vendorportal-vf/app/invoice/invoice.tpl.html"
      controller: 'InvoiceCtrl'
    .when "/invoice/:poNumber/:invoiceNumber/:option",
      templateUrl: "/modules/vendorportal-vf/app/invoice/invoice.tpl.html"
      controller: 'InvoiceCtrl'
])

.controller('InvoiceCtrl',
["$scope","$rootScope","$filter","$routeParams","messager","common","order","orderAPI","orderAckAPI","uuid","invoiceAPI","$translate",
($scope,$rootScope,$filter,$routeParams,messager,common,order,orderAPI,orderAckAPI,uuid,invoiceAPI,$translate) ->
  
  if(!$routeParams.poNumber)
    messager.error($translate('error_invoice.poNumberEmpty'))
    return

  common.initUnSavedConfirm($scope)

  $scope.Math = window.Math;

  $scope.common = common

  $scope.option = $routeParams.option  #view/create/edit

  if(!$routeParams.option && $routeParams.invoiceNumber)
     $scope.option = 'view'
  if(!$routeParams.option && !$routeParams.invoiceNumber)
     $scope.option = 'create'

  $scope.overMaxAmount = false
  $scope.countryCode = common.currentUser.CountryCode

  $scope.currentOrder = {} 
  $scope.currentInvoice = {}
  $scope.currentInvoice.VendorNumber = common.currentUser.VendorNumber
  $scope.currentInvoice.InvoiceNumber = $routeParams.invoiceNumber
  $scope.currentInvoice.PONumber = $routeParams.poNumber
  $scope.currentInvoice.ItemList = []
  $scope.currentInvoice.InvoiceDate = moment().format('YYYY-MM-DD')
  $scope.currentInvoice.Freight = 0.00
  $scope.currentInvoice.Tax = 0.00  
  $scope.currentInvoice.subTotal = 0.00
  $scope.currentInvoice.TotalAmount = 0.00 
  
  if $scope.countryCode == 'CAN'
     $scope.currentInvoice.TaxInfo = {
        TaxGoodsAndServices : 0.00
        TaxHarmonized : 0.00
        TaxProvincial : 0.00
     }
     
  $scope.queryOrderDetail = ->    
    requestOrder = {
      action:"query"
      vendorNumber: common.currentUser.VendorNumber
      poNumber: $scope.currentInvoice.PONumber
      WithDetail:"true"
    }
    response = orderAPI.search requestOrder,
       ->
          if(response&&response.Succeeded)        
             $scope.currentOrder = angular.copy(response.PurchaseOrderList[0])        
             $scope.buildCurrentInvoice()  
          else
            if (response.Errors)
              msg=common.getLocalizedErrorMsg(response.Errors[0])
              messager.error($translate('error_invoice.getPoFailedStart')+$scope.currentInvoice.PONumber+$translate('error_invoice.failedEnd') + msg)   
    ,(error)->  

  $scope.queryInvoiceDetail = () -> 
    requestOrder = {     
      vendorNumber:common.currentUser.VendorNumber
      poNumber:$scope.currentInvoice.PONumber
      invoiceNumber:$scope.currentInvoice.InvoiceNumber 
    }  
    response = invoiceAPI.GetItems requestOrder,
      -> 
        if(response&&response.Succeeded)   
           $scope.currentInvoice = angular.copy(response.Invoice)  
           #$scope.buildCurrentInvoice()
           $scope.queryOrderDetail()
        else
          if (response.Errors)
            msg=common.getLocalizedErrorMsg(response.Errors[0])
            messager.error($translate('error_invoice.getInvoiceFailedStart')+$scope.currentInvoice.InvoiceNumber+$translate('error_invoice.failedEnd') + msg)
          $scope.option = "create"      
          $scope.buildCurrentInvoice()       
    ,(error)->    
    
    
  $scope.queryInvoiceList = () -> 
    requestOrder = {     
      action: "query"
      vendorNumber:common.currentUser.VendorNumber
      poNumber:$scope.currentInvoice.PONumber    
      WithDetail : "true"   
    }  
    response = invoiceAPI.search requestOrder,
      -> 
        if(response&&response.Succeeded)   
           $scope.invoiceList = angular.copy(response.InvoiceList)  
           #$scope.buildCurrentInvoice()
           $scope.queryOrderDetail()
        else
          $scope.invoiceList = []     
    ,(error)->    
    
            
  $scope.loadData = ->     
    if($scope.option == "edit" || $scope.option == "view")
      #$scope.queryOrderDetail()
      $scope.queryInvoiceDetail() 
    else
      #$scope.queryOrderDetail() 
      $scope.queryInvoiceList()    
  
  $scope.loadData()

  $scope.buildCurrentInvoice = ->       
    $scope.checkQtyPrice() 
    if($scope.option == "edit" || $scope.option == "view")       
      $scope.currentInvoice.InvoiceDate = moment($scope.currentInvoice.InvoiceDate).format('YYYY-MM-DD')
      $scope.tmpItemList = []
      if($scope.currentInvoice.Tax && $scope.currentInvoice.TaxType && $scope.currentInvoice.TaxType == 'Allowance')
         $scope.currentInvoice.Tax = $scope.currentInvoice.Tax * -1
      if($scope.currentInvoice.Freight && $scope.currentInvoice.FreightType && $scope.currentInvoice.FreightType == 'Allowance')
         $scope.currentInvoice.Freight = $scope.currentInvoice.Freight * -1
      #将Invoice中的QTY和Price字段填充到OrderItemList 中的PriceToInvoice和QTYToInvoice字段
      for currentOrderItem in  $scope.currentOrder.ItemList
        if ($scope.currentInvoice.ItemList &&  $scope.currentInvoice.ItemList.length >0) 
          for currentInvoiceItem in  $scope.currentInvoice.ItemList 
            if(currentOrderItem.NeweggItemNumber == currentInvoiceItem.NeweggItemNumber)
                currentOrderItem.PricetoInvoice = currentInvoiceItem.UnitPrice 
                currentOrderItem.QtytoInvoice = currentInvoiceItem.Quantity
        else
            if(currentOrderItem.ItemACKStatus !="Reject") 
                currentOrderItem.PricetoInvoice = currentOrderItem.UnitPrice 
                currentOrderItem.QtytoInvoice = currentOrderItem.Quantity
        $scope.tmpItemList.push(currentOrderItem)
        
      if ($scope.tmpItemList && $scope.tmpItemList.length>0)
        $scope.currentInvoice.ItemList = $scope.currentOrder.ItemList 
      $scope.sumSubTotal()
      $scope.optionAble()
      return
    if($scope.option = "create")      
      $scope.currentInvoice = {} 
      $scope.currentInvoice.InvoiceNumber = ""
      $scope.currentInvoice.InvoiceDate = moment().format('YYYY-MM-DD')
      $scope.currentInvoice.Freight = 0.00
      $scope.currentInvoice.Tax = 0.00  
      $scope.currentInvoice.subTotal = 0.00
      $scope.currentInvoice.TotalAmount = 0.00 
      for item in  $scope.currentOrder.ItemList
        if (item.ItemACKStatus !="Reject") 
            item.PricetoInvoice = item.UnitPrice 
            item.QtytoInvoice = item.Quantity
      $scope.currentInvoice.ItemList = $scope.currentOrder.ItemList 
      
      $scope.invoicedItemList = []
      #获取所有Invoice的ItemList 
      for invoice in $scope.invoiceList
       for item in invoice.ItemList 
           filterItems = $filter('filter')($scope.invoicedItemList,{NeweggItemNumber:item.NeweggItemNumber})
           if(filterItems && filterItems.length > 0)
             filterItems[0].Quantity += item.Quantity
           else
             $scope.invoicedItemList.push(angular.copy(item)) 
      #设置  QtytoInvoice 为未Invoice的QTY 
      for item1 in $scope.invoicedItemList
        filterItems = $filter('filter')($scope.currentInvoice.ItemList,{NeweggItemNumber:item1.NeweggItemNumber})
        if(filterItems && filterItems.length > 0)
          if (filterItems[0].QtytoInvoice > item1.Quantity)
            filterItems[0].QtytoInvoice = filterItems[0].QtytoInvoice  - item1.Quantity
          else 
            filterItems[0].QtytoInvoice = ""
            filterItems[0].PricetoInvoice = "" 
      $scope.sumSubTotal()
      $scope.optionAble()
      return
      
  #sumSubTotal
  $scope.sumSubTotal = ->    
    $scope.currentInvoice.subTotal=0.00
    for index of  $scope.currentInvoice.ItemList
      if ($scope.currentInvoice.ItemList[index].PricetoInvoice && $scope.currentInvoice.ItemList[index].QtytoInvoice)
        $scope.currentInvoice.subTotal = $scope.currentInvoice.subTotal + (parseFloat($scope.currentOrder.ItemList[index].PricetoInvoice) * $scope.currentInvoice.ItemList[index].QtytoInvoice)
    # 需考虑精度问题   如：1.59999999999999    
    $scope.currentInvoice.subTotal =  $scope.Math.round($scope.currentInvoice.subTotal * 100)/100
    freight=if $scope.currentInvoice.Freight then $scope.currentInvoice.Freight else 0 
    tax = if $scope.currentInvoice.Tax then $scope.currentInvoice.Tax else 0
    $scope.currentInvoice.TotalAmount = parseFloat(freight) +  parseFloat(tax) + parseFloat($scope.currentInvoice.subTotal)
    $scope.currentInvoice.TotalAmount = $scope.Math.round($scope.currentInvoice.TotalAmount * 100)/100
    if($scope.currentInvoice.TotalAmount > 99999999.99)      
      $scope.overMaxAmount = true
      messager.clear()
      messager.warning($translate('warning_invoice.totalAmountInvalid'))
      return
    else      
      $scope.overMaxAmount = false
      
      
  $scope.sumTaxTotal = -> 
    return if !$scope.currentInvoice.TaxInfo
    gst = if $scope.currentInvoice.TaxInfo.TaxGoodsAndServices then $scope.currentInvoice.TaxInfo.TaxGoodsAndServices else 0 
    hst = if $scope.currentInvoice.TaxInfo.TaxHarmonized then $scope.currentInvoice.TaxInfo.TaxHarmonized else 0 
    pst = if $scope.currentInvoice.TaxInfo.TaxProvincial then $scope.currentInvoice.TaxInfo.TaxProvincial else 0 
    $scope.currentInvoice.Tax = parseFloat((gst + hst + pst).toFixed(2))
    $scope.sumSubTotal()
    
  #UI button & inputbox optionAble            
  $scope.optionAble = ->     
    if($scope.option == "create")
      $scope.submit=true
      $scope.delete=false
      $scope.itemPriceAndQty=true
      $scope.invoceDateAndNumber = true
      $scope.shippingAndTax=true
    if($scope.option == "edit")
      if($scope.currentOrder.OrderStatus=="Completed")
        $scope.submit=false
        $scope.delete=false
        $scope.itemPriceAndQty=false
        $scope.invoceDateAndNumber = false
        $scope.shippingAndTax=false
      else           
        $scope.submit=true
        $scope.delete=true
        $scope.itemPriceAndQty=true
        $scope.invoceDateAndNumber = true 
        $scope.shippingAndTax=true
    if($scope.option == "view")  
        if ($scope.currentInvoice.ItemList &&  $scope.currentInvoice.ItemList.length >0)
          for index of  $scope.currentOrder.ItemList 
            $scope.currentOrder.ItemList[index].itemPriceAndQty = false  
        $scope.submit=false
        $scope.delete=false
        $scope.itemPriceAndQty=false
        $scope.invoceDateAndNumber = false 
        $scope.shippingAndTax=false
      
  #CreateInvoice
  $scope.CreateInvoice = ->
      invoice = angular.copy($scope.NewInvoice)
      invoice.Freight=if invoice.Freight==null then 0 else invoice.Freight
      invoice.Tax=if invoice.Tax==null then 0 else invoice.Tax       
      requestInvoice = { 
        Invoice: invoice
        RequestInfo: {
          SystemSource: "VendorPortal",
          UserID: common.currentUser.ID,
          RequestGuid:  uuid.newguid(),
          RequestTimeUtc: new Date()
        }
      } 
      response = invoiceAPI.Create requestInvoice,
         ->
            if(response&&response.Succeeded)     
              messager.success($translate('success_invoice.create'))  
              $rootScope.isSumbitSuccess = true
              $scope.option = "view" 
              $scope.optionAble()
              #Modify by Doris.X.Tang 02/25/2016
              #common.autoBack()
              #End Modify   
            else
              msg=common.getLocalizedErrorMsg(response.Errors[0])
              messager.error($translate('error_invoice.create') + msg)
      ,(error)->   
      
  #UpdateInvoice
  $scope.UpdateInvoice = ->
      invoice = angular.copy($scope.NewInvoice)
      invoice.Freight=if invoice.Freight==null then 0 else invoice.Freight
      invoice.Tax=if invoice.Tax==null then 0 else invoice.Tax      
      requestInvoice = { 
        Invoice: invoice
        RequestInfo: {
          SystemSource: "VendorPortal",
          UserID: common.currentUser.ID,
          RequestGuid:  uuid.newguid(),
          RequestTimeUtc: new Date()
        }
      }
      response = invoiceAPI.Update requestInvoice,
         ->
            if(response&&response.Succeeded)     
              messager.success($translate('success_invoice.update'))   
              $rootScope.isSumbitSuccess = true
              $scope.option = "view"               
              $scope.optionAble()   
              $scope.submit=false
              #Modify by Doris.X.Tang 02/25/2016
              #common.autoBack()
              #End Modify 
            else
              msg=common.getLocalizedErrorMsg(response.Errors[0])
              messager.error($translate('error_invoice.update') + msg)
      ,(error)->  
  
  #DeleteInvoice 
  $scope.DeleteInvoice = -> 
    common.confirmBox $translate('confirm_invoice.deleteInvoice'),"", ->
      $scope.option = "view"
      $scope.optionAble()   
      requestInvoice = { 
        invoiceNumber: $routeParams.invoiceNumber,
        poNumber:$scope.currentInvoice.PONumber, 
        vendorNumber:common.currentUser.VendorNumber
      }
      response = invoiceAPI.Delete requestInvoice,
         ->
            if(response&&response.Succeeded)     
              messager.success($translate('success_invoice.deleteInvoice'))    
              $rootScope.isSumbitSuccess = true
              #Modify by Doris.X.Tang 02/25/2016
              #common.autoBack()
              #End Modify
              #$scope.queryInvoiceDetail() 
            else
              msg=common.getLocalizedErrorMsg(response.Errors[0])
              messager.error($translate('error_invoice.deleteInvoice') + msg)
      ,(error)->       
  
  $scope.checkQtyPrice=->
    if (!$scope.currentInvoice.ItemList || $scope.currentInvoice.ItemList.length<=0)
      return 
    checkResult = true
      
    for Item in  $scope.currentInvoice.ItemList      
      Item.wrongPriceAlert = false   
      Item.wrongQtyAlert = false
           
    filterItems = $filter('filter')($scope.currentInvoice.ItemList,(item) -> return ((item.QtytoInvoice ==0)||(item.QtytoInvoice > item.Quantity)))
    if(filterItems && filterItems.length > 0)
        for item in filterItems
            item.wrongQtyAlert = true  
             
    filterItems = $filter('filter')($scope.currentInvoice.ItemList ,(item) -> return ((item.PricetoInvoice ==0)||(item.PricetoInvoice > item.UnitPrice)))
    if(filterItems && filterItems.length > 0)
        for item in filterItems
          item.wrongPriceAlert = true  
    
    filterItems = $filter('filter')($scope.currentInvoice.ItemList , (item) -> return ((item.QtytoInvoice>0 && item.PricetoInvoice>0) && item.ItemACKStatus =="Reject"))
    if(filterItems && filterItems.length > 0)
        for item in filterItems
          item.wrongPriceAlert = true   
          item.wrongQtyAlert = true               
     
    filterItems = $filter('filter')($scope.currentInvoice.ItemList , (item) -> return ((item.PricetoInvoice && !item.QtytoInvoice)||(!item.PricetoInvoice && item.QtytoInvoice)))
    if(filterItems && filterItems.length > 0)
        for item in filterItems
          item.wrongPriceAlert = true   
          item.wrongQtyAlert = true              
        messager.clear()
        messager.error($translate('error_invoice.priveQtyInvalid'))   
        checkResult = false
        return checkResult
    return checkResult
  
  
  #SubmitInvoice  
  checkAmount = (value,type) ->
    if value > 99999999
        xx = 1
        
  $scope.SubmitInvoice = ->    
    messager.clear() 
    $scope.buildItemList() 
    if(!$scope.checkQtyPrice())
      return
    invoiceDate = new Date($scope.currentInvoice.InvoiceDate)
    if(invoiceDate.toString() == 'Invalid Date')
      messager.error($translate('error_invoice.invoiceDateInvalid'))
      return
    poDate1 = new moment($scope.currentOrder.PODate)
    poDate2 = new moment($scope.currentOrder.PODate)
    minDate = new Date(poDate1.add('months', -3).format('YYYY-MM-DD'))
    maxDate = new Date(poDate2.add('months', 3).format('YYYY-MM-DD'))
    if(invoiceDate < minDate || invoiceDate > maxDate) 
      messager.warning($translate('warning_invoice.invoiceDateRange'))
      return false
    if (!$scope.currentInvoice.InvoiceNumber || $scope.currentInvoice.InvoiceNumber.length<=0)
      messager.error($translate('error_invoice.invoiceNumberEmpty'))
      return
    
    if (!$scope.NewInvoice.ItemList || $scope.NewInvoice.ItemList.length<=0)
      messager.error($translate('error_invoice.invoiceInvalid'))   
      return  
       
    if($scope.currentInvoice.TotalAmount > 99999999.99)      
      messager.clear()
      messager.warning($translate('warning_invoice.totalAmountInvalid'))
      return
         
    msg = $translate('confirm_invoice.submitEnd')
    for Item in  $scope.currentInvoice.ItemList  
      if (Item.PricetoInvoice > Item.UnitPrice && Item.QtytoInvoice>0 && Item.PricetoInvoice>0)
        msg1 = $translate('confirm_invoice.priceInvalid')
       
      if (Item.QtytoInvoice > Item.Quantity && Item.QtytoInvoice>0 && Item.PricetoInvoice>0)
        msg2 = $translate('confirm_invoice.qtyInvalid')
         
      if (Item.QtytoInvoice == 0 )
        msg3 = $translate('confirm_invoice.qtyToInvoiceInvalid')
         
      if (Item.PricetoInvoice ==0)
        msg4 = $translate('confirm_invoice.priveToInvoiceInvalid')
            
      if (Item.ItemACKStatus =="Reject" && Item.QtytoInvoice>0 && Item.PricetoInvoice>0)
        msg5 = $translate('confirm_invoice.itemReject')
    tmpmsg = ""
    if (msg1)    
      tmpmsg = msg1 + tmpmsg
    if (msg2)    
      tmpmsg = msg2 + tmpmsg
    if (msg3)    
      tmpmsg = msg3 + tmpmsg
    if (msg4)    
      tmpmsg = msg4 + tmpmsg
    if (msg5)    
      tmpmsg = msg5 + tmpmsg
    
    msg = tmpmsg + msg
      
    if ($scope.option == "create")
      common.confirmBox msg,"", ->  
        $scope.optionAble()   
        $scope.CreateInvoice() 
    else    
      common.confirmBox msg,"", ->  
        $scope.optionAble()  
        $scope.UpdateInvoice() 

 #buildItemList    
  $scope.buildItemList = ->  
    $scope.NewInvoice={}
    $scope.NewInvoice.ItemList = []
    
    $scope.NewInvoice.TransactionNumber = $scope.currentInvoice.TransactionNumber
    $scope.NewInvoice.VendorNumber = common.currentUser.VendorNumber
    $scope.NewInvoice.CompanyCode = $scope.currentOrder.CompanyCode
    $scope.NewInvoice.CurrencyCode = $scope.currentOrder.CurrencyCode
    $scope.NewInvoice.CurrencyExchangeRate = $scope.currentOrder.CurrencyExchangeRate
    $scope.NewInvoice.InvoiceDate = $scope.currentInvoice.InvoiceDate
    $scope.NewInvoice.InvoiceNumber = $scope.currentInvoice.InvoiceNumber.trim()
    $scope.NewInvoice.TaxInfo = $scope.currentInvoice.TaxInfo
    $scope.NewInvoice.InvoiceType = "DebitInvoice"
    $scope.NewInvoice.PONumber = $scope.currentOrder.PONumber
    $scope.NewInvoice.TotalAmount = $scope.currentInvoice.TotalAmount
    
    if ($scope.currentInvoice.Freight >=0)
      $scope.NewInvoice.Freight = $scope.currentInvoice.Freight
      $scope.NewInvoice.FreightType = "Charge"
    else
      $scope.NewInvoice.Freight = $scope.currentInvoice.Freight * -1
      $scope.NewInvoice.FreightType = "Allowance"
    
    if ($scope.currentInvoice.Tax >=0)
      $scope.NewInvoice.TaxType = "Charge"
      $scope.NewInvoice.Tax = $scope.currentInvoice.Tax
    else       
      $scope.NewInvoice.TaxType = "Allowance"
      $scope.NewInvoice.Tax = $scope.currentInvoice.Tax * -1
      
     
    for item in $scope.currentOrder.ItemList
      if (item.PricetoInvoice>0 && item.QtytoInvoice>0)
        invoiceItem = {
          UnitPrice: item.PricetoInvoice,
          VendorPartNumber: item.VendorPartNumber,
          CurrencyCode: item.CurrencyCode,
          CurrencyExchangeRate: item.CurrencyExchangeRate, 
          Quantity: item.QtytoInvoice, 
          UPC: item.UPC, 
          NeweggItemNumber: item.NeweggItemNumber 
        }      
        $scope.NewInvoice.ItemList.push(invoiceItem)
        
  $scope.GetPricetoInvoiceClass=(item)->
    if(item.PricetoInvoice > item.UnitPrice|| item.PricetoInvoice<0 || item.PricetoInvoice >99999999.99 || item.wrongPriceAlert)
       return {'vp-invoicedetail-wrongValue':  true}
    if(item.PricetoInvoice <= item.UnitPrice) 
       return {'vp-invoicedetail-Value':true }

  $scope.GetQtytoInvoiceClass=(item)->
    if(item.QtytoInvoice > item.Quantity ||item.QtytoInvoice<0 || item.wrongQtyAlert)
       return {'vp-invoicedetail-wrongValue':  true}
    if(item.QtytoInvoice <= item.Quantity) 
       return {'vp-invoicedetail-Value':true }
])