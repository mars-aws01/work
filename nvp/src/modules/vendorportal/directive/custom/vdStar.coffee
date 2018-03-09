angular.module("vdStar", [])

.directive('vdStar',["$rootScope",($rootScope) ->
  restrict: 'E'
  scope:{
    number: '='
  }

  template:'
    <div>
     <div class="vp-egg" ng-class="{\'vp-egg-empty\':number<=0,\'vp-egg-full\':number>0}"></div>
     <div class="vp-egg" ng-class="{\'vp-egg-empty\':number<=1,\'vp-egg-full\':number>1}"></div>
     <div class="vp-egg" ng-class="{\'vp-egg-empty\':number<=2,\'vp-egg-full\':number>2}"></div>
     <div class="vp-egg" ng-class="{\'vp-egg-empty\':number<=3,\'vp-egg-full\':number>3}"></div>
     <div class="vp-egg" ng-class="{\'vp-egg-empty\':number<=4,\'vp-egg-full\':number>4}"></div>
    </div>'

  controller:($scope)->
    

])