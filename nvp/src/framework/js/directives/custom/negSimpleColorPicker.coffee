angular.module("negSimpleColorPicker",[])

.directive "negSimpleColorPicker",  ->
  restrict : "A"
  link : (scope, element, attrs) ->
    $(element).ace_colorpicker()


