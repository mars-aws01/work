angular.module("vdImWarrantyInfo",[])
.directive("vdImWarrantyInfo",["$filter",($filter) ->
    restrict : "E"
    template :'
     <div class="row  no-margin-right item-creation-well">
        <div class="col-xs-12 no-padding">
            <label>
                <input name="warranty_options" ng-model="_isSameMfr" value="true" type="radio" class="ace">
                <span class="lbl">&nbsp;{{ \'view_warranty.sameMfr\' | translate }}&nbsp;&nbsp;&nbsp;</span>
            </label>
            <label>
                <input name="warranty_options" ng-model="_isSameMfr" value="" type="radio" class="ace">
                <span class="lbl">&nbsp;{{ \'view_warranty.singleItem\' | translate }}&nbsp;&nbsp;&nbsp;</span>
            </label>
        </div>
        
        <div class="col-xs-12 item-creation-li" >
            <div class="col-lg-3 col-md-5 col-sm-12 no-padding-right">
                <div class="col-lg-12 no-padding">
                   <label>{{ \'view_warranty.bu\' | translate }}&nbsp;&nbsp;</label>
                   <input class=" vp-input" type="text" ng-disabled="true" ng-model="entity.ManufacturerWarranties[0].CountryCode" />
                </div>
            </div>
            <div class="col-lg-9 col-md-7 col-sm-12" style="border-left: 1px solid #EAEAEA;">
                <div class="col-xs-12 no-padding">
                <div class="col-lg-6 no-padding">
                    <div class="col-lg-12  form-group no-padding-right">
                        <label class="col-lt-9 col-lg-10 no-padding mt-4">
                            <input ng-disabled="_isSameMfr" ng-model="data.Is3PartyProvider" class="ace ace-checkbox" type="checkbox">
                            <span class="lbl">&nbsp;{{ \'view_warranty.party\' | translate }}&nbsp;&nbsp;</span>
                        </label>
                        <div class="col-lt-3 col-lg-2 no-padding-left">
                         <input class="col-md-12 vp-input"
                               ng-disabled="_isSameMfr" 
                               type="text" 
                               maxlength="{{config.warranty.ThirdPartyProvider.maxlength}}"
                               ng-required="config.warranty.ThirdPartyProvider.req"
                               ng-model="entity.ManufacturerWarranties[0].ThirdPartyProvider" />
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 no-padding">
                    <div class="col-lg-12 form-group">
                        <label class="col-md-6 control-label no-padding-left no-margin-right pt-4">
                            {{ \'view_warranty.part\' | translate }}
                        </label>
                        <div class="col-md-6 no-padding-left">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr" 
                                   type="number" 
                                   min="{{config.warranty.PartsDays.min}}"
                                   max="{{config.warranty.PartsDays.max}}"
                                   ng-required="config.warranty.PartsDays.req"
                                   ng-pattern="config.warranty.PartsDays.pattern"
                                   valid-pattern-tip="Please enter a valid integer (0-99999)."
                                   ng-model="entity.ManufacturerWarranties[0].PartsDays" 
                                   name="warranty_PartsDays_1"/>
                             <validtip for="warranty_PartsDays_1" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 no-padding">
                    <div class="col-lg-12 form-group">
                        <label class="col-md-6 control-label  no-margin-right pt-4">
                            {{ \'view_warranty.labor\' | translate }}
                        </label>
                        <div class="col-md-6 no-padding">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr" 
                                   type="number" 
                                   min="{{config.warranty.LaborDays.min}}"
                                   max="{{config.warranty.LaborDays.max}}"
                                   ng-required="config.warranty.LaborDays.req"
                                   ng-pattern="config.warranty.LaborDays.pattern"
                                   valid-pattern-tip="Please enter a valid integer (0-99999)."
                                   ng-model="entity.ManufacturerWarranties[0].LaborDays" 
                                   name="warranty_LaborDays_1"/>
                             <validtip for="warranty_LaborDays_1" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-xs-12 no-padding">
                 <div class="col-lg-6 no-padding">
                     <div class="col-lg-12 no-padding form-group">
                         <label class="col-md-3 control-label pt-4" style="padding-right:2px !important;">{{ \'view_warranty.phone\' | translate }}</label>
                         <div class="col-md-9 no-padding-left">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr" 
                                   type="text" 
                                   ng-required="config.warranty.ContactPhone.req"
                                   ng-pattern="config.warranty.ContactPhone.pattern"
                                   valid-pattern-tip="Please enter a valid value."
                                   ng-model="entity.ManufacturerWarranties[0].ContactPhone" 
                                   name="warranty_ContactPhone_1"/>
                             <validtip for="warranty_ContactPhone_1" class="vp-validtip"></validtip>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 no-padding">
                      <div class="col-lg-12 no-padding form-group">
                         <label class="col-md-3 control-label pt-4" style="padding-right:2px !important;">{{ \'view_warranty.email\' | translate }}</label>
                         <div class="col-md-9 no-padding-left">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr" 
                                   type="email" 
                                   ng-required="config.warranty.ContactEmail.req"
                                   ng-model="entity.ManufacturerWarranties[0].ContactEmail" 
                                   name="warranty_ContactEmail_1"/>
                             <validtip for="warranty_ContactEmail_1" class="vp-validtip"></validtip>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="col-lg-12 no-padding">
                    <div class="col-xs-12 form-group no-padding">
                        <div class="no-padding" style="width: 12.5%; float: left;">
                            <label class="col-md-12 control-label no-padding-left no-margin-right pt-4">
                                {{ \'view_warranty.url\' | translate }}
                            </label>
                        </div>
                        <div class="no-padding-left" style="width: 87.5%; float:left; padding-right:12px;">
                            <input type="text" class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr" 
                                   ng-required="config.warranty.SupportURL.req"
                                   ng-pattern="config.warranty.SupportURL.pattern"
                                   valid-pattern-tip="Please enter a valid value."
                                   ng-required="config.warranty.SupportURL.req"
                                   ng-model="entity.ManufacturerWarranties[0].SupportURL" 
                                   name="warranty_SupportURL_1" />
                             <validtip for="warranty_SupportURL_1" class="vp-validtip"></validtip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-xs-12 item-creation-li" >
            <div class="col-lg-3 col-md-5 col-sm-12 no-padding-right">
                <div class="col-lg-12 no-padding">
                   <label>{{ \'view_warranty.bu\' | translate }}&nbsp;&nbsp;</label>
                   <input class=" vp-input" type="text" ng-disabled="true" ng-model="entity.ManufacturerWarranties[1].CountryCode" />
                </div>
                <label class="col-lg-12 mt-10 no-padding-left" ng-hide="$index==0">
                    <input ng-disabled="_isSameMfr" ng-model="_isSameNewegg_1" class="ace ace-checkbox" type="checkbox">
                    <span class="lbl">&nbsp;{{ \'view_warranty.sameNewegg\' | translate }}&nbsp;&nbsp;</span>
                </label>
            </div>
            <div class="col-lg-9 col-md-7 col-sm-12" style="border-left: 1px solid #EAEAEA;">
                <div class="col-xs-12 no-padding">
                <div class="col-lg-6 no-padding">
                    <div class="col-lg-12  form-group no-padding-right">
                        <label class="col-lt-9 col-lg-10 no-padding mt-4">
                            <input ng-disabled="_isSameMfr || _isSameNewegg_1" ng-model="data.Is3PartyProvider" class="ace ace-checkbox" type="checkbox">
                            <span class="lbl">&nbsp;{{ \'view_warranty.party\' | translate }}&nbsp;&nbsp;</span>
                        </label>
                        <div class="col-lt-3 col-lg-2 no-padding-left">
                         <input class="col-md-12 vp-input"
                               ng-disabled="_isSameMfr || _isSameNewegg_1" 
                               type="text" 
                               maxlength="{{config.warranty.ThirdPartyProvider.maxlength}}"
                               ng-required="config.warranty.ThirdPartyProvider.req"
                               ng-model="entity.ManufacturerWarranties[1].ThirdPartyProvider" />
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 no-padding">
                    <div class="col-lg-12 form-group">
                        <label class="col-md-6 control-label no-padding-left no-margin-right pt-4">
                            {{ \'view_warranty.part\' | translate }}
                        </label>
                        <div class="col-md-6 no-padding-left">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_1" 
                                   type="number" 
                                   min="{{config.warranty.PartsDays.min}}"
                                   max="{{config.warranty.PartsDays.max}}"
                                   ng-required="config.warranty.PartsDays.req"
                                   ng-pattern="config.warranty.PartsDays.pattern"
                                   valid-pattern-tip="Please enter a valid integer (0-99999)."
                                   ng-model="entity.ManufacturerWarranties[1].PartsDays" 
                                   name="warranty_PartsDays_2"/>
                             <validtip for="warranty_PartsDays_2" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 no-padding">
                    <div class="col-lg-12 form-group">
                        <label class="col-md-6 control-label  no-margin-right pt-4">
                            {{ \'view_warranty.labor\' | translate }}
                        </label>
                        <div class="col-md-6 no-padding">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_1" 
                                   type="number" 
                                   min="{{config.warranty.LaborDays.min}}"
                                   max="{{config.warranty.LaborDays.max}}"
                                   ng-required="config.warranty.LaborDays.req"
                                   ng-pattern="config.warranty.LaborDays.pattern"
                                   valid-pattern-tip="Please enter a valid integer (0-99999)."
                                   ng-model="entity.ManufacturerWarranties[1].LaborDays" 
                                   name="warranty_LaborDays_2"/>
                             <validtip for="warranty_LaborDays_2" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-xs-12 no-padding">
                 <div class="col-lg-6 no-padding">
                     <div class="col-lg-12 no-padding form-group">
                         <label class="col-md-3 control-label pt-4" style="padding-right:2px !important;">{{ \'view_warranty.phone\' | translate }}</label>
                         <div class="col-md-9 no-padding-left">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_1" 
                                   type="text" 
                                   ng-required="config.warranty.ContactPhone.req"
                                   ng-pattern="config.warranty.ContactPhone.pattern"
                                   valid-pattern-tip="Please enter a valid value."
                                   ng-model="entity.ManufacturerWarranties[1].ContactPhone" 
                                   name="warranty_ContactPhone_2"/>
                             <validtip for="warranty_ContactPhone_2" class="vp-validtip"></validtip>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 no-padding">
                      <div class="col-lg-12 no-padding form-group">
                         <label class="col-md-3 control-label pt-4" style="padding-right:2px !important;">{{ \'view_warranty.email\' | translate }}</label>
                         <div class="col-md-9 no-padding-left">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_1" 
                                   type="email" 
                                   ng-required="config.warranty.ContactEmail.req"
                                   ng-model="entity.ManufacturerWarranties[1].ContactEmail" 
                                   name="warranty_ContactEmail_2"/>
                             <validtip for="warranty_ContactEmail_2" class="vp-validtip"></validtip>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="col-lg-12 no-padding">
                    <div class="col-xs-12 form-group no-padding">
                        <div class="no-padding" style="width: 12.5%; float: left;">
                            <label class="col-md-12 control-label no-padding-left no-margin-right pt-4">
                                {{ \'view_warranty.url\' | translate }}
                            </label>
                        </div>
                        <div class="no-padding-left" style="width: 87.5%; float:left; padding-right:12px;">
                            <input type="text" class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_1" 
                                   ng-required="config.warranty.SupportURL.req"
                                   ng-pattern="config.warranty.SupportURL.pattern"
                                   valid-pattern-tip="Please enter a valid value."
                                   ng-model="entity.ManufacturerWarranties[1].SupportURL" 
                                   name="warranty_SupportURL_2" />
                             <validtip for="warranty_SupportURL_2" class="vp-validtip"></validtip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="col-xs-12 item-creation-li" >
            <div class="col-lg-3 col-md-5 col-sm-12 no-padding-right">
                <div class="col-lg-12 no-padding">
                   <label>{{ \'view_warranty.bu\' | translate }}&nbsp;&nbsp;</label>
                   <input class=" vp-input" type="text" ng-disabled="true" ng-model="entity.ManufacturerWarranties[2].CountryCode" />
                </div>
                <label class="col-lg-12 mt-10 no-padding-left" ng-hide="$index==0">
                    <input ng-disabled="_isSameMfr" ng-model="_isSameNewegg_2" class="ace ace-checkbox" type="checkbox">
                    <span class="lbl">&nbsp;{{ \'view_warranty.sameNewegg\' | translate }}&nbsp;&nbsp;</span>
                </label>
            </div>
            <div class="col-lg-9 col-md-7 col-sm-12" style="border-left: 1px solid #EAEAEA;">
                <div class="col-xs-12 no-padding">
                <div class="col-lg-6 no-padding">
                    <div class="col-lg-12  form-group no-padding-right">
                        <label class="col-lt-9 col-lg-10 no-padding mt-4">
                            <input ng-disabled="_isSameMfr" ng-model="data.Is3PartyProvider" class="ace ace-checkbox" type="checkbox">
                            <span class="lbl">&nbsp;{{ \'view_warranty.party\' | translate }}&nbsp;&nbsp;</span>
                        </label>
                        <div class="col-lt-3 col-lg-2 no-padding-left">
                         <input class="col-md-12 vp-input"
                               ng-disabled="_isSameMfr || _isSameNewegg_2" 
                               type="text" 
                               maxlength="{{config.warranty.ThirdPartyProvider.maxlength}}"
                               ng-required="config.warranty.ThirdPartyProvider.req"
                               ng-model="entity.ManufacturerWarranties[2].ThirdPartyProvider" />
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 no-padding">
                    <div class="col-lg-12 form-group">
                        <label class="col-md-6 control-label no-padding-left no-margin-right pt-4">
                            {{ \'view_warranty.part\' | translate }}
                        </label>
                        <div class="col-md-6 no-padding-left">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_2" 
                                   type="number" 
                                   min="{{config.warranty.PartsDays.min}}"
                                   max="{{config.warranty.PartsDays.max}}"
                                   ng-required="config.warranty.PartsDays.req"
                                   ng-pattern="config.warranty.PartsDays.pattern"
                                   valid-pattern-tip="Please enter a valid integer (0-99999)."
                                   ng-model="entity.ManufacturerWarranties[2].PartsDays" 
                                   name="warranty_PartsDays_3"/>
                             <validtip for="warranty_PartsDays_3" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    </div>
                    <div class="col-lg-3 no-padding">
                    <div class="col-lg-12 form-group">
                        <label class="col-md-6 control-label  no-margin-right pt-4">
                            {{ \'view_warranty.labor\' | translate }}
                        </label>
                        <div class="col-md-6 no-padding">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_2" 
                                   type="number" 
                                   min="{{config.warranty.LaborDays.min}}"
                                   max="{{config.warranty.LaborDays.max}}"
                                   ng-required="config.warranty.LaborDays.req"
                                   ng-pattern="config.warranty.LaborDays.pattern"
                                   valid-pattern-tip="Please enter a valid integer (0-99999)."
                                   ng-model="entity.ManufacturerWarranties[2].LaborDays" 
                                   name="warranty_LaborDays_3"/>
                             <validtip for="warranty_LaborDays_3" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="col-xs-12 no-padding">
                 <div class="col-lg-6 no-padding">
                     <div class="col-lg-12 no-padding form-group">
                         <label class="col-md-3 control-label pt-4" style="padding-right:2px !important;">{{ \'view_warranty.phone\' | translate }}</label>
                         <div class="col-md-9 no-padding-left">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_2" 
                                   type="text" 
                                   ng-required="config.warranty.ContactPhone.req"
                                   ng-pattern="config.warranty.ContactPhone.pattern"
                                   valid-pattern-tip="Please enter a valid value."
                                   ng-model="entity.ManufacturerWarranties[2].ContactPhone" 
                                   name="warranty_ContactPhone_3"/>
                             <validtip for="warranty_ContactPhone_3" class="vp-validtip"></validtip>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6 no-padding">
                      <div class="col-lg-12 no-padding form-group">
                         <label class="col-md-3 control-label pt-4" style="padding-right:2px !important;">{{ \'view_warranty.email\' | translate }}</label>
                         <div class="col-md-9 no-padding-left">
                            <input class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_2" 
                                   type="email" 
                                   ng-required="config.warranty.ContactEmail.req"
                                   ng-model="entity.ManufacturerWarranties[2].ContactEmail" 
                                   name="warranty_ContactEmail_3"/>
                             <validtip for="warranty_ContactEmail_3" class="vp-validtip"></validtip>
                        </div>
                      </div>
                    </div>
                </div>
                <div class="col-lg-12 no-padding">
                    <div class="col-xs-12 form-group no-padding">
                        <div class="no-padding" style="width: 12.5%; float: left;">
                            <label class="col-md-12 control-label no-padding-left no-margin-right pt-4">
                                {{ \'view_warranty.url\' | translate }}
                            </label>
                        </div>
                        <div class="no-padding-left" style="width: 87.5%; float:left; padding-right:12px;">
                            <input type="text" class="col-md-12 vp-input vp-input-sm"
                                   ng-disabled="_isSameMfr || _isSameNewegg_2" 
                                   ng-required="config.warranty.SupportURL.req"
                                   ng-pattern="config.warranty.SupportURL.pattern"
                                   valid-pattern-tip="Please enter a valid value."
                                   ng-model="entity.ManufacturerWarranties[2].SupportURL" 
                                   name="warranty_SupportURL_3" />
                             <validtip for="warranty_SupportURL_3" class="vp-validtip"></validtip>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    '
    link: ($scope, element, attrs) ->
        $scope._isSameMfr = "true"
        $scope.$watch '_isSameNewegg_1',(newValue, oldValue)->
            if newValue
               $scope.entity.ManufacturerWarranties[1] = angular.copy($scope.entity.ManufacturerWarranties[0])
         $scope.$watch '_isSameNewegg_2',(newValue, oldValue)->
            if newValue
               $scope.entity.ManufacturerWarranties[2] = angular.copy($scope.entity.ManufacturerWarranties[0])


])
