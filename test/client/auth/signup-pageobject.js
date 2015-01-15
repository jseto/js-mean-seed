'use strict';

var SignupPageObject = function() {
	this.navigate = function(){
		browser.get( this.url );
	};

	this.title = 'Sign up - MyApp';
	this.url = '/signup';

	this.valid = /\bng-valid(\s|$)/;
	this.invalid = /\bng-invalid(\s|$)/;
	this.disabled = /\bbtn-default(\s|$)/;

	this.username = element( by.css('input[ng-model="user.username"]') );
	this.email = element( by.css('input[ng-model="user.email"]') );
	this.password = element( by.css('input[ng-model="user.password"]') );
	this.retypePassword = element( by.css('input[ng-model="retypePassword"]') );
	this.agreedTerms = element( by.model('user.agreedTerms') );
	this.submitButton = element( by.css('button[type=submit]') );
	this.form = element( by.css('form[name=signupForm]') );
	this.alertMessage = element( by.css( 'div.alert' ) );
};

module.exports = new SignupPageObject(); 