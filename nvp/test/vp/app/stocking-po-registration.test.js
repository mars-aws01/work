'use strict';
describe('controller: stocking-po-registration', function () {

    var scope;
    var rootScope;
    var ctrl;
    var filter;
    var currentDate;
    var pageContent;
    var common;
    var $httpBackend;

    beforeEach(module('negServices')); //include common
    beforeEach(module('vf-cache-apiSetting')); //include apiSetting
    beforeEach(module('pascalprecht.translate')); //include $translate
    beforeEach(module('vp-api-application-form')); //include api
    beforeEach(module('vp-api-registration')); //include api
    beforeEach(module('vp-api-common')); //include api
    beforeEach(module('vp-cache-registration')); //include cache

    beforeEach(module('vp-vendor-application'));

    beforeEach(inject(function ($rootScope, $controller, _common_, $filter, _$templateCache_, _$compile_, $injector,$compile) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        ctrl = $controller('VendorApplicationCtrl', {
            $scope: scope,
            common: _common_,
        });

        filter = $filter;
        common = _common_;
        common.currentUser = { VendorNumber: '0', ID: '47de65c5-2701-460a-b758-016280d7f12a' }
    }));

    describe('Function Test', function () {
  
    });

    describe('Unit Test', function () {
        it('should have stepInfo', function () {
            scope.should.have.property('stepInfo');
            scope.stepInfo.should.be.eql({
                step1: false,
                step2: false,
                step3: false,
                step4: false,
                step5: false,
                step6: false
            });
        });

        it('initForms', function () {
            scope.initForms();
            scope.forms.should.be.eql(['stepForm_1', 'stepForm_2', 'stepForm_3', 'stepForm_4', 'stepForm_5', 'stepForm_6']);
        });

        it('should have forms', function () {
            scope.should.have.property('forms');
        });
        it('getFormName', function () {
            var formName = scope.getFormName(1);
            formName.should.be.equal('stepForm_1');
        });
        it('getRequestItem', function () {
            var requestItem = scope.getRequestItem('test');
            requestItem.should.be.eql({
                action1: "prerequsite",
                action2: 'test',
                VendorNumber: common.currentUser.VendorNumber,
                RequestUser: common.currentUser.ID
            })
        });

        it('change step', function () {
            scope.change(1);
            scope.currentStep.should.be.equal(1);
        });

        describe('previous step', function () {
            it('first step', function () {
                scope.currentStep = 1;
                scope.previous();
                scope.currentStep.should.be.equal(1);
            });
            it('other step', function () {
                scope.currentStep = 5;
                scope.previous();
                scope.currentStep.should.be.equal(4);
            });

        });

        describe('next step', function () {
            it('last step', function () {
                scope.currentStep = 6;
                scope.next();
                scope.currentStep.should.be.equal(6);
            });
            it('other step', function () {
                scope.currentStep = 5;
                scope.next();
                scope.currentStep.should.be.equal(6);
            });

        });

        it('Test Item is invalid', function () {
            var itemList = [{ VendorPartNumber: '', ManufacturerPartNumber: '', UPC: '', Description: '', Cost: 0 }];
            var result = scope.isTestItemValid(itemList);
            result.should.be.equal(false);
        });

        it('Test Item is valid', function () {
            var itemList = [{ VendorPartNumber: '111', ManufacturerPartNumber: '222', UPC: '111', Description: '222', Cost: 0.12 }];
            var result = scope.isTestItemValid(itemList);
            result.should.be.equal(true);
        });
    });

});
