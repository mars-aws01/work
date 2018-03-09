angular.module("negValidtip",[])

# CoffeeScript
.config(["$translateProvider",($translateProvider)->
  $translateProvider
  .translations("en-us",resources.system.directives.us)
  .translations("zh-cn",resources.system.directives.cn)
  .translations("zh-tw",resources.system.directives.tw)
])

.directive("validtip",["$translate",($translate)->
  restrict: "E"
  replace:true
  scope:true
  template:'<div class={{style}}>' +
           '  <div ng-show="{{tip.name}}" ng-repeat="tip in tips">{{tip.content}}</div>' +
           '</div>'
  controller:["$scope",($scope) ->
    $scope.tips = {}
    $scope.style= "help-block"
  ]
  link:(scope,element,attrs,ctrl)->
    form       = $(element.parents("ng-form:first"))
    if form.length == 0        
        form   = $(element.parents("form:first"))
    formName   = form.attr("name")
    formGroup  = element.parents("div.form-group:first")
    inputName  = element.attr("for")
    input      = form.find('[name='+ inputName + ']')
    
    if attrs["class"] != "{{style}}"
      scope.style = attrs["class"]
    
    if(form.length == 0)
      throw 'system.directives.validtip -> error: vaildtip must be nested in form.'
    
    if !inputName?
      throw 'system.directives.validtip -> error: required attribute "for" not found'
    
    if(input.length == 0)
      throw 'system.directives.validtip -> error: input[name="' + inputName + '"]' + ' is not found.'
    
    scope.formName  = formName
    scope.inputName = inputName
    scope.attrs     = {}
    
    for attr in input[0].attributes
      if attr.name.indexOf("valid-") > -1 || attr.name.indexOf("ng-") > -1
        scope.attrs[attr.name] = attr.value
    
    angular.element(formGroup).scope().$watch("!" + formName+"."+inputName+".$pristine && " +
      formName +  "." + inputName + ".$invalid",
      ((newVal,oldVal)->
        if(newVal)
          if input[0] && input[0].type == 'number'
            patternTip = scope.attrs["valid-pattern-tip"]
            tipContent =""
            if(scope.tips['required'])
              tipContent += $translate("validtip.required")+" "
            if(patternTip)
              tipContent += patternTip
              minValue = scope.attrs["ng-min"]
              maxValue = scope.attrs["ng-max"]
              if(minValue)
                tipContent += " "+$translate("validtip.min").replace(/\%s/ig,minValue)
              if(maxValue)
                tipContent += " "+$translate("validtip.max").replace(/\%s/ig,maxValue)
#              if(minValue && maxValue)
#                tipContent += $translate("validtip.minmax1").replace(/\%s1/ig,minValue).replace(/\%s2/ig,maxValue)
#              else if(minValue && ！maxValue)
#                tipContent += $translate("validtip.minmax2").replace(/\%s1/ig,minValue)
#              else if(！minValue && maxValue)
#                tipContent += $translate("validtip.minmax3").replace(/\%s2/ig,maxValue)
            scope.tips['pattern'] = { name:formName+"."+inputName+".$error." + "pattern",content:tipContent }
            scope.tips['required'] = { name:formName+"."+inputName+".$error." + "required",content:tipContent }
          if scope.attrs["valid-pattern-tip"] 
            scope.tips['required'] = { name:formName+"."+inputName+".$error." + "required",content:scope.attrs["valid-pattern-tip"] }
          formGroup.addClass("has-error")
        else
          formGroup.removeClass("has-error")
      ))
    
    if !form.hasClass("valid-tips")
      formScope = angular.element(form).scope()
      if(formScope[formName]? && formScope[formName].$setValidity?)
        handle = formScope[formName].$setValidity;
        formScope[formName].$setValidity = (validatorName,val)->
          if !formScope[formName].$pristine && !val
            formScope.$broadcast("valid-" + formName + "-error",validatorName)
          handle.apply(formScope[formName],arguments)
        form.addClass("valid-tips")

    tipHandle = (scope,validatorName) ->
      formName = scope.formName
      inputName= scope.inputName
      if scope[formName].hasOwnProperty(inputName)
        inputScope = scope[formName][inputName]
        if inputScope.$error.hasOwnProperty(validatorName) && 
           inputScope.$error[validatorName] && 
           !scope.tips.hasOwnProperty(validatorName)
          args = scope.attrs["ng-" + validatorName]
          if !args?
              args = ""
          tipContent = scope.attrs["valid-" + validatorName + "-tip"]
          if !tipContent?
            tipContent = $translate("validtip." + validatorName)
          tipContent = tipContent.replace(/\%s/ig,args)
          scope.tips[validatorName] = {name:formName+"."+inputName+".$error." + validatorName,content:tipContent,args:args}
    
    curScope = scope      
    curScope.$on("valid-" + formName + "-error",((sender,e)->
      tipHandle(curScope,e)
    ))
    
    curScope.$on("valid-" + formName,((sender,e)->
      formName = curScope.formName
      inputName= curScope.inputName
      curScope[formName].$pristine = false
      if curScope[formName][inputName].$invalid
        curScope[formName][inputName].$pristine = false
        for key of curScope[formName][inputName].$error
          if curScope[formName][inputName].$error[key]
            tipHandle(curScope,key)
    ))
])