angular.module("vdInvoiceStatus", ['ngSanitize'])

.directive('vdInvoiceStatus',["$rootScope","$filter","$location","$compile","$route","common","invoiceAPI",
 ($rootScope,$filter,$location,$compile,$route,common,invoiceAPI) ->
  restrict: 'E'
  scope:{
    data: '='
    exceptionDialog: '='
  }

  template:' 
    <div>
        <span ng-show="dataItem.HasInvoiceException != \'Y\' && dataItem.OrderStatus==\'Canceled\' && (dataItem.InvoiceStatus == \'Unknown\' || dataItem.InvoiceStatus==\'Uninvoiced\')"
            ng-class="{
                        \'blue\':  dataItem.HasInvoiceException != \'Y\' && (dataItem.InvoiceStatus==\'Unknown\' || dataItem.InvoiceStatus==\'Uninvoiced\' || dataItem.InvoiceStatus==\'Processing\' || dataItem.InvoiceStatus==\'Partialinvoiced\'),
                        \'green\': dataItem.HasInvoiceException != \'Y\' && dataItem.InvoiceStatus==\'Invoiced\',
                        \'red\':   dataItem.HasInvoiceException == \'Y\'
                      }">{{dataItem.InvoiceStatus}}
        </span>
        <div class="btn-group" style="position: absolute; margin-top: -10px;">
            <div class="dropdown">
                <a  data-toggle="dropdown" href="\#" title="" style="text-decoration: underline;"
                    ng-click="autodp()"
                    ng-class="{
                                \'blue\':  dataItem.HasInvoiceException != \'Y\' && (dataItem.InvoiceStatus==\'Unknown\' || dataItem.InvoiceStatus==\'Uninvoiced\' || dataItem.InvoiceStatus==\'Processing\' || dataItem.InvoiceStatus==\'Partialinvoiced\'),
                                \'green\': dataItem.HasInvoiceException != \'Y\' && dataItem.InvoiceStatus==\'Invoiced\',
                                \'red\':   dataItem.HasInvoiceException == \'Y\'
                              }"
                    ng-show="dataItem.HasInvoiceException == \'Y\' || dataItem.OrderStatus!=\'Canceled\' || (dataItem.InvoiceStatus != \'Unknown\' && dataItem.InvoiceStatus!=\'Uninvoiced\')">
                    <span>{{dataItem.InvoiceStatus}}</span>
                </a>
                <ul class="dropdown-menu">
                    <li>
                        <a href="\#" ng-show="dataItem.InvoiceStatus==\'Uninvoiced\' && isViewAuthOnly" >
                            <i class="icon-ban-circle"></i>
                            &nbsp;{{ \'header_orderlist.noPermission\' | translate }}
                        </a>
                        <a href="\#" ng-click="openInvoice(dataItem,\'view\')" ng-hide="dataItem.InvoiceStatus==\'Uninvoiced\'" vd-auth="View Invoice"  vd-auth-path="orderlist">
                            <i class="icon-list-alt"></i>
                            &nbsp;{{ \'header_orderlist.menuView\' | translate }}
                        </a>
                        <a href="\#" ng-click="jumpToInvoicePage(dataItem,\'create\')" vd-auth="Create Invoice"  vd-auth-path="orderlist"
                            ng-show="dataItem.OrderStatus==\'New\' || dataItem.OrderStatus==\'Processing\'">
                            <i class="icon-plus"></i>
                            &nbsp;{{ \'header_orderlist.menuCreate\' | translate }}
                        </a>
                        <a href="\#" ng-click="openInvoice(dataItem,\'edit\')" vd-auth="Update Invoice"  vd-auth-path="orderlist"
                            ng-show="dataItem.OrderStatus==\'Processing\' && dataItem.InvoiceStatus!=\'Uninvoiced\'">
                            <i class="icon-pencil"></i>
                            &nbsp;{{ \'header_orderlist.menuUpdate\' | translate }}
                        </a>
                        <a href="\#"
                            ng-click="openOrderException()"
                            ng-show="dataItem.HasInvoiceException == \'Y\'  && exceptionDialog != true">
                            <i class="icon-exclamation-sign bigger-125 red2"></i>
                            &nbsp;{{ \'header_orderlist.menuShowException\' | translate }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  
   <div modal="invoiceModal" close="closeInvoice()" options="{backdrop: true,dialogFade:true}">
     <div class="modal-dialog vp-modal-dialog-2" style="width: 600px;">
        <form name="invoiceForm" class="modal-content">

            <div class="modal-body clearfix">
                <div class="col-xs-12" style="margin-top: 10px;">
                    <h5 class="header smaller grey"><i class="icon-hand-right"></i>&nbsp;{{ \'header_orderlist.invoiceHeader\' | translate }}
                        <span ng-if="currentInvoiceActionType == \'view\'">{{ \'header_orderlist.actionView\' | translate }}</span></h5>
                    <table class="table table-detail">
                        <thead>
                            <tr>
                                <td class="vp-table-Header" style="width: 20px;"></td>
                                <td class="vp-table-Header">{{ \'header_orderlist.invoiceNumber\' | translate }}</td>
                                <td class="vp-table-Header">{{ \'header_orderlist.invoiceDate\' | translate }}</td>
                                <td class="vp-table-Header"></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="invoice in currentInvoiceList">
                                <td>
                                    <div class="col-xs-12 text-center no-padding">
                                        <a href="#" title="Invoice Item List" data-toggle="dropdown" ng-click="showInvoiceItemList(invoice)">
                                            <i class="icon-chevron-sign-down bigger-140 blue"></i>
                                        </a>
                                        <ul class="user-menu dropdown-menu text-left" style="margin-left: 20px;">
                                            <li>
                                                <span style="font-size: 17px; padding-left: 10px;">{{ \'header_orderlist.itemList\' | translate }}</span>
                                                <span class="badge badge-success"
                                                    ng-show="invoice.itemList"
                                                    style="position: absolute; top: 3px; left: 83px;">{{ invoice.itemList.length }}</span>
                                                <span ng-show="invoice.itemList"
                                                    style="position: absolute; top: 11px; left: 269px; font-size: 12px; font-weight: bold;">{{ \'header_orderlist.itemTotal\' | translate }}:&nbsp;{{ invoice.itemCount}}</span>
                                            </li>
                                            <li class="divider"></li>
                                            <li>
                                                <div class="col-xs-12" style="overflow-y: auto; max-height: 400px;">
                                                    <div class="col-xs-12" ng-repeat="item in invoice.itemList"
                                                        style="width: 350px; font-size: 13px; color: #717171; padding-bottom: 0px;">
                                                        <div class="col-xs-12 no-padding-left" style="border-bottom: 1px solid #E6E6E6; margin-bottom: 8px;">
                                                            <span class="col-xs-6 blue">{{ item.VendorPartNumber }}</span>
                                                            <span class="col-xs-3">{{ item.UnitPrice }}<vd-profile-label type="{{ \'CurrencyCode\' }}"></vd-profile-label></span>
                                                            <div class="col-xs-3 text-left">
                                                                <span>{{ \'header_orderlist.qty\' | translate }}:&nbsp;{{ item.Quantity }}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </td>
                                <td><span class="align-middle">{{ invoice.InvoiceNumber }}</span></td>
                                <td><span class="align-middle">{{ invoice.InvoiceDate | moment:\'MM/DD/YYYY h:mm A\'}}</span></td>
                                <td class="text-center action-buttons">
                                    <a href="#" title="{{ \'header_orderlist.redirectToInvoicePage\' | translate }}" ng-click="jumpToInvoicePage(invoice,currentInvoiceActionType)">
                                        <i class="icon-share-alt bigger-120 blue"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-sm red" ng-click="closeInvoice()">
                    <i class="icon-undo"></i>
                    {{ \'view_orderlist.close\' | translate }}
                </button>
            </div>
         </form>
       </div>
    </div>
    
    
    <vd-order-exception data="dataItem" is-show="isShowException"></vd-order-exception>
    '

  link: ($scope, element, attrs) ->
      $scope.dataItem = angular.copy($scope.data)
     
      $scope.currentInvoiceList = null
      $scope.currentInvoiceActionType = null
      
      $scope.hasViewAuthOnly = ->
        pagePathArray = common.currentRoutePath().toLowerCase().split('/')
        pagePath = if attrs.vdAuthPath then "/"+attrs.vdAuthPath else "/"+pagePathArray[1]
        filterFunctionList = $filter('filter')(common.currentUser.newFunctionList,(f) -> return f.MenuURL && f.MenuURL.toLowerCase() == pagePath)
        assignedFunctionList = $filter('filter')(filterFunctionList,(f) -> return f.Assignable == true && f.IsAssigned == true)
        if(!assignedFunctionList || assignedFunctionList.length == 0)
            return false
        for item in assignedFunctionList
            if item.FunctionType.indexOf('Edit') >= 0
                return false
        return true

      $scope.isViewAuthOnly = $scope.hasViewAuthOnly()

      $scope.autodp = ->
        menuHeight = 40
        menuHeight += 20 if($scope.dataItem.InvoiceStatus!='Uninvoiced')
        menuHeight += 20 if($scope.dataItem.OrderStatus=='New' || $scope.dataItem.OrderStatus=='Processing') 
        menuHeight += 20 if($scope.dataItem.OrderStatus=='Processing' && $scope.dataItem.InvoiceStatus!='Uninvoiced') 
        menuHeight += 20 if($scope.dataItem.HasInvoiceException == 'Y' && $scope.exceptionDialog != true) 
        common.autoDropUpDown(element,menuHeight)
        return
        
      $scope.openInvoice = (currentOrder, actionType) ->
        $scope.currentInvoiceActionType = actionType
        $scope.currentInvoiceList = null
        if(!currentOrder.invoiceList)
          $scope.queryInvoiceList(currentOrder)
        else
          $scope.currentInvoiceList = angular.copy(currentOrder.invoiceList)
          $scope.autoJumpInvoicePage()
      
      $scope.autoJumpInvoicePage = ->
        if($scope.currentInvoiceList && $scope.currentInvoiceList.length == 1)
           $scope.jumpToInvoicePage($scope.currentInvoiceList[0],$scope.currentInvoiceActionType)
        else
          $scope.invoiceModal = true
      
      $scope.queryInvoiceList = (currentOrder) ->
        requestItem = {
          action: "query"
          vendorNumber: common.currentUser.VendorNumber
          poNumber: currentOrder.PONumber
          PagingInfo:{startPageIndex:0,endPageIndex:0,pageSize:99}
        }
        response = invoiceAPI.search requestItem,
           ->
              if(response&&response.Succeeded)        
                 currentOrder.invoiceList = response.InvoiceList
                 $scope.currentInvoiceList = angular.copy(response.InvoiceList)
                 $scope.autoJumpInvoicePage()
        ,(error)->

      $scope.showInvoiceItemList = (currentInvoice) ->
        if(!currentInvoice)
          return
        if(!currentInvoice.itemList)
          requestItem = {
            vendorNumber: common.currentUser.VendorNumber
            poNumber: currentInvoice.PONumber
            invoiceNUmber: currentInvoice.InvoiceNumber
          }
          response = invoiceAPI.GetItems requestItem,
           ->
              if(response&&response.Succeeded&&response.Invoice)      
                 currentInvoice.itemList = response.Invoice.ItemList
                 totalCount = 0
                 for index of currentInvoice.itemList
                   totalCount += currentInvoice.itemList[index].Quantity
                 currentInvoice.itemCount = totalCount
          ,(error)->
          
      $scope.openOrderException = ->
        $scope.isShowException = true
        
      $scope.closeInvoice = ->
        $scope.invoiceModal = false

      $scope.jumpToInvoicePage = (selectedItem,option) ->
        $scope.closeInvoice()
        common.closeModal()
        url = "invoice/#{selectedItem.PONumber}/#{selectedItem.InvoiceNumber}/#{option}"
        if(option == 'create')
          if $location.$$path.indexOf('invoice') >= 0 && $location.$$path.indexOf('create') >= 0
            $route.reload()
            return
          url = "invoice/#{selectedItem.PONumber}/#{option}"
        common.navigate(url)
        
      $scope.$watch "data", (newVal, oldVal) ->
       if newVal 
           $scope.dataItem = angular.copy($scope.data)  
])