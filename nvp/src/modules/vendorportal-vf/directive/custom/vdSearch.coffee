angular.module("vdSearch", ['ngSanitize'])

.directive('vdSearch',["$rootScope","$compile","$filter","common",($rootScope,$compile,$filter,common) ->
  restrict: 'E'
  scope:{
    keys: '='
    query: '='
    output: '='
    click:'&'
  }

  template:'       <div class="col-lg-2 col-xs-5 no-padding-left">
                         <select class="col-xs-12 vp-select"
                            ng-change="selectKeyType()"
                            ng-model="selectedItem"
                            ng-options="item as item.text for item in keys">
                         </select>
                    </div>

                    <div class="col-lg-5 col-xs-7 no-padding-left">
                        <input  type="text" 
                                maxlength="{{key.maxLength}}" 
                                class="form-control vp-input" 
                                ng-model="output.currentKeywords" 
                                placeholder="{{ &apos;view_orderlist.searchPlaceholder&apos; | translate }}" >
                    </div>
            
                   <div class="input-group-btn col-lg-5">
                      <label class="pull-left" style="margin-top: 5px;">
                          <input name="form-field-checkbox" ng-model="query.ExactMatch" class="ace ace-checkbox" type="checkbox">
                          <span class="lbl " style="color:#7E7E7E">&nbsp;{{ &apos;view_orderlist.exactMatch&apos; | translate }}</span>
                      </label>
                      <label style="width: 1px;height: 18px; background: #BFBFBF;vertical-align: middle; margin: 5px 15px 9px 14px;"></label>
                      <button type="submit" class="btn btn-app vp-btn vp-btn-blue" style="width:110px;" analytics-on analytics-category="{{page}}" analytics-event="search"  analytics-label="{{common.currentUser.VendorNumber}}_{{page}}_search">
                        <div class="col-xs-12"><span class="ace-icon icon icon-search icon-on-right" ></span>&nbsp;{{ &apos;view_orderlist.search&apos; | translate }}</div>
                      </button>
                   </div>
               '

  link: ($scope, element,attrs) ->
     if attrs.order == "yes" then $scope.page = 'orderlist' else $scope.page = 'itemlist'
     $scope.common = common
     if($scope.query.ExactMatch == undefined && attrs.order == "yes")
       $scope.query.ExactMatch = true
     $scope.loadSelectKey = ->
       $scope.key = $scope.keys[0]
       $scope.selectedItem = $scope.key
       $scope.output.currentSelectKey =$scope.key.value
     if(!$scope.output.currentSelectKey)
        $scope.loadSelectKey()
     else
        filterKeys = $filter('filter')($scope.keys, (i) -> i.value ==  $scope.output.currentSelectKey)
        if(filterKeys&&filterKeys.length > 0)
          $scope.key = filterKeys[0]
          $scope.selectedItem = $scope.key
        else
          $scope.loadSelectKey()
 
     $scope.selectKeyType =  ->
        $scope.output.currentKeywords=''
        $scope.clearKeyStatus()
        $scope.selectedItem.isActive = true
        $scope.key = angular.copy($scope.selectedItem)
        for index of $scope.keys
          delete $scope.query[$scope.keys[index].value]
        $scope.output.currentSelectKey =$scope.key.value
        
     $scope.clearKeyStatus = ->
       for index of $scope.keys
          $scope.keys[index].isActive = false         
])