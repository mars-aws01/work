angular.module('nvp-rma-report',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal_nvf.reporting.us)
    .translations('zh-cn',resources.vendorportal_nvf.reporting.cn)
    .translations('zh-tw',resources.vendorportal_nvf.reporting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/rma-report",
      templateUrl: "/modules/vendorportal-nvf/app/reporting/rma-report.tpl.html"
      controller: 'RmaReportCtrl'
])

.controller('RmaReportCtrl',
["$scope","$filter","messager","common","reportExporter","rmaReportAPI","$translate",
($scope,$filter,messager,common,reportExporter,rmaReportAPI,$translate) ->
    
    $scope.currentDate = new Date()
    $scope.query = {
      KeyWordType : 'NeweggItemNumber',
      ReportDateFrom:new Date($scope.currentDate.getFullYear(),$scope.currentDate.getMonth(),1)
      ReportDateTo:new Date($scope.currentDate.getFullYear(),$scope.currentDate.getMonth(),$scope.currentDate.getDate())
    }

    $scope.dataGridName = "rmaReportGrid"
    $scope.refreshKey = "refresh.rma-report"
        
    $scope.setDefaultSummary = ->
        $scope.exportDisabled = true
        $scope.rmaTotalRecords = 0
        $scope.ExportMaxCount = 0
    
    $scope.setDefaultSummary()
    $scope.maxDate = $scope.currentDate
    $scope.minDate = new Date($scope.currentDate.getFullYear() - 1, 0, 1)
    
    $scope.search = ->
        if $scope.lastVendorNumber && $scope.lastVendorNumber != common.currentUser.VendorNumber
            delete $scope.query.CategoryCode
        $scope.lastVendorNumber = angular.copy(common.currentUser.VendorNumber)
        messager.clear()
        if !($scope.isDateValid($scope.query.ReportDateFrom, $scope.query.ReportDateTo))
            messager.error($translate('error_report.invalidDate') + $filter('date')($scope.minDate,'MM/yyyy') + ' and ' + $filter('date')($scope.maxDate,'MM/yyyy') + '.')
            return
        $scope.preparePaging()
        common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)

    $scope.queryAPI = ->
        requestItem = $scope.getRequestItem('query')
        $scope.currentQuery = angular.copy(requestItem)
        rmaReportAPI.search requestItem
        ,(response) ->
            if(response&&response.Succeeded) 
               $scope.rmaTotalRecords =response.TotalRecordCount 
               $scope.exportDisabled = response.TotalRecordCount > response.ExportMaxCount   
               $scope.ExportMaxCount  = response.ExportMaxCount   
               $scope.totalReturnAmount = response.Summary.TotalReturnAmount
               $scope.totalReturnQuantity = response.Summary.TotalReturnQuantity
               $scope.callbackEvent(response) if $scope.callbackEvent  
            else
               $scope.callbackEvent({ TotalRecordCount:0, RMAReportItemList:[]} ) if $scope.callbackEvent
               $scope.setDefaultSummary()
        ,(error) ->
            $scope.callbackEvent({ TotalRecordCount:0, RMAReportItemList:[]} ) if $scope.callbackEvent
            $scope.setDefaultSummary()

    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)
        
    $scope.preparePaging()

    $scope.getRequestItem = (action1)->
        requestItem = angular.copy($scope.query)
        requestItem.ReportDateFrom = $filter('date')(new Date(requestItem.ReportDateFrom.getFullYear(), requestItem.ReportDateFrom.getMonth(),1), 'yyyy-MM-dd')
        dateTo = new Date( requestItem.ReportDateTo.setMonth(requestItem.ReportDateTo.getMonth() + 1))
        requestItem.ReportDateTo = $filter('date')(new Date(dateTo.getFullYear(),dateTo.getMonth(),1),'yyyy-MM-dd')
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
        $scope.queryAPI($scope.getRequestItem('query'))
    
    $scope.getMaxLength = (type)->
        if type is 'NeweggItemNumber'
            $scope.keyLength=25
        else
            $scope.keyLength=40
    
    $scope.getMaxLength($scope.query.KeyWordType)
    
    $scope.isDateValid = (startDate,endDate)->
        if startDate and endDate and (new Date(startDate)).toString() != 'Invalid Date' and (new Date(endDate)).toString() != 'Invalid Date'
            sDate = moment(startDate)
            eDate = moment(endDate)
            return (sDate.isValid() and eDate.isValid() and eDate.toDate() >= sDate.toDate()) and !$scope.isDateOutOfRange(sDate.toDate(),eDate.toDate())
        else
            return false
    
    $scope.isDateOutOfRange = (startDate,endDate)->
        return startDate < $scope.minDate or startDate > $scope.maxDate or endDate < $scope.minDate or endDate > $scope.maxDate
    
    $scope.gridData = {
       columns: [
                  {
                      field: "CategoryName"
                      width: "100px"
                      title: "Category"
                      sortfield:"CategoryName"
                      headerTemplate: "{{ 'header_report.category' | translate  }}"
                      template: kendo.template($("#tpl_rmaList_category").html())
                  }
                  {
                      field: "ItemNumber"
                      width: "100px"
                      title: "Item #"
                      sortfield:"ItemNumber"
                      headerTemplate: "{{ 'header_report.itemNumber' | translate  }}"
                      template: kendo.template($("#tpl_rmaList_itemnumber").html())
                  }
                  {
                      field: "ItemDescription"
                      title: "Item Description"
                      width: "180px"
                      sortfield:"ItemDescription"
                      headerTemplate: "{{ 'header_report.itemDescription' | translate  }}"
                      template: kendo.template($("#tpl_rmaList_description").html())
                      sortable: false
                  }
                  {
                      field: "ManufacturerPartNumber"
                      width: "150px"
                      title: "Mfr.Part #"
                      sortfield:"ManufacturerPartNumber"
                      headerTemplate: "{{ 'header_report.mfrPartNumber' | translate  }}"
                      template: kendo.template($("#tpl_rmaList_manufacturerpartnumber").html())
                      sortable: false
                  }
                  {
                      field: "ReturnAmount"
                      width: "80px"
                      title: "Return Amt"
                      sortfield:"ReturnAmount"
                      headerTemplate: "{{ 'header_report.returnAmount' | translate  }}"
                      template: kendo.template($("#tpl_rmaList_returnamount").html())
                      type: "number"
                      sortable: false
                  }
                  {
                      field: "ReturnAmountRate"
                      width: "100px"
                      title: "Return Amt %"
                      sortfield:"ReturnAmountRate"
                      headerTemplate: "{{ 'header_report.returnAmountRate' | translate  }}"
                      template: kendo.template($("#tpl_rmaList_returnamountrate").html())
                      type: "number"
                      sortable: false
                  }
                  {
                      field: "ReturnQuantity"
                      width: "80px"
                      title: "Return Qty"
                      sortfield:"ReturnQuantity"
                      headerTemplate: "{{ 'header_report.returnQuantity' | translate  }}"
                      template: kendo.template($("#tpl_rmaList_returnqty").html())
                      type: "number"
                      sortable: false
                  }
                  {
                      field: "ReturnQuantityRate"
                      width: "100px"
                      title: "Return Qty %"
                      sortfield:"ReturnQuantityRate"
                      headerTemplate: "{{ 'header_report.returnQuantityRate' | translate  }}"
                      template: kendo.template($("#tpl_rmaList_returnqtyrate").html())
                      type: "number"
                      sortable: false
                  }]
    }

    $scope.rmaListOptions =
        height:common.getTableHeight(205) + "px"
        checkBoxColumn:false
        columnMenu: false
        dataSource: 
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                            options.success d:
                                  results: result.RMAReportItemList or []
                                  __count: result.TotalRecordCount
                     $scope.pageChanged(options.data)
            serverPaging: true
            serverSorting: true
        filterable: false
        columns: $scope.gridData.columns
        toolbar: [  
                    { 
                      template:"<button ng-click=\"export()\" ng-disabled='rmaTotalRecords == 0' class='k-button k-button-icontext' href='\\#'><span class='k-icon k-i-excel'></span>{{ 'view_report.export' | translate }}</button>"
                    },
                    { 
                      template:"<button ng-click=\"print()\" ng-disabled='rmaTotalRecords == 0' class='k-button k-button-icontext' href='\\#'><span class='k-icon k-i-pdf'></span>{{ 'view_report.print' | translate }}&nbsp;</button>"
                    }
                 ] 

    $scope.export = ->
        if $scope.exportDisabled
            messager.error($translate('error_report.exceedLimit') + $scope.ExportMaxCount + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action1 = "export"
        reportExporter.exportReport(rmaReportAPI.search,requestItem,{ 'ExportFormat'  : 'Excel'})
        
    $scope.print = ->
        if $scope.exportDisabled
            messager.error($translate('error_report.exceedLimit') + $scope.ExportMaxCount + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action1 = "export"
        reportExporter.exportReport(rmaReportAPI.search,requestItem,{ 'ExportFormat'  : 'Pdf'})

])
