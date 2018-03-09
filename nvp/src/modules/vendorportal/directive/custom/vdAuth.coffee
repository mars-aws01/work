angular.module("vdAuth", ['ngSanitize'])

.directive('vdAuth',["common","$filter",(common,$filter) ->
  link: ($scope, element, attrs) ->
    _disabled = ->
      attrs.$set('disabled', 'disabled')
      element.addClass('vp-disabled')
    #  attrs.$set('ng-disabled', 'true')

    _hide= ->
      attrs.$set('class', 'vp-hide')
    
    _disable= ->
      elementType = attrs.$$element[0].nodeName.toLowerCase()
      if(elementType == 'a')
        _hide()
      else if(elementType == 'div')
        _hide()
      else 
        _disabled()
        
    functionKey = attrs.vdAuth
    if(!functionKey || functionKey=='')
       _disable()
       return
    if(!common.currentUser || !common.currentUser.newFunctionList || !common.currentUser.newFunctionList.length == 0)
       _disable()
       return
        
    functionKey = functionKey.toLowerCase()
    pagePathArray = common.currentRoutePath().toLowerCase().split('/')  
    pagePath = if attrs.vdAuthPath then "/"+attrs.vdAuthPath else "/"+pagePathArray[1] 
    pagePath = "/customer-reviews" if pagePath == "/product-reviews"
    pagePath = "/dashboard" if pagePath == "/vendor-survey"
    filterFunctionList = $filter('filter')(common.currentUser.newFunctionList,(f) -> return f.MenuURL && f.MenuURL.toLowerCase() == pagePath && f.FunctionName.toLowerCase() == functionKey)
    if(!filterFunctionList || filterFunctionList.length == 0)
       _disable()
       return
    assignedFunctionList = $filter('filter')(filterFunctionList,(f) -> return f.Assignable == true && f.IsAssigned == true)
    if(assignedFunctionList && assignedFunctionList.length > 0)
      return
    else
      _disable()
      return
])