'use strict';

var SignupPageObject = function() {
	this.navigate = function(){
		browser.get( this.state );
	};

	this.title = 'Sign up - MyApp';
	this.state = '/signup';

	this.valid = /\bng-valid(\s|$)/;
	this.invalid = /\bng-invalid(\s|$)/;

	this.username = element( by.css('input[ng-model="user.username"]') );
	this.email = element( by.css('input[ng-model="user.email"]') );
	this.password = element( by.css('input[ng-model="user.password"]') );
	this.retypePassword = element( by.css('input[ng-model="retypePassword"]') );
	this.rememberMe = element( by.css('rememberMe') );
	this.submitButton = element( by.css('button[type=submit]') );
	this.form = element( by.css('form[name=signupForm]') );
};

module.exports = new SignupPageObject();