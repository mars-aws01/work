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
    beforeEach(module('nvf-api-whs-receiving-violation'));  //include api
    
    beforeEach(module('nvp-whs-receiving-violation-report'));
    beforeEach(module('modules/vendorportal-nvf/app/reporting/whs-receiving-violation-report.tpl.html'));
    
    beforeEach(inject(function ($rootScope, $controller, _common_, $filter, _$templateCache_, _$compile_) {
        scope = $rootScope.$new();
        compile = _$compile_;
        rootScope = $rootScope;
        ctrl = $controller('WhsReceivingViolationReportCtrl', {
            $scope: scope,
            common: _common_
        });
        filter = $filter;
        pageContent = _$templateCache_.get("modules/vendorportal-nvf/app/reporting/whs-receiving-violation-report.tpl.html");
        
        currentDate = new Date();
    }));
    
    it('should have data grid name', function () {
        scope.dataGridName.should.be.equal('receivingViolationReportGrid');
    });

    it('should have refresh key', function () {
        scope.refreshKey.should.be.equal('refresh.receiving-violation-report');
    });
    
    it('default value of exportDisabled should be true', function () {
        scope.exportDisabled.should.be.equal(true);
    });

    it('default value of totalRecords should be 0', function () {
        scope.totalRecords.should.be.equal(0);
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

        it('Should have ReceivingStartDate property', function () {
            scope.query.should.have.property('ReceivingStartDate');
        });
        
        it('Should have ReceivingEndDate property', function () {
            scope.query.should.have.property('ReceivingEndDate');
        });
        
        it('default StartDate should be the first day of current month', function () {
            scope.query.ReceivingStartDate.should.be.equal(filter('date')(angular.copy(currentDate).setDate(1), 'yyyy-MM-dd'));
        });

        it('default EndDate should be the current date', function () {
            scope.query.ReceivingEndDate.should.be.equal(filter('date')(scope.currentDate, 'yyyy-MM-dd'));
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
                    ReceivingEndDate: filter('date')(scope.currentDate, 'yyyy-MM-dd'),
                    ReceivingStartDate: filter('date')(angular.copy(currentDate).setDate(1), 'yyyy-MM-dd'),
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

        it('DataGrid length should be 7', function () {
            scope.gridData.columns.length.should.be.equal(7);
        });

        it('DataGrid fields should be right', function () {
            scope.gridData.columns.should.be.include({
                field: "CategoryName",
                width: "100px",
                title: "Category",
                sortfield:"CategoryName",
                headerTemplate: "Category"
            });
            scope.gridData.columns.should.be.include({
                field: "BuyerName",
                title: "Buyer",
                width: "100px",
                sortfield:"BuyerName",
                headerTemplate: "Buyer",
                //template: kendo.template($("#tpl_receivingViolationList_buyer").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "WarehouseNumber",
                width: "100px",
                title: "WH",
                sortfield:"WarehouseNumber",
                headerTemplate: "WH",
                //#template: kendo.template($("#tpl_receivingViolationList_warehouse").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "PONumber",
                width: "100px",
                title: "PO #",
                sortfield:"PONumber",
                headerTemplate: "PO #",
                //#template: kendo.template($("#tpl_receivingViolationList_ponumber").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ReceivingDate",
                width: "160px",
                title: "Receiving Date",
                sortfield:"ReceivingDate",
                headerTemplate: "Receiving Date",
                type: "date",
                format: "{0:MM/dd/yyyy h:mm:ss tt}",
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ViolationType",
                width: "100px",
                title: "Violation Type",
                sortfield:"ViolationType",
                headerTemplate: "Violation Type",
               // #template: kendo.template($("#tpl_receivingViolationList_violationtype").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ViolationDetail",
                width: "200px",
                title: "Violation Detail",
                sortfield:"ViolationDetail",
                headerTemplate: "Violation Detail",
                //#template: kendo.template($("#tpl_receivingViolationList_violationdetail").html())
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
            fields.length.should.be.equal(6);
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.CategoryName}}">{{dataItem.CategoryName}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.BuyerName}}">{{dataItem.BuyerName}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.WarehouseNumber}}">{{dataItem.WarehouseNumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.PONumber}}">{{dataItem.PONumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ViolationType}}">{{dataItem.ViolationType}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ViolationDetail}}">{{dataItem.ViolationDetail}}</span></div>');

            //var element = compile(angular.element(scriptElement))(rootScope);
        });
    });
});