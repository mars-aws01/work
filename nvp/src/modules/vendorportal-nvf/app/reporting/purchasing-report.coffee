angular.module('nvp-purchasing-report',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal_nvf.reporting.us)
    .translations('zh-cn',resources.vendorportal_nvf.reporting.cn)
    .translations('zh-tw',resources.vendorportal_nvf.reporting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/purchasing-report",
      templateUrl: "/modules/vendorportal-nvf/app/reporting/purchasing-report.tpl.html"
      controller: 'PurchasingReportCtrl'
])

.controller('PurchasingReportCtrl',
["$scope","$filter","$q","messager","common","$translate","purchasingReportApi","reportExporter",
($scope,$filter,$q,messager,common,$translate,purchasingReportApi,reportExporter) ->       

    dateTo = new Date()
    dateFrom = new Date(dateTo)
    dateFrom.setMonth(dateTo.getMonth() - 1)
    minDate = new Date(dateTo.toISOString().slice(0,10).replace(/-/g,"-"))
    minDate.setMonth(minDate.getMonth() - 6 )
    $scope.minDate = new Date('2014-12-11')
    $scope.selectedByPoTab = true
    $scope.itemExportDisbled = true
    $scope.poExportDisbled = true
    $scope.poTotalRecords = 0
    $scope.itemTotalRecords = 0
    $scope.poExportMaxCount = 0
    $scope.itemExportMaxCount = 0
    
    $scope.queryByItem = {
        KeyWord:null,
        KeyWordType : 'NeweggItemNumber',
        POStatus:["Open"]
        POType:'Regular',
        ItemStatus:'All',
        PODateIsSelected:true,
        ETADateIsSelected:false,
        PODateFrom:dateFrom.toISOString().slice(0,10).replace(/-/g,"-"),
        PODateTo:dateTo.toISOString().slice(0,10).replace(/-/g,"-"),        
        ETADateFrom:dateFrom.toISOString().slice(0,10).replace(/-/g,"-"),
        ETADateTo:dateTo.toISOString().slice(0,10).replace(/-/g,"-")
    }    
    
    $scope.queryByPo={
        KeyWord:null,
        KeyWordType : 'NeweggItemNumber',
        POStatus:["Open"]
        POType:'Regular',
        PODateIsSelected:true,
        ETADateIsSelected:false,
        PODateFrom:dateFrom.toISOString().slice(0,10).replace(/-/g,"-"),
        PODateTo:dateTo.toISOString().slice(0,10).replace(/-/g,"-"),        
        ETADateFrom:dateFrom.toISOString().slice(0,10).replace(/-/g,"-"),
        ETADateTo:dateTo.toISOString().slice(0,10).replace(/-/g,"-")
    }
            
    $scope.currentSelectedItems_byPo = []
    $scope.dataGridName_byPo = "purchasingReportByPoGrid"
    $scope.refreshKey_byPo = "refresh.purchasing-report-bypo"
    
    $scope.search = ->
        if $scope.selectedByPoTab
            $scope.searchByPo()
        else
            $scope.searchByItem()
    
    $scope.searchByPo = ->
        messager.clear()
        reg = /^[0-9]*$/
        if $scope.queryByPo.KeyWord and $scope.queryByPo.KeyWord.length > 20 and $scope.queryByPo.KeyWordType is 'ManufacturePartNumber'
            messager.error($translate('error_report.mfrPartLength'))
            return
        
        if $scope.queryByPo.POStatus.length is 0
            messager.error($translate('error_report.selectPOStatus'))
            return
        
        $scope.queryByPo.PONumber = $scope.formatParam($scope.queryByPo.PONumber)
        if $scope.queryByPo.PONumber and !reg.test($scope.queryByPo.PONumber)
            messager.error($translate('error_report.invalidPONumber'))
            return
        if !$scope.isPoDateValid() 
            messager.error($translate('error_report.invalidPODate'))
            return
        if !$scope.isETADateValid()
            messager.error($translate('error_report.invalidETADate'))
            return
        $scope.preparePaging($scope.queryByPo)
        common.refreshDataGrid($scope,$scope.dataGridName_byPo,$scope.refreshKey_byPo,$scope.queryByPo.PagingInfo)
        
    $scope.currentSelectedItems_byItem = []
    $scope.dataGridName_byItem = "purchasingReportByItemGrid"
    $scope.refreshKey_byItem = "refresh.purchasing-report-byitem"
    
    $scope.searchByItem = ->
        messager.clear()
        if $scope.queryByItem.KeyWord and $scope.queryByItem.KeyWord.length > 20  and $scope.queryByItem.KeyWordType is 'ManufacturePartNumber'
            messager.error($translate('error_report.mfrPartLength'))
            return
            
        if $scope.queryByItem.POStatus.length is 0
            messager.error($translate('error_report.selectPOStatus'))
            return
            
        if !$scope.isPoDateValid() 
            messager.error($translate('error_report.invalidPODate'))
            return
        if !$scope.isETADateValid()
            messager.error($translate('error_report.invalidETADate'))
            return
        $scope.preparePaging($scope.queryByItem)
        common.refreshDataGrid($scope,$scope.dataGridName_byItem,$scope.refreshKey_byItem,$scope.queryByItem.PagingInfo)
          
    $scope.preparePaging = (query)->
        query.PagingInfo = common.getPagging(query.PagingInfo)
        
    $scope.preparePaging($scope.queryByPo)
    $scope.preparePaging($scope.queryByItem)
    
    $scope.queryAPI = ->
        requestItem = $scope.getRequestItem('query')
        if $scope.selectedByPoTab
          $scope.currentQuery_po = angular.copy(requestItem)
        else
          $scope.currentQuery_item = angular.copy(requestItem)
        purchasingReportApi.search requestItem
        ,(response) ->
            if(response&&response.Succeeded) 
                if $scope.selectedByPoTab
                    $scope.poData = response.Result
                    $scope.poSummary = response.ReportSummary
                    $scope.poExportDisbled = response.ReportSummary.TotalRecords > response.ExportMaxCount   
                    $scope.poExportMaxCount = response.ExportMaxCount   
                    $scope.poTotalRecords = response.ReportSummary.TotalRecords
                else
                    $scope.itemData = response.Result
                    $scope.itemSummary = response.ReportSummary
                    $scope.itemExportDisbled = response.ReportSummary.TotalRecords > response.ExportMaxCount   
                    $scope.itemTotalRecords = response.ReportSummary.TotalRecords
                    $scope.itemExportMaxCount = response.ExportMaxCount  
                $scope.currentSelectedItems = []
                $scope.callbackEvent(response) if $scope.callbackEvent  
            else
                $scope.callbackEvent({ ReportSummary:{TotalRecords:0}, Result:[]} ) if $scope.callbackEvent 
                $scope.setDefaultSummary()
        ,(error) ->
            $scope.callbackEvent({ ReportSummary:{TotalRecords:0}, Result:[]} ) if $scope.callbackEvent 
            $scope.setDefaultSummary()
     
     $scope.setDefaultSummary = ->
        if $scope.selectedByPoTab
            $scope.poData = []
            $scope.poSummary = {}
            $scope.poExportDisbled = true
            $scope.poTotalRecords = 0
            $scope.poExportMaxCount = 0
        else
            $scope.itemData = []
            $scope.itemSummary = {}
            $scope.itemExportDisbled = true
            $scope.itemTotalRecords = 0
            $scope.itemExportMaxCount = 0
        $scope.currentSelectedItems = []
                           
    $scope.getRequestItem = (type)->
        requestItem = {}
        if $scope.selectedByPoTab
            requestItem = angular.copy($scope.queryByPo)
            requestItem.action1 = 'bypo'
        else
            requestItem = angular.copy($scope.queryByItem)
            requestItem.action1 = 'byitem'
        
        requestItem.action2 = type
        requestItem.KeyWord = $scope.formatParam(requestItem.KeyWord)
        requestItem.PODateFrom = $scope.formatParam(requestItem.PODateFrom)
        requestItem.PODateFrom = requestItem.PODateFrom + 'T00:00:00' if requestItem.PODateFrom
        requestItem.PODateTo = $scope.formatParam(requestItem.PODateTo)
        requestItem.PODateTo = requestItem.PODateTo + 'T23:59:59' if requestItem.PODateTo
        requestItem.ETADateFrom = $scope.formatParam(requestItem.ETADateFrom)
        requestItem.ETADateFrom = requestItem.ETADateFrom + 'T00:00:00' if requestItem.ETADateFrom
        requestItem.ETADateTo = $scope.formatParam(requestItem.ETADateTo)
        requestItem.ETADateTo = requestItem.ETADateTo + 'T23:59:59' if requestItem.ETADateTo
        
        if(!requestItem.PagingInfo)
          requestItem.PagingInfo = $scope.preparePaging(requestItem.PagingInfo)
        
        requestItem.vendorNumber = common.currentUser.VendorNumber
        return requestItem
    
    $scope.isPoDateValid = ->
        query = {}
        if $scope.selectedByPoTab
            query = angular.copy($scope.queryByPo)
        else
            query = angular.copy($scope.queryByItem)
        
        if query.PODateIsSelected
            return $scope.isDateValid(query.PODateFrom,query.PODateTo)
        else
            return true
            
    $scope.isETADateValid = ->
        query = {}
        if $scope.selectedByPoTab
            query = angular.copy($scope.queryByPo)
        else
            query = angular.copy($scope.queryByItem)
        
        if query.ETADateIsSelected
            return $scope.isDateValid(query.ETADateFrom,query.ETADateTo)
        else
            return true

    $scope.isDateValid = (datefrom,dateto) ->
        cdate = new Date()
        from = new Date(datefrom)
        to = new Date(dateto)
        earliest = new Date(cdate)
        earliest.setMonth(cdate.getMonth() - 6 )
        if !from or !to or earliest > from or earliest > to or from > to
            return false
        else
            return true
    
    $scope.formatParam = (p)->
        if p is '' 
            return null 
        else
            return p
                                                                                                                                                                                                                                                                                                                                                                    
    ######## PO DataGrid
    $scope.poGridData = {
           columns: [
                        {
                            field: "POType"
                            width: "60px"
                            title: "Type"
                            sortfield:"Type"
                            headerTemplate: "{{ 'header_report.type' | translate  }}"
                            template: kendo.template($("#tpl_poList_type").html())
                            sortable: false
                        }
                        {
                            field: "PONumber"
                            title: "PO #"
                            width: "80px"
                            sortfield:"PONumber"
                            headerTemplate: "{{ 'header_report.poNumber' | translate  }}"
                            template: kendo.template($("#tpl_poList_ponumber").html())
                            sortable: false
                        }
                        {
                            field: "PODate"
                            width: "160px"
                            title: "PO Date"
                            sortfield:"PODate"
                            headerTemplate: "{{ 'header_report.poDate' | translate  }}"
                            type:"date"
                            format: "{0:MM/dd/yyyy h:mm:ss tt}"
                        }
                        {
                            field: "POStatus"
                            width: "120px"
                            title: "PO Status"
                            sortfield:"POStatus"
                            headerTemplate: "{{ 'header_report.poStatus' | translate  }}"
                            template: kendo.template($("#tpl_poList_postatus").html())
                            sortable: false
                        }
                        {
                            field: "ReceivedDate"
                            title: "Received Date"
                            width: "160px"
                            sortfield:"ReceivedDate"
                            headerTemplate: "{{ 'header_report.receivedDate' | translate  }}"
                            type:"date"
                            format: "{0:MM/dd/yyyy h:mm:ss tt}"
                        }
                        {
                            field: "OrderQty"
                            width: "80px"
                            title: "Order Qty"
                            sortfield:"OrderQty"
                            headerTemplate: "{{ 'header_report.orderQty' | translate  }}"
                            template: kendo.template($("#tpl_poList_orderqty").html())
                            type: "number" 
                        }
                        {
                            field: "ReceivedQty"
                            width: "100px"
                            title: "Received Qty"
                            sortfield:"ReceivedQty"
                            headerTemplate: "{{ 'header_report.receivedQty' | translate  }}"
                            template: kendo.template($("#tpl_poList_receivedqty").html())
                            type: "number" 
                        }
                        {
                            field: "PendingQty"
                            width: "90px"
                            title: "Pending Qty"
                            sortfield:"PendingQty"
                            headerTemplate: "{{ 'header_report.pendingQty' | translate  }}"
                            template: kendo.template($("#tpl_poList_pendingqty").html())
                            type: "number" 
                        }
                        {
                            field: "POAmount"
                            width: "90px"
                            title: "PO Amount"
                            sortfield:"POAmount"
                            headerTemplate: "{{ 'header_report.poAmount' | translate  }}"
                            template: kendo.template($("#tpl_poList_poamount").html())
                            type: "number" 
                        }
                        {
                            field: "WarehouseNumber"
                            width: "80px"
                            title: "Whouse #"
                            sortfield:"WarehouseNumber"
                            headerTemplate: "{{ 'header_report.whNumber' | translate  }}"
                            template: kendo.template($("#tpl_poList_wh").html())
                        }
                        {
                            field: "ETA"
                            width: "160px"
                            title: "ETA"
                            sortfield:"ETA"
                            headerTemplate: "{{ 'header_report.eta' | translate  }}"
                            type:"date"
                            format: "{0:MM/dd/yyyy h:mm:ss tt}"
                        }
                        {
                            field: "Purchaser"
                            width: "100px"
                            title: "Purchaser"
                            sortfield:"Purchaser"
                            headerTemplate:  "{{ 'header_report.purchaser' | translate  }}"
                            template: kendo.template($("#tpl_poList_purchaser").html())
                            sortable: false
                        }]
    }    
    
    $scope.pageChanged = (p, isByPo)->
        if isByPo
            $scope.queryByPo.PagingInfo.pageSize = p.pageSize
            $scope.queryByPo.PagingInfo.startpageindex=p.page-1
            $scope.queryByPo.PagingInfo.endpageindex=p.page-1
            common.setServerSorting($scope.queryByPo, p)
            $scope.queryAPI()
        else
            $scope.queryByItem.PagingInfo.pageSize = p.pageSize
            $scope.queryByItem.PagingInfo.startpageindex=p.page-1
            $scope.queryByItem.PagingInfo.endpageindex=p.page-1
            common.setServerSorting($scope.queryByItem, p)
            $scope.queryAPI()
        
    $scope.purchaseByPoListOptions =
        height:common.getTableHeight(281) + "px"
        checkBoxColumn:false
        columnMenu: false
        dataSource: 
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                            options.success d:
                                  results: result.Result or []
                                  __count: result.ReportSummary.TotalRecords
                     $scope.pageChanged(options.data, true)
            serverPaging: true
            serverSorting: true
        filterable: false
        columns: $scope.poGridData.columns
        toolbar: [  
                    { 
                      template:"<button ng-click=\"export()\" ng-disabled='poTotalRecords == 0' class='k-button k-button-icontext' href='\\#'><span class='k-icon k-i-excel'></span>{{ 'view_report.export' | translate }}</button>"
                    },
                    { 
                      template:"<button ng-click=\"print()\" ng-disabled='poTotalRecords == 0' class='k-button k-button-icontext' href='\\#'><span class='k-icon k-i-pdf'></span>{{ 'view_report.print' | translate }}&nbsp;</button>"
                    }
                 ] 
        
    ######## Item DataGrid
    $scope.itemGridData = {
           columns: [
                        {
                            field: "ItemNumber"
                            width: "100px"
                            title:  "Item #"
                            sortfield:"ItemNumber"
                            headerTemplate: "{{ 'header_report.itemNumber' | translate  }}"
                            template: kendo.template($("#tpl_itemList_itemnumber").html())
                        }
                        {
                            field: "ManufacturerPartNumber"
                            width: "120px"
                            title: "Mfr.Part #"
                            sortfield:"ManufacturerPartNumber"
                            headerTemplate: "{{ 'header_report.mfrPartNumber' | translate  }}"
                            template: kendo.template($("#tpl_itemList_manufacturerpartnumber").html())
                            sortable: false
                        }
                        {
                            field: "ItemDescription"
                            title: "Item Description"
                            width: "150px"
                            sortfield:"ItemDescription"
                            headerTemplate: "{{ 'header_report.itemDescription' | translate  }}"
                            template: kendo.template($("#tpl_itemList_description").html())
                            sortable: false
                        }
                        {
                            field: "POType"
                            title: "Type"
                            width: "60px"
                            sortfield:"POType"
                            headerTemplate: "{{ 'header_report.type' | translate  }}"
                            template: kendo.template($("#tpl_itemList_potype").html())
                            sortable: false
                        }
                        {
                            field: "VendorName"
                            title: "Vendor Number"
                            width: "150px"
                            sortfield:"VendorName"
                            headerTemplate: "{{ 'header_report.vendorNumber' | translate  }}"
                            template: kendo.template($("#tpl_itemList_vendorname").html())
                        }                         
                        {
                            field: "PONumber"
                            title: "PO #"
                            width: "100px"
                            sortfield:"PONumber"
                            headerTemplate: "{{ 'header_report.poNumber' | translate  }}"
                            template: kendo.template($("#tpl_itemList_ponumber").html())
                            sortable: false
                        }
                        {
                            field: "WarehouseNumber"
                            width: "80px"
                            title:"Whouse #"
                            sortfield:"WarehouseNumber"
                            headerTemplate: "{{ 'header_report.whNumber' | translate  }}"
                            template: kendo.template($("#tpl_itemList_wh").html())
                        }
                        {
                            field: "PODate"
                            width: "160px"
                            title: "PO Date"
                            sortfield:"PODate"
                            headerTemplate: "{{ 'header_report.poDate' | translate  }}"
                            type:"date"
                            format: "{0:MM/dd/yyyy h:mm:ss tt}"
                        }
                        {
                            field: "POStatus"
                            width: "120px"
                            title: "PO Status"
                            sortfield:"POStatus"
                            headerTemplate: "{{ 'header_report.poStatus' | translate  }}"
                            template: kendo.template($("#tpl_itemList_postatus").html())
                            sortable: false
                        }
                        {
                            field: "ReceivedDate"
                            title: "Received Date"
                            width: "160px"
                            sortfield:"ReceivedDate"
                            headerTemplate: "{{ 'header_report.receivedDate' | translate  }}"
                            type:"date"
                            format: "{0:MM/dd/yyyy h:mm:ss tt}"
                        }
                        {
                            field: "OrderQty"
                            width: "80px"
                            title: "Order Qty"
                            sortfield:"OrderQty"
                            headerTemplate: "{{ 'header_report.orderQty' | translate  }}"
                            template: kendo.template($("#tpl_itemList_orderqty").html())
                            type: "number"
                        }
                        {
                            field: "ReceivedQty"
                            width: "100px"
                            title: "Received Qty"
                            sortfield:"ReceivedQty"
                            headerTemplate: "{{ 'header_report.receivedQty' | translate  }}"
                            template: kendo.template($("#tpl_itemList_reveivedqty").html())
                        }
                        {
                            field: "PendingQty"
                            width: "90px"
                            title: "Pending Qty"
                            sortfield:"PendingQty"
                            headerTemplate: "{{ 'header_report.pendingQty' | translate  }}"
                            template: kendo.template($("#tpl_itemList_pendingqty").html())
                            type: "number"
                        }
                        {
                            field: "Cost"
                            width: "80px"
                            title: "Cost"
                            sortfield:"Cost"
                            headerTemplate: "{{ 'header_report.cost' | translate  }}"
                            template: kendo.template($("#tpl_itemList_cost").html())
                            type: "number"
                        }
                        {
                            field: "ETA"
                            width: "160px"
                            title: "ETA"
                            sortfield:"ETA"
                            headerTemplate: "{{ 'header_report.eta' | translate  }}"
                            type:"date"
                            format: "{0:MM/dd/yyyy h:mm:ss tt}"
                        }
                        {
                            field: "Purchaser"
                            width: "100px"
                            title: "Purchaser"
                            sortfield:"Purchaser"
                            headerTemplate: "{{ 'header_report.purchaser' | translate  }}"
                            template: kendo.template($("#tpl_itemList_purchaser").html())
                            sortable: false
                        }]
    } 
    
    $scope.purchaseByItemListOptions =
        height:common.getTableHeight(281) + "px"
        checkBoxColumn:false
        columnMenu: false
        dataSource: 
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                            options.success d:
                                  results: result.Result or []
                                  __count: result.ReportSummary.TotalRecords  
                     $scope.pageChanged(options.data, false)               
            serverPaging: true
            serverSorting: true 
        filterable: false
        columns: $scope.itemGridData.columns
        toolbar: [  
                    { 
                      template:"<button ng-click=\"export()\" ng-disabled='itemTotalRecords == 0' class='k-button k-button-icontext' href='\\#'><span class='k-icon k-i-excel'></span>{{ 'view_report.export' | translate }}</button>"
                    },
                    { 
                      template:"<button ng-click=\"print()\" ng-disabled='itemTotalRecords == 0' class='k-button k-button-icontext' href='\\#'><span class='k-icon k-i-pdf'></span>{{ 'view_report.print' | translate }}&nbsp;</button>"
                    }
                 ] 
    $scope.export = (type)->
        if $scope.selectedByPoTab
            if $scope.poExportDisbled
                messager.error($translate('error_report.exceedLimit') + $scope.poExportMaxCount + '.')
                return
        else
            if $scope.itemExportDisbled
                messager.error($translate('error_report.exceedLimit') + $scope.itemExportMaxCount + '.')
                return
        requestItem = {}
        if $scope.selectedByPoTab      
          requestItem = angular.copy($scope.currentQuery_po)
        else
          requestItem = angular.copy($scope.currentQuery_item)
        requestItem.action2 = 'export'
        reportExporter.exportReport(purchasingReportApi.search,requestItem,{ 'ExportFormat'  : 'Excel'})
        
    $scope.print = ->
        if $scope.selectedByPoTab
            if $scope.poExportDisbled
                messager.error($translate('error_report.exceedLimit') + $scope.poExportMaxCount + '.')
                return
        else
            if $scope.itemExportDisbled
                messager.error($translate('error_report.exceedLimit') + $scope.itemExportMaxCount + '.')
                return
        requestItem = {}
        if $scope.selectedByPoTab      
          requestItem = angular.copy($scope.currentQuery_po)
        else
          requestItem = angular.copy($scope.currentQuery_item)
        requestItem.action2 = 'export'
        reportExporter.exportReport(purchasingReportApi.search,requestItem,{ 'ExportFormat'  : 'Pdf'})

])