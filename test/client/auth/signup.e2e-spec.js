'use strict';

var signupPage = require('./signup-pageobject.js');


describe('Signup page', function(){

	signupPage.navigate();
	
	it('should navigate to signup page', function () {
		
		expect(	// proper page title
			browser.getTitle() 
		).toBe( signupPage.title );
		
		expect(	// proper page state
			browser.getLocationAbsUrl() 
		).toBe( signupPage.state );
	});

	describe('(user name field)', function(){
		it('form shoud be invalid',function() {
			expect(	//	form is invalid
				signupPage.form.getAttribute( 'class' )
			).toMatch( signupPage.invalid );

			expect(	// submit button disabled
				signupPage.submitButton.isEnabled()
			).toBe(false);
		});

		it('should accept a proper user name',function(){
			signupPage.username.sendKeys('Joe');

			expect(	
				signupPage.username.getAttribute('value') 
			).toBe( 'Joe' );

			expect(  // user name is valid
				signupPage.username.getAttribute( 'class' )
			).toMatch( signupPage.valid );

			expect(	// submit button still disabled because form not still valid
				signupPage.submitButton.isEnabled()
			).toBe(false);
		});

		it('should reject a bad user name',function(){
			signupPage.username.sendKeys( protractor.Key.BACK_SPACE );

			expect(  // user name is not valid because minlength
				signupPage.username.getAttribute( 'class' )
			).toMatch( signupPage.invalid );

			signupPage.username.sendKeys( 'e Bar' );

			expect(  // user name is not valid because pattern
				signupPage.username.getAttribute( 'class' )
			).toMatch( signupPage.invalid );
		});
	});
	
	describe('(email field)', function() {

		it('should accept a proper email',function(){
			signupPage.email.sendKeys('foo@bar.co');

			expect(  // email is valid
				signupPage.email.getAttribute( 'class' )
			).toMatch( signupPage.valid );

			expect(	// submit button still disabled because form not still valid
				signupPage.submitButton.isEnabled()
			).toBe(false);
		});

		it('should reject a bad email', function(){
			signupPage.email.sendKeys(protractor.Key.BACK_SPACE);

			expect(  // email is invalid
				signupPage.email.getAttribute( 'class' )
			).toMatch( signupPage.invalid );

			expect(	// submit button still disabled because form not still valid
				signupPage.submitButton.isEnabled()
			).toBe(false);
		});
	});

	describe('(password matching)', function() {

		it('should accept mathching passwords',function(){
			signupPage.password.sendKeys('secret');
			signupPage.retypePassword.sendKeys('secret');

			expect(  // email is valid
				signupPage.retypePassword.getAttribute( 'class' )
			).toMatch( signupPage.valid );

			signupPage.retypePassword.getAttribute( 'class' ).then(function(result){
				console.log(result);
			});

			expect(	// submit button still disabled because form not still valid
				signupPage.submitButton.isEnabled()
			).toBe(false);
		});

		it('should reject a password missmatch', function(){
			signupPage.password.sendKeys('especial');

			expect(  // email is invalid
				signupPage.email.getAttribute( 'class' )
			).toMatch( signupPage.invalid );

			expect(	// submit button still disabled because form not still valid
				signupPage.submitButton.isEnabled()
			).toBe(false);
		});
	});

});
