'use strict';

var DashboardPageObject = function() {
	this.navigate = function(){
		return browser.get( this.url );
	};

	this.title = 'User dashboard - MyApp';
	this.url = '/dashboard';

	var container = element( by.css('div[ui-view]') );
};

module.exports = new DashboardPageObject(); 