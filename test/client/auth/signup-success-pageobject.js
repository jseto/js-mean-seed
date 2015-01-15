'use strict';

var SignupSuccessPageObject = function() {
	this.navigate = function(){
		browser.get( this.url );
	};

	this.title = 'Sign up successful - MyApp';
	this.url = '/signup-success';
};

module.exports = new SignupSuccessPageObject();