angular.module("negScroll",[])

.directive "negScroll",  ->
  restrict : "A"
  link : (scope, element, attrs) ->
    height = attrs.scrollHeight || 400
    $(element).slimScroll
      height : height + 'px'
      alwaysVisible : true
