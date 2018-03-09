"use strict";
describe('controller: customer-reviews', function () {
    var scope;
    var ctrl;

    beforeEach(module('nvp-customer-reviews'));
    beforeEach(module('pascalprecht.translate'));  //include $translate
    beforeEach(module('negServices'));  //include common
    beforeEach(module('vendorportal-vf-service'));//all api service 
    beforeEach(module('vendorportal-nvf-service'));//all api service 

    beforeEach(inject(function ($rootScope, $controller, _common_) {
        scope = $rootScope.$new();
        ctrl = $controller('CustomerReviewsCtrl', {
            $scope: scope,
            common:_common_
        });
    }));

    it('should have original paging info', function () {
        scope.preparePaging();
        scope.query.PagingInfo.should.eql({
            startpageindex: 0,
            endpageindex: 0,
            currentPage: 1,
            pageSize: 20
        });
    });

    it('should have default Keyword type is "ItemNumber" ', function () {
        scope.query.KeyWordType.should.eql("ItemNumber");
    });

    it('should be default reply status is "All Reviews" ', function() {
        scope.cbx_statusList.should.include({
            text: "All Reviews"
        });
    });

    it('should be reply min date is 2011.05.01 ');

});