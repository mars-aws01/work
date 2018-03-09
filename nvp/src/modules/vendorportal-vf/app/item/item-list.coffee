angular.module('vf-itemlist',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal.itemlist.us)
    .translations('zh-cn',resources.vendorportal.itemlist.cn)
    .translations('zh-tw',resources.vendorportal.itemlist.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/itemlist",
      templateUrl: "/modules/vendorportal-vf/app/item/item-list.tpl.html"
      controller: 'ItemListCtrl'
])

.controller('ItemListCtrl',
["$scope","$window","$http","messager","item","itemAPI","warehouseAPI","common",'uuid','userAPI','$filter', "$translate","$q"
($scope,$window,$http,messager,item,itemAPI,warehouseAPI,common,uuid,userAPI,$filter,$translate,$q) ->

  $scope.subHeight = 150
  $scope.dataGridName = "itemListGrid"
  $scope.refreshKey = "refresh.items"
  $scope.UserList=[]
  $scope.guidReg = /[A-Fa-f0-9]{8}(-[A-Fa-f0-9]{4}){3}-[A-Fa-f0-9]{12}/
  
  common.initUnSavedConfirm($scope)
  
  $scope.hasFilterRow = ->
    if(!$scope.currentQuery)
      return false
    if($scope.advancedQuery.UnlistedOnly||$scope.advancedQuery.MyItemsOnly||$scope.advancedQuery.CreatedFrom||$scope.advancedQuery.CreatedTo||$scope.advancedQuery.UpdatedFrom||$scope.advancedQuery.UpdatedTo||$scope.advancedQuery.UnitPriceTo||$scope.advancedQuery.QuantityTo)
      return true
    return false
    
  item.advancedQuery.VendorNumber = common.currentUser.VendorNumber
  item.advancedQuery.ExactMatch = false
  $scope.advancedkeyList = angular.copy(item.keyList)
  $scope.advancedQuery = angular.copy(item.advancedQuery)
  $scope.advancedSearchTextOutput={} 
  $scope.currentItem = null
  $scope.currentItemBak = null
  $scope.quantityDisabled=false
  $scope.currentSelectedItems=[]
  $scope.currentAllRows=[]
  $scope.itemStatusList = [{text: "Listed",value: "A"},{text: "Unlisted", value: "D"}]
  $scope.vendorWarehouses=[]
  $scope.slectedItemWarehouseStockList=[]
  $scope.isSingleWarehouseVendor = true
  $scope.saveChangedEnabled=false
  $scope.common = common

  #query vendor all warehouse info
  $scope.queryWarehouseAPI=(showDoSearch)->
    deferred = $q.defer()
    warehouseAPI.search {vendornumber:common.currentUser.VendorNumber}
         ,(response)->
              if(response&&response.Succeeded)
                 response.Warehouses=$scope.delete9N9XWarehouseInfo(response.Warehouses)
                 response.Warehouses.sort (a,b)->
                     $scope.sortBy('VendorWarehouseNumber', a, b, false)
                 $scope.vendorWarehouses=response.Warehouses
                 for wh in $scope.vendorWarehouses when wh.IsPrimary and wh.VendorWarehouseNumber?
                     $scope.isSingleWarehouseVendor = false
                 if(showDoSearch)
                    $scope.advancedSearch()
              return deferred.resolve('')        
         ,(error)->
              return deferred.resolve('')
              
              
  $scope.delete9N9XWarehouseInfo=(WarehouseList)->
      WarehouseListNew = []
      for wh in WarehouseList when wh.WarehouseNumber.toLowerCase().indexOf('9n')!=0 and wh.WarehouseNumber.toLowerCase().indexOf('9x')!=0
          WarehouseListNew.push(wh)
      return WarehouseListNew   
      
      
  $scope.loadUserList =->
    requestUser = {
       action1: "query"
    }
    deferred = $q.defer()
    userAPI.queryUserList requestUser,
      (response) ->
        if(response&&response.Succeeded==true)
            $scope.UserList=response.UserList    
        return deferred.resolve('')                                    
     ,(error)->
        return deferred.resolve('') 
          
  #sorting initialized
  $scope.initSortInfo = ->
    $scope.advancedQuery.SortInfo = {SortField: 'updatedate,quantity,vendorpartnumber', SortType: 'ASC'}  
             
  #query entity initialized               
  $scope.currentQuery = angular.copy(item.advancedQuery)
  
  $scope.getSelectedItems = ->
    dataList = $("#"+$scope.dataGridName+"").data("kendoGrid").dataSource.data()
    result = []
    for order in dataList
      if(order.selected == true)
        result.push(order)
    return result      
    
  #PagingInfo
  $scope.pageChanged = (p)-> 
    return if common.currentUser.VendorNumber == "0"
    $scope.pageChangedCallQuery(p)
           
 
  $scope.pageChangedCallQuery=(p)->
    $scope.advancedQuery.PagingInfo.isExportAction = p.isExportAction
    $scope.advancedQuery.PagingInfo.isExportAction_All = p.isExportAction_All
    $scope.advancedQuery.PagingInfo.pageSize = p.pageSize
    $scope.advancedQuery.PagingInfo.currentPage = p.page
    $scope.advancedQuery.PagingInfo.startpageindex=p.page-1
    $scope.advancedQuery.PagingInfo.endpageindex=p.page-1
    common.setServerSorting($scope.advancedQuery, p)
    $scope.advancedSearch() 
              
  $scope.advancedSearch = ->
     common.setQueryFieldFromVdSearchControl($scope.advancedQuery,$scope.advancedSearchTextOutput)
     if($scope.advancedQuery.CreatedFrom && new Date($scope.advancedQuery.CreatedFrom).toString() == 'Invalid Date')
          messager.warning($translate('error_itemlist.createdFromDateInvalid'))
          return 
     if($scope.advancedQuery.CreatedTo && new Date($scope.advancedQuery.CreatedTo).toString() == 'Invalid Date')
          messager.warning($translate('error_itemlist.createdToDateInvalid'))
          return 
     if($scope.advancedQuery.UpdatedFrom && new Date($scope.advancedQuery.UpdatedFrom).toString() == 'Invalid Date')
          messager.warning($translate('error_itemlist.updateFromDateInvalid'))
          return 
     if($scope.advancedQuery.UpdatedTo && new Date($scope.advancedQuery.UpdatedTo).toString() == 'Invalid Date')
          messager.warning($translate('error_itemlist.updateToDateInvalid'))
          return 
     if($scope.advancedQuery.MyItemsOnly == true)
        $scope.advancedQuery.User=common.currentUser.ID
     else
        delete $scope.advancedQuery.User      
     item.advancedQuery = angular.copy($scope.advancedQuery)
     if(item.advancedQuery.CreatedFrom=='')
        delete item.advancedQuery.CreatedFrom
     else
        item.advancedQuery.CreatedFrom2 = angular.copy(item.advancedQuery.CreatedFrom)
        item.advancedQuery.CreatedFrom=common.convertToDatetime(item.advancedQuery.CreatedFrom,false) 
          
     if(item.advancedQuery.CreatedTo=='')
        delete item.advancedQuery.CreatedTo 
     else
        item.advancedQuery.CreatedTo2 = angular.copy(item.advancedQuery.CreatedTo)
        item.advancedQuery.CreatedTo=common.convertToDatetime(item.advancedQuery.CreatedTo,true)
            
     if(item.advancedQuery.UpdatedFrom=='')
        delete item.advancedQuery.UpdatedFrom
     else
        item.advancedQuery.UpdatedFrom2 = angular.copy(item.advancedQuery.UpdatedFrom)
        item.advancedQuery.UpdatedFrom=common.convertToDatetime(item.advancedQuery.UpdatedFrom,false)
        
     if(item.advancedQuery.UpdatedTo=='')
        delete item.advancedQuery.UpdatedTo
     else
        item.advancedQuery.UpdatedTo2 = angular.copy(item.advancedQuery.UpdatedTo)
        item.advancedQuery.UpdatedTo=common.convertToDatetime(item.advancedQuery.UpdatedTo,true)
     requestItem = angular.copy(item.advancedQuery)
     $scope.queryAPI(requestItem)


  #new add start  
  $scope.preparePaging = ->
    subHeight2 =  (if $scope.hasFilterRow() == true then 32 else 0)
    $scope.initSortInfo()
    $scope.advancedQuery.PagingInfo = common.getPagging($scope.advancedQuery.PagingInfo)
    
  $scope.search = ->
     messager.clear()
     $scope.preparePaging()
     common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.advancedQuery.PagingInfo)
     
  $scope.changeVendor=->
    $scope.isSingleWarehouseVendor=true
    promiss1 = $scope.loadUserList().$promise
    promiss2 = $scope.queryWarehouseAPI(false).$promise
    $q.all([promiss1,promiss2]).then($scope.search)  
       
  #search click   
  $scope.startSearch = ->
     $scope.search()       
           
  $scope.removeQueryFiled = (filedName) ->
    if(filedName == 'all')
      delete $scope.advancedQuery['CreatedFrom']
      delete $scope.advancedQuery['CreatedTo']
      delete $scope.advancedQuery['UpdatedFrom']
      delete $scope.advancedQuery['UpdatedTo']
      delete $scope.advancedQuery['UnitPriceTo']
      delete $scope.advancedQuery['QuantityTo']
      $scope.advancedQuery.UnlistedOnly = false
      $scope.advancedQuery.MyItemsOnly = false
    else if(filedName == 'UnlistedOnly')
      $scope.advancedQuery.UnlistedOnly = false
    else if(filedName == 'MyItemsOnly')
      $scope.advancedQuery.MyItemsOnly = false
    else
      delete $scope.advancedQuery[filedName]
    $scope.search()

  #new add end     
  
  $scope.queryAPI = (requestItem) ->
     requestItem.action = "query"
     if(!requestItem.PagingInfo)
        requestItem.PagingInfo = $scope.preparePaging()
     requestItem.VendorNumber = common.currentUser.VendorNumber
     requestItem = common.getRequestQuery(requestItem,$scope) 
     response = itemAPI.search requestItem,
       ->
          $scope.saveChangedEnabled=false
          if(response&&response.Succeeded)
             if(response.ItemList!=null&&response.ItemList.length>0)
                for item in response.ItemList
                    item.Status=if item.Status?&&item.Status.toLowerCase()=='d' then 'D' else 'A'
                    item.StatusDB=item.Status
                    item.ManufacturerDB=item.Manufacturer
                    item.ManufacturerPartNumberDB=item.ManufacturerPartNumber
                    item.UPCDB=item.UPC
                    item.DescriptionDB=item.Description
                    item.UnitPriceDB=item.UnitPrice
                    item.UpdateDateForExport=common.convertToLocalTime(item.UpdateDate,'MM/DD/YYYY h:mm:ss A')
                    item.CreateDateForExport=common.convertToLocalTime(item.CreateDate,'MM/DD/YYYY h:mm:ss A')
                    item.StatusForExport=if item.Status=='D' then 'UnListed' else 'Listed'
                    item.UpdateDateDB=item.UpdateDate
                    item.UpdateUserDB=item.UpdateUser
                    $scope.prepareItemForEditing(item)
                    item.WarehouseListDB = angular.copy(item.WarehouseList)
                    if(item.WarehouseList.length>0)  
                        totalQty=0
                        for wh in item.WarehouseList
                            totalQty=totalQty+parseInt(wh.Quantity) 
                        item.Quantity=totalQty    
                    item.QuantityDB=item.Quantity    
                    item.IsChanged=false
                    if (item.AutoClearStorageWarning == -1)
                        item.TipMessage=$translate('tip_itemlist.outOfDate')
                    else if (item.AutoClearStorageWarning == 1)
                        item.TipMessage=$translate('tip_itemlist.within1Day')
                    else if (item.AutoClearStorageWarning == 2)
                        item.TipMessage=$translate('tip_itemlist.within2Days')
                    else
                        item.TipMessage=""
             #$scope.loadUserList(response.ItemList)
             $scope.setItemListResultUser(response.ItemList,$scope.UserList)
             #$scope.data = response.ItemList
             $scope.callbackEvent(response) if $scope.callbackEvent
             #common.clearList($scope.currentSelectedItems)
       ,(error) ->
          $scope.callbackEventError(error) if $scope.callbackEventError 
        
  if(common.currentUser.VendorNumber != '0')
     promiss1 = $scope.loadUserList().$promise
     promiss2 = $scope.queryWarehouseAPI(false).$promise
     $q.all([promiss1,promiss2]).then($scope.search)  

  #edit model click   
  $scope.openEditItemModal = (entity)->
      if($scope.vendorWarehouses.length<1)
         return
      $scope.currentItem = entity
      $scope.currentItemBak = angular.copy($scope.currentItem)
      $scope.editItemModal = true  
  #edit model ok click
  $scope.editOKClick=->
       if($scope.editItemForm.$invalid)
            if($scope.currentItemBak.Manufacturer==undefined)
                messager.error($translate('error_itemlist.manufacturerInvalid'))
                return
            if($scope.currentItemBak.ManufacturerPartNumber==undefined)
                messager.error($translate('error_itemlist.mPartNumberInvalid'))
                return
            return
       if($scope.currentItemBak.UnitPrice<=0)
            messager.error($translate('error_itemlist.costInvalid'))
            return    
       if($scope.currentItem.Manufacturer!=$scope.currentItemBak.Manufacturer)
            $scope.currentItem.Manufacturer=$scope.currentItemBak.Manufacturer
       if($scope.currentItem.ManufacturerPartNumber!=$scope.currentItemBak.ManufacturerPartNumber)
            $scope.currentItem.ManufacturerPartNumber=$scope.currentItemBak.ManufacturerPartNumber
       if($scope.currentItem.UPC!=$scope.currentItemBak.UPC)
            $scope.currentItem.UPC=$scope.currentItemBak.UPC         
       if($scope.currentItem.Description!=$scope.currentItemBak.Description)
            $scope.currentItem.Description=$scope.currentItemBak.Description
       
       if($scope.currentItem.UnitPrice!=$scope.currentItemBak.UnitPrice)     
            $scope.currentItem.UnitPrice=$scope.currentItemBak.UnitPrice    
       if($scope.isSingleWarehouseVendor&&$scope.currentItem.Quantity!=$scope.currentItemBak.Quantity)
            $scope.currentItem.Quantity=$scope.currentItemBak.Quantity
       
       if(!$scope.isSingleWarehouseVendor)
            $scope.currentItem.WarehouseList=angular.copy($scope.currentItemBak.WarehouseList)
            #totalQty=$scope.currentItem.QuantityDB
            totalQty=0
            for wh in $scope.currentItem.WarehouseList
                totalQty=totalQty+parseInt(wh.Quantity)
            $scope.currentItem.Quantity=totalQty
       $scope.setIsChanged($scope.currentItem)     
       $scope.checkDuplicate($scope.currentItem)
       if($scope.currentItem.IsChanged)
            $scope.saveChangedEnabled = true         
       $scope.editItemModal = false
       
  #edit model cancel click                    
  $scope.closeEditItemModal=->
      $scope.editItemModal = false

  #edit warehouse stock
  $scope.openWarehouseDetail=(entity)->
    if($scope.vendorWarehouses.length<1)
        return
    $scope.currentItem = entity
    $scope.currentItemBak = angular.copy($scope.currentItem)
    $scope.isEditStockQty=false
    $scope.warehouseDetailModal = true
    
  $scope.editStockQtyClick=->
    $scope.isEditStockQty=true 
     
  $scope.editStockQtyOKClick=->
    $scope.currentItem.WarehouseList=angular.copy($scope.currentItemBak.WarehouseList)
    totalQty=0
    for wh in $scope.currentItem.WarehouseList
        totalQty=totalQty+parseInt(wh.Quantity)
    $scope.currentItem.Quantity=totalQty    
    $scope.setIsChanged($scope.currentItem)     
    if($scope.currentItem.IsChanged)
        $scope.saveChangedEnabled = true
    $scope.warehouseDetailModal = false    
        
  #add model click            
  $scope.addNewItemClick =->                      
        $scope.createdItem = {}
        $scope.createdItem.Status='A'
        $scope.createdItem.WarehouseList=[]
        $scope.prepareItemForEditing($scope.createdItem)
        $scope.quantityDisabled=false
        $scope.addItemModal = true
  
  #add model cancel click            
  $scope.closeAddItemModal=->
        $scope.addItemModal = false 
  
  #add model ok click              
  $scope.addOKClick=->
        if($scope.addItemForm.$invalid)
            if($scope.createdItem.VendorPartNumber==undefined)
                messager.error($translate('error_itemlist.vendorPartNumberRequired'))
                return
            if($scope.createdItem.Manufacturer==undefined)
                messager.error($translate('error_itemlist.manufacturerRequired'))
                return
            if($scope.createdItem.ManufacturerPartNumber==undefined)
                messager.error($translate('error_itemlist.mPartNumberRequired'))
                return
            return    
        patrn=/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi
        if(patrn.exec($scope.createdItem.VendorPartNumber))
            messager.error($translate('error_itemlist.vendorPartNumberInvalid'))
            return        
        requestItem={}    
        requestItem.action = "query"
        requestItem.PagingInfo = {"startPageIndex":0,"endPageIndex":0,"pageSize":"10"}
        requestItem.VendorNumber= common.currentUser.VendorNumber
        requestItem.VendorPartNumber= $scope.createdItem.VendorPartNumber
        requestItem.NeedBusinessValidation=false
        itemAPI.search requestItem
            ,(response)->
                if(response.ItemList!=null&&response.ItemList.length>0)
                    existingItem=response.ItemList[0]
                    mfrPartNumber= if $scope.createdItem.ManufacturerPartNumber==null then '' else $scope.createdItem.ManufacturerPartNumber
                    upcCode=if $scope.createdItem.UPC==null then '' else $scope.createdItem.UPC
                    itemNumber=if existingItem.NeweggItemNumber==null then '' else existingItem.NeweggItemNumber
                    mfrName=if $scope.createdItem.Manufacturer==null then '' else $scope.createdItem.Manufacturer
                        
                    eManufacturerPartNumber=existingItem.ManufacturerPartNumber
                    eUPCCode=existingItem.UPC
                    checkResult=0

                    if (itemNumber?&&itemNumber isnt '')
                        if((eManufacturerPartNumber?&&eManufacturerPartNumber isnt '') && (mfrPartNumber?&&mfrPartNumber isnt '') && eManufacturerPartNumber!=mfrPartNumber)
                            checkResult=2
                        if((eUPCCode?&&eUPCCode isnt '') && (upcCode?&&upcCode isnt '') && eUPCCode!=upcCode)
                            checkResult=2 
                               
                    $scope.createdItem.IsDuplicate= if checkResult>0 then true else false
                    
                    if(checkResult>0)
                        common.confirmBox $translate('confirm_itemlist.sameVendorPartNumber'),"", ->
                            $scope.createNewItem($scope.createdItem)            
                    else
                        $scope.createNewItem($scope.createdItem) 
                 else
                    $scope.createNewItem($scope.createdItem)                                                                                         
            ,(error)->
                 #do something

  $scope.createNewItem=(item)->
        catalogInventoryRequest={ItemList:[],VendorNumber: common.currentUser.VendorNumber,RequestInfo:{ UserID:common.currentUser.ID,SystemSource:'VendorPortal',RequestGuid:uuid.newguid(),RequestTimeUtc:new Date()}}
        tempItem={}
        tempItem.VendorPartNumber=item.VendorPartNumber
        tempItem.Manufacturer=item.Manufacturer
        tempItem.ManufacturerPartNumber=item.ManufacturerPartNumber
        tempItem.UPC=item.UPC
        tempItem.Description=item.Description
        tempItem.UnitPrice=item.UnitPrice
        tempItem.Quantity=item.Quantity
        tempItem.Status=item.Status
        tempItem.UpdateUser=item.UpdateUser
        tempItem.UpdateDate=item.UpdateDate
        tempItem.WarehouseList=[]
        totalQty=0
        for wh in item.WarehouseList
            totalQty=totalQty+parseInt(wh.Quantity)
            tempItem.WarehouseList.push({VendorWarehouseNumber:wh.VendorWarehouseNumber,Quantity:wh.Quantity})
        if(!$scope.isSingleWarehouseVendor) 
            tempItem.Quantity=totalQty       
        catalogInventoryRequest.ItemList.push(tempItem)        
        if(catalogInventoryRequest.ItemList.length>0)
            catalogInventoryRequest.NeedBusinessValidation=false
            itemAPI.create catalogInventoryRequest
                ,(response)->
                    if(response&&response.Succeeded)
                        if (item.IsDuplicate)
                            messager.warning($translate('warning_itemlist.isDuplicate'));
                        else
                            messager.success($translate('success_itemlist.createNewItem'))
                        $scope.addItemModal = false
                        $scope.startSearch()
                    else
                        messager.error($translate('error_itemlist.createNewItem'))               
                ,(error)->

                                                                                    
  #------------------action start---------------------                                                                
  $scope.unlistItemsClick =->
        $scope.currentSelectedItems = $scope.getSelectedItems()
        if($scope.currentSelectedItems==null||$scope.currentSelectedItems.length==0)
            messager.error($translate('error_itemlist.selectNone'))
        else
            for item in $scope.currentSelectedItems
                item.Status='D'
                item.Quantity=0
                for wh in item.WarehouseList
                    wh.Quantity=0
                $scope.setIsChanged(item)
                if(item.IsChanged)
                    $scope.saveChangedEnabled = true      
            
            
  $scope.relistUnlistItemsClick =->
        $scope.currentSelectedItems = $scope.getSelectedItems()
        if($scope.currentSelectedItems==null||$scope.currentSelectedItems.length==0)
            messager.error($translate('error_itemlist.selectNone'))
        else
            for item in $scope.currentSelectedItems
                item.Status='A'
                $scope.setIsChanged(item)
                if(item.IsChanged)
                    $scope.saveChangedEnabled = true    
            
            
  $scope.republishItemsClick =->
        $scope.currentSelectedItems = $scope.getSelectedItems()
        if($scope.currentSelectedItems==null||$scope.currentSelectedItems.length==0)
            messager.error($translate('error_itemlist.selectNone'));
        else
            for item in $scope.currentSelectedItems
                if(item.IsChanged == false)  
                    item.UpdateDate=new Date()
                    item.UpdateUser=common.currentUser.ID
                    item.UpdateUserName=common.currentUser.LoginName
                    item.IsChanged=true
                    $scope.saveChangedEnabled = true
                    
                                      
  $scope.resetItemChangesClick =->
        $scope.currentSelectedItems = $scope.getSelectedItems()
        if($scope.currentSelectedItems==null||$scope.currentSelectedItems.length==0)
            messager.error($translate('error_itemlist.selectNone'));
        else
            for item in $scope.currentSelectedItems
                item.Status=item.StatusDB
                item.Manufacturer=item.ManufacturerDB
                item.ManufacturerPartNumber=item.ManufacturerPartNumberDB
                item.UPC=item.UPCDB
                item.Description=item.DescriptionDB
                item.UnitPrice=item.UnitPriceDB
                item.Quantity=item.QuantityDB
                item.UpdateDate=item.UpdateDateDB
                item.UpdateUser=item.UpdateUserDB
                item.UpdateUserName=item.UpdateUserNameDB
                item.WarehouseList = angular.copy(item.WarehouseListDB)
                item.IsChanged=false
            if($scope.hasChangedItems()==false)    
                $scope.saveChangedEnabled = false
            
                
  $scope.updateCatalogClick =->
        messager.clear()
        catalogInventoryRequest={ItemList:[],VendorNumber:common.currentUser.VendorNumber,RequestInfo:{ UserID:common.currentUser.ID,SystemSource:'VendorPortal',RequestGuid:uuid.newguid(),RequestTimeUtc:new Date()},NeedBusinessValidation:false}
        foundDuplcateItem=false
        dataList = $("#"+$scope.dataGridName+"").data("kendoGrid").dataSource.data()
        for item in dataList
            if(item.IsDuplicate)
                foundDuplcateItem=true
            if(item.IsChanged)
                tempItem={}
                tempItem.VendorPartNumber=item.VendorPartNumber
                tempItem.Manufacturer=item.Manufacturer
                tempItem.ManufacturerPartNumber=item.ManufacturerPartNumber
                tempItem.UPC=item.UPC
                tempItem.Description=item.Description
                tempItem.UnitPrice=item.UnitPrice
                tempItem.Quantity=item.Quantity
                tempItem.Status=item.Status
                tempItem.UpdateUser=item.UpdateUser
                tempItem.UpdateUserName=item.UpdateUserName
                tempItem.UpdateDate=item.UpdateDate
                tempItem.WarehouseList=[]
                for wh in item.WarehouseList
                    tempItem.WarehouseList.push({VendorWarehouseNumber:wh.VendorWarehouseNumber,Quantity:wh.Quantity})
                catalogInventoryRequest.ItemList.push(tempItem)
        if(catalogInventoryRequest.ItemList.length==0)
            messager.warning($translate('warning_itemlist.noItemsHasModified'))
            return                
        else
            itemAPI.save catalogInventoryRequest
                ,(response)->
                    if(response&&response.Succeeded)
                        if (foundDuplcateItem)
                            messager.warning($translate('warning_itemlist.foundDuplcateItem'));
                        messager.success($translate('success_itemlist.updateCatalog'))
                        $scope.saveChangedEnabled=false
                        for item in dataList
                            item.StatusDB=item.Status
                            item.ManufacturerDB=item.Manufacturer
                            item.ManufacturerPartNumberDB=item.ManufacturerPartNumber
                            item.UPCDB=item.UPC
                            item.DescriptionDB=item.Description
                            item.UnitPriceDB=item.UnitPrice
                            item.QuantityDB=item.Quantity
                            item.UpdateDateDB=item.UpdateDate
                            item.UpdateUserDB=item.UpdateUser
                            item.UpdateUserNameDB=item.UpdateUserName
                            $scope.prepareItemForEditing(item)
                            item.WarehouseListDB = angular.copy(item.WarehouseList)
                            item.IsChanged=false
                            item.IsDuplicate=false
                    else
                        messager.error($translate('error_itemlist.updateCatalog'))       
                ,(error)->
  #------------------action end---------------------   
                                    

  #---------------other function start--------------          
  $scope.prepareItemForEditing=(itemInfoEntity)->
       if(itemInfoEntity==null)
            return
       if(!$scope.isSingleWarehouseVendor)
            for vWh in $scope.vendorWarehouses when vWh.VendorWarehouseNumber!=''
                hasExists = false
                for wh in itemInfoEntity.WarehouseList 
                    if(vWh.VendorWarehouseNumber==wh.VendorWarehouseNumber)
                         hasExists = true
                         break
                if(hasExists==false)         
                    itemInfoEntity.WarehouseList.push({VendorWarehouseNumber:vWh.VendorWarehouseNumber,Quantity:0})         
            itemInfoEntity.WarehouseList.sort (a,b)->
                $scope.sortBy('VendorWarehouseNumber', a, b, false) 
            for wh in itemInfoEntity.WarehouseList
                wh.QuantityDB=wh.Quantity 
  
                        
  $scope.setIsChanged=(item)->
       item.IsChanged=false
       item.IsChanged=(item.Manufacturer!=item.ManufacturerDB)||(item.ManufacturerPartNumber!=item.ManufacturerPartNumberDB)||(item.UPC!=item.UPCDB)||(item.Description!=item.DescriptionDB)||(item.Manufacturer!=item.ManufacturerDB)||(item.UnitPrice!=item.UnitPriceDB)||(item.Quantity!=item.QuantityDB)||(item.Status!=item.StatusDB)
       if(item.IsChanged==false)
            for wh in item.WarehouseList
                if(wh.QuantityDB!=wh.Quantity)
                     item.IsChanged==true
                     break
                     
  $scope.hasChangedItems=->
        dataList = $("#"+$scope.dataGridName+"").data("kendoGrid").dataSource.data()
        if(dataList?)
            for item in dataList
                if(item.IsChanged) 
                    return true
        return false
        
  $scope.hasCheckedItems=->
        $scope.currentSelectedItems = $scope.getSelectedItems()
        if($scope.currentSelectedItems==null||$scope.currentSelectedItems.length==0)
            return false
        return true    
                                
  $scope.checkDuplicate=(editItem)->
       if(editItem.IsChanged)
            requestItem={}    
            requestItem.action = "query"
            requestItem.PagingInfo = {"startPageIndex":0,"endPageIndex":0,"pageSize":"10"}
            requestItem.VendorNumber= common.currentUser.VendorNumber
            requestItem.VendorPartNumber= editItem.VendorPartNumber
            requestItem.NeedBusinessValidation=false
            itemAPI.search requestItem
                ,(response)->
                    if(response.ItemList!=null&&response.ItemList.length>0)
                            existingItem=response.ItemList[0]
                            mfrPartNumber=editItem.ManufacturerPartNumber
                            mfrPartNumberDB=existingItem.ManufacturerPartNumber 
                            upcCode=editItem.UPC
                            upcCodeDB=existingItem.UPC
                            itemNumber=editItem.NeweggItemNumber
                            if(itemNumber? and itemNumber isnt '')
                                if((mfrPartNumber? and mfrPartNumber isnt'') and (mfrPartNumberDB? and mfrPartNumberDB isnt'') and mfrPartNumberDB!=mfrPartNumber)
                                    editItem.IsDuplicate=true
                                if((upcCode? and upcCode isnt'') and (upcCodeDB? and upcCodeDB isnt'') and upcCodeDB!=upcCode)
                                    editItem.IsDuplicate=true   
                    
                  
  $scope.statusChange =->
        if($scope.createdItem.Status=='D')
            $scope.createdItem.Quantity=0
            $scope.quantityDisabled=true
            for wh in $scope.createdItem.WarehouseList
                wh.Quantity=0
        else
            $scope.quantityDisabled=false  
            
  $scope.closeWarehouseDetail=->
        $scope.warehouseDetailModal = false     
                         
  $scope.sortBy = (key, a, b, r) ->
        r = if r then 1 else -1
        return -1*r if a[key] > b[key]
        return +1*r if a[key] < b[key]
        return 0
        
  #---------------other function end--------------    

     
  $scope.setItemListResultUser=(itemList,UserList)->
    for item in itemList
        for user in UserList
            if(item.CreateUser==user.ID.toString())
                item.CreateUserName=user.LoginName
            if(item.UpdateUser==user.ID.toString())
                item.UpdateUserName=user.LoginName
                item.UpdateUserNameDB=user.LoginName     
        if(item.CreateUserName==undefined)
            if(isNaN(item.CreateUser)==false)
                item.CreateUserName='Newegg'
            else if($scope.guidReg.test(item.CreateUser))   
                item.CreateUserName='System Admin User'
            else
                item.CreateUserName=item.CreateUser
                                 
        if(item.UpdateUserName==undefined)
            if(isNaN(item.UpdateUser)==false)
                item.UpdateUserName='Newegg'
                item.UpdateUserNameDB='Newegg' 
            else if($scope.guidReg.test(item.UpdateUser))
                item.UpdateUserName='System Admin User'
                item.UpdateUserNameDB='System Admin User'
            else
                item.UpdateUserName=item.UpdateUser
                item.UpdateUserNameDB=item.UpdateUser        
  
  #*****************************New Data Grid***********************************         
  $scope.itemListOptions =
    height:common.getTableHeight(111) + "px"
    checkBoxColumn:true
    columnMenu: true
    toolbar: ["excel","excelAll"]
    dataSource: 
        type: "odata"
        transport:
            read: (options) ->
                 $scope.callbackEvent = (result) ->
                        options.success d:
                              results: result.ItemList or []
                              __count: result.TotalRecordCount  
                 common.queryCallbackEventError($scope,options)
                 $scope.pageChanged(options.data)  
        requestStart: (e) ->
            if($scope.hasChangedItems() && e.sender.options.isExportAction != true )
                if(!confirm($translate('confirm_itemlist.dntSave'))) 
                    e.sender._page= $scope.advancedQuery.PagingInfo.currentPage
                    e.sender._pageSize= $scope.advancedQuery.PagingInfo.pageSize
                    e.preventDefault()  
        schema: {
                    model: {
                        fields: {
                            UnitPrice: { type: "number" }
                            Quantity: { type: "number" }
                        }
                    }
                }             
        serverPaging: true
        serverSorting: true
    filterable: true
    columns: [
                {
                    title: "{{ 'header_itemlist.action' | translate  }}"
                    width: "54px"
                    template: kendo.template($("#tpl_itemList_action").html())
                    locked: true
                }
                {
                    field: "StatusForExport"
                    title: "Status"
                    headerTemplate:"{{ 'header_itemlist.status' | translate }}"
                    width: "100px"
                    template: kendo.template($("#tpl_itemList_status").html())
                    locked: true
                }
                {
                    field: "VendorPartNumber"
                    title: "Vendor Part #"
                    sortfield:"VendorPartNumber"
                    headerTemplate: "{{ 'header_itemlist.vendorPartNumber' | translate }}"
                    width: "200px"
                    template: kendo.template($("#tpl_itemList_vendorpartnumber").html())
                    locked: true
                }
                {
                    field: "NeweggItemNumber"
                    width: "140px"
                    title: "NE Part #"
                    sortfield:"NeweggItemNumber"
                    headerTemplate: "{{ 'header_itemlist.nePartNumber' | translate }}",
                    template: kendo.template($("#tpl_itemList_neweggitemnumber").html())
                }
                {
                    field: "NeweggItemStatus"
                    width: "100px"
                    title: "NE Status"
                    sortfield:"NeweggItemStatus"
                    headerTemplate: "{{ 'header_itemlist.neStatus' | translate }}",
                    template: kendo.template($("#tpl_itemList_neweggitestatus").html())
                    sortable: false
                }
                {
                    field: "Manufacturer"
                    width: "150px"
                    title: "Manufacturer"
                    sortfield:"Manufacturer"
                    headerTemplate: "{{ 'header_itemlist.manufacturer' | translate }}",
                    template: kendo.template($("#tpl_itemList_manufacturer").html())
                }
                {
                    field: "ManufacturerPartNumber"
                    width: "150px"
                    title: "Manufacturer Part #"
                    sortfield:"ManufacturerPartNumber"
                    headerTemplate: "{{ 'header_itemlist.manufacturerPartNumber' | translate }}",
                    template: kendo.template($("#tpl_itemList_manufacturerpartnumber").html())
                }
                {
                    field: "UPC"
                    width: "110px"
                    title: "UPC"
                    sortfield:"UPC"
                    headerTemplate: "{{ 'header_itemlist.UPC' | translate }}",
                    template: kendo.template($("#tpl_itemList_upc").html())
                }
                {
                    field: "Description"
                    width: "100px"
                    title: "Description"
                    headerTemplate: "{{ 'header_itemlist.description' | translate }}",
                    template: kendo.template($("#tpl_itemList_description").html())
                }
                {
                    field: "UnitPrice"
                    width: "100px"
                    title: "Cost"
                    exportHeaderFormat: "{0} ({1})"
                    exportHeaderFields:"title,CurrencyCode"
                    sortfield:"UnitPrice"
                    headerTemplate: "<div>{{ 'header_itemlist.price' | translate }}<vd-profile-label type=\"{{ 'CurrencyCode' }}\"></vd-profile-label></div>",
                    template: kendo.template($("#tpl_itemList_unitprice").html())
                    originalTitle:"Cost"
                }
                {
                    field: "Quantity"
                    width: "100px"
                    title: "Qty"
                    sortfield:"Quantity"
                    headerTemplate: "{{ 'header_itemlist.qty' | translate }}",
                    template: kendo.template($("#tpl_itemList_quantity").html())
                }    
                {
                    field: "UpdateDateForExport"
                    width: "150px"
                    title: "Updated Date"
                    sortfield:"UpdateDate"
                    headerTemplate: "{{ 'header_itemlist.dateUpdated' | translate }}",
                    template: kendo.template($("#tpl_itemList_updatedate").html())
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }             
                {
                    field: "UpdateUserName"
                    width: "150px"
                    title: "Updated User"
                    headerTemplate: "{{ 'header_itemlist.updatedUser' | translate }}",
                    template: kendo.template($("#tpl_itemList_updateusername").html())
                }   
                {
                    field: "CreateDateForExport"
                    width: "150px"
                    title: "Created Date"
                    sortfield:"CreateDate"
                    headerTemplate: "{{ 'header_itemlist.dateCreated' | translate }}",
                    template: kendo.template($("#tpl_itemList_createdate").html())
                    type:"date"
                    format: "{0:MM/dd/yyyy h:mm:ss tt}"
                }    
                {
                    field: "CreateUserName"
                    width: "150px"
                    title: "Created User"
                    headerTemplate: "{{ 'header_itemlist.createUser' | translate }}",
                    template: kendo.template($("#tpl_itemList_createusername").html())
                }                                                                                                                                                                          
             ]
                                                                                                                                                                                                                                                                                                                                                                                             
])