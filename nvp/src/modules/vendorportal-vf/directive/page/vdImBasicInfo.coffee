angular.module("vdImBasicInfo",[])
.directive("vdImBasicInfo",["$filter","manufacturerAPI","itemCreationAPI","common","$location","messager","publisher",($filter,manufacturerAPI,itemCreationAPI,common,$location,messager,publisher) ->
    restrict : "E"
    template :'
    <div class="row no-margin item-creation-well">
        <div class="form-group col-md-6 no-padding">
            <label class="col-lg-4 col-xs-11  control-label">{{ \'view_basic.brand\' | translate }}:</label>
            <div class="col-lg-7 col-xs-11">
                <div class="col-lg-10 col-xs-10  no-padding-left">
                    <select class="col-xs-12 vp-select vp-select-sm" name="brand"
                      ng-model="entity.ManufacturerCode"
                      ng-required="config.basic.Brand.req"
                      ng-options="item.Code as item.Name for item in ManufacturerInfoList"
                      data-placeholder="Please Select">
                        <option value="" selected > Please Select </option>
                    </select>
                   <!-- <validtip for="brand" class="vp-validtip"></validtip>-->
                </div>
                <div class="col-lg-2 col-xs-2 no-padding-left">
                    <span class="col-xs-3 red no-padding-left" style="padding-top:6px;">*&nbsp;</span>
                </div>
            </div>
        </div>
        <div class="form-group col-md-6 no-padding">
            <label class="col-lg-4 col-xs-11  control-label">{{ \'view_basic.category\' | translate }}:</label>
            <div class="col-lg-7 col-xs-11">
                <div class="col-lg-10 col-xs-10  no-padding-left">
                      <vd-category-item category-id="entity.CategoryID" subscribe="true" action="\'edit\'" style="height:30px;" ctrl-id="detail"></vd-category-item>
                    <!--<validtip for="pm" class="vp-validtip"></validtip>-->
                </div>
                <div class="col-lg-2 col-xs-2 no-padding-left">
                    <span class="col-xs-3 red no-padding-left" style="padding-top:6px;">*&nbsp;</span>
                </div>
            </div>
        </div>
        <div class="form-group col-md-6 no-padding">
            <label class="col-lg-4 col-xs-11  control-label">{{ \'view_basic.mfrPartNumber\' | translate }}:</label>
            <div class="col-lg-7 col-xs-11">
                <div class="col-lg-10 col-xs-10  no-padding-left">
                    <input type="text" class="col-xs-12 vp-input vp-input-sm"
                      name="mfrPartNumber"
                      ng-model="entity.ManufacturerPartNumber"
                      ng-required="config.basic.ManufacturerPartNumber.req"
                      maxlength="{{config.basic.ManufacturerPartNumber.maxlength}}"/>
                    <validtip for="mfrPartNumber" class="vp-validtip"></validtip>
                </div>
                  <div class="col-lg-2 col-xs-2 no-padding-left">
                        <span style="font-size: 17px;" class="icon-question-sign grey" title=\'You must input either "Mfr. Parts#" or "UPC/EAN" or both. If "Mfr. Parts#" is empty, system will automatically copy the value from "UPC/EAN"\'></span>
                </div>
            </div>
        </div>
        <div class="form-group col-md-6 no-padding">
            <label class="col-lg-4 col-xs-11  control-label">{{ \'view_basic.upc\' | translate }}:</label>
            <div class="col-lg-7 col-xs-11">
                <div class="col-lg-10 col-xs-10  no-padding-left">
                    <input type="text" class="col-xs-12 vp-input vp-input-sm"
                      name="upc"
                      ng-model="entity.UPCCode"
                      ng-required="config.basic.UPCCode.req"
                      ng-pattern="config.basic.UPCCode.pattern"
                      valid-pattern-tip="Please enter valid UPC Code(8,12-14 digit number). "
                      maxlength="{{config.basic.UPCCode.maxlength}}"
                      minlength="{{config.basic.UPCCode.minLength}}"/>
                    <validtip for="upc" class="vp-validtip"></validtip>
                </div>
                <div class="col-lg-2 col-xs-2 no-padding-left">
                        <span style="font-size: 17px;" class="icon-question-sign grey" title=\'UPC/EAN must be numbers with 8, 12, 13 or 14 digits.\'></span>
                </div>
            </div>
        </div>

        <div class="form-group col-md-6 no-padding">
            <label class="col-lg-4 col-xs-11  control-label">{{ \'view_basic.productPageHyperlink\' | translate }}:</label>
            <div class="col-lg-7 col-xs-11">
                <div class="col-lg-10 col-xs-10  no-padding-left">
                    <input type="text"  class="col-xs-12 vp-input vp-input-sm"
                      name="hyperlink"
                      ng-model="entity.Hyperlink"
                      ng-required="config.basic.ProductPageHyperlink.req"
                      ng-pattern="config.basic.ProductPageHyperlink.pattern"
                      valid-pattern-tip="Please enter a valid hyperlink."
                      maxlength="{{config.basic.ProductPageHyperlink.maxlength}}"/>
                    <validtip for="hyperlink" class="vp-validtip"></validtip>
                </div>
                <div class="col-lg-2 col-xs-2 no-padding-left">
                    <span class="col-xs-3 red no-padding-left" style="padding-top:6px;">*&nbsp;</span>
                </div>
            </div>
        </div>
        <div class="form-group col-md-6 no-padding">
            <label class="col-lg-4 col-xs-11  control-label">{{ \'view_basic.sellToNeweggPrice\' | translate }}:</label>
            <div class="col-lg-7 col-xs-11">
                <div class="col-lg-10 col-xs-10  no-padding-left">
                    <input class="col-xs-12 vp-input vp-input-sm vp-edit-input-right"
                      name="cost"
                      vd-number
                      type="text"
                      ng-model="entity.SellToNeweggPrice"
                      ng-required="config.basic.SellToNeweggPrice.req"
                      valid-pattern-tip="Please enter a valid integer (0.01-99999.99)."
                      ng-pattern="config.basic.SellToNeweggPrice.pattern" />
                    <validtip for="cost" class="vp-validtip"></validtip>
                </div>
                <div class="col-lg-2 col-xs-2 no-padding-left" style="padding-top:6px;">
                    <span class="col-xs-12 no-padding">{{ \'view_basic.currency\' | translate }}</span>
                </div>
            </div>
        </div>
        <div class="form-group col-md-6 no-padding">
            <label class="col-lg-4 col-xs-11  control-label">{{ \'view_basic.suggestedSellingPrice\' | translate }}:</label>
            <div class="col-lg-7 col-xs-11">
                <div class="col-lg-10 col-xs-10  no-padding-left">
                    <input class="col-xs-12 vp-input vp-input-sm vp-edit-input-right"
                      name="price"
                      type="text"
                      vd-number
                      ng-model="entity.SuggestedSellingPrice"
                      ng-required="config.basic.SuggestdSellingPrice.req"
                      valid-pattern-tip="Please enter a valid integer (0.01-99999.99)."
                      ng-pattern="config.basic.SuggestdSellingPrice.pattern"/>
                    <validtip for="price" class="vp-validtip"></validtip>
                </div>
                <div class="col-lg-2 col-xs-2 no-padding-left" style="padding-top:6px;">
                    <span class="col-xs-12 no-padding">{{ \'view_basic.currency\' | translate }}</span>
                </div>
            </div>
        </div>
        <div class="form-group col-md-6 no-padding">
            <label class="col-lg-4 col-xs-11  control-label">{{ \'view_basic.packsAndSets\' | translate }}:</label>
            <div class="col-lg-7 col-xs-11">
                <div class="col-lg-10 col-xs-10  no-padding-left">
                    <input class="col-xs-12 vp-input vp-input-sm vp-edit-input-right"
                      name="packsAndSets"
                      type="number"
                      ng-model="entity.PacksOrSets"
                      min="1"
                      step="1"
                      max="2147483647"
                      ng-required="config.basic.PacksOrSets.req"
                      ng-pattern="config.basic.PacksOrSets.pattern"
                      ng-max="2147483647"
                      ng-min="1"
                      valid-pattern-tip="Please enter a valid integer."
                      />
                    <validtip for="packsAndSets" class="vp-validtip"></validtip>
                </div>
                <div class="col-lg-2 col-xs-2 no-padding-left">
                    <span class="col-xs-3 red no-padding-left" style="padding-top:6px;">*&nbsp;</span>
                    <label class="col-xs-6 no-padding-left" style="padding-top:4px;">
                        <span class="icon-question-sign grey im-tip" title=\'How many pieces in one package?\' style="font-size: 17px;"></span>
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group col-lg-6 col-xs-12 no-padding">
            <div class="col-md-12 col-xs-12">
                <button type="button" class="btn btn-xs btn-primary" ng-click="addOriginCountry()" >{{ \'view_basic.countryOfOrigin\' | translate }} ({{entity.OriginCountryList.length}})</button>
                <span class="red no-padding-left" style="padding-top:6px;">*&nbsp;</span>
                <button type="button" class="btn btn-xs btn-primary" ng-click="addWarningModal=true" >{{ \'view_basic.warningMaintain\' | translate }} ({{entity.WarningList.length}})</button>
                <vd-im-attachments attachments="entity.AttachmentList" config="config" upload-disabled="uploadFilesDisabled" mfr-part-number="entity.ManufacturerPartNumber" upc="entity.UPCCode" style="margin-left: 12px;"/>
            </div>
        </div>
    </div>
    <div modal="addOriginModal" close="closeOriginModal()" options="{backdrop: true,dialogFade:true}"  id="addOrigin">
        <div class="modal-dialog" style="width:980px;">
            <div name="addOriginForm" class="modal-content">
                <div class="widget-header">
                    <h4>{{ \'view_basic.itemOriginCountry\' | translate }}</h4>
                </div>
                <div class="modal-body" style="height:360px;">
                    <div class="row">
                        <!--<div class="col-md-12">
                            <label class="col-md-3 no-padding-right">{{ \'view_basic.mfrPartNumber\' | translate }}:</label>
                            <div class="col-md-9 no-padding" style="margin-left: -28px;"><span>{{entity.ManufacturerPartNumber}}</span></div>
                        </div>
                        <div class="col-md-12">
                            <label class="col-md-3 no-padding-right">{{ \'view_basic.itemDescription\' | translate }}:</label>
                            <div class="col-md-9 no-padding" style="margin-left: -28px;"><span>{{entity.ItemDescription}}</span></div>
                        </div>-->
                        <div class="col-md-12">
                            <h5 class="col-xs-5">{{ \'view_basic.itemOriginCountryList\' | translate }}:</h4>
                            <div class="col-xs-2"></div>
                            <div class="col-xs-5 no-padding-left">
                                <h5 class="col-xs-4">{{ \'view_basic.countryList\' | translate }}:</h4>
                                <input type="text" clas="vp-input vp-input-sm" style="width:280px;height:26px;margin-left:-26px;" ng-model="countryKey">
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="col-md-5  no-padding">
                                <div class="col-xs-12">
                                    <div class="table-bordered" style="height:300px;overflow: scroll;overflow: auto;">
                                        <div ng-repeat="item in OriginCountryList| orderBy : \'CountryName\'" class="col-xs-12" style="height:30px;padding-top:8px;padding-bottom:8px;" ng-class="{\'vp-striped\':$index%2==1}">
                                            <label class="lbl vp-trim-2 col-xs-12 radio-inline no-margin-left no-padding-right no-padding-left" style="max-width:320px;" title="{{item.CountryName}}">
                                                <input type="checkbox" class="ace" ng-model="item.IsChecked">
                                                <span class="lbl">&nbsp;{{item.CountryName}}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2  no-padding">
                                <div class="col-xs-12" style="padding-bottom:20px;padding-top:20px;">
                                    <div class="col-xs-12">
                                    <button type="button" class="btn btn-primary btn-xs no-padding-left no-padding-right" style="margin-bottom:8px;width:110px;" ng-click="addToOriginCountList()"><i class="icon-chevron-left"></i>&nbsp;{{ \'view_basic.add\' | translate }}</button>
                                      </div>
                                      <div class="col-xs-12">
                                    <button type="button" class="btn btn-primary btn-xs no-padding-left no-padding-right" ng-click="removeFromOriginCountryList()" style="width:110px;">{{ \'view_basic.remove\' | translate }}&nbsp;<i class="icon-chevron-right"></i></button>
                                      </div>
                                </div>
                            </div>
                            <div class="col-md-5  no-padding">
                                <div class="col-xs-12">
                                    <div class="table-bordered" style="height:300px;overflow: scroll;overflow: auto;">
                                        <div class="col-xs-12" ng-repeat="item in CountryList | filter:countryKey | orderBy : \'CountryName\'" style="height:30px;padding-top:8px;padding-bottom:8px;" ng-class="{\'vp-striped\':$index%2==1}">
                                            <label class="lbl vp-trim-2 col-xs-12 radio-inline no-margin-left no-padding-right no-padding-left" style="max-width:320px;" title="{{item.CountryName}}">
                                                <input type="checkbox" class="ace" ng-model="item.IsChecked">
                                                <span class="lbl">&nbsp;{{item.CountryName}}</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-sm" style="width: 76px;" ng-click="saveCountryOrigin()">
                        <i class="icon-save"></i> {{ \'view_basic.save\' | translate }}
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" ng-click="addOriginModal = false" style="width: 76px;" id="addOriginModalCancelBtn">
                        <i class="icon-undo"></i> {{ \'view_basic.cancel\' | translate }}
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div modal="addWarningModal" close="closeWarningModal()" options="{backdrop: true,dialogFade:true}" id="addWarning">
        <div class="modal-dialog" style="width:720px;">
            <div name="addWarningForm" class="modal-content">
                <div class="widget-header">
                    <h4>{{ \'view_basic.warningList\' | translate }}</h4>
                </div>
                <div class="modal-body" style="height:418px;">
                    <div class="row" style="height:408px;overflow: scroll;overflow: auto;">
                        <table class="table table-bordered table-striped dashboard-table table-condensed">
                            <thead class="thin-border-bottom">
                                <tr>
                                    <th>
                                    </th>
                                    <th style="width: 100px">Warning ID
                                    </th>
                                    <th style="width: 180px">Warning Type
                                    </th>
                                    <th>Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in WarningListSource | orderBy:\'WarningID\'">
                                    <td>
                                        <label style="margin-top:-1px;margin-bottom:1px;">
                                            <input type="checkbox" class="ace" ng-model="item.IsChecked" ng-init="item.IsChecked =setWarningStatus(item.WarningID)">
                                            <span class="lbl"></span>
                                        </label>
                                    </td>
                                    <td>
                                        {{item.WarningID}}
                                    </td>
                                    <td>
                                        {{item.WarningTypeName}}
                                    </td>
                                    <td>
                                        {{item.WebDescription}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary btn-sm" style="width: 76px;" ng-click="saveWarning()">
                        <i class="icon-save"></i> {{ \'view_basic.save\' | translate }}
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" ng-click="closeWarningModal()" style="width: 76px;" id="addWarningCancelBtn">
                        <i class="icon-undo"></i> {{ \'view_basic.cancel\' | translate }}
                    </button>
                </div>
            </div>
        </div>
    </div>

    '
    link: ($scope, element, attrs) ->
        $scope.getWarningList =->
            requestItem={action1:"warning"}
            itemCreationAPI.search requestItem
            ,(response)->
                if(response)
                    $scope.WarningListSource = response.Warnings

        $scope.setDefaultOriginCountry=(countryList)->
          $scope.OriginCountryList = [] if !$scope.OriginCountryList
          $scope.CountryList = [] if !$scope.CountryList
          if($scope.entity.OriginCountryList && $scope.entity.OriginCountryList.length > 0)
            for country in countryList
                result = $filter('filter')($scope.entity.OriginCountryList, {CountryCode: country.CountryCode})
                if (result && result.length > 0)
                  #$scope.OriginCountryList.push(country)
                  result[0].CountryName = country.CountryName
                else
                  $scope.CountryList.push(country) if $filter('filter')($scope.CountryList, {CountryCode: country.CountryCode}).length == 0
          else
            $scope.CountryList = countryList

        $scope.getCountryList = ->
            requestItem = {
                action1:'origin-country'
            }
            itemCreationAPI.search requestItem
            , (response)->
                if (response && response.Succeeded)
                    $scope.AllCountries = angular.copy(response.OriginCountries)
                    $scope.setDefaultOriginCountry(response.OriginCountries)


        if $scope.shouldInit
            $scope.getWarningList()
            $scope.getCountryList()

        $scope.addOriginCountry = ()->
           $scope.OriginCountryList = angular.copy($scope.entity.OriginCountryList)
           country.IsChecked = false for country in $scope.OriginCountryList
           country.IsChecked = false for country in $scope.CountryList
           delete $scope.countryKey
           $scope.addOriginModal=true

        $scope.closeOriginModal = ->
            if !$scope.entity.OriginCountryList || $scope.entity.OriginCountryList.length == 0
              $scope.CountryList.push(country) for country in $scope.OriginCountryList
            else if $scope.OriginCountryList
              for country in $scope.OriginCountryList
                result = $filter('filter')($scope.entity.OriginCountryList, {CountryCode:country.CountryCode})
                if(result.length == 0)
                  $scope.CountryList.push(country)

            if $scope.entity.OriginCountryList && $scope.entity.OriginCountryList.length > 0
              for country in $scope.entity.OriginCountryList
                tempCountry = $scope.CountryList.find((e)->
                    e.CountryCode == country.CountryCode
                )
                index = $scope.CountryList.indexOf(tempCountry)
                if index >= 0
                  $scope.CountryList.splice(index,1)
            
            $scope.addOriginModal = false

        $scope.saveCountryOrigin =->
            $scope.addOriginModal = false
            $scope.entity.OriginCountryList = angular.copy($scope.OriginCountryList)
            return true

        $scope.closeWarningModal = ->
            $scope.addWarningModal = false

        $scope.saveWarning =->
            tempWarningList = []
            tempGroupIDList = []
            for item in $scope.WarningListSource
                if item.IsChecked
                   tempWarningList.push({WarningID: item.WarningID,GroupID:item.GroupID}) 
                   tempGroupIDList.push(item.GroupID)  if item.GroupID
            repeatGroupID = -9999
            repeatItems = []
            if(tempGroupIDList.length > 0)
                tempSortArray = tempGroupIDList.sort()
                i = 0
                while i < tempSortArray.length - 1
                  if tempSortArray[i] == tempSortArray[i + 1]
                    repeatGroupID = tempSortArray[i]
                    break
                  i++   
            if repeatGroupID != -9999  
               for item in tempWarningList
                   if item.GroupID == repeatGroupID
                      repeatItems.push(item.WarningID)
            if repeatItems.length > 0
                messager.error('Your selected warning ID have some imcompatibility, please modify your selection. (Warning IDs: ' + repeatItems.join(', ') + ')')  
                return
            $scope.entity.WarningList = []
            for item in $scope.WarningListSource
                $scope.entity.WarningList.push({WarningID: item.WarningID}) if item.IsChecked
            $scope.addWarningModal = false
            return true

        $scope.setWarningStatus = (id)->
            for item in $scope.entity.WarningList
              if item.WarningID == id
                return true
            return false

        $scope.addToOriginCountList =->
            selectedCountries = $filter("filter")($scope.CountryList,{IsChecked:true})
            if selectedCountries && selectedCountries.length > 0
                for country in selectedCountries
                    filtered = $filter("filter")($scope.OriginCountryList,{CountryCode:country.CountryCode})
                    if typeof(filtered) == undefined || filtered.length == 0
                        index = $scope.CountryList.indexOf(country)
                        $scope.CountryList.splice(index,1)
                        tmpCountry = angular.copy(country)
                        tmpCountry.IsChecked = false
                        $scope.OriginCountryList.push(tmpCountry)

        $scope.removeFromOriginCountryList =->
            selectedCountries = $filter("filter")($scope.OriginCountryList,{IsChecked:true})
            if selectedCountries && selectedCountries.length > 0
                for country in selectedCountries
                    index = $scope.OriginCountryList.indexOf(country)
                    $scope.OriginCountryList.splice(index,1)
                    tmpCountry = angular.copy(country)
                    tmpCountry.IsChecked = false
                    $scope.CountryList.push(tmpCountry)

        $scope.updateSubscribe = ()->
            tempCountry = angular.copy($scope.AllCountries)
            $scope.setDefaultOriginCountry(tempCountry)

        publisher.subscribe('vdImBasicInfoCountry',$scope.updateSubscribe)
])
