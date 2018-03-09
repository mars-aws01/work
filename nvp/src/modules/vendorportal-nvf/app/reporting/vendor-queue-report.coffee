angular.module('nvp-vendor-queue-report',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal_nvf.reporting.us)
    .translations('zh-cn',resources.vendorportal_nvf.reporting.cn)
    .translations('zh-tw',resources.vendorportal_nvf.reporting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/vendor-queue-report",
      templateUrl: "/modules/vendorportal-nvf/app/reporting/vendor-queue-report.tpl.html"
      controller: 'VendorQueueReportCtrl'
])

.controller('VendorQueueReportCtrl',
["$scope","$filter","messager","common","vendorRmaQueueReportAPI","reportExporter","$translate",
($scope,$filter,messager,common,vendorRmaQueueReportAPI,reportExporter,$translate) ->
    $scope.dataGridName = "vendorQueueReportGrid"
    $scope.refreshKey = "refresh.vendor-queue-report" 
    
    $scope.setDefaultSummary = ->
        $scope.totalQuantity = 0
        $scope.vendorQueueAmount = 0
        $scope.agingVendorQueueAmount = 0
        $scope.totalRecords = 0
        $scope.exportDisabled = true
        $scope.ExportMaxCount = 0
    
    $scope.setDefaultSummary()
    $scope.daysOptions = [
        {text:'view_report.daysInVendorQueue_all', value:'All'},
        {text:'view_report.daysInVendorQueue_month', value:'Month'},
        {text:'view_report.daysInVendorQueue_aboveMonth', value:'AboveMonth'}
    ]

    $scope.query = {
      KeyWordType : 'NeweggItemNumber',
      VendorQueueDays:'All'
    }
    
    $scope.getMaxLength = (type)->
        if type is 'NeweggItemNumber'
            $scope.keyLength=25
        else
            $scope.keyLength=40
    
    $scope.getMaxLength($scope.query.KeyWordType)
    
    $scope.search = ->
        if $scope.lastVendorNumber && $scope.lastVendorNumber != common.currentUser.VendorNumber
            delete $scope.query.CategoryCode
            delete $scope.query.BrandCode
        $scope.lastVendorNumber = angular.copy(common.currentUser.VendorNumber)        
        messager.clear()
        $scope.preparePaging()
        common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)

    $scope.queryAPI = ->
        requestItem = $scope.getRequestItem('query')
        $scope.currentQuery = angular.copy(requestItem)
        vendorRmaQueueReportAPI.search requestItem
        ,(response) ->
            if(response&&response.Succeeded) 
               $scope.totalRecords =response.TotalRecordCount 
               $scope.exportDisabled = response.Summary.TotalRecords > response.ExportMaxCount   
               $scope.ExportMaxCount  = response.ExportMaxCount   
               $scope.totalQuantity = response.Summary.TotalQuantity
               $scope.vendorQueueAmount = response.Summary.TotalVendorQueueAmount
               $scope.agingVendorQueueAmount = response.Summary.TotalVendorQueueAmountAboveMonth
               $scope.callbackEvent(response) if $scope.callbackEvent  
            else
               $scope.callbackEvent({ TotalRecordCount:0,ResultList:[]} ) if $scope.callbackEvent
               $scope.setDefaultSummary()
        ,(error) ->
            $scope.callbackEvent({ TotalRecordCount:0,ResultList:[]} ) if $scope.callbackEvent
            $scope.setDefaultSummary()

    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)
    
    $scope.preparePaging()
    
    $scope.pageChanged = (p)->
        $scope.query.PagingInfo.pageSize = p.pageSize
        $scope.query.PagingInfo.startpageindex=p.page-1
        $scope.query.PagingInfo.endpageindex=p.page-1
        common.setServerSorting($scope.query, p)
        $scope.queryAPI()
        
    $scope.getRequestItem = (action1)->
        requestItem = angular.copy($scope.query)
        requestItem.action1 = action1
        if(!requestItem.PagingInfo)
          requestItem.PagingInfo = $scope.preparePaging()
        requestItem.vendorNumber = common.currentUser.VendorNumber
        return requestItem

    $scope.gridData = {
        columns: [
                {
                    field: "BrandName"
                    width: "100px"
                    title: "Brand"
                    sortfield:"BrandName"
                    headerTemplate: "{{ 'header_report.brand' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_brand").html())
                }
                {
                    field: "CategoryName"
                    title: "Category"
                    width: "100px"
                    sortfield:"CategoryName"
                    headerTemplate: "{{ 'header_report.category' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_category").html())
                }
                {
                    field: "NeweggItemNumber"
                    width: "100px"
                    title: "Item #"
                    sortfield:"NeweggItemNumber"
                    headerTemplate: "{{ 'header_report.itemNumber' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_itemnumber").html())
                }
                {
                    field: "NeweggItemDescription"
                    title:"Item Description"
                    width: "150px"
                    sortfield:"NeweggItemDescription"
                    headerTemplate: "{{ 'header_report.itemDescription' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_description").html())
                    sortable: false
                }
                {
                    field: "ManufacturerPartsNumber"
                    width: "150px"
                    title: "Mfr.Part #"
                    sortfield:"ManufacturerPartsNumber"
                    headerTemplate: "{{ 'header_report.mfrPartNumber' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_manufacturerpartnumber").html())
                    sortable: false
                }
                {
                    field: "VendorRMANumber"
                    width: "150px"
                    title: "Vendor RMA #"
                    sortfield:"VendorRMANumber"
                    headerTemplate: "{{ 'header_report.vendorRMANumber' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_vendorrmanumber").html())
                    sortable: false
                }
                {
                    field: "WIRNumber"
                    width: "100px"
                    title: "WIR #"
                    sortfield:"WIRNumber"
                    headerTemplate: "{{ 'header_report.wirNumber' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_wirnumber").html())
                    sortable: false
                }
                {
                    field: "OBNumber"
                    width: "100px"
                    title: "OB #"
                    sortfield:"OBNumber"
                    headerTemplate: "{{ 'header_report.obNumber' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_obnumber").html())
                    sortable: false
                }
                {
                    field: "OBDate"
                    width: "160px"
                    title: "OB Date"
                    sortfield:"OBDate"
                    headerTemplate: "{{ 'header_report.obDate' | translate  }}"
                    type: "date",
                    format: "{0:MM/dd/yyyy h:mm:ss tt}",
                    sortable: false
                }
                {
                    field: "Quantity"
                    width: "60px"
                    title: "Qty"
                    sortfield:"Quantity"
                    headerTemplate: "{{ 'header_report.qty' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_qty").html())
                    sortable: false,
                    type:'number'
                }
                {
                    field: "TotalRMAAmount"
                    width: "110px"
                    title: "Total RMA Amt"
                    sortfield:"TotalRMAAmount"
                    headerTemplate: "{{ 'header_report.totalRMAAmount' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_totalrmaamount").html())
                    sortable: false
                }
                {
                    field: "VendorQueueDays"
                    width: "150px"
                    title: "Days In Vendor Queue"
                    sortfield:"VendorQueueDays"
                    headerTemplate: "{{ 'header_report.vendorQueueDays' | translate  }}"
                    template: kendo.template($("#tpl_vendorQueueList_daysinvendorqueue").html())
                    sortable: false,
                    type:'number'
                }
            ]
    }

    $scope.vendorQueueListOptions =
        height:common.getTableHeight(250) + "px"
        checkBoxColumn:false
        columnMenu: false
        dataSource: 
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                            options.success d:
                                  results: result.ResultList or []
                                  __count: result.Summary.TotalRecords
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
        reportExporter.exportReport(vendorRmaQueueReportAPI.search,requestItem,{ 'ExportFormat'  : 'Excel'})
        
    $scope.print = ->
        if $scope.exportDisabled
            messager.error($translate('error_report.exceedLimit') + $scope.ExportMaxCount + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action1 = "export"
        reportExporter.exportReport(vendorRmaQueueReportAPI.search,requestItem,{ 'ExportFormat'  : 'Pdf'})
])
