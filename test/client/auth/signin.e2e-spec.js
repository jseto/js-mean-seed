'use strict';

var signinPage = require('./signin-pageobject.js');
var dashboardPage = require('../user/dashboard-pageobject.js');
var headerPage = require('../views/header/header-pageobject.js');
var homePage = require('../views/home/home-pageobject.js');

describe('Signin page', function(){

	it('should navigate to signin page', function () {
		signinPage.navigate();
		
		expect(	// proper page title
			browser.getTitle() 
		).toBe( signinPage.title );
		
		expect(	// proper page state
			browser.getLocationAbsUrl() 
		).toBe( signinPage.url );
	});

	describe('form validation', function(){
		it('shoud be invalid when empty',function() {
			expect(	//	form is invalid
				signinPage.form.getAttribute( 'class' )
			).toMatch( signinPage.invalid );
			
			expect( 
				signinPage.submitButton.getAttribute( 'class' )
			).toMatch( signinPage.disabled );
		});

		it('shoud be invalid when only username',function() {
			signinPage.credential.sendKeys( 'not a valid user' );
			expect(	
				signinPage.form.getAttribute( 'class' )
			).toMatch( signinPage.invalid );
		});

		it('shoud be valid when username and password',function() {
			signinPage.password.sendKeys( 'not a valid user' );
			expect(	
				signinPage.form.getAttribute( 'class' )
			).toMatch( signinPage.valid );
		});
	});

	describe('login process', function(){
		it('shoud not show login failed alert yet', function(){
			expect( signinPage.loginFailedMessage.isDisplayed() ).toBe(false);
		});

		it('should fail when invalid user', function() {
			signinPage.submitButton.click();
			expect( signinPage.loginFailedMessage.isDisplayed() ).toBe(true);
		});

		it('should login successfully a valid user', function(){
			signinPage.credential.clear().then( function(){
				signinPage.credential.sendKeys('foo');
			});
			signinPage.password.clear().then( function(){
				signinPage.password.sendKeys('opensesame');
			});
			signinPage.submitButton.click();

			expect( browser.getLocationAbsUrl() ).toBe( dashboardPage.url );			
		});

		it('should show logout menu item', function(){
			expect( headerPage.loginTab.isDisplayed() ).toBe( false );
			expect( headerPage.logoutTab.isDisplayed() ).toBe( true );
		});

		it('should keep logged in on browser reload', function() {
			browser.refresh();
			expect( headerPage.logoutTab.isDisplayed() ).toBe( true );
		});
	});

	describe('logout process', function() {
		it('should logout loged member', function() {
			headerPage.logoutTab.click();

			expect( headerPage.loginTab.isDisplayed() ).toBe( true );
			expect( headerPage.logoutTab.isDisplayed() ).toBe( false );
			expect( browser.getLocationAbsUrl() ).toBe( homePage.url );
		});
	});

	describe('authorization per pages', function() {

		describe('when not loggedIn', function() {
			
			it('should not allow to access to dashboard', function() {
				dashboardPage.navigate();
				expect( browser.getLocationAbsUrl() ).toBe( signinPage.url );
			});
		});
		
	});
});
