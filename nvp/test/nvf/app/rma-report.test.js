'use strict';
describe('controller: nvp-rma-report', function () {

    var scope;
    var rootScope;
    var ctrl;
    var filter;
    var compile;
    var currentDate;
    var pageContent;

    beforeEach(module('negServices'));  //include common
    beforeEach(module('vf-cache-apiSetting'));  //include apiSetting
    beforeEach(module('pascalprecht.translate'));  //include $translate

    beforeEach(module('vendorportal-nvf-service'));//all api service 
    beforeEach(module('nvf-catch-report-exporter'));  //include reportExporter
    beforeEach(module('nvf-api-rma-report'));  //include api

    beforeEach(module('nvp-rma-report'));
    beforeEach(module('modules/vendorportal-nvf/app/reporting/rma-report.tpl.html'));

    beforeEach(inject(function ($rootScope, $controller, _common_, $filter, _$templateCache_, _$compile_) {
        scope = $rootScope.$new();
        compile = _$compile_;
        rootScope = $rootScope;
        ctrl = $controller('RmaReportCtrl', {
            $scope: scope,
            common: _common_
        });
        filter = $filter;
        pageContent = _$templateCache_.get("modules/vendorportal-nvf/app/reporting/rma-report.tpl.html");

        currentDate = new Date();
    }));

    it('should have data grid name', function () {
        scope.dataGridName.should.be.equal('rmaReportGrid');
    });

    it('should have refresh key', function () {
        scope.refreshKey.should.be.equal('refresh.rma-report');
    });

    it('default value of exportDisabled should be true', function () {
        scope.exportDisabled.should.be.equal(true);
    });

    it('default value of rmaTotalRecords should be 0', function () {
        scope.rmaTotalRecords.should.be.equal(0);
    });
    
    it('Should have maxDate', function () {
        scope.should.have.property('maxDate');
    });
    
    it('Should have minDate', function () {
        scope.should.have.property('minDate');
    });
    
    describe('Query', function () {
        it('default KeyWordType should be "NeweggItemNumber"', function () {
            scope.query.KeyWordType.should.be.equal('NeweggItemNumber');
        });
        
        it('Should have ReportDateFrom', function () {
            scope.query.should.have.property('ReportDateFrom');
        });
        
        it('Should have ReportDateFrom', function () {
            scope.query.should.have.property('ReportDateTo');
        });
        
        it('default KeyWordType should be "NeweggItemNumber"', function () {
            scope.query.KeyWordType.should.be.equal('NeweggItemNumber');
        });

        it('Prepare Paging', function () {
            scope.preparePaging();
            scope.query.PagingInfo.should.eql({
                startpageindex: 0,
                endpageindex: 0,
                currentPage: 1,
                pageSize: 20
            });
        });
    });

    describe('Summary', function () {
        it('Should have rmaTotalRecords', function () {
            scope.should.have.property('rmaTotalRecords');
        });

        it('default value of rmaTotalRecords should be 0', function () {
            scope.rmaTotalRecords.should.be.equal(0);
        });
    });

    describe('Validator', function () {
        it('MaxLength of ItemNumber should be 25', function () {
            var maxLength = scope.getMaxLength('NeweggItemNumber');

            maxLength.should.be.equal(25);
        });

        it('MaxLength of ManufacturePartNumber should be 40', function () {
            var maxLength = scope.getMaxLength('ManufacturePartNumber');

            maxLength.should.be.equal(40);
        });
    });

    describe('IsDateValid', function () {
        it('StartDate should not be null', function () {
            var result = scope.isDateValid(null, '2015-07-15');

            result.should.be.equal(false);
        });
            
        it('StartDate should not be empty', function () {
            var result = scope.isDateValid('', '2015-07-15');

            result.should.be.equal(false);
        });
            
        it('EndDate should not be null', function () {
            var result = scope.isDateValid('2015-07-15', null);

            result.should.be.equal(false);
        });
            
        it('EndDate should not be empty', function () {
            var result = scope.isDateValid('2015-07-15', '');

            result.should.be.equal(false);
        });
    });
        
    describe('IsDateOutOfRange', function () {
            
        it('StartDate should not be less than MinDate', function () {
            var startDate = new Date(currentDate.getFullYear() - 2, 11, 31);
            var result = scope.isDateOutOfRange(startDate, currentDate);
            result.should.be.equal(true);
        });
        it('StartDate should not be large than MaxDate', function () {
            var startDate = angular.copy(currentDate).setMonth(currentDate.getMonth() + 1);
            var result = scope.isDateOutOfRange(startDate, currentDate);
            result.should.be.equal(true);
        });
            
        it('EndDate should not be less than MinDate', function () {
            var endDate = angular.copy(currentDate).setMonth(currentDate.getMonth() +1);
            var result = scope.isDateOutOfRange(currentDate, endDate);
            result.should.be.equal(true);
        });
            
        it('EndDate should not be less than MinDate', function () {
            var endDate = angular.copy(currentDate).setMonth(currentDate.getMonth() + 1);
            var result = scope.isDateOutOfRange(currentDate, endDate);
            result.should.be.equal(true);
        });
            
        it('StartDate and EndDate should be in range', function () {
            var startDate = angular.copy(currentDate).setMonth(currentDate.getMonth - 1);
            var endDate = angular.copy(currentDate).setMonth(currentDate.getMonth - 1);
            var result = scope.isDateOutOfRange(startDate, endDate);

            result.should.be.equal(false);
        });
    });

    describe('Normal function', function () {

        it('Get Request Item', function () {
            var item = scope.getRequestItem('query');
            var startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            var endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
            item.should.eql(
                {
                    KeyWordType: 'NeweggItemNumber',
                    ReportDateFrom: filter('date')(startDate, 'yyyy-MM-dd'),
                    ReportDateTo: filter('date')(endDate, 'yyyy-MM-dd'),
                    action1: 'query',
                    PagingInfo: {
                        startpageindex: 0,
                        endpageindex: 0,
                        currentPage: 1,
                        pageSize: 20
                    },
                    vendorNumber: undefined
                });
        });

    });

    describe('DataGrid Fields', function () {

        it('DataGrid length should be 8', function () {
            scope.gridData.columns.length.should.be.equal(8);
        });

        it('DataGrid fields should be right', function () {
            scope.gridData.columns.should.be.include({
                field: "CategoryName",
                width: "100px",
                title: "Category",
                sortfield:"CategoryName",
                headerTemplate: "Category",
                //template: kendo.template($("#tpl_rmaList_category").html())
            });
            scope.gridData.columns.should.be.include({
                field: "ItemNumber",
                width: "100px",
                title: "Item #",
                sortfield:"ItemNumber",
                headerTemplate: "Item #",
                //#template: kendo.template($("#tpl_rmaList_itemnumber").html())
            });
            scope.gridData.columns.should.be.include({
                field: "ItemDescription",
                title: "Item Description",
                width: "180px",
                sortfield:"ItemDescription",
                headerTemplate: "Item Description",
                //#template: kendo.template($("#tpl_rmaList_description").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ManufacturerPartNumber",
                width: "150px",
                title: "Mfr. Part #",
                sortfield:"ManufacturerPartNumber",
                headerTemplate: "Mfr. Part #",
                //#template: kendo.template($("#tpl_rmaList_manufacturerpartnumber").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ReturnAmount",
                width: "80px",
                title: "Return Amt",
                sortfield:"ReturnAmount",
                headerTemplate: "Return Amt",
                //#template: kendo.template($("#tpl_rmaList_returnamount").html())
                type: "number",
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ReturnAmountRate",
                width: "100px",
                title: "Return Amt %",
                sortfield:"ReturnAmountRate",
                headerTemplate: "Return Amt %",
                //#template: kendo.template($("#tpl_rmaList_returnamountrate").html())
                type: "number",
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ReturnQuantity",
                width: "80px",
                title: "Return Qty",
                sortfield:"ReturnQuantity",
                headerTemplate: "Return Qty",
                //#template: kendo.template($("#tpl_rmaList_returnqty").html())
                type: "number",
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ReturnQuantityRate",
                width: "100px",
                title: "Return Qty %",
                sortfield:"ReturnQuantityRate",
                headerTemplate: "Return Qty %",
                //#template: kendo.template($("#tpl_rmaList_returnqtyrate").html())
                type: "number",
                sortable: false
            });
        });
    });

    describe('Date Grid View', function () {
        it('Should have all fields', function () {
            var reg = /<script.*?id=.*?type=\"text\/x-kendo-tmpl\".*?>([\s\S]*?)<\/script.*?>/gm;

            var fields = [];
            var result;
            while ((result = reg.exec(pageContent)) != null) {
                fields.push(result[1].trim());
            }
            fields.length.should.be.equal(8);
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.CategoryName}}">{{dataItem.CategoryName}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ItemNumber}}">{{dataItem.ItemNumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ItemDescription}}">{{dataItem.ItemDescription}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ManufacturerPartNumber}}">{{dataItem.ManufacturerPartNumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-right"><span>$</span><span title="{{dataItem.ReturnAmount}}">{{dataItem.ReturnAmount | vfCurrency:\'\'}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-right"><span title="{{dataItem.ReturnAmountRate}}">{{dataItem.ReturnAmountRate * 100 | vfPercent: \'\'}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-right"><span title="{{dataItem.ReturnQuantity}}">{{dataItem.ReturnQuantity| number: 0}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-right"><span title="{{dataItem.ReturnQuantityRate}}">{{dataItem.ReturnQuantityRate * 100 | vfPercent: \'\'}}</span></div>');
            
            //var element = compile(angular.element(scriptElement))(rootScope);
        });
    });
});