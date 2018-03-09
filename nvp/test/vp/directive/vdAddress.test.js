describe('directives', function () {

    beforeEach(module('vf-cache-apiSetting')); 
    beforeEach(module('vp-api-registration'));
    beforeEach(module('vp-cache-registration'));
	beforeEach(module('vdAddress'));

	var element;  
	var directiveElement; 
    var registrationHelper;
    var address1, address2, city, state, zipcode, country;

    beforeEach(inject(function ($rootScope, $compile, _registration_) {
	    element = angular.element('<form name="testForm"><vd-address module-name="test" binding-name="test"></vd-address></form>');
	    scope = $rootScope.$new();
        registrationHelper = _registration_;
        scope.config = registrationHelper.config;
        scope.test = {};
        $compile(element)(scope);
	    directiveElement = element[0].children[0];
	    address1 = $(directiveElement).find("input[name='test_address1']")[0];
	    address2 = $(directiveElement).find("input[name='test_address2']")[0];
	    city = $(directiveElement).find("input[name='test_city']")[0];
	    state = $(directiveElement).find("select[name='test_state']")[0];
	    zipcode = $(directiveElement).find("input[name='test_zipcode']")[0];
	    country = $(directiveElement).find("select[name='test_country']")[0];
	    scope.$digest();
	}));

    it('should be rendered|成功渲染了控件组.', function () {
	    $(directiveElement).find("input").should.have.lengthOf(4);
	    $(directiveElement).find("select").should.have.lengthOf(2);
	});

    describe('Function Test', function () {

        describe('Address1', function () {
            it('maxlength is 100', function () {
                address1.maxLength.should.be.equal(100);
            });

            it('required is true', function () {
                address1.required.should.be.true;
            });
        });

        describe('Address2', function () {
            it('maxlength is 100', function () {
                address2.maxLength.should.be.equal(100);
            });
        });

        describe('City', function () {
            it('maxlength is 45', function () {
                city.maxLength.should.be.equal(45);
            });

            it('required is true', function () {
                city.required.should.be.true;
            });
        });

        describe('State', function () {
          
            it('required is true', function () {
                state.required.should.be.true;
            });
        });

        describe('Zip / Postal Code', function () {
            it('maxlength is 10', function () {
                zipcode.maxLength.should.be.equal(10);
            });

            it('required is true', function () {
                zipcode.required.should.be.true;
            });

            it('length > 10 is error', function () {
                scope.test.ZipPostalCode = '12345678901';
                scope.$digest();
                scope['testForm'].test_zipcode.$valid.should.be.false;
            });

            //如果country是美国，zipcode 只能是数字和中划线,并且中划线不能在首尾两端
            it('if country="USA" then zip code can only contain Numbers and "-"', function () {
                scope.test.Country = 'USA';
                scope.test.ZipPostalCode = '22-333-44s';
                scope.$digest();
                scope['testForm'].test_zipcode.$valid.should.be.true;
            });

            it('if country="USA" then zip code contain other char is error|包含字母错误', function () {
                scope.test.Country = 'USA';
                scope.test.ZipPostalCode = 'abc-333-44';
                scope.$digest();
                scope['testForm'].test_zipcode.$valid.should.be.false;
            });

            it('if country="USA" then zip code contain other char is error|中划线在首位错误', function () {
                scope.test.Country = 'USA';
                scope.test.ZipPostalCode = '-333-44';
                scope.$digest();
                scope['testForm'].test_zipcode.$valid.should.be.false;
            });

            it('if country="USA" then zip code contain other char is error|中划线在尾部错误', function () {
                    scope.test.Country = 'USA';
                    scope.test.ZipPostalCode = '333-44-';
                    scope.$digest();
                    scope['testForm'].test_zipcode.$valid.should.be.false;
                });

            it('if country="USA" then zip code contain other char is error|连续两个中划线错误', function () {
                    scope.test.Country = 'USA';
                    scope.test.ZipPostalCode = '333--44';
                    scope.$digest();
                    scope['testForm'].test_zipcode.$valid.should.be.false;
                });

            it('if country="USA" then zip code only contain Numbers is right |只有数字正确', function () {
                scope.test.Country = 'USA';
                scope.test.ZipPostalCode = '33344455';
                scope.$digest();
                scope['testForm'].test_zipcode.$valid.should.be.true;
            });

            it('if country != "USA" then zip code can be any value|Country不是USA可以是任意值', function () {
                scope.test.Country = 'CAN';
                scope.test.ZipPostalCode = 'xxxSS22%$';
                scope.$digest();
                scope['testForm'].test_zipcode.$valid.should.be.true;
            });
        });

        describe('Country', function () {

            it('required is true', function () {
                country.required.should.be.true;
            });
        });
      
    });


});