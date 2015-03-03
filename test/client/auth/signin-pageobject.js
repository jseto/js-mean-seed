'use strict';

var headerPage = require('../views/header/header-pageobject.js');

var SigninPageObject = function() {
	var self = this;
	this.navigate = function(){
		return browser.get( this.url );
	};

	this.title = 'Sign in - MyApp';
	this.url = '/signin';

	this.valid = /\bng-valid(\s|$)/;
	this.invalid = /\bng-invalid(\s|$)/;
	this.disabled = /\bbtn-primary(\s|$)/;

	var container = element( by.css('div[ui-view]') );

	this.credential = container.element( by.model('user.credential') );
	this.password = container.element( by.model('user.password') );
	this.submitButton = container.element( by.css('form[name="loginForm"]') ).element( by.css( 'button[type="submit"]' ) );
	this.form = container.element( by.css('form[name="loginForm"]') );
	this.loginFailedMessage = container.element( by.css( '[ng-show="loginFailed"]' ) );

	var testLogin = function(){
		return headerPage.logoutTab.isDisplayed();
	};

	var login = function(){
		self.navigate().then( function(){
			self.credential.sendKeys('foo').then(function(){
				self.password.sendKeys('opensesame').then( function(){
					self.submitButton.click();
				});
			});
		});
	};

	this.verifyLogin = function() {
		testLogin().then(function( isLoggedIn ){
			if (!isLoggedIn){
				login();
			}
		});
	};
};

module.exports = new SigninPageObject(); 