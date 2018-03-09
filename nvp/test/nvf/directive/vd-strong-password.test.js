describe('directives', function() {

	  
	beforeEach(module('vdStrongPassword'));

	  
	var element;  
	var directiveElement; 
	var passwordElement; 
	var outerScope;  
	var innerScope;

	  
	beforeEach(inject(function($rootScope, $compile) {    
		element = angular.element('<form name="spForm"><vd-strong-password ></vd-strong-password></form>');    
		outerScope = $rootScope.$new(); 
		outerScope.password = '';
		$compile(element)(outerScope);  
		innerScope = element.isolateScope();
		directiveElement = element[0].children[0]
		passwordElement = directiveElement.children[0]
		outerScope.$digest();  
	}));

	it('should be rendered', function() {
		directiveElement.children.should.have.lengthOf(2);    
	});


	it('should error when length < 8', function() {
		outerScope.password = 'Ws2';
		outerScope.$digest(); 
		outerScope['spForm'].input_pwd.$valid.should.be.false;
	});

	it('should error when length > 30', function() {
		outerScope.password = '012345678901234567890123456789sS';
		outerScope.$digest(); 
		outerScope['spForm'].input_pwd.$valid.should.be.false;
	});

	it('should error when no uppercase letters', function() {
		outerScope.password = '12345abcd';
		outerScope.$digest(); 
		outerScope['spForm'].input_pwd.$valid.should.be.false;
	});

	it('should error when no lowercase letters', function() {
		outerScope.password = '12345ABCD';
		outerScope.$digest(); 
		outerScope['spForm'].input_pwd.$valid.should.be.false;
	});

	it('should error when no number', function() {
		outerScope.password = 'abcdeABCDE';
		outerScope.$digest(); 
		outerScope['spForm'].input_pwd.$valid.should.be.false;
	});

	it('should error when no special characters', function() {
		outerScope.password = '123abcdefg';
		outerScope.$digest(); 
		outerScope['spForm'].input_pwd.$valid.should.be.false;
	});

	it('should pass when the input string correctly', function() {
		// element[0].children[0].value = '12345678'
		// $(passwordElement).val('12345678Qq').trigger('change');
		outerScope.password = '12345678Qq@';
		outerScope.$digest(); 
		outerScope['spForm'].input_pwd.$valid.should.be.true;
	});

});