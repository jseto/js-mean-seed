'use strict';

var ContactPageObject = function() {
	this.navigate = function(){
		browser.get( this.url );
	};

	this.title = 'Contact - MyApp';
	this.url = '/contact';
};

module.exports = new ContactPageObject();