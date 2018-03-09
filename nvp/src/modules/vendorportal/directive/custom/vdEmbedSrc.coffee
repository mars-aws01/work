angular.module("vdEmbedSrc", ['ngSanitize'])

.directive('vdEmbedSrc',["common",(common) ->
    restrict: 'A'
    link: (scope, element, attrs) ->
      current = element
      scope.$watch (->
        attrs.vdEmbedSrc
      ), ->
        clone = element.clone().attr('src', attrs.vdEmbedSrc)
        current.replaceWith clone
        current = clone
])