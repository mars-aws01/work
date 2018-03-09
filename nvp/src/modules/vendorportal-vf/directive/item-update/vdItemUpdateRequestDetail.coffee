angular.module("vdItemUpdateRequestDetail",[])
.directive("vdItemUpdateRequestDetail",["common","itemUpdateAPI","$q","messager","$translate","$filter",(common,itemUpdateAPI,$q,messager,$translate,$filter) ->
    restrict:'E'
    template:'<div id="itemUpdateRequestDetail" class="col-md-12 no-padding" ng-show="showUpadteDetails">
    <form class="form-horizontal" role="form" name="itemForm">
        <div class="row vp-panel-bar" ng-show="operateType==\'showDetail\'" style="font-size: 13px !important; margin-top: 15px;">
            <vd-panelbar is-show="isShowDetail_IU1" translatetitle="Item Request Information">
            </vd-panelbar>
            <div class="col-md-12 no-padding" style="margin-top: 5px;" ng-hide="isShowDetail_IU1==false">
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'update_detail.requestType\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" class="form-control vp-input vp-input-sm" ng-model="updateDetailEntity.update.ItemUpdateDetail.RequestType" disabled />
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'update_detail.requestStatus\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" ng-model="updateDetailEntity.update.ItemUpdateDetail.RequestStatus" class="form-control vp-input vp-input-sm" disabled />
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'update_basic.neweggItemNumber\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" ng-model="updateDetailEntity.update.ItemUpdateDetail.NeweggItemNumber" class="form-control vp-input vp-input-sm" disabled />
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'update_detail.requestId\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" ng-model="updateDetailEntity.update.ItemUpdateDetail.RequestId" class="form-control vp-input vp-input-sm" disabled />
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'update_detail.requestDate\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" ng-model="updateDetailEntity.update.ItemUpdateDetail.RequestDate" class="form-control vp-input vp-input-sm" disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row vp-panel-bar" style="font-size: 13px !important; margin-top: 15px;">
            <vd-panelbar is-show="isShowDetail_IU2" translatetitle="{ \'update_detail.itemInformation\' | translate }">
            </vd-panelbar>
            <div class="col-md-12 no-padding-left" style="margin: 5px 0;" ng-hide="isShowDetail_IU2==false">
                <p class="orange item-update-warning-desc" ng-hide="operateType==\'showDetail\'"><i class="icon icon-warning"></i>&nbsp;{{ \'update_detail.releaseAfterReview\' | translate }}</p>
                <table class="table table-all-border" style="width: 100%;table-layout: fixed">
                    <thead>
                        <tr>
                            <th style="width: 200px;">{{ \'update_detail.field\' | translate }}</th>
                            <th style="width: 40%;max-width:440px">{{ \'update_detail.currentValue\' | translate }}</th>
                            <th style="width: 40%;">{{ \'update_detail.updateValue\' | translate }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span>{{ \'update_basic.neweggItemNumber\' | translate }}</span></td>
                            <td>{{updateDetailEntity.old.NeweggItemNumber}}&nbsp;&nbsp;
                                <a ng-href="{{updateDetailEntity.old.Hyperlink}}" target="_blank" title="Goto newegg product page"
                                    style="text-decoration: underline;"
                                    class="blue"
                                    ng-hide="updateDetailEntity.old.Hyperlink==\'\' ">
                                    <span>Newegg Product Page</span>
                                </a></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{{ \'update_basic.brand\' | translate }}</td>
                            <td>{{updateDetailEntity.old.BrandName}}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>{{ \'update_basic.manufacturePartNumber\' | translate }}</td>
                            <td>{{updateDetailEntity.old.ManufacturerPartNumber}}</td>
                            <td>
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input  type="checkbox" ng-model="disable_mfr" 
                                          ng-init="disable_mfr=true" ng-disabled="operateType==\'showDetail\'" />
                                    </label>
                                    <input type="text"
                                      class="form-control vp-input vp-input-sm"
                                      ng-model="updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber"
                                      maxlength="{{config.basic.ManufacturerPartNumber.maxlength}}"
                                      placeholder="Mfr. Part#"
                                      ng-class="{itemstyle:!disable_mfr}"
                                      ng-click="onInput($event,\'disable_mfr\')" 
                                      ng-disabled="operateType==\'showDetail\'" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>{{ \'update_basic.upc\' | translate }}</td>
                            <td>{{updateDetailEntity.old.UPCCode}}</td>
                            <td>
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox" ng-model="disable_upc" ng-disabled="operateType==\'showDetail\'">
                                    </label>
                                    <input type="text" name="upccode"
                                      class="form-control vp-input vp-input-sm" 
                                      ng-model="updateDetailEntity.update.ItemUpdateDetail.UPCCode"
                                      maxlength="{{config.basic.UPCCode.maxlength}}"
                                      minlength="{{config.basic.UPCCode.minLength}}"
                                      placeholder="UPC/EAN"
                                      ng-class="{itemstyle:!disable_upc}"
                                      ng-requires="updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber==undefined || updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber==\'\'"
                                      ng-click="onInput($event,\'disable_upc\')"
                                      ng-disabled="operateType==\'showDetail\'" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>{{ \'update_detail.webDescription\' | translate }}</td>
                            <td>{{updateDetailEntity.old.ItemWebDescription}}</td>
                            <td>
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox" 
                                        ng-model="disable_webDesc" ng-disabled="operateType==\'showDetail\'" >
                                    </label>
                                    <input type="text"
                                      class="form-control vp-input vp-input-sm"
                                      ng-model="updateDetailEntity.update.ItemUpdateDetail.ItemWebDescription"
                                      maxlength="{{config.basic.ItemWebDescription.maxlength}}"
                                      placeholder="Web Description" 
                                      ng-class="{itemstyle:!disable_webDesc}"
                                      ng-click="onInput($event,\'disable_webDesc\')"
                                      ng-disabled="operateType==\'showDetail\'" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>{{ \'update_detail.bulletPointDescription\' | translate }}</td>
                            <td style="padding:0">
                                <div style="max-height: 150px; display: inline-block; overflow: auto; width: 100%;">
                                    <pre style="background: white;border: 0;font-family:&quot;Helvetica Neue&quot;, Arial, sans-serif;color:#393939;overflow: hidden; overflow-y:hidden;white-space: pre-line;white-space: -moz-pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word">
                                    {{updateDetailEntity.old.BulletDescription}}</pre>
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox" ng-model="disable_bulletDesc" ng-disabled="operateType==\'showDetail\'">
                                    </label>
                                    <textarea
                                      class="form-control" style="height: 150px; resize: none;"
                                        ng-model="updateDetailEntity.update.ItemUpdateDetail.BulletDescription"
                                        maxlength="{{config.basic.BulletDescription.maxlength}}"
                                        ng-change="item.isChanged=true" 
                                        placeholder="Bullet Point Description"
                                        ng-class="{itemstyle:!disable_bulletDesc}"
                                        ng-click="onInput($event,\'disable_bulletDesc\')"
                                        ng-disabled="operateType==\'showDetail\'" />
                                    </textarea>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row vp-panel-bar" style="font-size: 13px !important; margin-top: 15px;">
            <vd-panelbar is-show="isShowDetail_IU3" translatetitle="{ \'update_detail.specificationInformation\' | translate }">
            </vd-panelbar>
            <div class="col-md-12 no-padding-left" style="margin: 5px 0;" ng-hide="isShowDetail_IU3==false">
                <table class="table table-all-border">
                    <thead>
                        <tr>
                            <th style="width:15%;max-width: 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ \'update_detail.groupName\' | translate }}</th>
                            <th style="width:15%;">{{ \'update_detail.propertyName\' | translate }}</th>
                            <th style="width:15%;">{{ \'update_detail.currentPropertyValue\' | translate }}</th>
                            <th style="width:15%;">{{ \'update_detail.currentInputtedValue\' | translate }}</th>
                            <th style="width:20%;">{{ \'update_detail.updatePropertyValue\' | translate }}</th>
                            <th style="width:20%;">{{ \'update_detail.updateInputtedValue\' | translate }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="info in updateDetailEntity.update.ItemUpdateDetail.ItemProperties">
                            <td style="width:15%;max-width: 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ info.GroupName}}</td>
                            <td>{{ info.PropertyName }}</td>
                            <td>{{ info.CurrentValueName}}</td>
                            <td>{{ info.CurrentUserInputted}}</td>
                            <td>
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox"  ng-model="info.disable_pp" ng-disabled="operateType==\'showDetail\'">
                                    </label>
                                    <select title="{{operateType==\'showDetail\'?info.ValueName:undefined}}" class="form-control vp-select vp-select-sm"
									 ng-options="item.ValueCode as item.ValueName for item in info.propertyValueList"
									 ng-model="info.ValueCode"
									 ng-required="$index_disable_pp"
									 ng-class="{itemstyle:!info.disable_pp}"
									 ng-click="onInputPP($event,info)" 
									 ng-disabled="operateType==\'showDetail\'">
									   <option value=""></option>
									 </select>
                                </div>
                            </td>
                            <td>
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox" ng-model="info.disable_ip" ng-disabled="operateType==\'showDetail\'" >
                                    </label>
                                    <input title="{{info.UserInputted}}" type="text"ng-model="info.UserInputted" 
                                        ng-click="onInputIP($event,info)"
                                        ng-class="{itemstyle:!info.disable_ip}"
                                        ng-required="$index_disable_ip"
                                        maxlength="{{config.basic.UserInputted.maxlength}}"
                                        ng-disabled="operateType==\'showDetail\'" />                                    
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row vp-panel-bar" style="font-size: 13px !important; margin-top: 15px;">
            <vd-panelbar is-show="isShowDetail_IU4" translatetitle="{ \'update_detail.vendorMemo\' | translate }">
            </vd-panelbar>
            <div class="col-md-12 no-padding-left" style="margin: 5px 0;" ng-hide="isShowDetail_IU4==false">
                <textarea 
                  class="col-xs-12" style="height: 100px; resize: vertical;"
                  ng-model="updateDetailEntity.update.ItemUpdateDetail.VendorMemo"
                  maxlength="300" ></textarea>
            </div>
        </div>

        <div class="row mt-10" ng-show="operateType==\'updateRequest\'">
            <button class="btn btn-success btn-sm mr-10" type="button" title="Approve" ng-click="Submit()" ng-disabled="disableApprove">
                <div class="col-xs-12">
                    <!--   <i class="ace-icon icon-spinner icon-spin-position icon-spin white bigger-120"></i>-->
                    <i class="icon-check"></i><span class="hidden-xs">&nbsp;{{ \'update_detail.submit\' | translate }}</span>
                </div>
            </button>

            <button class="btn btn-danger btn-sm" type="button" title="Reject" ng-click="ResetEdit()" ng-disabled="disableReset">
                <div class="col-xs-12">
                    <i class="icon-undo"></i><span class="hidden-xs">&nbsp;{{ \'update_detail.reset\' | translate }}</span>
                </div>
            </button>
        </div>
    </form>
</div>'
    link:($scope, element, attr)->
        $scope.propertyValueList = []
        $scope.inputValueList = []
        $scope.tempInfoList = [
          {PropertyName:'Brand'}
          {PropertyName:'Series'}
          {PropertyName:'Model'}
        ]
        $scope.disableApprove = false
        $scope.disableReset = false
        
        $scope.getPropertyValueList = ->
            requestItem = {
              action1: 'item'
              action2: 'property'
              itemnumbers: $scope.updateDetailEntity.NeweggItemNumber
            }
            #imAPI.getPropertys requestItem
            #,(response)->
                #if response && response.ItemProperties[0].Properties
                    #$scope.propertyValueList = angular.copy(response.ItemProperties[0].Properties)

        acceptCopy = ()->
          deferred = $q.defer()
          if $scope.disable_mfr && ($scope.updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber=='' || $scope.updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber==undefined)
            common.confirmBox $translate('update_notice.mfrConfirm'),"",->
              deferred.resolve('')
            ,->
              deferred.reject('')
          else
            deferred.resolve('')
          return deferred.promise
        
        CheckUPCCode = (upcCode)->
          return true if upcCode == undefined
          return true if upcCode == ''
          if upcCode.match($scope.config.basic.UPCCode.pattern) == null
            return false
          return true
        CheckForm = ()->
          if !$scope.itemForm.upccode.$valid && $scope.disable_upc== true
            messager.warning($translate('update_notice.upcError'))
            return false
          if $scope.disable_upc== true && !CheckUPCCode($scope.updateDetailEntity.update.ItemUpdateDetail.UPCCode)
            messager.warning($translate('update_notice.upcError'))
            return false
          if (($scope.disable_mfr == true && $scope.disable_upc== true) && ($scope.updateDetailEntity.update.ItemUpdateDetail.UPCCode == '' || $scope.updateDetailEntity.update.ItemUpdateDetail.UPCCode == undefined) && ($scope.updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber == '' || $scope.updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber == undefined))
             messager.warning($translate('update_notice.mfrandUPCError'))
             return false
           if (($scope.disable_mfr == true && $scope.disable_upc== false) && ($scope.updateDetailEntity.old.UPCCode == '' || $scope.updateDetailEntity.old.UPCCode == undefined) && ($scope.updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber == '' || $scope.updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber == undefined))
             messager.warning($translate('update_notice.mfrError'))
             return false
           if $scope.disable_mfr && $scope.updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber
             if $scope.updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber.length>20
               messager.warning($translate('update_notice.mfrLengthError'))
               return false 
           if $scope.disable_webDesc && $scope.updateDetailEntity.update.ItemUpdateDetail.ItemWebDescription
             if $scope.updateDetailEntity.update.ItemUpdateDetail.ItemWebDescription.length>300
               messager.warning($translate('update_notice.webDescLengthError'))
               return false 
           if $scope.disable_bulletDesc && $scope.updateDetailEntity.update.ItemUpdateDetail.BulletDescription
             if $scope.updateDetailEntity.update.ItemUpdateDetail.BulletDescription.length>1000
               messager.warning($translate('update_notice.bulletDescLengthError'))
               return false 
           if !$scope.disable_mfr && !$scope.disable_upc && !$scope.disable_webDesc && !$scope.disable_bulletDesc && !IsAnyPropertyChanged()
             messager.warning($translate('update_notice.mustEditError'))
             return false
#           if $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties != undefined
#             for property in $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties
#               if property.disable_pp && property.ValueCode==undefined
#                 messager.warning('The ['+property.PropertyName+']\'s updated property value should not be empty')
#                 return false
#               if property.disable_ip && property.UserInputted==''
#                 messager.warning('The ['+property.PropertyName+']\'s updated inputted value should not be empty')
#                 return false
           return true
            
        scrollToTop = () ->
          $('html, body').animate({
            scrollTop: window.innerHeight
          }, 'slow');
        
        IsAnyPropertyChanged = ()->
          if $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties == undefined
            $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = []
          for property in $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties
            if(property.disable_pp || property.disable_ip)
              return true
          return false
        
        $scope.Submit = ()->
          $scope.disableApprove = true
          $scope.disableReset = true
          if !CheckForm()
            $scope.disableApprove = false
            $scope.disableReset = false
            return          
          promise = acceptCopy()
          promise.then (()->
            common.confirmBox $translate('update_notice.submitConfirm'),"", ->
              entity = $scope.getItemUpdateEntity()
              requestItem = {
                action1:'request'
                ItemUpdateEntity:entity.ItemUpdateDetail
              }
              requestItem.ItemUpdateEntity.VendorNumber = common.currentUser.VendorNumber
              requestItem.ItemUpdateEntity.RequestUrgencyID = 3
              itemUpdateAPI.create requestItem
              ,(response)->
                if response && response.Succeeded
                  messager.success($translate('update_success.submitSuccess'))
                  $scope.showUpadteDetails = false
                  scrollToTop()
                  $scope.$apply()
                else if response && !response.Succeeded
                  errorMessage = $scope.GetErrorMessage(response)
                  $scope.disableApprove = false
                  $scope.disableReset = false
                  messager.error(errorMessage)
              ,(err)->
                if(err && err.data)
                  messager.clear()
                  messager.error(common.getValidationErrorMsg(err.data))
                $scope.disableApprove = false
                $scope.disableReset = false
                $scope.$apply()
            ,->
              $scope.disableApprove = false
              $scope.disableReset = false
              $scope.$apply()
          ),(reason)->
            $scope.disableApprove = false
            $scope.disableReset = false
            $scope.$apply()
              
          return 0
                          
        $scope.ResetEdit = ()->
          common.confirmBox $translate('update_notice.resetConfirm'),"", ->
              oldProperty = []
              oldProperty = angular.copy($scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties)
              $scope.updateDetailEntity.update.ItemUpdateDetail = angular.copy($scope.updateDetailEntity.old)
              $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = []
              $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = angular.copy(oldProperty)
              for property in $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties
                property.ValueCode = property.CurrentValueCode
                property.ValueName = property.CurrentValueName
                property.UserInputted = property.CurrentUserInputted
                property.disable_pp = false
                property.disable_ip = false
              $scope.disable_mfr= false
              $scope.disable_upc= false
              $scope.disable_webDesc= false
              $scope.disable_bulletDesc= false
              $scope.$apply()
            ,->
          return 0
          
        $scope.getItemUpdateEntity = ()->
          itemUpdateEntity = angular.copy($scope.updateDetailEntity.update)
          if !$scope.disable_mfr
            delete itemUpdateEntity.ItemUpdateDetail.ManufacturerPartNumber
          if $scope.disable_mfr && (itemUpdateEntity.ItemUpdateDetail.ManufacturerPartNumber=='' || itemUpdateEntity.ItemUpdateDetail.ManufacturerPartNumber==undefined)
            itemUpdateEntity.ItemUpdateDetail.ManufacturerPartNumber = itemUpdateEntity.ItemUpdateDetail.UPCCode
          if !$scope.disable_upc
            delete itemUpdateEntity.ItemUpdateDetail.UPCCode
          if !$scope.disable_webDesc
            delete itemUpdateEntity.ItemUpdateDetail.ItemWebDescription
          if !$scope.disable_bulletDesc
            delete itemUpdateEntity.ItemUpdateDetail.BulletDescription
          if itemUpdateEntity.ItemUpdateDetail.Hyperlink != undefined && itemUpdateEntity.ItemUpdateDetail.Hyperlink==''
            delete itemUpdateEntity.ItemUpdateDetail.Hyperlink
          index = 0
          updateProperty = []
          if $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties == undefined
            $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = []
          for property in itemUpdateEntity.ItemUpdateDetail.ItemProperties
            if !property.disable_pp
              property.ValueCode = property.CurrentValueCode
            if property.ValueCode <= 0 || property.ValueCode == undefined
              delete property.ValueCode
              delete property.ValueName
            if !property.disable_ip
              property.UserInputted = property.CurrentUserInputted
            if property.disable_pp && property.ValueCode != undefined
              properties = $filter('filter')(property.propertyValueList, (i)->i.ValueCode == property.ValueCode)
              property.ValueName = properties[0].ValueName
            delete property.propertyValueList
            if property.disable_ip || property.disable_pp
              updateProperty.push(property)
          itemUpdateEntity.ItemUpdateDetail.ItemProperties = angular.copy(updateProperty)
          index++
          return itemUpdateEntity
        
        $scope.onInput = ($event,modelName)->
          $scope[modelName] = true
          console.log($event.currentTarget.previousElementSibling.children[0].checked)
          
        $scope.onInputPP = ($event,info)->
          info.disable_pp = true
          
        $scope.onInputIP = ($event,info)->
          info.disable_ip = true
                    
#        $scope.$watch 'updateDetailEntity.NeweggItemNumber',(newValue, oldValue)->
#          if $scope.operateType == 'updateRequest'
#            $scope.disable_mfr= false
#            $scope.disable_upc= false
#            $scope.disable_webDesc= false
#            $scope.disable_bulletDesc= false
#            $scope.disableApprove = false
#            $scope.disableReset = false
            
        $scope.$watch 'RequestId',(newValue, oldValue)->
          if $scope.operateType == 'showDetail' && $scope.RequestId != undefined
            if $scope.updateDetailEntity.update.ItemUpdateDetail.ManufacturerPartNumber
              $scope.disable_mfr= true
            else
              $scope.disable_mfr= false
            if $scope.updateDetailEntity.update.ItemUpdateDetail.UPCCode
              $scope.disable_upc= true
            else
              $scope.disable_upc= false
            if $scope.updateDetailEntity.update.ItemUpdateDetail.ItemWebDescription
              $scope.disable_webDesc= true
            else
              $scope.disable_webDesc= false
            if $scope.updateDetailEntity.update.ItemUpdateDetail.BulletDescription
              $scope.disable_bulletDesc= true
            else
              $scope.disable_bulletDesc= false
            if $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties == undefined
              $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties = []
              
            for property in $scope.updateDetailEntity.update.ItemUpdateDetail.ItemProperties
              if property.CurrentValueCode == 0
                delete property.CurrentValueCode
              edited = $filter('filter')($scope.updatePropertyList, (i)->i.PropertyCode == property.PropertyCode)
              if edited == undefined || edited.length<=0
                continue
              property.disable_pp = true
              property.disable_ip = true
#              if property.ValueCode || property.UserInputted#(property.ValueCode==undefined && property.ValueCode != property.CurrentValueCode)# && property.CurrentValueCode!=0)
#                property.disable_pp = true
#                property.disable_ip = true
#              else if property.ValueCode == undefined && property.UserInputted == undefined && (property.CurrentValueCode || property.UserInputted)
#                property.disable_pp = true
#                property.disable_ip = true
##              if property.UserInputted || property.CurrentUserInputted != property.UserInputted
##                property.disable_ip = true
#              else
#                property.disable_pp = false
#                property.disable_ip = false
])