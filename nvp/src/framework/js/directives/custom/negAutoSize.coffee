angular.module("negAutoSize",[])

.directive 'negAutoSize', ->
  require: '?ngModel'
  link: (scope, el, attr, ngModel)->
    el.autosize()
