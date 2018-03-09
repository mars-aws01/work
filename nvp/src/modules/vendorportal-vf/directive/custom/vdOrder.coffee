angular.module("vdOrder", ['ngSanitize'])

.directive('vdOrder',["$rootScope","$location","$compile","$route","$window","common",($rootScope,$location,$compile,$route,$window,common) ->
  restrict: 'E'
  scope:{
    data: '='
    exceptionDialog: '='
  }
  # <img src="/framework/img/refresh.png" >
  template:' <div class="vp-block">
                <div class="refresh" >
                    <a href="#"  title="{{ \'framework_button.back\' | translate }}" ng-click="back()" ng-hide="exceptionDialog == true">
                       <i class="icon-arrow-left"></i> 
                    </a>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <a href="#" title="{{ \'framework_button.refresh\' | translate }}" ng-click="refresh()" ng-hide="exceptionDialog == true">
                       <i class="icon-refresh"></i> 
                    </a>
                </div>
                <div class="row">
                    <div class="col-lg-2 visible-lg">
                        <div class="col-xs-12" style="margin-top: 15px;margin-left: 40px;">
                          <icon class="icon-shopping-cart" style="color: #909FA7; font-size: 70px;"></icon>
                        </div>
                    </div>
                    <div class="col-lg-10 vp-page-header2" style="margin-top: -15px;">
                        <h2 style="margin-bottom: 9px;">
                            <label class="name">{{ \'view_shipnotice.orderNumber\' | translate }}&nbsp;&nbsp;&nbsp;{{ currentOrder.PONumber }}</label>
                        </h2>
                       
                        <div class="description col-lg-3 col-md-6 no-padding">
                            <label class="name2" >{{ \'view_shipnotice.orderDate\' | translate }}:</label>
                            <label class="value" style="font-size:12px">{{ currentOrder.PODate | moment:\'MM/DD/YYYY hh:mm A\' }}</label>
                        </div>
                        <div class="description col-lg-3 col-md-6 no-padding">
                            <label class="name2">{{ \'view_shipnotice.customerPoNumber\' | translate }}:</label>
                            <label class="value">{{ currentOrder.CustomerPONumber }}</label>
                        </div>
                        <div class="description col-lg-6 no-padding">
                            <label class="name2">{{ \'view_shipnotice.expectedShipService\' | translate }}:</label>
                            <label class="value">{{ currentOrder.ShipService }}</label>
                        </div>
                        <div class="description col-lg-3 col-md-6 no-padding">
                            <label class="name2">{{ \'view_shipnotice.orderStatus\' | translate }}:</label>
                            <label class="value">
                                <vd-order-status data="currentOrder"  exception-dialog="exceptionDialog"></vd-order-status>
                            </label>
                        </div>
                        <div class="description col-lg-3 col-md-6 no-padding">
                            <label class="name2">{{ \'view_shipnotice.shipmentStatus\' | translate }}:</label>
                            <label class="value">
                                 <vd-shipment-status data="currentOrder"  exception-dialog="exceptionDialog"></vd-shipment-status>
                            </label>
                        </div>
                        <div class="description col-lg-6 no-padding">
                            <label class="name2">{{ \'view_shipnotice.invoiceStatus\' | translate }}:</label>
                            <label class="value">
                                <vd-invoice-status data="currentOrder"  exception-dialog="exceptionDialog"></vd-invoice-status>
                            </label>
                        </div>
                    </div>
                </div>
            </div>'

  link: ($scope, element) ->
     $scope.refresh = ->
       $route.reload()
       
     $scope.back = ->
       common.pageInfo.isBackPage = true
       if($rootScope.orderList_backDoSearch != true)
          $window.history.go(-1)
       else
          $location.path("/orderlist")
        
          
     $scope.$watch "data", (newVal, oldVal) ->
       if newVal 
           $scope.currentOrder = angular.copy($scope.data)
])