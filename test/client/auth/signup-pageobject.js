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
	
	var container = element( by.css('div[ui-view]') );

	this.username = container.element( by.css('input[ng-model="user.username"]') );
	this.email = container.element( by.css('input[ng-model="user.email"]') );
	this.password = container.element( by.css('input[ng-model="user.password"]') );
	this.retypePassword = container.element( by.css('input[ng-model="other.retypePassword"]') );
	this.agreedTerms = container.element( by.model('user.agreedTerms') );
	this.submitButton = container.element( by.css('form[name="signupForm"]') ).element( by.css( 'button[type="submit"]' ) );
	this.form = container.element( by.css('form[name=signupForm]') );
	this.alertMessage = container.element( by.binding( 'alertMessage' ) );
};

module.exports = new SignupPageObject(); 