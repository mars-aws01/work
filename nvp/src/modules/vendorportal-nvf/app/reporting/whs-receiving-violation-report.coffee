angular.module('nvp-whs-receiving-violation-report',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal_nvf.reporting.us)
    .translations('zh-cn',resources.vendorportal_nvf.reporting.cn)
    .translations('zh-tw',resources.vendorportal_nvf.reporting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/whs-receiving-violation-report",
      templateUrl: "/modules/vendorportal-nvf/app/reporting/whs-receiving-violation-report.tpl.html"
      controller: 'WhsReceivingViolationReportCtrl'
])

.controller('WhsReceivingViolationReportCtrl',
["$scope","$filter","messager","common","reportExporter","whsReceivingViolationAPI","$translate"
($scope,$filter,messager,common,reportExporter,whsReceivingViolationAPI,$translate) ->

    $scope.dataGridName = "receivingViolationReportGrid"
    $scope.refreshKey = "refresh.receiving-violation-report"
    $scope.query = {}
    $scope.currentDate = new Date()
    $scope.query.ReceivingEndDate = $filter('date')($scope.currentDate,'yyyy-MM-dd')
    $scope.query.ReceivingStartDate = $filter('date')(angular.copy($scope.currentDate).setDate(1),'yyyy-MM-dd')

    
    $scope.setDefaultSummary = ->
        $scope.exportDisabled = true
        $scope.totalRecords = 0
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
        if !($scope.isDateValid($scope.query.ReceivingStartDate,$scope.query.ReceivingEndDate))
            messager.error($translate('error_report.invalidDate')  + $filter('date')($scope.minDate,'yyyy-MM-dd') + $translate('error_report.invalidDate_and') + $filter('date')($scope.maxDate,'yyyy-MM-dd') + '.')
            return
        $scope.preparePaging()
        common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)

    $scope.queryAPI = ->
        requestItem = $scope.getRequestItem('query')
        $scope.currentQuery = angular.copy(requestItem)
        whsReceivingViolationAPI.search requestItem
        ,(response) ->
            if(response&&response.Succeeded) 
               $scope.totalRecords =response.TotalRecordCount 
               $scope.exportDisabled = response.TotalRecordCount > response.ExportMaxCount   
               $scope.ExportMaxCount  = response.ExportMaxCount   
               $scope.callbackEvent(response) if $scope.callbackEvent  
            else
               $scope.callbackEvent({ TotalRecordCount:0, ResultList:[]} ) if $scope.callbackEvent
               $scope.setDefaultSummary()
        ,(error) ->
            $scope.callbackEvent({ TotalRecordCount:0, ResultList:[]} ) if $scope.callbackEvent
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
                            field: "CategoryName"
                            width: "100px"
                            title: "Category"
                            sortfield:"CategoryName"
                            headerTemplate: "{{ 'header_report.category' | translate  }}"
                            template: kendo.template($("#tpl_receivingViolationList_category").html())
                        }
#                        {
#                            field: "BuyerName"
#                            title: "Buyer"
#                            width: "100px"
#                            sortfield:"BuyerName"
#                            headerTemplate: "{{ 'header_report.buyer' | translate  }}"
#                            template: kendo.template($("#tpl_receivingViolationList_buyer").html())
#                            sortable: false
#                        }
                        {
                            field: "WarehouseNumber"
                            width: "100px"
                            title: "Whouse #"
                            sortfield:"WarehouseNumber"
                            headerTemplate: "{{ 'header_report.whNumber' | translate  }}"
                            template: kendo.template($("#tpl_receivingViolationList_warehouse").html())
                            sortable: false
                        }
                        {
                            field: "PONumber"
                            width: "100px"
                            title: "PO #"
                            sortfield:"PONumber"
                            headerTemplate: "{{ 'header_report.poNumber' | translate  }}"
                            template: kendo.template($("#tpl_receivingViolationList_ponumber").html())
                            sortable: false
                        }
                        {
                            field: "ReceivingDate"
                            width: "160px"
                            title: "Receiving Date"
                            sortfield:"ReceivingDate"
                            headerTemplate: "{{ 'header_report.receivingDate' | translate  }}"
                            type: "date"
                            format: "{0:MM/dd/yyyy h:mm:ss tt}"
                            sortable: false
                        }
                        {
                            field: "ViolationType"
                            width: "100px"
                            title: "Violation Type"
                            sortfield:"ViolationType"
                            headerTemplate: "{{ 'header_report.violationType' | translate  }}"
                            template: kendo.template($("#tpl_receivingViolationList_violationtype").html())
                            sortable: false
                        }
                        {
                            field: "ViolationDetail"
                            width: "200px"
                            title: "Violation Detail"
                            sortfield:"ViolationDetail"
                            headerTemplate: "{{ 'header_report.violationDetail' | translate  }}"
                            template: kendo.template($("#tpl_receivingViolationList_violationdetail").html())
                            sortable: false
                        }]
    }
    $scope.receivingViolationListOptions =
        height:common.getTableHeight(175) + "px"
        checkBoxColumn:false
        columnMenu: false
        dataSource: 
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                            options.success d:
                                  results: result.ResultList or []
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
        reportExporter.exportReport(whsReceivingViolationAPI.search,requestItem,{ 'ExportFormat'  : 'Excel'})
        
    $scope.print = ->
        if $scope.exportDisabled
            messager.error($translate('error_report.exceedLimit') + $scope.ExportMaxCount + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action1 = "export"
        reportExporter.exportReport(whsReceivingViolationAPI.search,requestItem,{ 'ExportFormat'  : 'Pdf'})
])
