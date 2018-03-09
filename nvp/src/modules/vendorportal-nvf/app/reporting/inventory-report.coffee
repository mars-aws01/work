angular.module('nvp-inventory-report',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal_nvf.reporting.us)
    .translations('zh-cn',resources.vendorportal_nvf.reporting.cn)
    .translations('zh-tw',resources.vendorportal_nvf.reporting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/inventory-report",
      templateUrl: "/modules/vendorportal-nvf/app/reporting/inventory-report.tpl.html"
      controller: 'InventoryReportCtrl'
])

.controller('InventoryReportCtrl',
["$scope","$filter","$http","messager","common","auth","$translate","categoryAPI","inventoryReportAPI","reportExporter",
($scope,$filter,$http,messager,common,auth,$translate,categoryAPI,inventoryReportAPI,reportExporter) ->
    
    $scope.currentRole = auth.getCurrentRoleByNVF()  #basic/advanced/premium
    $scope.query = {
        KeyWordType : 'NeweggItemNumber'
        ItemStatus: "Active"
    }

    $scope.dataGridName = "inventoryReportGrid"
    $scope.refreshKey = "refresh.inventory-report"

    $scope.setDefaultSummary = ->
        $scope.totalRecords = 0
        $scope.ExportMaxCount = 0
        $scope.openPOQTY = 0
        $scope.exportDisabled = false
    
    $scope.setDefaultSummary()
    $scope.search = ->
        if $scope.lastVendorNumber && $scope.lastVendorNumber != common.currentUser.VendorNumber
            delete $scope.query.CategoryCode
            delete $scope.query.BrandCode
        $scope.lastVendorNumber = angular.copy(common.currentUser.VendorNumber)
        messager.clear()
        $scope.preparePaging()
        common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)
          
    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)
    
    $scope.queryAPI = ->
        requestItem = angular.copy($scope.query)
        requestItem.action1 = $scope.currentRole
        requestItem.action2 = "query"
        if !requestItem.PagingInfo
          requestItem.PagingInfo = $scope.preparePaging()
        if !requestItem.SortInfo
          requestItem.SortInfo = {SortField: "UsaInventory.Q4S", SortType: "desc"}
        requestItem.VendorNumber = common.currentUser.VendorNumber 
        $scope.currentQuery = angular.copy(requestItem)
        inventoryReportAPI.search requestItem
        ,(response)->
            if(response&&response.Succeeded) 
                $scope.openPOQTY = response.Summary.TotalOpenPoQty if response.Summary
                $scope.data = response.ItemInventoryList
                $scope.totalRecords = response.Summary.TotalRecords
                $scope.exportDisabled = response.Summary.TotalRecords > response.ExportMaxCount
                $scope.ExportMaxCount = response.ExportMaxCount
                $scope.addUsaStateGridColumns(response.ItemInventoryList)
                $scope.callbackEvent(response) if $scope.callbackEvent   
            else
                $scope.callbackEvent({ TotalRecordCount:0, ItemInventoryList:[]} ) if $scope.callbackEvent 
                $scope.setDefaultSummary()
        ,(error)->
            $scope.callbackEvent({ TotalRecordCount:0, ItemInventoryList:[]} ) if $scope.callbackEvent 
            $scope.setDefaultSummary()
                           
######## DataGrid settings 
    $scope.defaultColumns = []
    
    $scope.initColumns = ->
        if($scope.currentRole == "basic") 
           $scope.defaultColumns = $.merge(angular.copy($scope.gridData.columns),$scope.gridData_basicRole.columns)
        else if ($scope.currentRole == "advanced") 
           $scope.defaultColumns = $.merge(angular.copy($scope.gridData.columns),[$scope.gridData_advancedRole.columns_start,$scope.gridData_advancedRole.columns_end]) 
        else if ($scope.currentRole == "premium") 
           $scope.defaultColumns = $.merge(angular.copy($scope.gridData.columns),$scope.gridData_premiumRole.columns)
           
    $scope.addUsaStateGridColumns = (result) ->
        return if $scope.currentRole == "basic"
        stateList = []
        if result && result.length > 0 && result[0].UsaInventory && result[0].UsaInventory.StateInventoryList
           stateList = result[0].UsaInventory.StateInventoryList
        grid = $("#" + $scope.dataGridName).data("kendoGrid")
        return if !grid
        mergeColumns = []
        if($scope.currentRole == "advanced")
          mergeColumns = angular.copy($scope.gridData.columns)
        mergeColumns.push($scope.gridData_advancedRole.columns_start)
#暂时不提供Warehouse Location数据        
#        index = 0
#        for item in stateList
#           mergeColumns.push({
#                        width: "60px"
#                        title: item.State
#                        headerTemplate: item.State,
#                        filterable: false,
#                        field: 'UsaInventory.StateInventoryList['+index+'].Q4S'
#                        attributes:{style:"text-align:right;","data-format":"n"}
#                        format: "{0:n0}"
#                     #   template: '<div class="col-xs-12 no-padding text-left"><span >'+if !item.Q4S then "" else item.Q4S.toString() +'</span></div>'
#                    })
#           index++
           
        mergeColumns.push($scope.gridData_advancedRole.columns_end)
        if($scope.currentRole == "advanced")
          grid.options.columns = mergeColumns
          grid.columns = mergeColumns
        else if ($scope.currentRole == "premium")
          grid.options.columns[6].columns = mergeColumns
          grid.columns[6].columns = mergeColumns
        grid._templates()
        grid.thead.empty()
        grid._thead()
        grid._renderContent grid.dataSource.view()
   
        
    $scope.pageChanged = (p)->
        $scope.query.PagingInfo.pageSize = p.pageSize
        $scope.query.PagingInfo.startpageindex=p.page-1
        $scope.query.PagingInfo.endpageindex=p.page-1
        common.setServerSorting($scope.query, p)
        $scope.queryAPI()
        
    $scope.gridData = {
           columns: [
                        {
                            field: "Item.BrandName"
                            width: "100px"
                            title: "Brand"
                            sortfield:"BrandName"
                            headerTemplate: "{{ 'header_report.brand' | translate  }}"
                            template: kendo.template($("#tpl_inventoryList_brand").html())
                        }
                        {
                            field: "Item.CategoryName"
                            title: "Category"
                            width: "100px"
                            sortfield:"CategoryName"
                            headerTemplate: "{{'header_report.category' | translate }}"
                            template: kendo.template($("#tpl_inventoryList_category").html())
                        }
                        {
                            field: "Item.NeweggItemNumber"
                            width: "100px"
                            title: "Item #"
                            sortfield:"Item.NeweggItemNumber"
                            headerTemplate: "{{ 'header_report.itemNumber' | translate }}"
                            template: kendo.template($("#tpl_inventoryList_itemnumber").html())
                        }
                        {
                            field: "Item.NeweggItemDescription"
                            title: "Item Description"
                            width: "150px"
                            sortfield:"Item.NeweggItemDescription"
                            headerTemplate: "{{ 'header_report.itemDescription' | translate }}"
                            template: kendo.template($("#tpl_inventoryList_description").html())
                            sortable: false
                        }
                        {
                            field: "Item.ManufacturePartNumber"
                            width: "150px"
                            title: "Mfr.Part #"
                            sortfield:"Item.ManufacturePartNumber"
                            headerTemplate: "{{ 'header_report.mfrPartNumber' | translate }}"
                            template: kendo.template($("#tpl_inventoryList_manufacturerpartnumber").html())
                            sortable: false
                        }
                        {
                            field: "Item.ItemStatus"
                            width: "100px"
                            title: "Status"
                            sortfield:"Item.ItemStatus"
                            headerTemplate: "{{ 'header_report.status' | translate }}"
                            template: kendo.template($("#tpl_inventoryList_status").html())
                            sortable: false
                        }]
    }
    
    $scope.gridData_basicRole = {
        columns:[   
                    {
                        field: "UsaInventory.Q4S"
                        width: "100px"
                        title: "US-Current Q4S"
                        sortfield:"UsaInventory.Q4S"
                        headerTemplate: "{{ 'header_report.currentQ4S' | translate }} <i title=\"{{ 'view_report.q4s_info' | translate }}\" class='bigger-125 icon-question-sign'></i>"
                        attributes:{style:"text-align:right;","data-format":"n"}
                        type: "number"
                        format: "{0:n0}"
                    }
                    {
                        field: "UsaInventory.OpenPoQty"
                        width: "100px"
                        title: "US-Open PO Qty"
                        sortfield:"UsaInventory.OpenPoQty"
                        headerTemplate: "{{ 'header_report.openPoQty' | translate }}"
                        attributes:{style:"text-align:right;","data-format":"n"}
                        type: "number"
                        format: "{0:n0}"
                    }]                    
    }
    
    $scope.gridData_basicRole_CAN = {
        columns:[   
                    {
                        field: "CanInventory.Q4S"
                        width: "100px"
                        title: "Can-Total Q4S"
                        sortfield:"CanInventory.Q4S"
                        headerTemplate: "{{ 'header_report.totalQ4s' | translate }} <i title=\"{{ 'view_report.q4s_info' | translate }}\" class='bigger-125 icon-question-sign'></i>"
                        attributes:{style:"text-align:right;","data-format":"n"}
                        type: "number"
                        format: "{0:n0}"
                        filterable: false
                    }
                    {
                        field: "CanInventory.OpenPoQty"
                        width: "100px"
                        title: "CAN-Open PO Qty"
                        sortfield:"CanInventory.OpenPoQty"
                        headerTemplate: "{{ 'header_report.openPoQty' | translate }}"
                        attributes:{style:"text-align:right;","data-format":"n"}
                        type: "number"
                        format: "{0:n0}"
                        filterable: false
                    }]
    }
    
    $scope.gridData_advancedRole = {
        columns_start:
                    {
                        field: "UsaInventory.Q4S"
                        width: "100px"
                        title: "US-Total Q4s"
                        sortfield:"UsaInventory.Q4S"
                        headerTemplate: "{{ 'header_report.totalQ4s' | translate }} <i title=\"{{ 'view_report.q4s_info' | translate }}\" class='bigger-125 icon-question-sign'></i>"
                        attributes:{style:"text-align:right;","data-format":"n"}
                        type: "number"
                        format: "{0:n0}"
                        filterable: false
                    }
        columns_end:
                    {
                        field: "UsaInventory.OpenPoQty"
                        width: "100px"
                        title: "US-Open PO Qty"
                        sortfield:"UsaInventory.OpenPoQty"
                        headerTemplate: "{{ 'header_report.openPoQty' | translate }}"
                        attributes:{style:"text-align:right;","data-format":"n"}
                        type: "number"
                        format: "{0:n0}"
                        filterable: false
                    }  
    }
    
    $scope.gridData_premiumRole = {
        columns:[  
                    {
                        title: "US Inventory"
                        headerTemplate: "<div class='col-xs-12 text-center'>{{ 'header_report.usInventory' | translate }}</div>",
                        columns: [$scope.gridData_advancedRole.columns_start,$scope.gridData_advancedRole.columns_end]
                    }
                    {
                        title: "Canada Inventory"
                        headerTemplate: "<div class='col-xs-12 text-center'>{{ 'header_report.canadaInventory' | translate }}</div>",
                        columns: $scope.gridData_basicRole_CAN.columns
                    }
                ]
    }
    
    
    $scope.initColumns()  

    $scope.inventoryListOptions =
        height:common.getTableHeight(235) + "px"
        checkBoxColumn:false
        columnMenu: false
        dataSource: 
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                            options.success d:
                                  results: result.ItemInventoryList or []
                                  __count: result.TotalRecordCount  
                     $scope.pageChanged(options.data)          
            serverPaging: true
            serverSorting: true
#            schema: {
#                    model: {
#                        fields: {
#                            'UsaInventory.Q4S': { type: "number" }
#                            'UsaInventory.OpenPoQty': { type: "number" }
#                            'CanInventory.Q4S': { type: "number" }
#                            'CanInventory.OpenPoQty': { type: "number" }
#                        }
#                    }
#                }
        filterable: false
        columns: $scope.defaultColumns
        toolbar: [  
                    { 
                      template:"<button ng-click=\"export()\" ng-disabled='totalRecords == 0' class='k-button k-button-icontext' href='\\#'><span class='k-icon k-i-excel'></span>{{ 'view_report.export' | translate }}</button>"
                    },
                    { 
                      template:"<button ng-click=\"print()\" ng-disabled='totalRecords == 0' class='k-button k-button-icontext' href='\\#'><span class='k-icon k-i-pdf'></span>{{ 'view_report.print' | translate }}&nbsp;</button>"
                    }
                 ]
                 
                   
    $scope.export = ->
        if $scope.exportDisabled
            messager.error($translate('error_report.exceedLimit') + $scope.ExportMaxCount + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action1 = $scope.currentRole
        requestItem.action2 = "export"
       # requestItem.CategoryName = $('#nvfCategory').val()
       # requestItem.BrandName = $('#nvfBrand').val()
        if(!requestItem.PagingInfo)
          requestItem.PagingInfo = $scope.preparePaging()
        requestItem.VendorNumber = common.currentUser.VendorNumber 
        reportExporter.exportReport(inventoryReportAPI.search,requestItem,{ 'ExportFormat'  : 'Excel'})
        
    $scope.print = ->
        if $scope.exportDisabled
            messager.error($translate('error_report.exceedLimit') + $scope.ExportMaxCount + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action1 = $scope.currentRole
        requestItem.action2 = "export"
       # requestItem.CategoryName = $('#nvfCategory').val()
       # requestItem.BrandName = $('#nvfBrand').val()
        if(!requestItem.PagingInfo)
          requestItem.PagingInfo = $scope.preparePaging()
        requestItem.VendorNumber = common.currentUser.VendorNumber 
        reportExporter.exportReport(inventoryReportAPI.search,requestItem,{ 'ExportFormat'  : 'Pdf'})
        
        
])