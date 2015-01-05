'use strict';

var ContactPageObject = function() {
	this.navigate = function(){
		browser.get( this.state );
	};

	this.title = 'Contact - MyApp';
	this.state = '/contact';
};

module.exports = new ContactPageObject();