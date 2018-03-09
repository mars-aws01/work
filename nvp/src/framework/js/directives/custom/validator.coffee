angular.module("negValidator",[])

.directive("ngEqualinput",[()->
  restrict:"A"
  require: 'ngModel'
  scope:true
  link:(scope,element,attrs,ctrl) ->
     name = attrs["ngEqualinput"]
     form = element.parents("form:first")
     formName = form.attr("name")
     input = form.find("[name='" + name + "']")
     valid = (srcVal,destVal) ->
      if !srcVal? || srcVal == ""
        ctrl.$setValidity("equalinput",true)
        return
      result = (srcVal == destVal)
      ctrl.$setValidity("equalinput",result)
     
     input.bind("change.srcInput input.srcInput",()->
      valid(ctrl.$viewValue,input.val())
     )
     
     element.bind("change.destInput input.destInput",()->
      valid($(this).val(),input.val())
     )
])

.directive("ngRequiredone",[()->
  restrict:"A"
  require: 'ngModel'
  scope:true
  link:(scope,element,attrs,ctrl) ->
    formGroup = element.parents("div.form-group:first")
    scope.$watch(attrs["ngModel"],(()->
      ctrl.$setValidity("requiredone",formGroup.find("input:checked").length > 0)),true)
])