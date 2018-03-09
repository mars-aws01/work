angular.module('nvp-out-of-stock-report',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal_nvf.reporting.us)
    .translations('zh-cn',resources.vendorportal_nvf.reporting.cn)
    .translations('zh-tw',resources.vendorportal_nvf.reporting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/out-of-stock-report",
      templateUrl: "/modules/vendorportal-nvf/app/reporting/out-of-stock-report.tpl.html"
      controller: 'OutOfStockReportCtrl'
])

.controller('OutOfStockReportCtrl',
["$scope","$filter","$http","messager","common","auth","$translate","categoryAPI","outOfStockAPI","reportExporter",
($scope,$filter,$http,messager,common,auth,$translate,categoryAPI,outOfStockAPI,reportExporter) ->
    
    $scope.query = {}

    $scope.dataGridName = "outOfStockReportGrid"
    $scope.refreshKey = "refresh.out-of-stock-report"

    $scope.setDefaultSummary = ->
        $scope.totalRecords = 0
        $scope.TotalEstimateAmount = 0
        $scope.exportDisabled = false
        $scope.ExportMaxCount = 0
        $scope.Summary = {}
        $scope.KeyWord = ''
        $scope.KeyWordType = "NeweggItemNumber"

    $scope.getKeyWords = ->
        if $scope.KeyWordType == "NeweggItemNumber"
            if $scope.KeyWord.length>0
                $scope.query.NeweggItemNumber = $scope.KeyWord
            else
                delete $scope.query.NeweggItemNumber
            delete $scope.query.ManufacturerPartsNumber
        if $scope.KeyWordType == "ManufacturePartNumber"
            if $scope.KeyWord.length>0
                $scope.query.ManufacturerPartsNumber = $scope.KeyWord
            else
                delete $scope.query.ManufacturerPartsNumber
            delete $scope.query.NeweggItemNumber

    $scope.setDefaultSummary()
    $scope.search = ->
        if $scope.lastVendorNumber && $scope.lastVendorNumber != common.currentUser.VendorNumber
            delete $scope.query.CategoryCode
            delete $scope.query.BrandCode
        $scope.lastVendorNumber = angular.copy(common.currentUser.VendorNumber)
        $scope.getKeyWords()
        messager.clear()
        $scope.preparePaging()
        common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)
          
    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)
    
    $scope.queryAPI = ->
        requestItem = angular.copy($scope.query)
        requestItem.action = "query"
        if !requestItem.PagingInfo
          requestItem.PagingInfo = $scope.preparePaging()
        requestItem.VendorNumber = common.currentUser.VendorNumber 
        $scope.currentQuery = angular.copy(requestItem)
        outOfStockAPI.search requestItem
        ,(response)->
            if(response&&response.Succeeded) 
                $scope.totalRecords = response.Summary.TotalRecords
                $scope.Summary = angular.copy(response.Summary)
                $scope.exportDisabled = response.Summary.TotalRecords > response.ExportMaxCount
                $scope.ExportMaxCount = response.ExportMaxCount
                $scope.callbackEvent(response) if $scope.callbackEvent   
            else
                $scope.callbackEvent({ TotalRecordCount:0, ItemInventoryList:[]} ) if $scope.callbackEvent 
                $scope.setDefaultSummary()
        ,(error)->
            $scope.callbackEvent({ TotalRecordCount:0, ItemInventoryList:[]} ) if $scope.callbackEvent 
            $scope.setDefaultSummary()
   
        
    $scope.pageChanged = (p)->
        $scope.getKeyWords()
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
                            sortfield:"BrandName"
                            headerTemplate: "{{ 'header_report.brand' | translate  }}"
                            template: kendo.template($("#tpl_oosList_brand").html())
                        }
                        {
                            field: "CategoryName"
                            title: "Category"
                            sortfield:"CategoryName"
                            headerTemplate: "{{'header_report.category' | translate }}"
                            template: kendo.template($("#tpl_oosList_category").html())
                        }
                        {
                            field: "OutOfStockingItemNumber"
                            title: "OOS Item #"
                            sortfield:"OutOfStockingItemNumber"
                            headerTemplate: "{{ 'header_report.oosItemNumber' | translate }}"
                            template: kendo.template($("#tpl_oosList_OutOfStockingItemNumber").html())
                        }
                        {
                            field: "ManufacturerPartsNumber"
                            title: "Mfr.Part #"
                            sortfield:"ManufacturerPartsNumber"
                            headerTemplate: "{{ 'header_report.mfrPartNumber' | translate }}"
                            template: kendo.template($("#tpl_oosList_manufacturerpartnumber").html())
                        }
                        {
                            field: "EstimateDailyAmount"
                            width: "250px"
                            title: "Estimated Possible Daily Sales Amount"
                            sortfield:"EstimateDailyAmount"
                            headerTemplate: "{{ 'header_report.estimatedDailyAmount' | translate }}"
                            template: kendo.template($("#tpl_oosList_EstimateDailyAmount").html())
                            type: "number"
                        }]
    }

    $scope.OutOfStockListOptions =
        height:common.getTableHeight(215) + "px"
        checkBoxColumn:false
        columnMenu: false
        dataSource: 
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                            options.success d:
                                  results: result.OutOfStockingList or []
                                  __count: result.TotalRecordCount  
                     $scope.pageChanged(options.data)          
            serverPaging: true
            serverSorting: true
        filterable: false
        columns: $scope.gridData.columns
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
        requestItem.action = "export"
        if(!requestItem.PagingInfo)
          requestItem.PagingInfo = $scope.preparePaging()
        requestItem.VendorNumber = common.currentUser.VendorNumber 
        reportExporter.exportReport(outOfStockAPI.search,requestItem,{ 'ExportFormat'  : 'Excel'})
        
    $scope.print = ->
        if $scope.exportDisabled
            messager.error($translate('error_report.exceedLimit') + $scope.ExportMaxCount + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action = "export"
        if(!requestItem.PagingInfo)
          requestItem.PagingInfo = $scope.preparePaging()
        requestItem.VendorNumber = common.currentUser.VendorNumber 
        reportExporter.exportReport(outOfStockAPI.search,requestItem,{ 'ExportFormat'  : 'Pdf'})
        
        
])