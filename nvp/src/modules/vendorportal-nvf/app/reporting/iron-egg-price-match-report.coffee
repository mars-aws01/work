angular.module('nvp-iron-egg-price-match-report',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal_nvf.reporting.us)
    .translations('zh-cn',resources.vendorportal_nvf.reporting.cn)
    .translations('zh-tw',resources.vendorportal_nvf.reporting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/iron-egg-price-match-report",
      templateUrl: "/modules/vendorportal-nvf/app/reporting/iron-egg-price-match-report.tpl.html"
      controller: 'IronEggPriceMatchReportCtrl'
])

.controller('IronEggPriceMatchReportCtrl',
["$scope","$filter","messager","common","reportExporter","ironEggPriceAPI","$translate",
($scope,$filter,messager,common,reportExporter,ironEggPriceAPI,$translate) ->
    $scope.dataGridName = "ironEggPriceMatchReportGrid"
    $scope.refreshKey = "refresh.iron-egg-price-match-report"    
    $scope.query = {}
    
    $scope.currentDate = new Date()
    $scope.query.InvoiceDateTo = $filter('date')($scope.currentDate,'yyyy-MM-dd')
    $scope.query.InvoiceDateFrom = $filter('date')(angular.copy($scope.currentDate).setDate(1),'yyyy-MM-dd')
    
    $scope.setDefaultSummary = ->
        $scope.exportDisabled = true
        $scope.totalRecords = 0
        $scope.totalCredit = 0
        $scope.ExportMaxCount = 0
    
    $scope.setDefaultSummary()
    $scope.getMinDate = ->
        return new Date($scope.currentDate.getFullYear() - 1, $scope.currentDate.getMonth(), 1)
    
    $scope.getMaxDate =->
        return new Date($scope.currentDate.getFullYear(),$scope.currentDate.getMonth(),$scope.currentDate.getDate())
        
    $scope.minDate = $scope.getMinDate()
    $scope.maxDate = $scope.getMaxDate()
    
    $scope.search = ->
        if $scope.lastVendorNumber && $scope.lastVendorNumber != common.currentUser.VendorNumber
            delete $scope.query.CategoryCode
        $scope.lastVendorNumber = angular.copy(common.currentUser.VendorNumber)        
        messager.clear()
        if !($scope.isDateValid($scope.query.InvoiceDateFrom,$scope.query.InvoiceDateTo))
            messager.error($translate('error_report.invalidDate') + $filter('date')($scope.minDate,'yyyy-MM-dd') + $translate('error_report.invalidDate_and') + $filter('date')($scope.maxDate,'yyyy-MM-dd') + '.')
            return
        $scope.preparePaging()
        common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)

    $scope.queryAPI = ->
        requestItem = $scope.getRequestItem('query')
        $scope.currentQuery = angular.copy(requestItem)
        ironEggPriceAPI.search requestItem
        ,(response) ->
            if(response&&response.Succeeded) 
               $scope.totalRecords =response.TotalRecordCount 
               $scope.exportDisabled = response.TotalRecordCount > response.ExportMaxCount   
               $scope.ExportMaxCount  = response.ExportMaxCount   
               $scope.totalCredit = response.Summary.TotalCredit
               $scope.callbackEvent(response) if $scope.callbackEvent  
            else
               $scope.callbackEvent({ TotalRecordCount:0, IronEggPriceList:[]} ) if $scope.callbackEvent
               $scope.setDefaultSummary()
        ,(error) ->
            $scope.callbackEvent({ TotalRecordCount:0, IronEggPriceList:[]} ) if $scope.callbackEvent
            $scope.setDefaultSummary()
        
    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)
    
    $scope.preparePaging()
    
    $scope.getRequestItem = (action1)->
        requestItem = angular.copy($scope.query)
        requestItem.action1 = action1
        if(!requestItem.PagingInfo)
          requestItem.PagingInfo = $scope.preparePaging()
        requestItem.vendorNumber = common.currentUser.VendorNumber
        return requestItem
    
    $scope.pageChanged = (p)->
        $scope.query.PagingInfo.pageSize = p.pageSize
        $scope.query.PagingInfo.startpageindex=p.page-1
        $scope.query.PagingInfo.endpageindex=p.page-1
        common.setServerSorting($scope.query, p)
        $scope.queryAPI()
    
    $scope.isDateValid = (startDate,endDate)->
        if startDate and endDate and (new Date(startDate)).toString() != 'Invalid Date' and (new Date(endDate)).toString() != 'Invalid Date'
            sDate = moment(startDate,'YYYY-MM-DD')
            eDate = moment(endDate,'YYYY-MM-DD')
            return (sDate.isValid() and eDate.isValid() and eDate.toDate() >= sDate.toDate()) and !$scope.isDateOutOfRange(sDate.toDate(),eDate.toDate())
        else
            return false
    
    $scope.isDateOutOfRange = (startDate,endDate)->
        minDate = $scope.getMinDate()
        maxDate = $scope.getMaxDate()
        return startDate < minDate or startDate > maxDate or endDate < minDate or endDate > maxDate

    $scope.gridData = {
        columns: [
                    {
                        field: "InvoiceDate"
                        title: "Issue Date"
                        width: "160px"
                        sortfield:"InvoiceDate"
                        headerTemplate: "{{ 'header_report.issueDate' | translate }}"
                        type: "date"
                        format: "{0:MM/dd/yyyy h:mm:ss tt}"
                    }
                    {
                        field: "CustomerNumber"
                        width: "120px"
                        title: "Customer #"
                        sortfield:"CustomerNumber"
                        headerTemplate: "{{ 'header_report.customerNumber' | translate }}"
                        template: kendo.template($("#tpl_eggPriceMatchList_customernumber").html())
                    }
                    {
                        field: "OrderNumber"
                        width: "100px"
                        title: "Order #"
                        sortfield:"OrderNumber"
                        headerTemplate: "{{ 'header_report.orderNumber' | translate }}"
                        template: kendo.template($("#tpl_eggPriceMatchList_ordernumber").html())
                    }
                    {
                        field: "ItemNumber"
                        width: "100px"
                        title: "Item #"
                        sortfield:"ItemNumber"
                        headerTemplate: "{{ 'header_report.itemNumber' | translate }}"
                        template: kendo.template($("#tpl_eggPriceMatchList_itemnumber").html())
                    }
                    {
                        field: "ItemDescription"
                        width: "150px"
                        title: "Item Description"
                        sortfield:"ItemDescription"
                        headerTemplate: "{{ 'header_report.itemDescription' | translate }}"
                        template: kendo.template($("#tpl_eggPriceMatchList_itemdescription").html())
                        sortable: false
                    }
                    {
                        field: "ItemModel"
                        width: "100px"
                        title: "Model #"
                        sortfield:"ItemModel"
                        headerTemplate: "{{ 'header_report.modelNumber' | translate }}"
                        template: kendo.template($("#tpl_eggPriceMatchList_modelnumber").html())
                        sortable: false
                    }
                    {
                        field: "ManufacturerName"
                        width: "100px"
                        title: "Brand"
                        sortfield:"ManufacturerCode"
                        headerTemplate: "{{ 'header_report.brand' | translate }}"
                        template: kendo.template($("#tpl_eggPriceMatchList_brand").html())
                    }
                    {
                        field: "CategoryName"
                        width: "100px"
                        title: "Category"
                        sortfield:"CategoryName"
                        headerTemplate: "{{ 'header_report.category' | translate }}"
                        template: kendo.template($("#tpl_eggPriceMatchList_category").html())
                    }
                    {
                        field: "SellingPrice"
                        width: "100px"
                        title: "Selling Price"
                        sortfield:"SellingPrice"
                        headerTemplate: "{{ 'header_report.sellingPrice' | translate }}"
                        template: kendo.template($("#tpl_eggPriceMatchList_sellingprice").html())
                        type: 'number'
                        sortable: false
                    }
                    {
                        field: "CreditAmount"
                        width: "120px"
                        title: "Iron Egg Credit"
                        sortfield:"CreditAmount"
                        headerTemplate: "{{ 'header_report.ironEggCredit' | translate }}"
                        template: kendo.template($("#tpl_eggPriceMatchList_ironeggcredit").html())
                        sortable: false
                    }
                    ]
    } 

    $scope.eggPriceMatchListOptions =
        height:common.getTableHeight(175) + "px"
        checkBoxColumn:false
        columnMenu: false
        dataSource: 
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                            options.success d:
                                  results: result.IronEggPriceList or []
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
        requestItem.action1 = "export"
        reportExporter.exportReport(ironEggPriceAPI.search,requestItem,{ 'ExportFormat'  : 'Excel'})
        
    $scope.print = ->
        if $scope.exportDisabled
            messager.error($translate('error_report.exceedLimit') + $scope.ExportMaxCount + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action1 = "export"
        reportExporter.exportReport(ironEggPriceAPI.search,requestItem,{ 'ExportFormat'  : 'Pdf'})
])
