angular.module("vdItemProfileDetail",[])
.directive("vdItemProfileDetail",["common","itemProfileAPI","$q",(common,itemProfileAPI,$q) ->
    restrict:'E'
    template:'<div id="itemRequestDetail" class="col-md-12 no-padding" ng-show="showUpadteDetails" style="padding: 15px 0 30px 0!important;">
    <form class="form-horizontal" role="form" name="itemForm">
        <div class="row vp-panel-bar" ng-show="operateType==\'showDetail\'" style="font-size: 13px !important; margin-top: 15px;">
            <vd-panelbar is-show="isShowDetail_IU1" translatetitle="Item Request Information">
            </vd-panelbar>
            <div class="col-md-12 no-padding" style="margin-top: 5px;" ng-hide="isShowDetail_IU1==false">
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'view_query.requestType\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" class="form-control vp-input vp-input-sm" ng-model="entity.RequestType" disabled />
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'view_query.requestStatus\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" ng-model="entity.RequestStatus" class="form-control vp-input vp-input-sm" disabled />
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'view_query.neweggItemNumebr\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" ng-model="entity.NeweggItemNumber" class="form-control vp-input vp-input-sm" disabled />
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'view_query.requestId\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" ng-model="entity.RequestID" class="form-control vp-input vp-input-sm" disabled />
                        </div>
                    </div>
                </div>
                <div class="form-group col-md-6 no-padding">
                    <label class="col-lg-4 col-xs-11">{{ \'view_query.requestDate\' | translate }}:</label>
                    <div class="col-lg-7 col-xs-11">
                        <div class="col-lg-10 col-xs-10  no-padding-left">
                            <input type="text" ng-model="entity.RequestDate" class="form-control vp-input vp-input-sm" disabled />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row vp-panel-bar" style="font-size: 13px !important; margin-top: 15px;">
            <vd-panelbar is-show="isShowDetail_IU2" translatetitle="Item Information">
            </vd-panelbar>
            <div class="col-md-12 no-padding-left" style="margin: 5px 0;" ng-hide="isShowDetail_IU2==false">
                <table class="table table-all-border">
                    <thead>
                        <tr>
                            <th style="width: 200px;">Field</th>
                            <th>Current Value</th>
                            <th style="width: 40%;" ng-hide="operateType==\'readonly\'">Updated Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span>Newegg Item #</span></td>
                            <td>{{ detailEntity.NeweggItemNumber }}&nbsp;&nbsp;
                                <a href="http://www.newegg.com/product/product.aspx?Item={{ detailEntity.NeweggItemNumber }}" title="Goto newegg product page"
                                    style="text-decoration: underline;"
                                    class="blue" target="_blank">
                                    <span>Newegg Product Page</span>
                                </a></td>
                            <td ng-hide="operateType==\'readonly\'"></td>
                        </tr>
                        <tr>
                            <td>Brand</td>
                            <td>{{ detailEntity.ManufacturerName }}</td>
                            <td ng-hide="operateType==\'readonly\'"></td>
                        </tr>
						<tr>
                            <td>Category</td>
                            <td>{{ detailEntity.GroupName }}</td>
                            <td ng-hide="operateType==\'readonly\'"></td>
                        </tr>
                        <tr>
                            <td>Mfr. Part#</td>
                            <td>{{ detailEntity.AdsPartNumber }}</td>
                            <td ng-hide="operateType==\'readonly\'">
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input  type="checkbox" ng-model="disable_mfr">
                                    </label>
                                    <input type="text" class="form-control vp-input vp-input-sm" ng-model="entity.xxx"
                                        placeholder="Mfr. Part#" maxlength="20" ng-disabled="!disable_mfr" ng-required="disable_mfr">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>UPC/EAN</td>
                            <td>{{ detailEntity.UPCCode }}</td>
                            <td ng-hide="operateType==\'readonly\'">
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox" ng-model="disable_upc">
                                    </label>
                                    <input type="text" class="form-control vp-input vp-input-sm" ng-model="entity.hf"
                                        placeholder="UPC/EAN" ng-disabled="!disable_upc" ng-required="disable_upc">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Web Description</td>
                            <td>{{ detailEntity.WebDescription }}</td>
                            <td ng-hide="operateType==\'readonly\'">
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox" ng-model="disable_webDesc">
                                    </label>
                                    <input type="text" class="form-control vp-input vp-input-sm" ng-model="entity.sda"
                                        placeholder="Web Description" ng-disabled="!disable_webDesc" ng-required="disable_webDesc">
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Bullet Point Description</td>
                            <td>
                                <div style="max-height: 150px; display: inline-block; overflow-y: auto; width: 100%;">
                                    {{ viewBulletDescription }}
                                </div>
                            </td>
                            <td ng-hide="operateType==\'readonly\'">
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox" ng-model="disable_bulletDesc">
                                    </label>
                                    <textarea class="form-control" style="height: 150px; resize: none;" ng-model="entity.VendorMemo"
                                        ng-disabled="!disable_bulletDesc"
                                        maxlength="2000" ng-change="item.isChanged=true" ng-required="disable_bulletDesc">
                                    </textarea>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row vp-panel-bar" style="font-size: 13px !important; margin-top: 15px;">
            <vd-panelbar is-show="isShowDetail_IU3" translatetitle="Specification Information">
            </vd-panelbar>
            <div class="col-md-12 no-padding-left" style="margin: 5px 0;" ng-hide="isShowDetail_IU3==false">
                <table class="table table-all-border">
                    <thead>
                        <tr>
                            <th style="width:15%;max-width: 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">Group Name</th>
                            <th style="width:15%;">Property Name</th>
                            <th style="width:15%;">Current Property Value</th>
                            <th style="width:15%;">Current Inputted Value</th>
                            <th style="width:20%;" ng-hide="operateType==\'readonly\'">Updated Property Value</th>
                            <th style="width:20%;" ng-hide="operateType==\'readonly\'">Updated Inputted Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr ng-repeat="info in propertyValueList">
                            <td style="width:15%;max-width: 0;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ info.GroupName }}</td>
                            <td>{{ info.PropertyName }}</td>
                            <td>{{ info.ValueName }}</td>
                            <td>{{ info.UserInputted}}</td>
                            <td ng-hide="operateType==\'readonly\'">
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox" ng-model="$index_disable_pp">
                                    </label>
                                    <select ng-disabled="!$index_disable_pp"
									 class="form-control vp-select vp-select-sm"
									 ng-options="item.PropertyCode as item.PropertyName for item in propertyValueList"
									 ng-model="info.propertyValue"
									 ng-change="reloadInputValue($index, info.propertyValue)"
									 ng-required="$index_disable_pp"></select>
                                </div>
                            </td>
                            <td ng-hide="operateType==\'readonly\'">
                                <div class="input-group">
                                    <label class="input-group-addon ">
                                        <input type="checkbox" ng-model="$index_disable_ip" >
                                    </label>
                                    <select ng-disabled="!$index_disable_ip"
									 class="form-control vp-select vp-select-sm"
									 ng-options="item.ValueCode as item.ValueName for item in inputValueList_{{$index}}"
									 ng-model="info.nnn"
									 ng-required="$index_disable_ip"></select>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="row vp-panel-bar" style="font-size: 13px !important; margin-top: 15px;"  ng-hide="operateType==\'readonly\'">
            <vd-panelbar is-show="isShowDetail_IU4" translatetitle="Vendor Memo">
            </vd-panelbar>
            <div class="col-md-12 no-padding-left" style="margin: 5px 0;" ng-hide="isShowDetail_IU4==false">
                <textarea class="col-xs-12" style="height: 100px; resize: vertical;" ng-model="entity.VendorMemo"  maxlength="2000" ></textarea>
            </div>
        </div>

        <div class="row mt-10" ng-show="operateType==\'updateRequest\'">
            <button class="btn btn-success btn-sm mr-10" type="button" title="Approve" ng-click="approve()">
                <div class="col-xs-12">
                    <!--   <i class="ace-icon icon-spinner icon-spin-position icon-spin white bigger-120"></i>-->
                    <i class="icon-check"></i><span class="hidden-xs">&nbsp;Submit Change Request</span>
                </div>
            </button>

            <button class="btn btn-danger btn-sm" type="button" title="Reject" ng-click="showRejectModal()">
                <div class="col-xs-12">
                    <i class="icon-undo"></i><span class="hidden-xs">&nbsp;Reset</span>
                </div>
            </button>
        </div>
    </form>
</div>'
    link:($scope, element, attr)->
        $scope.readOnly = attr.readOnly=="true" ? true : false
        $scope.propertyValueList = []
        $scope.inputValueList = []

        $scope.getPropertyValueList = ->
            requestItem = {
              action1: 'property'
              itemnumbers: $scope.detailEntity.NeweggItemNumber
            }
            itemProfileAPI.getPropertys requestItem
            ,(response)->
                if response.Succeeded && response.ItemProperties && response.ItemProperties.length > 0
                    $scope.propertyValueList = response.ItemProperties[0].Properties

        $scope.getBulletDescription = ->
            $scope.viewBulletDescription= ""
            requestItem = {
              action1: 'description'
              ItemNumber: $scope.detailEntity.NeweggItemNumber
            }
            itemProfileAPI.getDescription requestItem
            ,(response)->
                if response.Succeeded
                    $scope.viewBulletDescription = response.BulletDescription

        $scope.reloadInputValue = (index, propertyCode)->
            var_string = 'inputValueList_'+index
            requestItem = {
              action1: 'propertyvalue'
              PropertyCode: propertyCode
            }
            itemProfileAPI.getPropertys requestItem
            ,(response)->
                if response && response.PropertyValues
                    $scope[var_string] = angular.copy(response.PropertyValues)

        $scope.$watch 'detailEntity.NeweggItemNumber', (newValue,oldValue) ->
            return if !newValue || oldValue == newValue
            $scope.propertyValueList = []
            $scope.getPropertyValueList()
            $scope.getBulletDescription()
            #$scope.reloadInputValue()
])