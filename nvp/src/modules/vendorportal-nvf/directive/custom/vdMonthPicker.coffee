angular.module("vdMonthPicker",[])
.directive("vdMonthPicker",["$filter",($filter) ->
    restrict : "E"
    require: 'ngModel'
    scope: {
        modelValue:'=ngModel',
        min:'=minDate',
        max:'=maxDate'
        }
    template:"<div class=\"dropdown\">
                <a class=\"dropdown-toggle\" ng-attr-id=\"{{$id}}\" role=\"button\" data-toggle=\"dropdown\" data-target=\"#\" href=\"#\">
                    <div class=\"input-group\">
                      <input type=\"text\" class=\"form-control\" data-ng-model=\"modelValueStr\" 
                        ng-blur=\"update()\" ng-change=\"inputValueChange()\" >
                        <span class=\"input-group-addon\">
                          <i class=\"icon-calendar bigger-110\"></i>
                        </span>
                    </div>
                </a>
                <ul class=\"dropdown-menu\" role=\"menu\">
                    <datetimepicker data-ng-model=\"modelValue\" data-datetimepicker-config=\"{dropdownSelector: $id, startView:'month', minView:'month'}\" data-before-render=\"beforeRender($view, $dates, $leftDate, $upDate, $rightDate)\"/>
                </ul>
            </div>"
    link: ($scope, element, attrs) ->
      $scope.oldMonthStr=''
      $scope.inputValueChanged = false;
      $scope.$watch 'modelValue',(newMonth,oldMonth)->
        $scope.modelValueStr = $filter('date')(newMonth,'MM/yyyy')
        $scope.oldMonthStr = $scope.modelValueStr       

      $scope.inputValueChange = ->
        $scope.inputValueChanged = true

      $scope.update = ->
        if($scope.inputValueChanged)
          tmpMonth = moment($scope.modelValueStr,'MM/YYYY')
          if(tmpMonth and tmpMonth.isValid() and $scope.isSelectable(tmpMonth.toDate()) )
            $scope.modelValue = tmpMonth.toDate()
          else
            $scope.modelValueStr = $scope.oldMonthStr
          $scope.inputValueChanged = false
            
      $scope.beforeRender = ($view, $dates, $leftDate, $upDate, $rightDate) ->
        $leftDate.selectable = $scope.isSelectable($leftDate.localDateValue())
        $rightDate.selectable = $scope.isSelectable($rightDate.localDateValue())
        for date in $dates
          date.selectable = $scope.isSelectable(date.localDateValue())
        
      $scope.isSelectable = (date)->
        if !$scope.min and $scope.max
            return $scope.maxDate >= date
        else if $scope.min and !$scope.max
            return $scope.min <= date
        else if $scope.min and $scope.max
            return $scope.min <= date and  $scope.max >= date
        else 
            return true
])
