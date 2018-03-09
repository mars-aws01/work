angular.module("vdNumber", ['ngSanitize'])

.directive('vdNumber',["$filter",($filter) ->
  restrict: 'A'
  scope:{}
  require: 'ngModel'
  link: (scope, element, attrs, modelCtrl) ->
     scope.oldValue = angular.copy(modelCtrl.$modelValue)
     modelCtrl.$parsers.push (inputValue) ->
        returnValue = if (modelCtrl.$modelValue || modelCtrl.$modelValue == 0) then angular.copy(modelCtrl.$modelValue) else scope.oldValue
        if inputValue == undefined || !inputValue
          return NaN
        pattern = /^[\d]{0,8}([.]\d{0,2})?$/
        if(attrs.vdNumber && attrs.vdNumber == 'int')
          pattern = /^[\d]{0,8}$/
        if(attrs.vdNumber && attrs.vdNumber == 'long')
          pattern = /^[\d]{0,10}([.]\d{0,2})?$/
        if pattern.test(inputValue) == false
          scope.oldValue = returnValue
          modelCtrl.$setViewValue returnValue
          modelCtrl.$render()
          modelCtrl.$modelValue = returnValue
        else
          scope.oldValue = inputValue
])