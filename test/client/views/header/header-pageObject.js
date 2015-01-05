'use strict';

var HeaderPageObject = function() {
	this.homeTab = element( by.id('homeTab') );
	this.contactTab = element( by.id('contactTab') );
	this.loginTab = element( by.id('loginTab') );
	this.logoTab = element( by.id('logoTab') );

	this.tabActive = /\bactive\b/;
	this.loginPanel = element( by.id('login') );
};

module.exports = new HeaderPageObject();