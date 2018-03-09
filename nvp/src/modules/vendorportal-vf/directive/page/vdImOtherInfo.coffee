angular.module('vdImOtherInfo', []).directive 'vdImOtherInfo', [
  '$filter'
  'itemCreationAPI'
  ($filter, itemCreationAPI) ->
    {
      restrict: 'E'
      template: '<div class="row  no-margin-right item-creation-well"> <div class="col-lt-5 col-lg-5 no-padding"> <div class="col-xs-12 form-group no-margin-bottom"> <label class="col-md-5 control-label">{{ \'view_other.recertified\' | translate }}</label> <div class="col-md-7 pt-3 form-group" style="padding-left: 24px;"> <label><input name="other_recertified" ng-model="entity.ItemVersion" ng-value="1001" type="radio" class="ace" ng-required="config.other.ItemVersion.req"> <span class="lbl">&nbsp;{{ \'view_other.new1\' | translate }}&nbsp;&nbsp;&nbsp;</span></label> <label><input name="other_recertified" ng-model="entity.ItemVersion" ng-value="1100" type="radio" class="ace" ng-required="config.other.ItemVersion.req"> <span class="lbl">&nbsp;{{ \'view_other.recertified2\' | translate }} &nbsp;&nbsp; <span class="red">*&nbsp;&nbsp;</span></span></label> <label> <span class="icon-question-sign grey im-tip" title="New Item or Recertified Item" style="font-size: 17px;"></span> </label> </div> </div> <div class="col-xs-12 form-group no-margin-bottom"> <label class="col-md-5 control-label">{{ \'view_other.package\' | translate }}</label> <div class="col-md-7 pt-3 form-group" style="padding-left: 24px;"> <label><input name="other_package" ng-model="entity.IsOEM" ng-value="false" type="radio" class="ace" ng-required="config.other.IsOEM.req"> <span class="lbl">&nbsp;{{ \'view_other.retail\' | translate }}&nbsp;&nbsp;</span></label> <label><input name="other_package" ng-model="entity.IsOEM" ng-value="true" type="radio" class="ace" ng-required="config.other.IsOEM.req"> <span class="lbl">&nbsp;{{ \'view_other.oem\' | translate }}&nbsp;&nbsp;<span class="red">*&nbsp;&nbsp;</span></span></label> <label> <span class="icon-question-sign grey im-tip" title="Retail or OEM box." style="font-size: 17px;"></span> </label> </div> </div> <div class="col-xs-12 form-group no-margin-bottom"> <label class="col-md-5 control-label">{{ \'view_other.code\' | translate }}</label> <div class="col-md-7 pt-3 form-group" style="padding-left: 24px;"> <div class="col-md-9 no-padding"> <input class="form-control vp-input" name="usaCode" ng-model="entity.USAHarmonizedCode" type="text" maxlength="{{config.other.USAHarmonizedCode.maxlength}}" ng-required="config.other.USAHarmonizedCode.req"> </div> <span class="red col-xs-1">*</span> <label style="margin-left:6px;"> <span class="icon-question-sign grey im-tip" title="For item RMA return to USA." style="font-size: 17px;"></span> </label> </div> </div> <div class="col-xs-12 form-group no-margin-bottom"> <label class="col-md-5 control-label">{{ \'view_other.code2\' | translate }}</label> <div class="col-md-7 pt-3 form-group" style="padding-left: 24px;"> <div class="col-md-9 no-padding"> <input class="form-control vp-input" name="canCode" ng-model="entity.CANHarmonizedCode" type="text" maxlength="{{config.other.CANHarmonizedCode.maxlength}}" ng-required="config.other.CANHarmonizedCode.req"> </div> </div> </div> </div> <div class="col-lt-7 col-lg-7" > <h4 class="no-padding-bottom" style="margin-top: -1px;margin-bottom:3px !important;"> <span class="red">*&nbsp;&nbsp;</span>{{ \'view_other.assessment\' | translate }} <label class="ml-10"> <span style="font-size: 17px;" class="icon-question-sign grey" title="Please choose \'yes\' if the item matches any of the following description." style="font-size: 17px;"></span> </label> </h4> <div class="col-xs-12"  style=" border:1px solid #AFD3ED; padding:10px 8px; border-radius: 2px;"> <div class="col-xs-12 no-margin-bottom no-padding-left"> <label class="col-md-9 no-padding">{{ \'view_other.assessment_1\' | translate }}</label> <div class="col-md-3 pt-1 form-group pull-right" style="padding-left:52px"> <label><input name="other_assessment_1" ng-model="entity.IsContainingChemical" ng-value="true" type="radio" class="ace" ng-required="config.other.IsARSOL.req"> <span class="lbl">&nbsp;{{ \'view_other.yes1\' | translate }}&nbsp;&nbsp;&nbsp;</span></label> <label><input name="other_assessment_1" ng-model="entity.IsContainingChemical" ng-value="false" type="radio" class="ace" ng-required="config.other.IsARSOL.req"> <span class="lbl">&nbsp;{{ \'view_other.no1\' | translate }}</span></label> </div> </div> <div class="col-xs-12 no-margin-bottom no-padding-left"> <div class="col-xs-12 col-md-6 no-padding"> <label class="col-md-8 no-padding">{{ \'view_other.assessment_2\' | translate }}</label> <div class="col-md-4 pt-1 form-group no-padding pull-right" > <label><input name="other_assessment_2" ng-model="entity.IsContainingBattery" ng-value="true" type="radio" class="ace" ng-required="config.other.IsBATT.req"> <span class="lbl">&nbsp;{{ \'view_other.yes1\' | translate }}&nbsp;&nbsp;&nbsp;</span></label> <label><input name="other_assessment_2" ng-model="entity.IsContainingBattery" ng-value="false" type="radio" class="ace" ng-required="config.other.IsBATT.req"> <span class="lbl">&nbsp;{{ \'view_other.no1\' | translate }}</span></label> </div> </div> <div class="col-xs-12 col-md-6 no-padding"> <label class="col-md-8 no-padding-left-sm-xs no-padding-right no-padding-top no-padding-bottom">{{ \'view_other.assessment_3\' | translate }}</label> <div class="col-md-4 pt-1 form-group no-padding pull-right" > <label><input name="other_assessment_3" ng-model="entity.IsBattery" ng-value="true" type="radio" class="ace" ng-required="config.other.IsBATTT.req"> <span class="lbl">&nbsp;{{ \'view_other.yes1\' | translate }}&nbsp;&nbsp;&nbsp;</span></label> <label><input name="other_assessment_3" ng-model="entity.IsBattery" ng-value="false" type="radio" class="ace" ng-required="config.other.IsBATTT.req"> <span class="lbl">&nbsp;{{ \'view_other.no1\' | translate }}</span></label> </div> </div> <div ng-show="entity.IsBattery || entity.IsContainingBattery"> <div class="col-xs-12 form-group" style="padding-left: 24px !important;"> <label class="col-md-6 no-padding" style="padding-top: 4px !important;">{{ \'view_other.assessment_3_1\' | translate }}</label> <div class="col-md-3 pt-1"> <select class="col-xs-12 vp-select vp-select-sm" style="height: 28px !important;" ng-model="entity.BatteryType" ng-required="entity.IsBattery || entity.IsContainingBattery" ng-options="item.Code as item.Name for item in other_combobox_data_3_1" data-placeholder="Please Select"> <option value="" selected > Please Select </option> </select> </div> </div> <div class="col-xs-12 form-group" style="padding-left: 24px !important;"> <label class="col-md-6 col-xs-12 no-padding" style="padding-top: 4px !important;">{{ \'view_other.assessment_3_2\' | translate }}</label> <div class="col-md-3 col-xs-8 pt-1"> <input class="col-xs-12 vp-input vp-input-sm vp-edit-input-right" name="other_3_2" type="text" ng-model="entity.BatteryNumber" ng-required="(entity.IsBattery || entity.IsContainingBattery) && entity.BatteryType!=\'3\'" ng-pattern="config.other.inte.pattern" valid-pattern-tip="Please enter a valid integer. (1~9999999)" /> <validtip for="other_3_2" class="vp-validtip"></validtip> </div> <div class="col-md-3 col-xs-4 pt-1"> <select class="col-xs-12 vp-select vp-select-sm" style="height: 28px !important;" ng-model="entity.BatteryUnit" ng-required="isRequiredBatteryUnit" ng-options="item.Code as item.Name for item in other_combobox_data_3_2" data-placeholder="Please Select"> </select> </div> </div> <div class="col-xs-12 form-group" style="padding-left: 24px !important;"> <label class="col-md-6 col-xs-12 no-padding" style="padding-top: 4px !important;">{{ \'view_other.assessment_3_3\' | translate }}</label> <div class="col-md-3 col-xs-8 pt-1"> <input class="col-xs-12 vp-input vp-input-sm vp-edit-input-right" name="other_3_3" vd-number type="text" ng-model="entity.BatteryMass" ng-required="(entity.IsBattery || entity.IsContainingBattery) && entity.BatteryType!=\'3\'" valid-pattern-tip="Please enter a valid number (0.01-99999.99)." ng-pattern="config.other.BatteryMass.pattern" /> <validtip for="other_3_3" class="vp-validtip"></validtip> </div> </div> <div class="col-xs-12 form-group" style="padding-left: 24px !important;"> <label class="col-md-6 no-padding" style="padding-top: 4px !important;">{{ \'view_other.assessment_3_4\' | translate }}</label> <div class="col-md-3 pt-1"> <input class="col-xs-12 vp-input vp-input-sm vp-edit-input-right" name="other_3_4" vd-number type="text" ng-model="entity.BatteryCapacity" ng-required="(entity.IsBattery || entity.IsContainingBattery) && !entity.BatteryWatt" ng-blur="onblur()" valid-pattern-tip="Please enter a valid number (0.01-99999.99)." ng-pattern="config.other.BatteryMass.pattern" /> <validtip for="other_3_4" class="vp-validtip"></validtip> </div> </div> <div class="col-xs-12 form-group" style="padding-left: 24px !important;"> <label class="col-md-6 no-padding" style="padding-top: 4px !important;">{{ \'view_other.assessment_3_5\' | translate }}</label> <div class="col-md-3 pt-1"> <input class="col-xs-12 vp-input vp-input-sm vp-edit-input-right" name="other_3_5" vd-number type="text" ng-model="entity.BatteryVolt" ng-required="(entity.IsBattery || entity.IsContainingBattery) && !entity.BatteryWatt" ng-blur="onblur()" valid-pattern-tip="Please enter a valid number (0.01-99999.99)." ng-pattern="config.other.BatteryMass.pattern" /> <validtip for="other_3_5" class="vp-validtip"></validtip> </div> </div> <div class="col-xs-12 form-group" style="padding-left: 24px !important;"> <label class="col-md-6 no-padding" style="padding-top: 4px !important;">{{ \'view_other.assessment_3_6\' | translate }}</label> <div class="col-md-3 pt-1"> <input class="col-xs-12 vp-input vp-input-sm vp-edit-input-right" name="other_3_6" type="number" ng-model="entity.BatteryWatt" min="1" step="1" max="2147483647" ng-required="(entity.IsBattery || entity.IsContainingBattery) && !entity.BatteryCapacity && !entity.BatteryVolt" ng-pattern="config.basic.PacksOrSets.pattern" ng-max="2147483647" ng-min="1" valid-pattern-tip="Please enter a valid integer." /> <validtip for="other_3_6" class="vp-validtip"></validtip> </div> </div> </div> </div> <div class="col-xs-12 no-margin-bottom no-padding-left"> <label class="col-md-9 no-padding">{{ \'view_other.assessment_4\' | translate }}</label> <div class="col-md-3 pt-1 form-group pull-right" style="padding-left:52px"> <label><input name="other_assessment_4" ng-model="entity.IsContainingBulb" ng-value="true" type="radio" class="ace" ng-required="config.other.IsLBULB.req"> <span class="lbl">&nbsp;{{ \'view_other.yes1\' | translate }}&nbsp;&nbsp;&nbsp;</span></label> <label><input name="other_assessment_4" ng-model="entity.IsContainingBulb" ng-value="false" type="radio" class="ace" ng-required="config.other.IsLBULB.req"> <span class="lbl">&nbsp;{{ \'view_other.no1\' | translate }}</span></label> </div> </div> <div class="col-xs-12 no-margin-bottom no-padding-left"> <label class="col-md-9 no-padding">{{ \'view_other.assessment_5\' | translate }}</label> <div class="col-md-3 pt-1 form-group pull-right" style="padding-left:52px"> <label> <input name="other_assessment_5" ng-model="entity.IsElectronic" ng-value="true" type="radio" class="ace" ng-required="config.other.IsELECT.req"> <span class="lbl">&nbsp;{{ \'view_other.yes1\' | translate }}&nbsp;&nbsp;&nbsp;</span> </label> <label> <input name="other_assessment_5" ng-model="entity.IsElectronic" ng-value="false" type="radio" class="ace" ng-required="config.other.IsELECT.req"> <span class="lbl">&nbsp;{{ \'view_other.no1\' | translate }}</span> </label> </div> </div> </div> </div> </div> <div modal="countryModal" close="countryModal=false" options="{backdrop: true,dialogFade:true}"> <div class="modal-dialog item-creation-well" style="width: 600px"> <div class="modal-content"> <form name="countryForm"> <div class="modal-body clearfix" style="background: white;"> <div class="col-xs-12" style="margin-top: 10px;"> <div style="position: absolute;top:-7px;right:5px; cursor: pointer;" ng-click="countryModal=false"> <i class="icon-remove red bigger-180"></i> </div> <h4 class="header smaller grey"><i class="icon-hand-right"></i>&nbsp;{{ \'view_other.international\' | translate }}</h4> <div class="col-xs-12 no-padding table-responsive" style="max-height: 420px; overflow-y: auto;"> <table class="table table-bordered table-striped" style="margin-bottom: 10px;"> <thead> <tr style="background: #fff;"> <td style="width: 32px;"> <label> <input class="ace" type="checkbox" ng-model="checkAllCountry"> <span class="lbl"></span> </label> </td> <td>{{ \'view_other.country\' | translate }}</td> <td>{{ \'view_other.importCode\' | translate }}</td> </tr> </thead> <tbody> <tr ng-repeat="item in GlobalCountryList"> <td class="pt-3"> <label class="pt-3"> <input class="ace" type="checkbox" ng-model="item.IsChecked"> <span class="lbl"></span> </label> </td> <td class="pt-3 middle-y"> <label>{{item.text}}</label> </td> <td class="pt-3 middle-y"> <input class="col-xs-12 pull-left vp-input vp-input-sm" name="item_{{$index}}" type="text" ng-model="item.ImportHarmonizedCode" maxlength="{{config.other.HarmonizedCode.maxlength}}" ng-required="config.other.HarmonizedCode.req"> </td> </tr> </tbody> </table> </div> </div> </div> <div class="modal-footer"> <button class="btn btn-primary btn-sm" style="width: 76px;" ng-click="saveGlobalCountry()"> <i class="icon-save"></i> {{ \'view_basic.save\' | translate }} </button> <button type="button" class="btn btn-danger btn-sm" ng-click="countryModal=false" style="width: 76px;"> <i class="icon-undo"></i> {{ \'view_basic.cancel\' | translate }} </button> </div> </form> </div> </div> </div>'
      link: ($scope, element, attrs) ->
        $scope.other_combobox_data_3_1 = [
          {
            Code: '1'
            Name: 'Lithium Ion/Lithium Polymer'
          }
          {
            Code: '2'
            Name: 'Lithium Metal'
          }
          {
            Code: '3'
            Name: 'None of these above'
          }
        ]
        $scope.entity.BatteryUnit = '2'
        $scope.other_combobox_data_3_2 = [
          {
            Code: '1'
            Name: 'Cells'
          }
          {
            Code: '2'
            Name: 'Batteries'
          }
        ]

        $scope.onblur = ->
          if ($scope.entity.IsContainingBattery == true or $scope.entity.IsBattery == true) and $scope.entity.BatteryVolt and $scope.entity.BatteryCapacity
            return $scope.entity.BatteryWatt = Math.ceil($scope.entity.BatteryVolt * $scope.entity.BatteryCapacity / 1000)
          return

        $scope.getGlobalCountryList = ->
          requestItem = undefined
          requestItem = action1: 'business-unit'
          itemCreationAPI.search requestItem, (response) ->
            $scope.setCountryListSource response.BusinessUnits

        $scope.setCountryListSource = (list) ->
          bu = undefined
          country = undefined
          countryListString = undefined
          dataSource = undefined
          i = undefined
          j = undefined
          len = undefined
          len1 = undefined
          ref = undefined
          result = undefined
          dataSource = []
          countryListString = []
          if list
            i = 0
            len = list.length
            while i < len
              bu = list[i]
              if (ref = bu.RealCountryCode) != 'USA' and ref != 'CAN'
                dataSource.push
                  text: bu.BUName
                  value: bu.CountryCode
              i++
            j = 0
            len1 = dataSource.length
            while j < len1
              country = dataSource[j]
              result = $filter('filter')($scope.entity.RestrictedCountries, CountryCode: country.value)
              if result and result.length > 0
                country.ImportHarmonizedCode = result[0].ImportHarmonizedCode
                country.IsChecked = true
                countryListString.push country.text
              else
                country.IsChecked = false or $scope.checkAllCountry
                if $scope.checkAllCountry
                  countryListString.push country.text
              j++
          $scope.GlobalCountryList = dataSource
          $scope.CountryListString = countryListString.join()

        $scope.$watch 'checkAllCountry', (newValue, oldValue) ->
          $scope.checkAllCountryChanged newValue, oldValue

        $scope.checkAllCountryChanged = (newValue, oldValue) ->
          country = undefined
          i = undefined
          len = undefined
          ref = undefined
          results = undefined
          if $scope.GlobalCountryList
            ref = $scope.GlobalCountryList
            results = []
            i = 0
            len = ref.length
            while i < len
              country = ref[i]
              results.push country.IsChecked = newValue
              i++
            return results
          return

        $scope.saveGlobalCountry = ->
          country = undefined
          countryList = undefined
          i = undefined
          len = undefined
          ref = undefined
          $scope.entity.RestrictedCountries = []
          countryList = []
          ref = $scope.GlobalCountryList
          i = 0
          len = ref.length
          while i < len
            country = ref[i]
            if country.IsChecked
              $scope.entity.RestrictedCountries.push
                CountryCode: country.value
                ImportHarmonizedCode: country.ImportHarmonizedCode
              countryList.push country.text
            i++
          $scope.CountryListString = countryList.join()
          $scope.countryModal = false

}
]
