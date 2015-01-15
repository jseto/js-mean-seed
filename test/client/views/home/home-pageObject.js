'use strict';

var HomePageObject = function() {
	this.navigate = function(){
		browser.get( this.url );
	};

	this.title = 'Home - MyApp';
	this.url = '/home';
};

module.exports = new HomePageObject();