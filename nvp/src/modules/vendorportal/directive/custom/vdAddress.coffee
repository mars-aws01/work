angular.module("vdAddress", [])

.directive('vdAddress',["$compile","$filter","$parse",($compile,$filter,$parse) ->
  restrict: 'E'
  template:'<div class="row no-margin"></div>'
  link: (scope, element, attrs) ->
    contentTemplate = ' 
       <div class="row no-margin">
            <div class="row">
                <div class="form-group col-md-6 no-padding">
                    <label class="col-xs-12"><span class="red">*&nbsp;</span>Address 1</label>
                    <div class="col-xs-12">
                        <input ng-disabled="isCompleted" 
                            ng-model="{bindingName}.Address1"
                            type="text"
                            maxlength="{{config.Address.Address1.maxlength}}"
                            ng-required="config.Address.Address1.req"
                            class="col-sm-12 vp-input vp-input-sm"
                            placeholder=""
                            name="{moduleName}_address1" />
                        <validtip for="{moduleName}_address1" class="vp-validtip"></validtip>
                    </div>
                </div>
                <div class="form-group col-md-6 no-padding">
                    <label class="col-xs-12">Address 2</label>
                    <div class="col-xs-12">
                        <input ng-disabled="isCompleted" 
                            ng-model="{bindingName}.Address2"
                            type="text"
                             maxlength="{{config.Address.Address2.maxlength}}"
                            ng-required="config.Address.Address2.req"
                            class="col-sm-12 vp-input vp-input-sm"
                            placeholder=""
                            name="{moduleName}_address2" />
                    </div>
                </div>
            </div>
            
            <div class="row">
                <div class="form-group col-md-3 no-padding">
                    <label class="col-xs-12"><span class="red">*&nbsp;</span>City</label>
                    <div class="col-xs-12">
                        <input ng-disabled="isCompleted" 
                            ng-model="{bindingName}.City"
                            type="text"
                            maxlength="{{config.Address.City.maxlength}}"
                            ng-required="config.Address.City.req"
                            ng-pattern="{moduleName}_city_pattern"
                            valid-pattern-tip="Please enter a valid city."
                            class="col-sm-12 vp-input vp-input-sm"
                            placeholder=""
                            name="{moduleName}_city" />
                        <validtip for="{moduleName}_city" class="vp-validtip"></validtip>
                    </div>
                </div>
                <div class="form-group col-md-3 no-padding">
                    <label class="col-xs-12"><span class="red">*&nbsp;</span>State / Province</label>
                    <div class="col-xs-12">
                        <select ng-disabled="isCompleted"
                            class="col-xs-12 vp-select vp-select-sm"
                            name="{moduleName}_state"
                            ng-required="config.Address.StateProvince.req"
                            ng-model="{bindingName}.StateProvince"
                            ng-options="item.StateCode as item.StateDescription for item in {moduleName}_state">
                            <option></option>
                        </select>
                        <validtip for="{moduleName}_state" class="vp-validtip"></validtip>
                    </div>
                </div>
                <div class="form-group col-md-3 no-padding">
                    <label class="col-xs-12"><span class="red">*&nbsp;</span>Zip / Postal Code</label>
                    <div class="col-xs-12">
                        <input ng-disabled="isCompleted" 
                            ng-model="{bindingName}.ZipPostalCode"
                            type="text"
                            maxlength="{{config.Address.ZipPostalCode.maxlength}}"
                            ng-required="config.Address.ZipPostalCode.req"
                            ng-pattern="{moduleName}_zipCode_pattern"
                            valid-pattern-tip="Please enter a valid zip code."
                            class="col-sm-12 vp-input vp-input-sm"
                            placeholder=""
                            name="{moduleName}_zipcode" />
                        <validtip for="{moduleName}_zipcode" class="vp-validtip"></validtip>
                    </div>
                </div>
                <div class="form-group col-md-3 no-padding">
                    <label class="col-xs-12"><span class="red">*&nbsp;</span>
                        Country<i ng-show="{moduleName}_isShow" title="If you select a country other than United States and Canada, the bank information in support document section must be provided." 
                        class="icon-info-sign bigger-120 pull-right"> </i>
                    </label>
                    <div class="col-xs-12">
                        <select ng-disabled="isCompleted"
                            class="col-xs-12 vp-select vp-select-sm"
                            name="{moduleName}_country"
                            ng-required="config.Address.Country.req"
                            ng-model="{bindingName}.Country"
                            ng-options="item.CountryCode as item.CountryDescription for item in poData.country">
                            <option></option>
                        </select>
                        <validtip for="{moduleName}_country" class="vp-validtip"></validtip>
                    </div>
                </div>
            </div>
        </div>
    '
    filterStateByCountry = (countryCode) ->
        return [] if !scope.poData || !scope.poData.state
        return $filter('filter')(scope.poData.state, (i) -> return i.Country == countryCode)
       
   
    
    scope[attrs.moduleName+'_isShow']  = if attrs.moduleName.indexOf('MailingAddress') >= 0  then true else false
    replaceToAttrNameTemplate = contentTemplate.replace(/[{]moduleName[}]/g,attrs.moduleName)
    replaceToAngularBinding = replaceToAttrNameTemplate.replace(/[{]bindingName[}]/g,attrs.bindingName)
    newTemplate = $(replaceToAngularBinding).appendTo(element)
    $compile(newTemplate)(scope) 
    scope[attrs.moduleName+'.zipCode_init'] = false
    scope[attrs.moduleName+'_zipCode_pattern'] = /^.*$/
    scope[attrs.moduleName+'_city_pattern'] = /^.*$/
    currentForm = scope['stepForm_' + scope.currentStep]

    scope.$watch attrs.bindingName+'.Country', (newVal, oldVal) ->
        if newVal && newVal != oldVal
           stateList = filterStateByCountry(newVal)
           stateList.push({ StateCode:"99", StateDescription:'OTHER'}) if stateList && newVal != 'USA'
           scope[attrs.moduleName+'_state'] = stateList
           if newVal == 'USA'
                scope[attrs.moduleName+'_zipCode_pattern'] = /^[0-9]+(-[0-9]+)*$/
                scope[attrs.moduleName+'_city_pattern'] = /^[^0-9]+$/
           else
                scope[attrs.moduleName+'_zipCode_pattern'] = /^.*$/
                scope[attrs.moduleName+'_city_pattern'] = /^.*$/
           if (!scope.isMailingCountryTrigger || attrs.bindingName.indexOf('MailingAddress') >= 0)
              
               if scope[attrs.moduleName+'.zipCode_init'] == true 
                  $parse(attrs.bindingName+'.StateProvince').assign(scope,'')
                  $parse(attrs.bindingName+'.ZipPostalCode').assign(scope,'')
                  $parse(attrs.bindingName+'.City').assign(scope,'')
               if scope['sameMailingAddress_'+ attrs.moduleName] == true  
                 # scope.entity.CompanyInformation.CompanyPhysicalAddress.ZipPostalCode = scope.entity.CompanyInformation.MailingAddress.ZipPostalCode
                  $parse(attrs.bindingName+'.ZipPostalCode').assign(scope,scope.entity.CompanyInformation.MailingAddress.ZipPostalCode)
                  $parse(attrs.bindingName+'.StateProvince').assign(scope,scope.entity.CompanyInformation.MailingAddress.StateProvince)
                  $parse(attrs.bindingName+'.City').assign(scope,scope.entity.CompanyInformation.MailingAddress.City)
               if scope[attrs.moduleName+'.zipCode_init'] == true  && attrs.bindingName.indexOf('MailingAddress') < 0  && !scope.isSameTrigger
                  $parse('sameMailingAddress_'+attrs.moduleName).assign(scope,false)
                  $parse(attrs.bindingName+'.StateProvince').assign(scope,'')
                  $parse(attrs.bindingName+'.ZipPostalCode').assign(scope,'')
                  $parse(attrs.bindingName+'.City').assign(scope,'')
           scope[attrs.moduleName+'.zipCode_init'] = true
           
    scope.$watch attrs.bindingName+'.City', (newVal, oldVal) ->
        if newVal && newVal != oldVal
            if scope[attrs.moduleName+'_city_pattern'].test(newVal) == false
               $parse(attrs.bindingName+'.City').assign(scope,'')
     
])