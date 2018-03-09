angular.module("vdOrderException", ['ngSanitize'])

.directive('vdOrderException',["$rootScope","$location","$compile","common","orderAPI","orderExceptionAPI",
 ($rootScope,$location,$compile,common,orderAPI,orderExceptionAPI) ->
  restrict: 'E'
  scope:{
    data: '='
    isShow: '='
  }

  template:'
   <div modal="orderExceptionModal" close="closeOrderException()" options="{backdrop: true,dialogFade:true}">
    <div class="modal-dialog" style="width: 1100px;background: white;border: 1px solid #A0CBF0;">
        <form name="orderExceptionForm" class="modal-content">
            <div class="modal-header vp-modal-header">
                <h3 class="grey" style="vertical-align: middle">{{ \'header_orderlist.orderExceptionDetail\' | translate }}</h3>
            </div>
            <div class="modal-body clearfix">
                <div class="col-sm-12 no-padding-left">
                    <vd-order data="currentExceptionOrder" exception-dialog="true"></vd-order>
                </div>
                <div class="col-xs-12 no-padding-left" style="margin-top: 10px;">
                    <h5 class="header smaller blue">{{ \'header_orderlist.orderSummary\' | translate }}</h5>
                    <table class="table table-detail">
                        <thead>
                            <tr>
                                <td class="vp-table-Header">{{ \'header_orderlist.invoiceNumber\' | translate }}</td>
                                <td class="vp-table-Header">{{ \'header_orderlist.totalAmount\' | translate }}<vd-profile-label type="{{ \'CurrencyCode\' }}"></vd-profile-label></td>
                                <td class="vp-table-Header">{{ \'header_orderlist.itemAmount\' | translate }}<vd-profile-label type="{{ \'CurrencyCode\' }}"></vd-profile-label></td>
                                <td class="vp-table-Header">{{ \'header_orderlist.shipToState\' | translate }}</td>
                                <td class="vp-table-Header">{{ \'header_orderlist.actualTaxRate\' | translate }}</td>
                                <td class="vp-table-Header">{{ \'header_orderlist.shippingAmount\' | translate }}<vd-profile-label type="{{ \'CurrencyCode\' }}"></vd-profile-label></td>
                                <td class="vp-table-Header">{{ \'header_orderlist.neweggSOStatus\' | translate }}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr ng-repeat="item in currentExceptionOrder.exceptionSummaryList">
                                <td><span class="align-middle">{{item.VendorInvoiceNumber}}</span></td>
                                <td class="text-right"><span class="align-middle" ng-class="{\'red\':item.IsInvoiceException}">{{item.InvoiceTotalAmount | number:2 }}</span></td>
                                <td class="text-right"><span class="align-middle" ng-class="{\'red\':item.IsInvoiceException}">{{item.InvoiceCalcAmount | number:2}}</span></td>
                                <td><span class="align-middle" ng-class="{\'red\':item.IsTaxException}">{{item.ShipToState}}</span></td>
                                <td class="text-right"><span class="align-middle" ng-class="{\'red\':item.IsTaxException}">{{item.ActualTaxRate}}</span></td>
                                <td class="text-right"><span class="align-middle" ng-class="{\'red\':item.IsShippingChargeException}">{{item.ShippingAmount | number:2}}</span></td>
                                <td><span class="align-middle">{{item.SOStatus}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="col-xs-5 no-padding-left">
                    <h5 class="header smaller blue">{{ \'header_orderlist.order\' | translate }}</h5>
                    <div class="col-xs-12 no-padding" style="max-height: 140px; overflow-y: auto">
                        <table class="table table-detail">
                            <thead>
                                <tr>
                                    <td class="vp-table-Header">{{ \'header_orderlist.itemNumber\' | translate }}</td>
                                    <td class="vp-table-Header">{{ \'header_orderlist.partNumber\' | translate }}</td>
                                    <td class="vp-table-Header">{{ \'header_orderlist.price\' | translate }}<vd-profile-label type="{{ \'CurrencyCode\' }}"></vd-profile-label></td>
                                    <td class="vp-table-Header">{{ \'header_orderlist.qty\' | translate }}</td>
                                    <td class="vp-table-Header">{{ \'header_orderdetail.ackStatus\' | translate }}</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in currentExceptionOrder.ItemList">
                                    <td><span class="align-middle">{{ item.OrderItem.NeweggItemNumber }}&nbsp;</span></td>
                                    <td><span class="align-middle">{{ item.OrderItem.VendorPartNumber }}</span></td>
                                    <td class="text-right"><span class="align-middle">{{ item.OrderItem.UnitPrice | number:2 }}</span></td>
                                    <td class="text-right"><span class="align-middle">{{ item.OrderItem.Quantity }}</span></td>
                                    <td><span class="align-middle">{{ item.OrderItem.ItemACKStatus }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-xs-3">
                    <h5 class="header smaller blue">{{ \'header_orderlist.shipment\' | translate }}</h5>
                    <div class="col-xs-12 no-padding" style="max-height: 140px; min-height:58px; overflow-y: auto">
                        <table class="table table-detail">
                            <thead>
                                <tr>
                                    <td class="vp-table-Header">{{ \'header_orderlist.partNumber\' | translate }}</td>
                                    <td class="vp-table-Header">{{ \'header_orderlist.qty\' | translate }}</td>
                                </tr>
                            </thead>
                            <tbody ng-show="!currentExceptionOrder.exceptionItemList || !currentExceptionOrder.exceptionItemList.ShipmentList || currentExceptionOrder.exceptionItemList.ShipmentList.length == 0">
                                <tr>
                                    <td colspan="99" style="background: #F0F3F5">{{ \'pageable.empty\' | translate }}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr ng-repeat="item in currentExceptionOrder.exceptionItemList.ShipmentList">
                                    <td><span class="align-middle"
                                        ng-class="{\'red\':item.IsVoidItemError || item.IsPartnumberError}">{{ item.VendorPartNumber }}&nbsp;</span></td>
                                    <td class="text-right"><span class="align-middle"
                                        ng-class="{\'red\':item.IsVoidItemError || item.IsQuantityError}">{{ item.Quantity }}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-xs-4">
                    <h5 class="header smaller blue">{{ \'header_orderlist.invoice\' | translate }}</h5>
                    <div class="col-xs-12 no-padding" style="max-height: 140px; min-height:58px; overflow-y: auto">
                        <table class="table table-detail">
                            <thead>
                                <tr>
                                    <td class="vp-table-Header">{{ \'header_orderlist.partNumber\' | translate }}</td>
                                    <td class="vp-table-Header">{{ \'header_orderlist.price\' | translate }}<vd-profile-label type="{{ \'CurrencyCode\' }}"></vd-profile-label></td>
                                    <td class="vp-table-Header">{{ \'header_orderlist.qty\' | translate }}</td>
                                </tr>
                            </thead>
                            <tbody ng-show="!currentExceptionOrder.exceptionItemList || !currentExceptionOrder.exceptionItemList.InvoiceList || currentExceptionOrder.exceptionItemList.InvoiceList.length == 0">
                                <tr>
                                    <td colspan="99" style="background: #F0F3F5">{{ \'pageable.empty\' | translate }}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr ng-repeat="item in currentExceptionOrder.exceptionItemList.InvoiceList">
                                    <td>
                                        <span class="align-middle"
                                            ng-class="{\'red\':item.IsVoidItemError || item.IsPartnumberError}">{{ item.VendorPartNumber }}&nbsp;
                                        </span>
                                    </td>
                                    <td class="text-right">
                                        <span class="align-middle"
                                            ng-class="{\'red\':item.IsVoidItemError || item.IsPriceError}">{{ item.UnitPrice | number:2}}
                                        </span>
                                    </td>
                                    <td class="text-right">
                                        <span class="align-middle"
                                            ng-class="{\'red\':item.IsVoidItemError || item.IsQuantityError}">{{ item.Quantity }}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="col-xs-12 no-padding-left">
                    <h5 class="header smaller  blue">{{ \'header_orderlist.orderExceptionList\' | translate }}</h5>
                    <table class="table table-detail">
                        <thead>
                            <tr>
                                <td class="vp-table-Header">{{ \'header_orderlist.exceptionType\' | translate }}</td>
                                <td class="vp-table-Header">{{ \'header_orderlist.shipmentException\' | translate }}</td>
                                <td class="vp-table-Header">{{ \'header_orderlist.invoiceExpception\' | translate }}</td>
                                <td class="vp-table-Header">{{ \'header_orderlist.status\' | translate }}</td>
                                <td class="vp-table-Header">{{ \'header_orderlist.indate\' | translate }}</td>
                            </tr>
                        </thead>
                        <tbody ng-show="!currentExceptionOrder || currentExceptionOrder.exceptionDetailList == 0">
                            <tr>
                                <td colspan="99" style="background: #F0F3F5">{{ \'pageable.empty\' | translate }}</td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr ng-repeat="item in currentExceptionOrder.exceptionDetailList">
                                <td><span class="align-middle">{{item.ExceptionType}}</span></td>
                                <td><span class="align-middle">{{item.IsShipmentException == true ? \'Yes\' : \'No\'}}</span></td>
                                <td><span class="align-middle">{{item.IsInvoiceException == true ? \'Yes\' : \'No\'}}</span></td>
                                <td><span class="align-middle">{{item.ProcessStatus}}</span></td>
                                <td><span class="align-middle">{{item.IssueDate | moment:\'MM/DD/YYYY h:mm:ss A\'}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger btn-sm" ng-click="closeOrderException()">
                    <i class="icon-undo"></i>
                    {{ \'view_orderlist.close\' | translate }}
                </button>
            </div>
        </form>
    </div>
   </div> '

  link: ($scope, element) ->
      $scope.currentExceptionOrder = null

      $scope.openOrderException = (currentOrder) ->
        $scope.currentExceptionOrder = null
        $scope.currentExceptionOrder = angular.copy(currentOrder)
        $scope.orderExceptionModal = true
        $(".modal-backdrop").css( "display", "block" )
        $scope.loadOrderException(currentOrder)
        
      $scope.loadOrderException = (currentOrder) ->
         requestItem = {
            vendorNumber: common.currentUser.VendorNumber
            poNumber: currentOrder.PONumber
         }
         #summary
         requestItem.action = "summary"
         responseSummary = orderExceptionAPI.summary requestItem,
           ->
             if(responseSummary&&responseSummary.Succeeded)  
               $scope.currentExceptionOrder.exceptionSummaryList = responseSummary.ExceptionSummaryList

         #order / shipment / invoice
         requestItem = {
            action: "item"
            vendorNumber: common.currentUser.VendorNumber
            poNumber: currentOrder.PONumber
         }
         response = orderAPI.getItems requestItem,
           ->
              if(response&&response.Succeeded)
                 itemsInOrder = response.ItemList       
                 requestItem.action = "item"
                 responseItem = orderExceptionAPI.items requestItem,
                   ->
                     if(responseItem&&responseItem.Succeeded)
                         $scope.currentExceptionOrder.ItemList=[]
                         itemInExceptionList=[]
                         if(responseItem.ExceptionItemList)       
                             $scope.currentExceptionOrder.exceptionItemList = responseItem.ExceptionItemList
                             itemInExceptionList = $scope.getOrderItemNumberListInExceptionItemList($scope.currentExceptionOrder.exceptionItemList)
                             for itemnumber in itemInExceptionList
                                for item in itemsInOrder
                                    if item.NeweggItemNumber==itemnumber
                                        if(item.ItemACKStatus=='None')
                                            item.ItemACKStatus=''    
                                        $scope.currentExceptionOrder.ItemList.push({OrderItem:{NeweggItemNumber:item.NeweggItemNumber,VendorPartNumber:item.VendorPartNumber,UnitPrice:item.UnitPrice,Quantity:item.Quantity,ItemACKStatus:item.ItemACKStatus}})
                                                           
                             if(typeof $scope.currentExceptionOrder.exceptionItemList=='undefined')
                                $scope.currentExceptionOrder.exceptionItemList=[]
                             $scope.currentExceptionOrder.exceptionItemList.ShipmentList=[]
                             $scope.currentExceptionOrder.exceptionItemList.InvoiceList=[]
                             if $scope.currentExceptionOrder.exceptionItemList.length>0
                               for index of $scope.currentExceptionOrder.exceptionItemList
                                  item=$scope.currentExceptionOrder.exceptionItemList[index]
                                  if item.ShipmentItem
                                     if item.ShipmentItem.VendorPartNumber
                                       $scope.currentExceptionOrder.exceptionItemList.ShipmentList.push(item.ShipmentItem)
                                  if item.InvoiceItem
                                     if item.InvoiceItem.VendorPartNumber
                                       $scope.currentExceptionOrder.exceptionItemList.InvoiceList.push(item.InvoiceItem) 

                         #merger not exception item to exceptionItemList
                         for item in itemsInOrder when item.NeweggItemNumber not in itemInExceptionList
                            if(item.ItemACKStatus=='None')
                                item.ItemACKStatus=''    
                            $scope.currentExceptionOrder.ItemList.push({OrderItem:{NeweggItemNumber:item.NeweggItemNumber,VendorPartNumber:item.VendorPartNumber,UnitPrice:item.UnitPrice,Quantity:item.Quantity,ItemACKStatus:item.ItemACKStatus}}) 
                           
         #exception detail
         requestItem.action = ""
         responseDetail = orderExceptionAPI.detail requestItem,
           ->
             if(responseDetail&&responseDetail.Succeeded)        
                 $scope.currentExceptionOrder.exceptionDetailList = responseDetail.ExceptionDetailList

      $scope.closeOrderException = ->
        $scope.orderExceptionModal = false
        $(".modal-backdrop").css( "display", "none" )
        
      $scope.getOrderItemNumberListInExceptionItemList=(exceptionItemList)->
        orderItemList = []
        for item in exceptionItemList
            orderItemList.push(item.OrderItem.NeweggItemNumber)
        return orderItemList
        
      $scope.$watch "isShow", (newVal, oldVal) ->
       if newVal == true
           $scope.currentOrder = angular.copy($scope.data)
           $scope.openOrderException($scope.currentOrder)
           $scope.isShow = false
])