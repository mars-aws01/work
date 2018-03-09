angular.module("vdShipmentStatus", ['ngSanitize'])

.directive('vdShipmentStatus',["$rootScope","$filter","$location","$compile","$route","common","shipNoticeAPI",
 ($rootScope,$filter,$location,$compile,$route,common,shipNoticeAPI) ->
  restrict: 'E'
  scope:{
    data: '='
    exceptionDialog: '='
  }

  template:'
             <div >
                <span ng-show="dataItem.HasShipmentException != \'Y\' && dataItem.OrderStatus==\'Canceled\' && (dataItem.ShipmentStatus == \'Unknown\' || dataItem.ShipmentStatus==\'Unshipped\')"
                    ng-class="{
                                                \'blue\':  dataItem.HasShipmentException != \'Y\' && (dataItem.ShipmentStatus==\'Unknown\' || dataItem.ShipmentStatus==\'Unshipped\' || dataItem.ShipmentStatus==\'Processing\' || dataItem.ShipmentStatus==\'PartialShipped\'),
                                                \'green\':  dataItem.HasShipmentException != \'Y\' && dataItem.ShipmentStatus==\'Shipped\',
                                                \'red\':   dataItem.HasShipmentException == \'Y\'
                                                }">{{dataItem.ShipmentStatus}}
                </span>
                <div class="btn-group" style="position: absolute;margin-top: -10px;">
                    <div class="dropdown">
                        <a  href="\#" data-toggle="dropdown" title="" style="text-decoration: underline;"
                            ng-click="autodp()"
                            ng-class="{
                                            \'blue\':  dataItem.HasShipmentException != \'Y\' && (dataItem.ShipmentStatus==\'Unknown\' || dataItem.ShipmentStatus==\'Unshipped\' || dataItem.ShipmentStatus==\'Processing\' || dataItem.ShipmentStatus==\'PartialShipped\'),
                                            \'green\':  dataItem.HasShipmentException != \'Y\' && dataItem.ShipmentStatus==\'Shipped\',
                                            \'red\':   dataItem.HasShipmentException == \'Y\'
                                            }"
                            ng-show="dataItem.HasShipmentException == \'Y\' || dataItem.OrderStatus!=\'Canceled\' || (dataItem.ShipmentStatus != \'Unknown\' && dataItem.ShipmentStatus!=\'Unshipped\')">
                            <span >{{dataItem.ShipmentStatus}}</span>
                        </a>

                        <ul class="dropdown-menu">
                            <li>
                                <a href="\#" ng-show="dataItem.ShipmentStatus==\'Unshipped\' && isViewAuthOnly" >
                                    <i class="icon-ban-circle"></i>
                                    &nbsp;{{ \'header_orderlist.noPermission\' | translate }}
                                </a>
                                <a href="\#" ng-click="openShipNotice(dataItem,\'view\')" ng-hide="dataItem.ShipmentStatus==\'Unshipped\'" vd-auth="View Ship Notice" vd-auth-path="orderlist">
                                    <i class="icon-list-alt"></i>
                                    &nbsp;{{ \'header_orderlist.menuView\' | translate }}
                                </a>
                                <a href="\#" ng-click="createShipNoticePage(dataItem.PONumber)" vd-auth="Create Ship Notice" vd-auth-path="orderlist"
                                    ng-show="dataItem.OrderStatus==\'New\' || dataItem.OrderStatus==\'Processing\'">
                                    <i class="icon-plus"></i>
                                    &nbsp;{{ \'header_orderlist.menuCreate\' | translate }} 
                                </a>
                                <a href="\#" ng-click="openShipNotice(dataItem,\'edit\')" vd-auth="Update Ship Notice" vd-auth-path="orderlist"
                                    ng-show="dataItem.OrderStatus==\'Processing\' && dataItem.ShipmentStatus!=\'Unshipped\'">
                                    <i class="icon-pencil"></i>
                                    &nbsp;{{ \'header_orderlist.menuUpdate\' | translate }}
                                </a>
                                <a href="\#"
                                    ng-click="openOrderException()"
                                    ng-show="dataItem.HasShipmentException == \'Y\' && exceptionDialog != true">
                                    <i class="icon-exclamation-sign bigger-125 red2"></i>
                                    &nbsp;{{ \'header_orderlist.menuShowException\' | translate }}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
        </div> 
            
            
        <div modal="shipNoticeModal" close="closeShipNotice()" options="{backdrop: true,dialogFade:true}">
            <div class="modal-dialog vp-modal-dialog-2" style="width: 750px;">
                <form name="shipNoticeForm" class="modal-content">

                    <div class="modal-body clearfix">
                        <div class="col-xs-12" style="margin-top: 10px;">
                            <h5 class="header smaller grey"><i class="icon-hand-right"></i>&nbsp;{{ \'header_orderlist.shipNoticeHeader\' | translate }}
                                <span ng-if="currentShipNoticeActionType == \'view\'">{{ \'header_orderlist.actionView\' | translate }}</span></h5>
                            <table class="table table-detail">
                                <thead>
                                    <tr>
                                        <td class="vp-table-Header" style="width: 20px;"></td>
                                        <td class="vp-table-Header">{{ \'header_orderlist.shipNoticeNumber\' | translate }}</td>
                                        <td class="vp-table-Header">{{ \'header_orderlist.actualShipService\' | translate }}</td>
                                        <td class="vp-table-Header">{{ \'header_orderlist.shippingDate\' | translate }}</td>
                                        <td class="vp-table-Header"></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr ng-repeat="shipNotice in currentShipNoticeList">
                                        <td>
                                            <div class="col-xs-12 text-center no-padding">
                                                <a href="#" title="Package List" data-toggle="dropdown" ng-click="showShipNoticeItemList(shipNotice)">
                                                    <i class="icon-chevron-sign-down bigger-140 blue"></i>
                                                </a>
                                                <ul class="user-menu dropdown-menu text-left" style="margin-left: 20px;">
                                                    <li>
                                                        <span style="font-size: 17px; padding-left: 10px;">{{ \'header_orderlist.packageList\' | translate }}</span>
                                                    </li>
                                                    <li class="divider"></li>
                                                    <li>
                                                        <div class="col-xs-12" style="overflow-y: auto; max-height: 400px;">
                                                            <div class="col-xs-12" ng-repeat="detail in shipNotice.detailList"
                                                                style="width: 650px; font-size: 13px; color: #717171; padding-bottom: 0px;">
                                                                <div class="col-xs-12 no-padding-left" style="border: 1px solid #EDEDED; margin-bottom: 8px;">
                                                                    <span class="col-xs-5 blue vp-trim" style="max-width: 250px; margin-top:5px;" title="{{detail.trackingNumber}}">{{ \'header_orderlist.trackingNumber\' | translate }}:&nbsp;{{ detail.trackingNumber }}</span>
                                                                    <div class="col-xs-7" style="border-left: 4px solid #EDEDED; margin: 2px 0;">
                                                                        <div class="col-xs-12 text-left" ng-repeat="item in detail.itemList">
                                                                            <span class="col-xs-9 no-padding">{{ \'header_orderlist.partNumber\' | translate }}:&nbsp;{{ item.vendorPartNumber }}</span>
                                                                            <div class="col-xs-3 text-left">
                                                                                <span>{{ \'header_orderlist.qty\' | translate }}:&nbsp;{{ item.quantity }}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td class="text-left"><span>{{ shipNotice.ControlNumber }}</span></td>
                                        <td class="text-left"><span>{{ shipNotice.ShippedService }}</span></td>
                                        <td class="text-left"><span>{{ shipNotice.ShippingDate | moment:\'MM/DD/YYYY\'}}</span></td>
                                        <td class="text-center action-buttons">
                                            <a href="#" title="{{ \'header_orderlist.redirectToShipNoticePage\' | translate }}" ng-click="jumpToShipNoticePage(shipNotice)">
                                                <i class="icon-share-alt bigger-120 blue"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger btn-sm" ng-click="closeShipNotice()">
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
      
      $scope.currentShipNoticeList = null
      $scope.currentShipNoticeActionType = null
      $scope.currentPONumber_ShipNotice = null
       
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
        menuHeight += 20 if($scope.dataItem.ShipmentStatus!='Unshipped')
        menuHeight += 20 if($scope.dataItem.OrderStatus=='New' || $scope.dataItem.OrderStatus=='Processing') 
        menuHeight += 20 if($scope.dataItem.OrderStatus=='Processing' && $scope.dataItem.ShipmentStatus!='Unshipped') 
        menuHeight += 20 if($scope.dataItem.HasShipmentException == 'Y' && $scope.exceptionDialog != true) 
        common.autoDropUpDown(element,menuHeight)
        return
        
      $scope.jumpToShipNoticePage = (selectedShipNotice) ->
        $scope.closeShipNotice()
        common.closeModal()
        url = "shipnotice/#{$scope.currentPONumber_ShipNotice}/#{selectedShipNotice.ShipNoticeID}/#{$scope.currentShipNoticeActionType}"
        common.navigate(url)
    
      $scope.createShipNoticePage = (ponumber) ->
        if $location.$$path.indexOf('shipnotice') >= 0 && $location.$$path.indexOf('create') >= 0
            $route.reload()
        else
            common.closeModal()
            url = "shipnotice/#{ponumber}/create"
            common.navigate(url)

      $scope.openShipNotice = (currentOrder, actionType) ->
        $scope.currentShipNoticeActionType = actionType
        $scope.currentShipNoticeList = null
        $scope.currentPONumber_ShipNotice = currentOrder.PONumber
    
        if(!currentOrder.shipNoticeList)
          $scope.queryShipNoticeList(currentOrder)
        else
          $scope.currentShipNoticeList = angular.copy(currentOrder.shipNoticeList)
          $scope.autoJumpShipNoticePage()
  
      $scope.autoJumpShipNoticePage = ->
        if($scope.currentShipNoticeList && $scope.currentShipNoticeList.length == 1)
           $scope.jumpToShipNoticePage($scope.currentShipNoticeList[0])
        else
          $scope.shipNoticeModal = true
      
      $scope.queryShipNoticeList = (currentOrder) ->
        requestItem = {
          action: "query"
          vendorNumber: common.currentUser.VendorNumber
          poNumber: currentOrder.PONumber
          PagingInfo:{startPageIndex:0,endPageIndex:0,pageSize:99}
        }
        response = shipNoticeAPI.search requestItem,
           ->
              if(response&&response.Succeeded)      
                 currentOrder.shipNoticeList = response.ShipNoticeList
                 $scope.currentShipNoticeList = angular.copy(response.ShipNoticeList)
                 $scope.autoJumpShipNoticePage()
        ,(error)->

      $scope.showShipNoticeItemList = (currentShipNotice) ->
        if(!currentShipNotice)
          return
        if(!currentShipNotice.itemList)
          requestItem = {
            vendorNumber: common.currentUser.VendorNumber
            poNumber: $scope.currentPONumber_ShipNotice
            shipNoticeID: currentShipNotice.ShipNoticeID
          }
          response = shipNoticeAPI.getShipNotice requestItem,
           ->
              if(response&&response.Succeeded&&response.ShipNoticeList&&response.ShipNoticeList.length > 0)      
                 currentShipNotice.detailList = []
                 if(response.ShipNoticeList[0].OrderList && response.ShipNoticeList[0].OrderList.length > 0 && response.ShipNoticeList[0].OrderList[0].PackageList)
                   pList = response.ShipNoticeList[0].OrderList[0].PackageList
                   for index of pList
                      for index2 of pList[index].ItemList
                         filterDetails = $filter('filter')(currentShipNotice.detailList,{trackingNumber:pList[index].TrackingNumber})
                         if(filterDetails && filterDetails.length > 0)
                           filterDetails[0].itemList.push({
                             vendorPartNumber:pList[index].ItemList[index2].VendorPartNumber
                             quantity:pList[index].ItemList[index2].Quantity
                           })
                         else
                           tempDetail = {
                             trackingNumber: pList[index].TrackingNumber
                             itemList:[
                              {
                                vendorPartNumber:pList[index].ItemList[index2].VendorPartNumber
                                quantity:pList[index].ItemList[index2].Quantity
                              }
                             ]
                           }
                           currentShipNotice.detailList.push(tempDetail)


      $scope.openOrderException = ->
        $scope.isShowException = true
        
      $scope.closeShipNotice = ->
        $scope.shipNoticeModal = false
        
      $scope.$watch "data", (newVal, oldVal) ->
       if newVal 
           $scope.dataItem = angular.copy($scope.data)
])