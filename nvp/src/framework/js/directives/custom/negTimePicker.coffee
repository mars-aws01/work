angular.module("negTimePicker",[])

.directive "negTimePicker",  ->
  restrict : "A"
  link : (scope, element, attrs) ->
    options=JSON.parse(attrs.negTimePicker)
    $(element).timepicker(options)


