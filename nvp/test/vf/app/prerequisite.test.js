'use strict';
describe('controller: vf-self-testing-prerequisite', function () {

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
    beforeEach(module('vf-api-self-testing')); //include api
    beforeEach(module('vf-cache-self-testing')); //include cache

    beforeEach(module('vf-self-testing-prerequisite'));
    beforeEach(module('modules/vendorportal-vf/app/self-testing/prerequisite.tpl.html'));

    beforeEach(inject(function ($rootScope, $controller, _common_, $filter, _$templateCache_, _$compile_, $injector,$compile) {
        scope = $rootScope.$new();
        rootScope = $rootScope;
        ctrl = $controller('SelfTestingPrerequisiteCtrl', {
            $scope: scope,
            common: _common_,
        });
        pageContent = _$templateCache_.get("modules/vendorportal-vf/app/self-testing/prerequisite.tpl.html");

        filter = $filter;
        common = _common_;
        common.currentUser = { VendorNumber: '0', ID: '47de65c5-2701-460a-b758-016280d7f12a' }
        //$compile(angular.element(pageContent))(scope);
    }));

    describe('Function Test', function () {
        //Common
        describe('Common', function() {

            it('check change page|切换新页面会提示', function () {
                //var itemList = [{ VendorPartNumber: '', ManufacturerPartNumber: '', UPC: '', Description: '', Cost: 0 }];
                //var result = scope.isTestItemValid(itemList);
                //result.should.be.equal(false);
            });
        });

        //Module - Survey
        describe('Module - Survey', function () {

            describe('Save', function () {

                it('check|保存时候验证Acknowledge必须勾选', function () {
                    scope.VendorPrerequsite = {GeneralSurvey:{isAcknowledge:false}};
                    var result = scope.isAcknowledgeChecked('GeneralSurvey');

                    result.should.be.eql(false);
                });

                it('check Request Item|验证提交的表单内容', function () {
                    var expect = {
                        action1: "prerequsite",
                        action2: "general-survey",
                        VendorNumber: common.currentUser.VendorNumber,
                        RequestUser: common.currentUser.ID,
                        GeneralSurvey: { IsAcknowledge: true }
                    };
                    scope.VendorPrerequsite = {GeneralSurvey:{IsAcknowledge : true}};
                    var requestItem = scope.getGeneralSurvey();
                    requestItem.should.be.eql(expect);
                });
            });
        });

        describe('Module - Validator', function() {
            describe('Maxlength', function() {
                it('maxlength 15|Identifiers输入框最大长度为15', function() {
                    scope.should.have.property('identityMaxLength', 15);
                });
                it('maxlength 40|VendorPartNumber输入框最大长度为40', function() {
                    scope.should.have.property('partNumberMaxLength', 40);
                });
                it('maxlength 50|UPC输入框最大长度为50', function() {
                    scope.should.have.property('upcMaxLength', 50);
                });
                it('maxlength 200|Description输入框最大长度为200', function() {
                    scope.should.have.property('descriptionMaxLength', 200);
                });
            });

            describe('Regex Validator', function () {
                it('identifiers should not contain Chinese|Identifiers输入框不能输入中文', function() {
                    var reg = scope.getNormalReg();
                    var result = reg.test("测试情况");
                    result.should.be.equal(false);
                });
                it('identifiers valid |Identifiers输入框可以输入下划线、字母和数字', function() {
                    var reg = scope.getNormalReg();
                    var result = reg.test("abc_123");
                    result.should.be.equal(true);
                });
            });

            describe('Test Item Validator', function() {

                it('UPC of test item should not contain Chinese|VendorPartNumber和UPC输入框不能输入中文', function() {
                    var list = [
                        {VendorPartNumber:'输入内容', UPC:'输入内容', Description:"输入内容"}
                    ];
                    var result = scope.isTestItemContentValid(list);
                    result.should.be.equal(false);
                });

                it('test item fields are required|TestItem Cost为必填', function () {
                    var list = [
                        {VendorPartNumber:'123',ManufacturerPartNumber:'aaaaaa', UPC:'123', Description:"输入内容",}
                    ];
                    var result = scope.isTestItemValid(list);
                    result.should.be.equal(false);
                });
                it('test item fields are required|TestItem VendorPartNumber为必填', function () {
                    var list = [
                        { ManufacturerPartNumber: 'aaaaaa', UPC: '123', Description: "输入内容", Cost: 12.23 }
                    ];
                    var result = scope.isTestItemValid(list);
                    result.should.be.equal(false);
                });
                it('test item fields are required|TestItem ManufacturerPartNumber为必填', function () {
                    var list = [
                        { VendorPartNumber: '123', UPC: '123', Description: "输入内容", Cost: 12.23 }
                    ];
                    var result = scope.isTestItemValid(list);
                    result.should.be.equal(false);
                });
                it('test item fields are required|TestItem Description为必填', function () {
                    var list = [
                        { VendorPartNumber: '123', ManufacturerPartNumber: 'aaaaaa', UPC: '123', Cost: 12.23 }
                    ];
                    var result = scope.isTestItemValid(list);
                    result.should.be.equal(false);
                });

                it('test item duplicate|TestItem VendorPartNumber不能重复', function() {
                    var list = [
                        {VendorPartNumber:'123',ManufacturerPartNumber:'aaaaaa', UPC:'123', Description:"输入内容",Cost:12.11},
                        {VendorPartNumber:'123',ManufacturerPartNumber:'aaaaaa', UPC:'123', Description:"输入内容",Cost:12.11}
                    ];
                    var result = scope.haveSameVendorPartNumber(list);
                    result.should.be.equal(true);
                });
            });
        });


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
