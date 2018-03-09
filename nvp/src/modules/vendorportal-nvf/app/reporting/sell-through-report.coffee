angular.module('nvp-sell-through-report',['ngRoute','pascalprecht.translate'])

.config(["$translateProvider",($translateProvider) ->
    $translateProvider
    .translations('en-us',resources.vendorportal_nvf.reporting.us)
    .translations('zh-cn',resources.vendorportal_nvf.reporting.cn)
    .translations('zh-tw',resources.vendorportal_nvf.reporting.tw)
  ])

.config(["$routeProvider", ($routeProvider) ->
    $routeProvider
    .when "/sell-through-report",
      templateUrl: "/modules/vendorportal-nvf/app/reporting/sell-through-report.tpl.html"
      controller: 'SellThroughReportCtrl'
])

.controller('SellThroughReportCtrl',
["$scope","$filter","$q","messager","common","auth","$translate","categoryAPI","sellThroughReportAPI","reportExporter",
($scope,$filter,$q,messager,common,auth,$translate,categoryAPI,sellThroughReportAPI,reportExporter) ->

    $scope.currentRole = auth.getCurrentRoleByNVF()  #basic/advanced

    currentDate = new Date()
    dateTo = new Date(currentDate)
    dateTo.setDate(currentDate.getDate() - 7)
    dateFrom = new Date(dateTo)
    dateFrom.setDate(dateTo.getDate() - 30)
    
    $scope.setDefaultSummary = ->
        $scope.exportDisabled = false
        $scope.totalRecords = 0
        $scope.detailCount=0
        $scope.exportMaxCount = 0
        $scope.totalQty = 0
        $scope.totalSoldAmt = 0
    
    $scope.setDefaultSummary()
    $scope.query = {
        KeyWordType : 'ItemNumber',
        StartDate: dateFrom.toISOString().slice(0,10).replace(/-/g,"-"),
        EndDate: dateTo.toISOString().slice(0,10).replace(/-/g,"-")
    }
    
    $scope.dataGridName = "sellThroughReportGrid"
    $scope.refreshKey = "refresh.sell-through-report"
        
    $scope.search = ->
        if $scope.lastVendorNumber && $scope.lastVendorNumber != common.currentUser.VendorNumber
            delete $scope.query.CategoryCode
        $scope.lastVendorNumber = angular.copy(common.currentUser.VendorNumber)
        messager.clear()
        if(!$scope.query.StartDate)
          messager.warning($translate('error_report.salesFromEmpty'))
          return
        if(!$scope.query.EndDate)
          messager.warning($translate('error_report.salesToEmpty'))
          return
            
        if($scope.query.StartDate && new Date($scope.query.StartDate).toString() == 'Invalid Date')
          messager.warning($translate('error_report.salesFromInvalid'))
          return 
        if($scope.query.EndDate && new Date($scope.query.EndDate).toString() == 'Invalid Date')
          messager.warning($translate('error_report.salesToInvalid'))
          return 
        if !$scope.isQueryValid()
            messager.warning($translate('error_report.invalidSalesDate'))
            return
        $scope.preparePaging()
        common.refreshDataGrid($scope,$scope.dataGridName,$scope.refreshKey,$scope.query.PagingInfo)
          
    $scope.preparePaging = ->
        $scope.query.PagingInfo = common.getPagging($scope.query.PagingInfo)
    
    $scope.isQueryValid = ->
        return $scope.isDateValid($scope.query.StartDate,$scope.query.EndDate)
    
    #Check Date
    $scope.isDateValid = (datefrom,dateto) ->
        cdate = new Date()
        from = new Date(datefrom)
        to = new Date(dateto)
        temp = new Date(cdate)
        temp.setMonth(cdate.getMonth() - 6 )
        earliest = new Date(temp.getFullYear(), temp.getMonth(), temp.getDate())
        if !from or !to or earliest > from or earliest > to or from > to
            return false
        else
            return true
            
    $scope.queryAPI = ->        
        requestItem = $scope.getRequestItem("query")
        $scope.currentQuery = angular.copy(requestItem)
        sellThroughReportAPI.search requestItem
        ,(response)->
            if(response&&response.Succeeded) 
                if response.Summary
                  $scope.totalQty = response.Summary.TotalQuantity
                  $scope.totalCost = response.Summary.TotalCostAmount
                  $scope.totalSoldAmt = response.Summary.TotalSalesAmount
                  $scope.detailCount= response.Summary.DetailCount
                $scope.data = response.Result
                $scope.exportDisabled = response.Summary.TotalRecords > response.ExportMaxCount
                $scope.exportMaxCount  = response.ExportMaxCount
                $scope.totalRecords = response.Summary.TotalRecords
                $scope.callbackEvent(response) if $scope.callbackEvent   
            else
                $scope.callbackEvent({ TotalRecordCount:0} ) if $scope.callbackEvent 
                $scope.setDefaultSummary()
        ,(error)->
            $scope.callbackEvent({ TotalRecordCount:0 , Result:[]} ) if $scope.callbackEvent 
            $scope.setDefaultSummary()
                
    $scope.getRequestItem = (action2)->
        requestItem = angular.copy($scope.query)
        requestItem.action1 = $scope.currentRole
        requestItem.action2 = action2
        if(!requestItem.PagingInfo)
          requestItem.PagingInfo = $scope.preparePaging()
        if(!requestItem.SortInfo)  
          requestItem.SortInfo = {SortField: "Quantity", SortType: "desc"}
        requestItem.vendorNumber = common.currentUser.VendorNumber
        return requestItem
                    
    ######## DataGrid
    $scope.defaultColumns = []
    
    $scope.initColumns = ->
        if($scope.currentRole == "basic") 
           $scope.defaultColumns = angular.copy($scope.gridData.columns)
        else if ($scope.currentRole == "advanced") 
           $scope.defaultColumns = $.merge(angular.copy($scope.gridData.columns),$scope.gridData_advancedRole.columns) 
      
    $scope.gridData = {
           columns: [
                        {
                            field: "ItemNumber"
                            width: "100px"
                            title: "Item #"
                            sortfield:"ItemNumber"
                            headerTemplate: "{{ 'header_report.itemNumber' | translate  }}"
                            template: kendo.template($("#tpl_sellThroughList_itemnumber").html())
                        }
                        {
                            field: "ItemDescription"
                            title: "Item Description"
                            width: "150px"
                            sortfield:"ItemDescription"
                            headerTemplate: "{{ 'header_report.itemDescription' | translate  }}"
                            template: kendo.template($("#tpl_sellThroughList_description").html())
                            sortable: false
                        }
                        {
                            field: "manufacturerpartnumber"
                            width: "150px"
                            title: "Mfr.Part #"
                            sortfield:"manufacturerpartnumber"
                            headerTemplate: "{{ 'header_report.mfrPartNumber' | translate  }}"
                            template: kendo.template($("#tpl_sellThroughList_manufacturerpartnumber").html())
                            sortable: false
                        }
                        {
                            field: "TotalQty"
                            width: "80px"
                            title: "Total Qty"
                            sortfield:"Quantity"
                            headerTemplate: "{{ 'header_report.totalQty' | translate  }}"
                            template: kendo.template($("#tpl_sellThroughList_totalqty").html())
                            type: "number"
                        }]
    }    
    
    $scope.gridData_advancedRole = {
        columns:[  
                    {
                        field: "AverageCost"
                        width: "80px"
                        title: "Avg. Cost"
                        sortfield:"AverageCost"
                        headerTemplate: "{{ 'header_report.avgCost' | translate  }}"
                        template: kendo.template($("#tpl_sellThroughList_avgcost").html())
                        type: "number"
                        sortable: false
                    }
                    {
                        field: "AvgSellingPrice"
                        width: "100px"
                        title: "Avg. Selling Price"
                        sortfield:"AvgSellingPrice"
                        headerTemplate: "{{ 'header_report.avgSellingPrice' | translate  }}"
                        template: kendo.template($("#tpl_sellThroughList_avgsellingprice").html())
                        type: "number"
                        sortable: false
                    }
                    {
                        field: "SalesAmount"
                        width: "100px"
                        title: "Sales Amt"
                        sortfield:"SalesAmount"
                        headerTemplate: "{{ 'header_report.salesAmount' | translate  }}"
                        template: kendo.template($("#tpl_sellThroughList_salesamount").html())
                        type: "number"
                        sortable: false
                    }
                    {
                        field: "SOCount"
                        width: "80px"
                        title: "Order Count"
                        sortfield:"SOCount"
                        headerTemplate: "{{ 'header_report.orderCount' | translate  }}"
                        template: kendo.template($("#tpl_sellThroughList_ordercount").html())
                        sortable: false
                    }]
    }
    
    $scope.initColumns() 
    
    $scope.pageChanged = (p)->
        $scope.query.PagingInfo.pageSize = p.pageSize
        $scope.query.PagingInfo.startpageindex=p.page-1
        $scope.query.PagingInfo.endpageindex=p.page-1
        common.setServerSorting($scope.query, p)
        $scope.queryAPI()
        
    $scope.sellThroughListOptions =
        height:common.getTableHeight(210) + "px"
        checkBoxColumn:false
        columnMenu: false
        dataSource: 
            type: "odata"
            transport:
                read: (options) ->
                     $scope.callbackEvent = (result) ->
                            options.success d:
                                  results: result.Result or []
                                  __count: result.TotalRecordCount  
                     $scope.pageChanged(options.data)           
            serverPaging: true
            serverSorting: true
        filterable: false
        columns: $scope.defaultColumns
        toolbar: [
                    {
                      template:"
                        <div class=\"btn-group\" role=\"group\">
                            <button type=\"button\" class=\"k-button k-button-icontext dropdown-toggle\" ng-disabled='totalRecords == 0' data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
                                <span class='k-icon k-i-excel'></span>{{ 'view_report.export' | translate }}
                                <span class=\"caret\"></span>
                            </button>
                            <ul class=\"dropdown-menu\">
                              <li><a href='\\#' ng-click=\"export(true)\">{{ 'view_report.withDetail' | translate }}</a></li>
                              <li><a href='\\#' ng-click=\"export(false)\">{{ 'view_report.withoutDetail' | translate }}</a></li>
                            </ul>
                        </div>"
                    },
                    { 
                      template:"                
                          <div class=\"btn-group\" role=\"group\">
                                <button type=\"button\" class=\"k-button k-button-icontext dropdown-toggle\" ng-disabled='totalRecords == 0' data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">
                                    <span class='k-icon k-i-pdf'></span>{{ 'view_report.print' | translate }}
                                    <span class=\"caret\"></span>
                                </button>
                                <ul class=\"dropdown-menu\">
                                  <li><a href='\\#' ng-click=\"print(true)\">{{ 'view_report.withDetail' | translate }}</a></li>
                                  <li><a href='\\#' ng-click=\"print(false)\">{{ 'view_report.withoutDetail' | translate }}</a></li>
                            </ul>
                        </div>"
                    }
                ]
    
    $scope.export = (withDetail)->
        if $scope.exportDisabled or (withDetail and  $scope.detailCount > $scope.exportMaxCount * 2)
            if withDetail
                max = $scope.exportMaxCount * 2
                messager.error($translate('error_report.exceedLimitWithDetail') + max + '.')
            else
                max = $scope.exportMaxCount
                messager.error($translate('error_report.exceedLimit') + max + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action1 = $scope.currentRole
        requestItem.action2 = "export"
        reportExporter.exportReport(sellThroughReportAPI.search,requestItem,{ 'ExportFormat'  : 'Excel', 'WithDetail':withDetail})
        
    $scope.print =(withDetail) ->
        if $scope.exportDisabled or (withDetail and  $scope.detailCount > $scope.exportMaxCount * 2)
            max = 0
            if withDetail
                max = $scope.exportMaxCount * 2
                messager.error($translate('error_report.exceedLimitWithDetail') + max + '.')
            else
                max = $scope.exportMaxCount
                messager.error($translate('error_report.exceedLimit') + max + '.')
            return
        requestItem = angular.copy($scope.currentQuery)
        requestItem.action1 = $scope.currentRole
        requestItem.action2 = "export"
        reportExporter.exportReport(sellThroughReportAPI.search,requestItem,{ 'ExportFormat'  : 'Pdf', 'WithDetail':withDetail})
])