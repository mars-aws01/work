'use strict';
describe('controller: nvp-vendor-rma-queue-report', function () {

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
    beforeEach(module('nvf-api-vendor-rma-queue-report'));  //include api

    beforeEach(module('nvp-vendor-queue-report'));
    beforeEach(module('modules/vendorportal-nvf/app/reporting/vendor-queue-report.tpl.html'));

    beforeEach(inject(function ($rootScope, $controller, _common_, $filter, _$templateCache_, _$compile_) {
        scope = $rootScope.$new();
        compile = _$compile_;
        rootScope = $rootScope;
        ctrl = $controller('VendorQueueReportCtrl', {
            $scope: scope,
            common: _common_
        });
        filter = $filter;
        pageContent = _$templateCache_.get("modules/vendorportal-nvf/app/reporting/vendor-queue-report.tpl.html");

        currentDate = new Date();
    }));

    it('should have data grid name', function () {
        scope.dataGridName.should.be.equal('vendorQueueReportGrid');
    });

    it('should have refresh key', function () {
        scope.refreshKey.should.be.equal('refresh.vendor-queue-report');
    });

    it('default value of exportDisabled should be true', function () {
        scope.exportDisabled.should.be.equal(true);
    });

    it('default value of totalRecords should be 0', function () {
        scope.totalRecords.should.be.equal(0);
    });

    it('Should have VendorQueueDays options', function () {
        scope.should.have.property('daysOptions');
        scope.daysOptions.length.should.be.equal(3);
        scope.daysOptions.should.be.include({ text: 'All', value: 'All' });
        scope.daysOptions.should.be.include({ text: '0-30 Days', value: 'Month' });
        scope.daysOptions.should.be.include({ text: 'Above 30 Days', value: 'AboveMonth' });
    });
    
    describe('Query', function () {
        it('Should have VendorQueueDays', function () {
            scope.query.should.have.property('VendorQueueDays');
        });

        it('VendorQueueDays default value is "All"', function () {
            scope.query.VendorQueueDays.should.be.equal('All');
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
        it('Should have TotalQty', function () {
            scope.should.have.property('totalQuantity');
        });
        it('Should have VendorQueueAmount', function () {
            scope.should.have.property('vendorQueueAmount');
        });
        it('Should have AgingVendorQueueAmount', function () {
            scope.should.have.property('agingVendorQueueAmount');
        });
        
        it('default value of totalQuantity should be 0', function () {
            scope.totalQuantity.should.be.equal(0);
        });

        it('default value of vendorQueueAmount should be 0', function () {
            scope.vendorQueueAmount.should.be.equal(0);
        });

        it('default value of agingVendorQueueAmount should be 0', function () {
            scope.agingVendorQueueAmount.should.be.equal(0);
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

    describe('Normal function', function() {

        it('Get Request Item', function() {
            var item = scope.getRequestItem('query');
            item.should.eql(
                {
                    KeyWordType: 'NeweggItemNumber',
                    VendorQueueDays:'All',
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

        it('DataGrid length should be 12', function () {
            scope.gridData.columns.length.should.be.equal(12);
        });

        it('DataGrid fields should be right', function () {
            scope.gridData.columns.should.be.include({
                field: "BrandName",
                width: "100px",
                title: "Brand",
                sortfield:"BrandName",
                headerTemplate: "Brand",
                //#template: kendo.template($("#tpl_vendorQueueList_brand").html())
            });
            scope.gridData.columns.should.be.include({
                field: "CategoryName",
                title: "Category",
                width: "100px",
                sortfield:"CategoryName",
                headerTemplate: "Category",
                //#template: kendo.template($("#tpl_vendorQueueList_category").html())
            });
            scope.gridData.columns.should.be.include({
                field: "NeweggItemNumber",
                width: "100px",
                title: "Item #",
                sortfield:"NeweggItemNumber",
                headerTemplate: "Item #",
                //#template: kendo.template($("#tpl_vendorQueueList_itemnumber").html())
            });
            scope.gridData.columns.should.be.include({
                field: "NeweggItemDescription",
                title: "Item Description",
                width: "150px",
                sortfield:"NeweggItemDescription",
                headerTemplate: "Item Description",
                //#template: kendo.template($("#tpl_vendorQueueList_description").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "ManufacturerPartsNumber",
                width: "150px",
                title: "Mfr. Part #",
                sortfield: "ManufacturerPartsNumber",
                headerTemplate: "Mfr. Part #",
                //#template: kendo.template($("#tpl_vendorQueueList_manufacturerpartnumber").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "VendorRMANumber",
                width: "150px",
                title: "Vendor RMA #",
                sortfield:"VendorRMANumber",
                headerTemplate: "Vendor RMA #",
                //#template: kendo.template($("#tpl_vendorQueueList_vendorrmanumber").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "WIRNumber",
                width: "100px",
                title: "WIR #",
                sortfield:"WIRNumber",
                headerTemplate: "WIR #",
                //#template: kendo.template($("#tpl_vendorQueueList_wirnumber").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "OBNumber",
                width: "100px",
                title: "OB #",
                sortfield:"OBNumber",
                headerTemplate: "OB #",
                //#template: kendo.template($("#tpl_vendorQueueList_obnumber").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "OBDate",
                width: "160px",
                title: "OB Date",
                sortfield:"OBDate",
                headerTemplate: "OB Date",
                //#template: kendo.template($("#tpl_vendorQueueList_obdate").html())
                type: "date",
                format: "{0:MM/dd/yyyy h:mm:ss tt}",
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "Quantity",
                width: "60px",
                title: "Qty",
                sortfield:"Quantity",
                headerTemplate: "Qty",
                //#template: kendo.template($("#tpl_vendorQueueList_qty").html())
                sortable: false,
                type: 'number'
            });
            scope.gridData.columns.should.be.include({
                field: "TotalRMAAmount",
                width: "110px",
                title: "Total RMA Amt",
                sortfield:"TotalRMAAmount",
                headerTemplate: "Total RMA Amt",
                //#template: kendo.template($("#tpl_vendorQueueList_totalrmaamount").html())
                sortable: false
            });
            scope.gridData.columns.should.be.include({
                field: "VendorQueueDays",
                width: "150px",
                title: "Days In Vendor Queue",
                sortfield: "VendorQueueDays",
                headerTemplate: "Days In Vendor Queue",
                //#template: kendo.template($("#tpl_vendorQueueList_daysinvendorqueue").html())
                sortable: false,
                type:'number'
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
            fields.length.should.be.equal(11);
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.BrandName}}">{{dataItem.BrandName}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.CategoryName}}">{{dataItem.CategoryName}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.NeweggItemNumber}}">{{dataItem.NeweggItemNumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.NeweggItemDescription}}">{{dataItem.NeweggItemDescription}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.ManufacturerPartsNumber}}">{{dataItem.ManufacturerPartsNumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.VendorRMANumber}}">{{dataItem.VendorRMANumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.WIRNumber}}">{{dataItem.WIRNumber}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-left"><span title="{{dataItem.OBNumber}}">{{dataItem.OBNumber}}</span></div>');
            //fields.should.be.include('<div class="col-xs-12 no-padding text-left"   ><span title="{{dataItem.OBDate}}">{{dataItem.OBDate}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-right"><span title="{{dataItem.Quantity}}">{{dataItem.Quantity | number : 0}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-right"><span>$</span><span title="{{dataItem.TotalRMAAmount}}">{{dataItem.TotalRMAAmount | vfCurrency:""}}</span></div>');
            fields.should.be.include('<div class="col-xs-12 no-padding text-right"><span title="{{dataItem.VendorQueueDays}}">{{dataItem.VendorQueueDays | number : 0}}</span></div>');

            //var element = compile(angular.element(scriptElement))(rootScope);
        });
    });
});