'use strict';

var loginPage = require('./login-pageobject.js');
var dashboardPage = require('../views/user/dashboard-pageobject.js');
var headerPage = require('../views/header/header-pageobject.js');
var homePage = require('../views/home/home-pageobject.js');

describe('Login page', function(){

	it('should navigate to login page', function () {
	 loginPage.navigate();
		
		expect(	// proper page title
			browser.getTitle() 
		).toBe( loginPage.title );
		
		expect(	// proper page state
			browser.getLocationAbsUrl() 
		).toBe( loginPage.url );
	});

	describe('form validation', function(){
		it('shoud be invalid when empty',function() {
			expect(	//	form is invalid
			 loginPage.form.getAttribute( 'class' )
			).toMatch( loginPage.invalid );
			
			expect( 
			 loginPage.submitButton.getAttribute( 'class' )
			).toMatch( loginPage.disabled );
		});

		it('shoud be invalid when only username',function() {
		 loginPage.credential.sendKeys( 'not a valid user' );
			expect(	
			 loginPage.form.getAttribute( 'class' )
			).toMatch( loginPage.invalid );
		});

		it('shoud be valid when username and password',function() {
		 loginPage.password.sendKeys( 'not a valid user' );
			expect(	
			 loginPage.form.getAttribute( 'class' )
			).toMatch( loginPage.valid );
		});
	});

	describe('login process', function(){
		it('shoud not show login failed alert yet', function(){
			expect( loginPage.loginFailedMessage.isDisplayed() ).toBe(false);
		});

		it('should fail when invalid user', function() {
		 loginPage.submitButton.click();
			expect( loginPage.loginFailedMessage.isDisplayed() ).toBe(true);
		});

		it('should login successfully a valid user', function(){
		 loginPage.credential.clear().then( function(){
			 loginPage.credential.sendKeys('foo');
			});
		 loginPage.password.clear().then( function(){
			 loginPage.password.sendKeys('opensesame');
			});
		 loginPage.submitButton.click();

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
			expect( browser.getLocationAbsUrl() ).toBe( loginPage.url );
		});
	});

	describe('authorization per pages', function() {

		describe('when not loggedIn', function() {
			
			it('should not allow to access to dashboard', function() {
				dashboardPage.navigate();
				expect( browser.getLocationAbsUrl() ).toBe( loginPage.url );
			});
		});
		
	});
});
