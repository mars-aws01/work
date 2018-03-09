angular.module("vdStrongPassword", [])

.directive('vdStrongPassword',[() ->
  restrict: 'E'
  template:'<input type="password" class="form-control vp-input" ng-required ="true"
                                       ng-model="password"
                                       name="input_pwd"
                                       style="font-size:14px !important"
                                       ng-pattern="passwordPattern"
                                       valid-pattern-tip="Please follow the minimum password requirements to set password." />
                 <validtip for="input_pwd" class="vp-validtip"></validtip>'
  link: (scope, element, attrs, ctrl) ->
    upperCaseReg = /[A-Z]/
    lowerCaseReg = /[a-z]/
    numberReg = /[0-9]/
    specialReg = /[!@#$%^&*?]/
    scope.passwordPattern =( ->
        return {
            test: (ngModelValue)->
                        upperCase = upperCaseReg.test(ngModelValue) 
                        lowerCase = lowerCaseReg.test(ngModelValue)
                        number = numberReg.test(ngModelValue)
                        special = specialReg.test(ngModelValue)
                        lengthValid = ngModelValue.length >7 and ngModelValue.length <31
                        return lengthValid and ((upperCase and lowerCase and number ) or (upperCase and lowerCase and  special) or (upperCase and number and special) or (lowerCase and number and special))
                
        }
    )()
])