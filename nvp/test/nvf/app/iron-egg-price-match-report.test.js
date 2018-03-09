'use strict';
describe('controller: nvp-whs-receiving-violation-report', function () {

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
    beforeEach(module('nvf-api-iron-egg-price-report'));  //include api

    beforeEach(module('nvp-iron-egg-price-match-report'));
    beforeEach(module('modules/vendorportal-nvf/app/reporting/iron-egg-price-match-report.tpl.html'));

    beforeEach(inject(function ($rootScope, $controller, _common_, $filter, _$templateCache_, _$compile_) {
        scope = $rootScope.$new();
        compile = _$compile_;
        rootScope = $rootScope;
        ctrl = $controller('IronEggPriceMatchReportCtrl', {
            $scope: scope,
            common: _common_
        });
        filter = $filter;
        pageContent = _$templateCache_.get("modules/vendorportal-nvf/app/reporting/iron-egg-price-match-report.tpl.html");

        currentDate = new Date();
    }));

    it('should have data grid name', function () {
        scope.dataGridName.should.be.equal('ironEggPriceMatchReportGrid');
    });

    it('should have refresh key', function () {
        scope.refreshKey.should.be.equal("refresh.iron-egg-price-match-report");
    });
    
    it('default value of exportDisabled should be true', function () {
        scope.exportDisabled.should.be.equal(true);
    });

    it('default value of totalRecords should be 0', function () {
        scope.totalRecords.should.be.equal(0);
    });
    
    describe('Summary', function () {
        it('Should have totalCredit', function () {
            scope.should.have.property('totalCredit');
        });

        it('default value of totalCredit should be 0', function () {
            scope.totalCredit.should.be.equal(0);
        });
    });

    describe('Query', function () {

        it('Prepare Paging', function () {
            scope.preparePaging();
            scope.query.PagingInfo.should.eql({
                startpageindex: 0,
                endpageindex: 0,
                currentPage: 1,
                pageSize: 20
            });
        });

        it('Should have InvoiceDateFrom property', function () {
            scope.query.should.have.property('InvoiceDateFrom');
        });

        it('Should have InvoiceDateTo property', function () {
            scope.query.should.have.property('InvoiceDateTo');
        });

        it('default InvoiceDateFrom should be the first day of current month', function () {
            scope.query.InvoiceDateFrom.should.be.equal(filter('date')(angular.copy(currentDate).setDate(1), 'yyyy-MM-dd'));
        });

        it('default InvoiceDateTo should be the current date', function () {
            scope.query.InvoiceDateTo.should.be.equal(filter('date')(scope.currentDate, 'yyyy-MM-dd'));
        });
    });

    describe('Validator', function () {

        it('Min date should be right', function () {
            var minDate = scope.getMinDate();

            minDate.getFullYear().should.be.equal(currentDate.getFullYear() - 1);
            minDate.getMonth().should.be.equal(currentDate.getMonth());
            minDate.getDate().should.be.equal(1);
        });

        it('Max date should be right', function () {
            var maxDate = scope.getMaxDate();

            maxDate.getFullYear().should.be.equal(currentDate.getFullYear());
            maxDate.getMonth().should.be.equal(currentDate.getMonth());
            maxDate.getDate().should.be.equal(currentDate.getDate());
        });
    });

    describe('Normal function', function () {

        it('Get Request Item', function () {
            var item = scope.getRequestItem('query');

            item.should.eql(
                {
                    InvoiceDateTo: filter('date')(scope.currentDate, 'yyyy-MM-dd'),
                    InvoiceDateFrom: filter('date')(angular.copy(currentDate).setDate(1), 'yyyy-MM-dd'),
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
                var startDate = angular.copy(currentDate).setMonth(currentDate.getMonth() - 12);
                var result = scope.isDateOutOfRange(startDate, currentDate);
                result.should.be.equal(true);
            });
            it('StartDate should not be large than MaxDate', function () {
                var startDate = angular.copy(currentDate).setMonth(currentDate.getMonth() + 1);
                var result = scope.isDateOutOfRange(startDate, currentDate);
                result.should.be.equal(true);
            });

            it('EndDate should not be less than MinDate', function () {
                var endDate = angular.copy(currentDate).setMonth(currentDate.getMonth() - 12);
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
    });

    describe('DataGrid Fields', function () {

        it('DataGrid length should be 10', function () {
            scope.gridData.columns.length.should.be.equal(10);
        });

        it('DataGrid fields should be right', function () {
            scope.gridData.columns.should.be.include({
                field: "InvoiceDate",
                title: "Issue Date",
                width: "160px",
                sortfield:"InvoiceDate",
                headerTemplate: "Issue Date",
                type: "date",
                format: "{0:MM/dd/yyyy h:mm:ss tt}"
            });
            scope.gridData.columns.should.be.include({
                field: "CustomerNumber",
                width: "120px",
                title: "Customer #",
                sortfield:"CustomerNumber",
                headerTemplate: "Customer #",
                //#template: kendo.template($("#tpl_eggPriceMatchList_customernumber").html())
            });
            scope.gridData.columns.should.be.include({
                field: "OrderNumber",
                width: "100px",
                title: "Order #",
                sortfield:"OrderNumber",
                headerTemplate: "Order #",
                //#template: kendo.template($("#tpl_eggPriceMatchList_ordernumber").html())
            });
            scope.gridData.columns.should.be.include({
                field: "ItemNumber",
                width: "100px",
                title: "Item #",
                sortfield:"ItemNumber",
                headerTemplate: "Item #",
                //#template: kendo.template($("#tpl_eggPriceMatchList_itemnumber").html())
            });
            scope.gridData.columns.should.be.include({
                field: "ItemDescription",
                width: "150px",
                title: "ItemDescription",
                sortfield:"ItemDescription",
                headerTemplate: "Item Description",
                //#template: kendo.template($("#tpl_eggPriceMatchList_itemdescription").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ItemModel",
                width: "100px",
                title: "Model #",
                sortfield:"ItemModel",
                headerTemplate: "Model #",
                //#template: kendo.template($("#tpl_eggPriceMatchList_modelnumber").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ManufacturerName",
                width: "100px",
                title: "Brand",
                sortfield:"ManufacturerCode",
                headerTemplate: "Brand",
                //#template: kendo.template($("#tpl_eggPriceMatchList_brand").html())
            });
            scope.gridData.columns.should.be.include({
                field: "CategoryName",
                width: "100px",
                title: "Item #",
                sortfield:"CategoryName",
                headerTemplate: "Category",
                //#template: kendo.template($("#tpl_eggPriceMatchList_category").html())
            });
            scope.gridData.columns.should.be.include({
                field: "SellingPrice",
                width: "100px",
                title: "Selling Price",
                sortfield:"SellingPrice",
                headerTemplate: "Selling Price",
                //#template: kendo.template($("#tpl_eggPriceMatchList_sellingprice").html())
                type: 'number',
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "CreditAmount",
                width: "120px",
                title: "Iron Egg Credit",
                sortfield:"CreditAmount",
                headerTemplate: "Iron Egg Credit",
                //#template: kendo.template($("#tpl_eggPriceMatchList_ironeggcredit").html())
                sortable: false
            });
        });
    });

    describe('Date Grid View', function () {
        it('Should have xxx', function () {
            var reg = /<script.*?id=.*?type=\"text\/x-kendo-tmpl\".*?>([\s\S]*?)<\/script.*?>/gm;//new RegExp('<script.*?id=.*?type=\"text\/x-kendo-tmpl\">([\s\S]*?)<\/script>','gm');

            var fields = [];
            var result;
            while ((result = reg.exec(pageContent)) != null) {
                fields.push(result[1].trim());
            }
            fields.length.should.be.equal(9);
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.CategoryName}}">{{dataItem.CategoryName}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.CustomerNumber}}">{{dataItem.CustomerNumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.OrderNumber}}">{{dataItem.OrderNumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ItemNumber}}">{{dataItem.ItemNumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ItemDescription}}">{{dataItem.ItemDescription}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ItemModel}}">{{dataItem.ItemModel}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ManufacturerName}}">{{dataItem.ManufacturerName}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-right"><span>$</span><span title="{{dataItem.SellingPrice}}">{{dataItem.SellingPrice | vfCurrency:""}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-right"><span>$</span><span title="{{dataItem.CreditAmount}}">{{dataItem.CreditAmount | vfCurrency:""}}</span></div>');

            //var element = compile(angular.element(scriptElement))(rootScope);
        });
    });
});