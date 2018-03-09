angular.module("vdOrderStatus", ['ngSanitize'])

.directive('vdOrderStatus',["$rootScope","$location","$compile","common",
 ($rootScope,$location,$compile,common) ->
  restrict: 'E'
  scope:{
    data: '='
    exceptionDialog: '='
  }

  template:'
       <div>
            <span ng-show="dataItem.HasACKException == \'N\' ||  exceptionDialog == true"
                ng-class="{
                            \'green\': dataItem.OrderStatus==\'Completed\' || dataItem.OrderStatus==\'Canceled\',
                            \'blue\':  dataItem.OrderStatus!=\'Canceled\' && dataItem.OrderStatus!=\'Completed\'
                          }">{{dataItem.OrderStatus}}
            </span>
            <div class="btn-group" style="position: absolute; margin-top: -10px;">
                <div class="dropdown">
                    <a ng-show="dataItem.HasACKException == \'Y\' && exceptionDialog != true" 
                    data-toggle="dropdown" class="red" href="\#" 
                    title="" ng-click="autodp()"
                    style="text-decoration: underline;">
                        <span>{{dataItem.OrderStatus}}</span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="\#" ng-click="openOrderException()">
                                <i class="icon-exclamation-sign bigger-125 red2"></i>
                                &nbsp;{{ \'header_orderlist.menuShowException\' | translate }}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
            
        <vd-order-exception data="dataItem" is-show="isShowException"></vd-order-exception> '

  link: ($scope, element) ->
    $scope.dataItem = angular.copy($scope.data)
    
    $scope.autodp = ->
        common.autoDropUpDown(element,60)  
        
    $scope.openOrderException = ->
        $scope.isShowException = true
        
    $scope.$watch "data", (newVal, oldVal) ->
       if newVal 
           $scope.dataItem = angular.copy($scope.data)     
])