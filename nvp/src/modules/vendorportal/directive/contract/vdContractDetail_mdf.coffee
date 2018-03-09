angular.module("vdContractDetailMdf", ['ngSanitize'])

.directive('vdContractDetailMdf',["common","$filter",(common,$filter) ->
  restrict: 'E'
  template: '<vd-panelbar is-show="isShowDetail1_mdf" translatetitle="General Information" padding-left="20" font="13">General Information</vd-panelbar>
            <div class="col-xs-12 no-padding-left" ng-hide="isShowDetail1_mdf==false">
                <div class="col-xs-12 ">
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label ">Vendor Name:</label>
                        <div class="col-md-7 no-padding-left">
                            <input type="text" class="form-control vp-input"
                                ng-model="detailEntity.VendorName"
                                disabled />
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label">Date:</label>
                        <div class="col-md-7 no-padding-left">
                            <div class="input-group">
                                <input class="form-control date-picker"
                                    type="text"
                                    value="{{detailEntity.ContractDate | moment:\'MM/DD/YYYY\'}}"
                                    disabled>
                                <span class="input-group-addon">
                                    <i class="icon-calendar bigger-110"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label">Company:</label>
                        <div class="col-md-7 no-padding-left">
                            <input type="text" class="form-control vp-input"
                                ng-model="detailEntity.companyDesc"
                                disabled />
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label ">Vendor#:</label>
                        <div class="col-md-7 no-padding-left">
                            <input type="text" class="form-control vp-input"
                                ng-model="detailEntity.VendorNumber"
                                disabled />
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label">Expiration Date:</label>
                        <div class="col-md-7 no-padding-left">
                            <div class="input-group">
                                <input class="form-control date-picker"
                                    type="text"
                                    value="{{detailEntity.ExpiratationDate | moment:\'MM/DD/YYYY\'}}"
                                    disabled>
                                <span class="input-group-addon">
                                    <i class="icon-calendar bigger-110"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label ">Credit To:</label>
                        <div class="col-md-7 no-padding-left">
                            <input type="text" class="form-control vp-input"
                                ng-model="detailEntity.CreditToUserName"
                                disabled />
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label ">Vendor Program#:</label>
                        <div class="col-md-7 no-padding-left">
                            <input type="text" class="form-control vp-input"
                                ng-model="detailEntity.VendorProgramNumber"
                                title="{{detailEntity.VendorProgramNumber}}"
                                disabled />
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label ">Phone:</label>
                        <div class="col-md-7 no-padding-left">
                            <input type="text" class="form-control vp-input"
                                ng-model="detailEntity.PhoneNumber"
                                title="{{detailEntity.PhoneNumber}}"
                                disabled />
                        </div>
                    </div>
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label ">Fax#:</label>
                        <div class="col-md-7 no-padding-left">
                            <input type="text" class="form-control vp-input"
                                ng-model="detailEntity.Fax"
                                title="{{detailEntity.Fax}}"
                                disabled />
                        </div>
                    </div>

                </div>
                <div class="col-xs-12">
                    <div class="form-group col-md-4">
                        <label class="col-md-5 control-label no-padding-right">Program Description:</label>
                        <div class="col-md-7 no-padding-left">
                            <textarea class="form-control vp-input"
                                ng-model="detailEntity.ContractDescription"
                                title="{{ detailEntity.ContractDescription }}"
                                disabled></textarea>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ************** Check each as appropriate ***************** -->
            <vd-panelbar is-show="isShowDetail2_mdf" translatetitle="Check each as appropriate" padding-left="20" font="13">Check each as appropriate</vd-panelbar>
            <div class="col-xs-12 no-padding-left" ng-hide="isShowDetail2_mdf==false">
                <div class="col-xs-12">
                    <div class="form-group col-md-6">
                        <label class="col-md-3 control-label no-padding">VF Included:</label>
                        <div class="col-md-9 no-padding-left">
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="VFInclude_mdf" ng-model="detailEntity.ContractRebateInfo.VFInclude" ng-value="true" disabled>
                                        Yes
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="VFInclude_mdf" ng-model="detailEntity.ContractRebateInfo.VFInclude" ng-value="false" disabled>
                                        No
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="form-group col-md-6 no-padding">
                        <label class="col-md-3 control-label no-padding">Region/Unit:</label>
                        <div class="col-md-9 no-padding-left">
                            <label class="col-md-4 no-padding">
                                <div class="checkbox disabled">
                                    <label>
                                        <input type="checkbox"  ng-model="detailEntity.hasUSA" ng-value="USA" disabled>
                                        Newegg USA
                                    </label>
                                </div>
                            </label>
                            <label class="col-md-4 no-padding">
                                <div class="checkbox disabled">
                                    <label>
                                        <input type="checkbox"  ng-model="detailEntity.hasCAN" ng-value="CAN" disabled>
                                        Newegg Canada
                                    </label>
                                </div>
                            </label>
                            <label class="col-md-4 no-padding">
                                <div class="checkbox disabled">
                                    <label>
                                        <input type="checkbox"  ng-model="detailEntity.hasUSB" ng-value="USB" disabled>
                                        B2B Newegg USA
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group col-md-6">
                        <label class="col-md-3 control-label no-padding">Payment:</label>
                        <div class="col-md-9 no-padding-left">
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PayMethod_mdf" ng-model="detailEntity.ContractRebateInfo.PayMethod" ng-value="\'M\'" disabled>
                                        Credit
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PayMethod_mdf" ng-model="detailEntity.ContractRebateInfo.PayMethod" ng-value="\'C\'" disabled>
                                        Check
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PayMethod_mdf" ng-model="detailEntity.ContractRebateInfo.PayMethod" ng-value="\'D\'" disabled>
                                        DFI
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="form-group col-md-6 no-padding">
                        <label class="col-md-3 control-label no-padding">Billing Cycle:</label>
                        <div class="col-md-9 no-padding-left">
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="BillingCycle_mdf" ng-model="detailEntity.ContractRebateInfo.BillingCycle" ng-value="011" disabled>
                                        Random
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="BillingCycle_mdf" ng-model="detailEntity.ContractRebateInfo.BillingCycle" ng-value="004" disabled>
                                        Quarterly
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="BillingCycle_mdf" ng-model="detailEntity.ContractRebateInfo.BillingCycle" ng-value="003" disabled>
                                        Monthly
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
				<div class="col-xs-12" ng-show="detailEntity.EIMSTypeDescription == \'COOP\'">
                    <div class="form-group col-md-6">
                        <label class="col-md-3 control-label no-padding">GrossNet Type:</label>
                        <div class="col-md-9 no-padding-left">
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="GrossNetType_mdf" ng-model="detailEntity.ContractRebateInfo.GrossNetType" ng-value="\'G\'" disabled>
                                        Gross
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="GrossNetType_mdf" ng-model="detailEntity.ContractRebateInfo.GrossNetType" ng-value="\'N\'" disabled>
                                        Net
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="form-group col-md-6 no-padding">
                        <label class="col-md-3 control-label no-padding">Rebate Scheme Type:</label>
                        <div class="col-md-9 no-padding-left">
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="RebateType_mdf" ng-model="detailEntity.ContractRebateInfo.SchemeType" ng-value="\'N\'" disabled>
                                        Normal
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="RebateType_mdf" ng-model="detailEntity.ContractRebateInfo.SchemeType" ng-value="\'S\'" disabled>
                                        Segment
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="RebateType_mdf" ng-model="detailEntity.ContractRebateInfo.SchemeType" ng-value="\'T\'" disabled>
                                        Tiered
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group col-md-6">
                        <label class="col-md-3 control-label no-padding">POP/POS Required:</label>
                        <div class="col-md-9 no-padding-left">
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PopAndPosRequired_mdf" ng-model="detailEntity.ContractRebateInfo.PopAndPosRequired" ng-value="true" disabled>
                                        Yes
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-3 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PopAndPosRequired_mdf" ng-model="detailEntity.ContractRebateInfo.PopAndPosRequired" ng-value="false" disabled>
                                        No
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group col-md-6">
                        <label class="col-md-3 control-label no-padding">POP/POS Base On:</label>
                        <div class="col-md-9 no-padding-left">
                            <label class="col-md-5  no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PopAndPosBaseOn_mdf" ng-model="detailEntity.ContractRebateInfo.PopAndPosBaseOn" ng-value="\'S\'" disabled>
                                        Sells-Thru Data Only
                                    </label>
                                </div>
                            </label>
                            <label class="col-md-7 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PopAndPosBaseOn_mdf" ng-model="detailEntity.ContractRebateInfo.PopAndPosBaseOn" ng-value="\'B\'" disabled>
                                        Sells-Thru + BackOrder Data Only
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="col-md-9 no-padding-left">
                            <label class="col-xs-6 col-md-4 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PopAndPosBaseOn_mdf" ng-model="detailEntity.ContractRebateInfo.PopAndPosBaseOn" ng-value="\'P\'" disabled>
                                        Purchase Data
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-6 col-md-4 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PopAndPosBaseOn_mdf" ng-model="detailEntity.ContractRebateInfo.PopAndPosBaseOn" ng-value="\'I\'" disabled>
                                        Invoice Data
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-6 col-md-4 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="PopAndPosBaseOn_mdf" ng-model="detailEntity.ContractRebateInfo.PopAndPosBaseOn" ng-value="\'O\'" disabled>
                                        Other
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-xs-12">
                    <div class="form-group col-md-6">
                        <label class="col-md-3 control-label no-padding">Contract Based On:</label>
                        <div class="col-md-9 no-padding-left">
                            <label class="col-md-5  no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="ContractBaseOnType_mdf" ng-model="detailEntity.ContractRebateInfo.BaseOnType" ng-value="001" disabled>
                                        Purchase Amount
                                    </label>
                                </div>
                            </label>
                            <label class="col-md-7 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="ContractBaseOnType_mdf" ng-model="detailEntity.ContractRebateInfo.BaseOnType" ng-value="003" disabled>
                                        Sales Amt
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-6 col-md-4 no-padding" ng-show="detailEntity.EIMSType==\'003\'">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="ContractBaseOnType_mdf" ng-model="detailEntity.ContractRebateInfo.BaseOnType" ng-value="004" disabled>
                                        Sales Qty
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                    <div class="form-group col-md-6">
                        <div class="col-md-9 no-padding-left">
                            <label class="col-xs-6 col-md-4 no-padding">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="ContractBaseOnType_mdf" ng-model="detailEntity.ContractRebateInfo.BaseOnType" ng-value="013" disabled>
                                        Custom Distribution
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-6 col-md-4 no-padding" ng-show="detailEntity.EIMSType==\'003\'">
                                <div class="radio disabled">
                                    <label>
                                        <input type="radio" name="ContractBaseOnType_mdf" ng-model="detailEntity.ContractRebateInfo.BaseOnType" ng-value="018" disabled>
                                        COGS
                                    </label>
                                </div>
                            </label>
                            <label class="col-xs-6 col-md-4 no-padding" ng-show="detailEntity.EIMSType==\'003\'">
                                <div class="radio disabled">
                                    <label ng-show="detailEntity.EIMSType!=\'011\'">
                                        <input type="radio" name="ContractBaseOnType_mdf" ng-model="detailEntity.ContractRebateInfo.BaseOnType" ng-value="002" disabled>
                                        Purchase Qty
                                    </label>
                                    <label ng-show="detailEntity.EIMSType==\'011\'">
                                        <input type="radio" name="ContractBaseOnType_mdf" ng-model="detailEntity.ContractRebateInfo.BaseOnType" ng-value="017" disabled>
                                        Purchase Qty
                                    </label>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-lg-12">
                    <div class="col-md-12">
                        <div class="col-xs-12 table-title text-center">Marketing Schedule</div>
                        <table class="table table-bordered table-all-border" ng-repeat="ct in detailEntity.ContractItemList.ContractItems">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>Description</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Unit Price</th>
                                    <th>Ext.Price(USD)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td >WEB (Location):</td>
                                    <td title="{{ct.WebLocation}}"
                                    class="mdf-detail-schedule-table"
                                    >{{ ct.WebLocation }}</td>
                                    <td rowspan="9">{{ ct.StartDate | moment:\'MM/DD/YYYY\' }}</td>
                                    <td rowspan="9">{{ ct.EndDate | moment:\'MM/DD/YYYY\' }}</td>
                                    <td rowspan="9">{{ ct.UnitPrice | vfCurrency:"$" }}</td>
                                    <td rowspan="9">{{ ct.ExtendPrice | vfCurrency:"$" }}</td>
                                </tr>
                                <tr>
                                    <td>Banner Type:</td>
                                    <td>{{ ct.BannerTypeDescription }}</td>
                                </tr>
                                <tr>
                                    <td>Links To:</td>
                                    <td>{{ ct.LinkToDescription }}</td>
                                </tr>
                                <tr>
                                    <td>Category (ies):</td>
                                    <td>{{ ct.DisplayCategory }}</td>
                                </tr>
                                <tr>
                                    <td>Subcategory (ies):</td>
                                    <td>{{ ct.DisplaySubcategory }}</td>
                                </tr>
                                <tr>
                                    <td>Marketing Activity:</td>
                                    <td>{{ ct.ActivityDescription }}</td>
                                </tr>
                                <tr>
                                    <td>Manufacturer:</td>
                                    <td>{{ ct.Manufacturer }}</td>
                                </tr>
                                <tr>
                                    <td>SKU #:</td>
                                    <td>{{ ct.DisplayItemNumbers }}</td>
                                </tr>
                                <tr>
                                    <td>NOTES:</td>
                                    <td class="mdf-detail-schedule-table"
                                       title="{{ct.Note}}"
                                    >{{ ct.Note }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="col-lg-12 mt-5 mb-10">
                    <div class="col-md-12 no-padding">
                        <div class="col-md-4">
                            <div class="input-group">
                                <span class="input-group-addon" id="basic-addon1">Reason for Adjustment</span>
                                <input type="text" class="form-control" title="{{ detailEntity.ContractRebateInfo.AdjustReason }}" value="{{ detailEntity.ContractRebateInfo.AdjustReason }}" disabled>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="col-md-3 no-padding">
                                <div class="input-group">
                                    <span class="input-group-addon" id="Span1">Subtotal</span>
                                    <input type="text" class="form-control" value="{{ detailEntity.ContractRebateInfo.SubTotalAmt | vfCurrency:\'$\' }}" disabled>
                                </div>
                            </div>
                            <div class="col-md-1 text-center mt-5"><i class="icon icon-plus"></i></div>
                            <div class="col-md-4 no-padding">
                                <div class="input-group">
                                    <span class="input-group-addon" id="Span2">Adjustments</span>
                                    <input type="text" class="form-control" value="{{ detailEntity.ContractRebateInfo.AdjustAmt | vfCurrency:\'$\' }}" disabled>
                                </div>
                            </div>
                            <div class="col-md-1 text-center mt-5"><b class="bigger-130">=</b></div>
                            <div class="col-md-3 no-padding">
                                <div class="input-group">
                                    <span class="input-group-addon" id="Span3">Grand Total</span>
                                    <input title="{{ detailEntity.ContractRebateInfo.GrandTotal | vfCurrency:\'$\' }}" type="text" class="form-control" value="{{ detailEntity.ContractRebateInfo.GrandTotal | vfCurrency:\'$\' }}" disabled>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ************** Relate Program ***************** -->
            <vd-panelbar is-show="isShowDetail3_mdf" translatetitle="Relate Program" padding-left="20" font="13">Relate Program</vd-panelbar>
            <div class="col-xs-12 no-padding-left mb-10" ng-hide="isShowDetail3_mdf==false">
                <div class="col-lg-12">
                    <div class="col-md-12">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Request#</th>
                                    <th>Program#</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr ng-repeat="item in detailEntity.ContractAndRuleRequestMappingList.ContractAndRuleRequestMappings">
                                    <td>{{ item.RuleRequestNumber }}</td>
                                    <td>{{ item.ProgramNumber }}</td>
                                    <td>{{ item.OriginStartDate | moment:\'MM/DD/YYYY\'}}</td>
                                    <td>{{ item.OriginEndDate | moment:\'MM/DD/YYYY\' }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <!-- ************** Marketing Development Funds Agreement ***************** -->
            <vd-panelbar is-show="isShowDetail4_mdf" translatetitle="Marketing Development Funds Agreement" padding-left="20" font="13">Marketing Development Funds Agreement</vd-panelbar>
            <div class="col-xs-12" ng-hide="isShowDetail4_mdf==false">
                <div class="col-lg-12">
                    <p>
                        <r>This </r>
                        <b>
                            <r>Marketing Development Funds Agreement</r>
                        </b>
                        <r> (henceforth "Agreement") is entered into by and between Magnell Associate, Inc. dba Newegg.com, including its subsidiaries andaffiliates (collectively, "Newegg.com") and Vendor indicated above and is made effective as of the date noted above.</r>
                    </p>
                    <p>
                        <b>
                            <r>Program&amp;Payment.</r>
                        </b>
                        <r>  Vendor will pay Newegg.com the Marketing Development Funds ("MDF"), which includes Cooperative Funds ("COOP"), described in the Marketing Schedule above for participating in or conducting marketing programs approved by Newegg.com for the indicated effective dates.</r>
                    </p>
                    <p>
                        <b>
                            <r>Marketing Development Funds.</r>
                        </b>
                        <r>  Vendor will remit to Newegg.com the amount(s) set forth in the Marketing Schedule above for marketing activities/programs to be agreed upon by Vendor and Newegg.com.  Vendor reserves the right to cancel its participation/funding in any of these programs at any time at Vendor\'s sole discretion by providing thirty (30) days advance written notice to Newegg.com. MDF Funds will be invoiced upon completion of marketing activity and/or after the specified date per the marketing Schedule.</r>
                    </p>
                    <p>
                        <b>
                            <r>Payment Conditions.</r>
                        </b>
                        <r>  Once an advertising or promotional activity has been completed, Newegg.com will submit documentation of proof of performance ("POP") within sixty (60) days along with an invoice for the PPF amount, itemized by each activity, as listed in the Promotion Schedule above, unless it is indicated above that it is not required. POP may consist of screen shots, hard copies, descriptions of activity, etc.</r>
                    </p>
                    <p>
                        <b>
                            <r>Payment.</r>
                        </b>
                        <r>  Upon receipt and verification that the documentation is correct, Vendor will credit or issue a check to Newegg.com in the amount of the PPF submission with in thirty( 30) days after receipt. Newegg.com only accepts company checks, credit memos and DFI payment methods. Vendor\'s reimbursement of Newegg.com will not be dependent up on Vendor\'s receipt of or credit for marketing funds from any third party.</r>
                    </p>
                    <p>
                        <b>
                            <r>Set-Off.</r>
                        </b>
                        <r>  In the event payment is not made by Vendor within thirty (30) days after receipt of the Newegg.com PPF invoice, in addition to any other legal remedies, Newegg.com has the right to apply PPF credits against any and all amounts due to Vendor.</r>
                    </p>
                    <p>
                        <b>
                            <r>How to Pay.</r>
                        </b>
                        <r>  Vendor must pay PPF to Newegg.com by the payment method indicated above: Checks should be made payable to "Magnell Associate Inc." and mailed to: Magnell Associate Inc. Accounts Receivable Department, 16839 E. Gale Avenue, City of Industry, CA 91745.</r>
                    </p>
                    <p>
                        <b>
                            <r>General.</r>
                        </b>
                        <r>  This Agreement, including any schedules, attachments and exhibits attached hereto and hereby incorporated into this Agreement in their entirety, constitutes the entire agreement between the parties regarding the Promotion(s) referenced herein and supersedes all prior agreements and understandings, both written and oral, between the parties with respect to such Promotion(s). Any changes to this Agreement must be made in writing and signed by both parties.  To the extent any terms or conditions of this Agreement conflict with the terms of any previously executed Promoitional Funds Agreement between the parties, the terms of this Agreement will control and will be deemed an amendment, but only to the extent of any such conflict, and only with respect to the subject matter herein.  Legal notices are effective upon delivery to the addresses shown in the preamble above.  This Agreement shall be governed by and construed in accordance with the laws of the State of California, exclusive of choice of law rules and the parties agree to submit exclusively to the personal jurisdiction of the applicable Federal or State court in Los Angeles County, California.</r>
                    </p>
                </div>
            </div>'
  link: ($scope, element, attrs) ->
    
])