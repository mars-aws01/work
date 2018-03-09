angular.module("negColorPicker",[])

.directive "negColorPicker",  ->
  restrict : "A"
  link : (scope, element, attrs) ->
    $(element).colorpicker()


