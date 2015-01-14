'use strict';

var HeaderPageObject = function() {
	this.homeTab = element( by.id('homeTab') );
	this.contactTab = element( by.id('contactTab') );
	this.loginTab = element( by.id('loginTab') );
	this.logoTab = element( by.id('logoTab') );

	this.tabActive = /\bactive\b/;
	this.loginPanel = element( by.id('login') );

	this.click = function( elem ) {
		elem.all( by.css('a') ).first().click();
	};
};

module.exports = new HeaderPageObject();