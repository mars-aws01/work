angular.module("vdOnErrorSrc", ['ngSanitize'])

.directive('vdOnErrorSrc',->
    link: ($scope, element,attrs) ->
#          parent = element.parent()
#          parent.css('background-image', 'url("'+attrs.vdOnErrorSrc+'")')
#          parent.css('background-repeat', 'no-repeat')
#          element.load ->
#            parent.css('background-image','')
#            parent.css('background-repeat','')
          element.bind('error',->
            if (attrs.src != attrs.vdOnErrorSrc)
                attrs.$set('src', attrs.vdOnErrorSrc)
          )   
)