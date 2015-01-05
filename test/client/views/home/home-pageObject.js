'use strict';

var HomePageObject = function() {
	this.navigate = function(){
		browser.get( this.state );
	};

	this.title = 'Home - MyApp';
	this.state = '/home';
};

module.exports = new HomePageObject();