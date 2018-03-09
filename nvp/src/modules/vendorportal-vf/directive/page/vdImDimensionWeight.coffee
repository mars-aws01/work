angular.module("vdImDimensionWeight",[])
.directive("vdImDimensionWeight",["$filter",($filter) ->
    restrict : "E"
    template :'
    <div class="col-md-12 item-creation-well no-padding-left">
        <div class="form-group col-md-6 no-padding-right" style="margin-bottom: 10px;">
            <input name="unit" id="unit1" type="radio" class="ace" ng-model="entity.UnitMeasurement" ng-value="0" ng-required="config.DimensionWeight.UnitMeasurement.req" >
            <span class="lbl">&nbsp;{{ \'view_dw.inchLbs\' | translate }}  </span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <input name="unit" id="unit2" type="radio" class="ace" ng-model="entity.UnitMeasurement" ng-value="1" ng-required="config.DimensionWeight.UnitMeasurement.req" >
            <span class="lbl">&nbsp;{{ \'view_dw.cmKg\' | translate }} </span>
        </div>
    </div>
    <div class="col-md-12 no-padding table-responsive " style="max-height:200px;">
        <table class="table table-bordered table-striped table-condensed" style="border-bottom-width: 0px;" >
            <thead >
                <tr style="background: #fff;">
                    <th style="width: 16%;border-left-width: 0px;"></th>
                    <th style="width: 21%">{{ \'view_dw.length\' | translate }}
                    </th>
                    <th style="width: 21%">{{ \'view_dw.width\' | translate }}
                    </th>
                    <th style="width: 21%">{{ \'view_dw.height\' | translate }}
                    </th>
                    <th style="width: 21%">{{ \'view_dw.weight\' | translate }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr >
                    <td style="vertical-align: middle;">
                    {{ \'view_dw.product\' | translate }}:&nbsp;<span class="red">*&nbsp;</span>
                    </td>
                    <td>
                    <div class="form-group clearfix">
                        <div class="col-sm-12">
                            <div class="clearfix">
                                <input name="productLength"
                                  ng-show="!dataGridName"
                                  vd-number
                                  class="col-xs-12 vp-input vp-input-sm"
                                  type="text"
                                  ng-model="entity.ProductLength"
                                  ng-required="config.DimensionWeight.ProductLength.req"
                                  valid-pattern-tip="Please enter a valid integer (0.01-99999.00)."
                                  ng-pattern="config.DimensionWeight.ProductLength.pattern"/>
                            </div>
                            <validtip for="productLength" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    <span  ng-show="dataGridName">{{entity.ProductLength}}</span>
                    </td>
                    <td>
                    <div class="form-group clearfix">
                        <div class="col-sm-12">
                            <div class="clearfix">
                                <input name="productWidth"
                                  ng-show="!dataGridName"
                                  vd-number
                                  class="col-xs-12 vp-input vp-input-sm"
                                  type="text"
                                  ng-model="entity.ProductWidth"
                                  ng-required="config.DimensionWeight.ProductWidth.req"
                                  valid-pattern-tip="Please enter a valid integer (0.01-99999.00)."
                                  ng-pattern="config.DimensionWeight.ProductWidth.pattern"/>
                            </div>
                            <validtip for="productWidth" class="vp-validtip"></validtip>
                        </div>
                    </div>
                     <span  ng-show="dataGridName">{{entity.ProductWidth}}</span>
                    </td>
                    <td>
                    <div class="form-group clearfix">
                        <div class="col-sm-12">
                            <div class="clearfix">
                                <input name="productHeight"
                                  ng-show="!dataGridName"
                                  vd-number
                                  class="col-xs-12 vp-input vp-input-sm"
                                  type="text"
                                  ng-model="entity.ProductHeight"
                                  ng-required="config.DimensionWeight.ProductHeight.req"
                                  valid-pattern-tip="Please enter a valid integer (0.01-99999.00)."
                                  ng-pattern="config.DimensionWeight.ProductHeight.pattern"/>
                            </div>
                            <validtip for="productHeight" class="vp-validtip"></validtip>
                        </div>
                    </div>
                     <span  ng-show="dataGridName">{{entity.ProductHeight}}</span>
                    </td>
                    <td>
                    <div class="form-group clearfix">
                        <div class="col-sm-12">
                            <div class="clearfix">
                                <input name="productWeight"
                                  vd-number class="col-xs-12 vp-input vp-input-sm"
                                  type="text"
                                  ng-show="!dataGridName"
                                  ng-model="entity.ProductWeight"
                                  ng-required="config.DimensionWeight.ProductWeight.req"
                                  valid-pattern-tip="Please enter a valid integer (0.01-99999.00)."
                                  ng-pattern="config.DimensionWeight.ProductWeight.pattern"/>
                            </div>
                            <validtip for="productWeight" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    <span  ng-show="dataGridName">{{entity.ProductWeight}}</span>
                    </td>
                </tr>
                <tr >
                    <td style="vertical-align: middle;">
                    {{ \'view_dw.package\' | translate }}:&nbsp;<span class="red">*&nbsp;</span>
                    </td>
                    <td>
                    <div class="form-group clearfix">
                        <div class="col-sm-12">
                            <div class="clearfix">
                                <input name="packageLength"
                                  ng-show="!dataGridName"
                                  vd-number class="col-xs-12 vp-input vp-input-sm"
                                  type="text"
                                  ng-model="entity.PackageLength"
                                  ng-required="config.DimensionWeight.PackageLength.req"
                                  valid-pattern-tip="Please enter a valid integer (0.01-99999.00)."
                                  ng-pattern="config.DimensionWeight.PackageLength.pattern"/>
                            </div>
                            <validtip for="packageLength" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    <span  ng-show="dataGridName">{{entity.PackageLength}}</span>
                    </td>
                    <td>
                    <div class="form-group clearfix">
                        <div class="col-sm-12">
                            <div class="clearfix">
                                <input name="packageWidth"
                                  ng-show="!dataGridName"
                                  vd-number
                                  class="col-xs-12 vp-input vp-input-sm"
                                  type="text"
                                  ng-model="entity.PackageWidth"
                                  ng-required="config.DimensionWeight.PackageWidth.req"
                                  valid-pattern-tip="Please enter a valid integer (0.01-99999.00)."
                                  ng-pattern="config.DimensionWeight.PackageWidth.pattern"/>
                            </div>
                            <validtip for="packageWidth" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    <span  ng-show="dataGridName">{{entity.PackageWidth}}</span>
                    </td>
                    <td>
                    <div class="form-group clearfix">
                        <div class="col-sm-12">
                            <div class="clearfix">
                                <input name="packageHeight"
                                  ng-show="!dataGridName"
                                  vd-number
                                  class="col-xs-12 vp-input vp-input-sm"
                                  type="text"
                                  ng-model="entity.PackageHeight"
                                  ng-required="config.DimensionWeight.PackageHeight.req"
                                  valid-pattern-tip="Please enter a valid integer (0.01-99999.00)."
                                  ng-pattern="config.DimensionWeight.PackageHeight.pattern" />
                            </div>
                            <validtip for="packageHeight" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    <span  ng-show="dataGridName">{{entity.PackageHeight}}</span>
                    </td>
                    <td>
                    <div class="form-group clearfix">
                        <div class="col-sm-12">
                            <div class="clearfix">
                                <input name="packageWeight"
                                ng-show="!dataGridName"
                                  vd-number
                                  class="col-xs-12 vp-input vp-input-sm"
                                  type="text"
                                  ng-model="entity.PackageWeight"
                                  ng-required="config.DimensionWeight.PackageWeight.req"
                                  valid-pattern-tip="Please enter a valid integer (0.01-99999.00)."
                                  ng-pattern="config.DimensionWeight.PackageWeight.pattern"/>
                            </div>
                            <validtip for="packageWeight" class="vp-validtip"></validtip>
                        </div>
                    </div>
                    <span  ng-show="dataGridName">{{entity.PackageWeight}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    '
    link: ($scope, element, attrs) ->

])
