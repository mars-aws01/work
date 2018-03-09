angular.module("vdContact", [])

.directive('vdContact',["$compile","$filter",($compile,$filter) ->
  restrict: 'E'
  template:'<div class="row no-margin"></div>'
  link: (scope, element, attrs) ->
    contentTemplate = ' 
       <div class="row no-margin">
            <div class="form-group col-md-6 no-padding">
                <label class="col-xs-12"><span class="red">*&nbsp;</span>Name</label>
                <div class="col-xs-12">
                    <input ng-disabled="isCompleted" 
                        ng-model="{bindingName}.Name"
                        type="text"
                        maxlength="{{config.Contact.Name.maxlength}}"
                        ng-required="config.Contact.Name.req"
                        class="col-sm-12 vp-input vp-input-sm"
                        placeholder=""
                        name="{moduleName}_Name" />
                    <validtip for="{moduleName}_Name" class="vp-validtip"></validtip>
                </div>
            </div>

            <div class="form-group col-md-6 no-padding">
                <label class="col-xs-12">Job Title</label>
                <div class="col-xs-12">
                    <input ng-disabled="isCompleted" 
                        ng-model="{bindingName}.JobTitle"
                        type="text"
                        maxlength="{{config.Contact.JobTitle.maxlength}}"
                        ng-required="config.Contact.JobTitle.req"
                        class="col-sm-12 vp-input vp-input-sm"
                        placeholder=""
                        name="{moduleName}_JobTitle" />
                    <validtip for="{moduleName}_JobTitle" class="vp-validtip"></validtip>
                </div>
            </div>

            <div class="form-group col-md-6 no-padding">
                <label class="col-xs-12"><span class="red">*&nbsp;</span>E-mail</label>
                <div class="col-xs-12">
                    <input ng-disabled="isCompleted" 
                        ng-model="{bindingName}.Email"
                        type="email"
                        maxlength="{{config.Contact.Email.maxlength}}"
                        ng-required="config.Contact.Email.req"
                        class="col-sm-12 vp-input vp-input-sm"
                        placeholder=""
                        name="{moduleName}_emailAddress" />
                    <validtip for="{moduleName}_emailAddress" class="vp-validtip"></validtip>
                </div>
            </div>
            
            <div class="form-group col-md-6 no-padding">
                <label class="col-xs-12"><span class="red">*&nbsp;</span>Phone</label>
                <div class="col-xs-12">
                    <input ng-disabled="isCompleted" 
                        ng-model="{bindingName}.Phone"
                        type="text"
                        maxlength="{{config.Contact.Phone.maxlength}}"
                        ng-required="config.Contact.Phone.req"
                        class="col-sm-12 vp-input vp-input-sm"
                        placeholder=""
                        name="{moduleName}_Phone" />
                    <validtip for="{moduleName}_Phone" class="vp-validtip"></validtip>
                </div>
            </div>
        </div>
    '
    replaceToAttrNameTemplate = contentTemplate.replace(/[{]moduleName[}]/g,attrs.moduleName)
    replaceToAngularBinding = replaceToAttrNameTemplate.replace(/[{]bindingName[}]/g,attrs.bindingName)
    newTemplate = $(replaceToAngularBinding).appendTo(element)
    $compile(newTemplate)(scope) 
])