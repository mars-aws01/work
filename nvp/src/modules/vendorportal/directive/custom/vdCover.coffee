angular.module("vdCover", ['ngSanitize'])

.directive('vdCover',["$rootScope","$compile","$window","common",
 ($rootScope,$compile,$window,common) ->
  restrict: 'E'
  scope:{
    auto:'='
    bottom:'='
    click: '&'
  }

  link:($scope,$el)->
    _template = '
      <div id="vpContentCover" class="vp-cover-layer fade in hidden-xs" ng-show="isShow" ng-style="vpContentCoverStyle">
        <h2>{{ \'view_orderlist.vendorSearchHelpContent\' | translate }}</h2>
        <div class="content" >
        </div>
      </div>'
    $scope.isShow = true
    $scope.currentUser = common.currentUser
    if $scope.bottom
      $scope.vpContentCoverStyle = { bottom: ($scope.bottom+20) + "px"}
    if $scope.auto == true
       $scope.vpContentCoverStyle = {'height': ($window.innerHeight-155) + 'px'}
       
    $el.html $compile(_template)($scope)
    
    $scope.$watch "currentUser.VendorNumber", (newVal, oldVal) ->
       if newVal 
           if(common.currentUser.VendorNumber != '0')
              $scope.isShow = false

])