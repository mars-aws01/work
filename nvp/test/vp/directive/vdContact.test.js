describe('directives', function () {

    beforeEach(module('vf-cache-apiSetting'));
    beforeEach(module('vp-api-registration'));
    beforeEach(module('vp-cache-registration'));
    beforeEach(module('vdContact'));

    var element;
    var directiveElement;
    var registrationHelper;
    var name, jobTitle, emailAddress, phone;

    beforeEach(inject(function ($rootScope, $compile, _registration_) {
        element = angular.element('<form name="testForm"><vd-contact module-name="test" binding-name="test"></vd-contact></form>');
        scope = $rootScope.$new();
        registrationHelper = _registration_;
        scope.config = registrationHelper.config;
        scope.test = {};
        $compile(element)(scope);
        directiveElement = element[0].children[0];
        name = $(directiveElement).find("input[name='test_Name']")[0];
        jobTitle = $(directiveElement).find("input[name='test_JobTitle']")[0];
        emailAddress = $(directiveElement).find("input[name='test_emailAddress']")[0];
        phone = $(directiveElement).find("input[name='test_Phone']")[0];
        scope.$digest();
    }));

    it('should be rendered|成功渲染了控件组.', function () {
        $(directiveElement).find("input").should.have.lengthOf(4);
    });

    describe('Function Test', function () {

        describe('Name', function () {
            it('maxlength is 80', function () {
                name.maxLength.should.be.equal(80);
            });

            it('required is true', function () {
                name.required.should.be.true;
            });
        });

        describe('Job Title', function () {
            it('maxlength is 50', function () {
                jobTitle.maxLength.should.be.equal(50);
            });

            it('required is false', function () {
                jobTitle.required.should.be.false;
            });
        });

        describe('E-mail', function () {
            it('maxlength is 80', function () {
                emailAddress.maxLength.should.be.equal(80);
            });

            it('required is true', function () {
                emailAddress.required.should.be.true;
            });

            it('should be valid email address|错误的email地址', function () {
                scope.test.Email = 'abcde';
                scope.$digest();
                scope['testForm'].test_emailAddress.$valid.should.be.false;
            });

            it('should be valid email address|正确的email地址', function () {
                scope.test.Email = 'abcde@aa.com';
                scope.$digest();
                scope['testForm'].test_emailAddress.$valid.should.be.true;
            });
        });

        describe('Phone', function () {
            it('maxlength is 20', function () {
                phone.maxLength.should.be.equal(20);
            });

            it('required is true', function () {
                phone.required.should.be.true;
            });
        });

    });


});