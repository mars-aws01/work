'use strict';
describe('controller: vf-self-testing-dashboard', function () {

    var scope;
    var rootScope;
    var ctrl;
    var filter;
    var compile;
    var currentDate;
    var pageContent;

    beforeEach(module('negServices')); //include common
    beforeEach(module('vf-cache-apiSetting')); //include apiSetting
    beforeEach(module('pascalprecht.translate')); //include $translate
    beforeEach(module('vf-api-self-testing'));  //include api
    beforeEach(module('vf-cache-self-testing')); //include cache

    beforeEach(module('vf-self-testing-dashboard'));

    beforeEach(inject(function ($rootScope, $controller, _common_, $filter, _$templateCache_, _$compile_) {
        scope = $rootScope.$new();
        compile = _$compile_;
        rootScope = $rootScope;
        ctrl = $controller('SelfTestingDashboardCtrl', {
            $scope: scope,
            common: _common_
        });
        filter = $filter;
    }));

    describe('UI Part', function () {
        it('should have prerequisiteStatusColorMap', function () {
            scope.prerequisiteStatusColorMap.should.eql({ Completed: "green", NoCompleted: "red2" });
        });

        it('should have connectionStatusColorMap', function () {
            scope.connectionStatusColorMap.should.eql({ "Started": "red2", "ReadyToTest": "red2", "ReadyToLive": "red2", "Live": "green" });
        });

        it('should have x12StatusColorMap', function () {
            scope.x12StatusColorMap.should.eql({ "NotStarted": "red2", "ReadyToTest": "red2", "ReadyToLive": "red2", "Live": "green" });
        });

    });

    describe('Tester Part', function () {

        //Module - Prerequisite Status
        describe('Module - Prerequisite Status', function () {

            it('should have prerequisiteStatusColorMap|状态颜色适配器', function () {
                scope.prerequisiteStatusColorMap.should.eql({ Completed: "green", NotCompleted: "red2" });
            });


        });

        //Module - Connection Setup
        describe('Module - Connection Setup', function () {
            it('should have connectionStatusColorMap', function () {
                scope.connectionStatusColorMap.should.eql({ Started: "red2", ReadyToTest: "red2", ReadyToLive: "red2", Live: "green" });
            });
        });

        //Module - EDI X12 Setup
        describe('Module - EDI X12 Setup', function () {
            it('should have x12StatusColorMap', function () {
                scope.x12StatusColorMap.should.eql({ NotStarted: "red2", ReadyToTest: "red2", ReadyToLive: "red2", Live: "green" });
            });
        });
    });
});
