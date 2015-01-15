'use strict';

var signupPage = require('./signup-pageobject.js');
var signupSuccessPage = require('./signup-success-pageobject.js');

describe('Signup page', function(){

	signupPage.navigate();
	
	it('should navigate to signup page', function () {
		
		expect(	// proper page title
			browser.getTitle() 
		).toBe( signupPage.title );
		
		expect(	// proper page state
			browser.getLocationAbsUrl() 
		).toBe( signupPage.url );
	});

	describe('(user name field)', function(){
		it('form shoud be invalid',function() {
			expect(	//	form is invalid
				signupPage.form.getAttribute( 'class' )
			).toMatch( signupPage.invalid );
			
			expect( 
				signupPage.submitButton.getAttribute( 'class' )
			).toMatch( signupPage.disabled );
		});

		it('should accept a proper user name',function(){
			signupPage.username.sendKeys('Joe');

			expect(	
				signupPage.username.getAttribute('value') 
			).toBe( 'Joe' );

			expect(  // user name is valid
				signupPage.username.getAttribute( 'class' )
			).toMatch( signupPage.valid );
		});

		it('should reject a bad user name',function(){
			signupPage.username.sendKeys( protractor.Key.BACK_SPACE );

			expect(  // user name is not valid because minlength
				signupPage.username.getAttribute( 'class' )
			).toMatch( signupPage.invalid );

			signupPage.username.sendKeys( 'e' );

			expect(  // user name is valid now
				signupPage.username.getAttribute( 'class' )
			).toMatch( signupPage.valid );

			signupPage.username.sendKeys( ' Bar' );

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
		});

		it('should reject a bad email', function(){
			signupPage.email.sendKeys(protractor.Key.BACK_SPACE);

			expect(  // email is invalid
				signupPage.email.getAttribute( 'class' )
			).toMatch( signupPage.invalid );
		});
	});

	describe('(password matching)', function() {

		it('should accept mathching passwords',function(){
			signupPage.password.sendKeys('secret');
			signupPage.retypePassword.sendKeys('secret');

			expect(  // email is valid
				signupPage.retypePassword.getAttribute( 'class' )
			).toMatch( signupPage.valid );
		});

		it('should reject a password missmatch', function(){
			signupPage.password.sendKeys('especial');

			expect(  // email is invalid
				signupPage.email.getAttribute( 'class' )
			).toMatch( signupPage.invalid );
		});
	});

	it('form should have a valid state', function(){
		// fill fields with fresh data
		signupPage.username.clear().then(function(){
			signupPage.username.sendKeys( 'Joe' );
		});
		signupPage.email.clear().then( function() {
			signupPage.email.sendKeys( 'me@example.com' );
		});
		signupPage.password.clear().then( function() {
			signupPage.password.sendKeys( 'secret' );
		});
		signupPage.retypePassword.clear().then( function() {
			signupPage.retypePassword.sendKeys( 'secret' );
		});

		signupPage.agreedTerms.isSelected().then( function( value ) {
			if ( !value ) {
				signupPage.agreedTerms.click();
			}
		});
		
		expect(	//	form is valid
			signupPage.form.getAttribute( 'class' )
		).toMatch( signupPage.valid );

		expect( 
			signupPage.submitButton.getAttribute( 'class' )
		).toMatch( signupPage.enabled );

		expect(
			signupPage.alertMessage.isDisplayed()
		).toBeFalsy();
	});

	it('should register user and show register success page', function(){
		var systime = (new Date() ).getTime();
		signupPage.username.clear().then(function(){
			signupPage.username.sendKeys( 'Joe' + systime );
		});
		signupPage.email.clear().then( function() {
			signupPage.email.sendKeys( 'me' + systime + '@example.com' );
		});
		signupPage.submitButton.click();

		expect(	// success page state
			browser.getLocationAbsUrl() 
		).toBe( signupSuccessPage.url );
	});
});
