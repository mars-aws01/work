angular.module("vdBg", ['ngSanitize'])

.directive('vdBg',["$filter",($filter) ->
  restrict: 'A'
  link: ($scope, element, attrs) ->
    watchKey = attrs.vdBg
    watchOriginalKey = watchKey + "DB"
    $scope.$watch "dataItem."+watchKey, (newVal, oldVal) ->
       parentElement = element.parent()[0]
       if(typeof $scope.dataItem[watchOriginalKey]=='undefined' and newVal=='')
          parentElement.style.backgroundColor = ""
       else if(newVal != $scope.dataItem[watchOriginalKey])
          parentElement.style.backgroundColor = "#F5F58E"
       else
          parentElement.style.backgroundColor = ""

    $scope.$watch "dataItem."+watchOriginalKey, (newVal, oldVal) -> 
       parentElement = element.parent()[0]
       if(typeof $scope.dataItem[watchOriginalKey]=='undefined' and newVal=='')
          parentElement.style.backgroundColor = ""
       else if(newVal != $scope.dataItem[watchOriginalKey])
          parentElement.style.backgroundColor = "#F5F58E"
       else
          parentElement.style.backgroundColor = ""
])