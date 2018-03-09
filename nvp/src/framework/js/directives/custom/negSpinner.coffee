angular.module("negSpinner",[])

.directive "negSpinner",  ->
  restrict : "A"
  require: '?ngModel'
  scope:
    model: "=ngModel"
  link : (scope, element, attrs) ->
    options=JSON.parse(attrs.negSpinner)
    options.value = scope.model || 0
    $(element).ace_spinner(options)


