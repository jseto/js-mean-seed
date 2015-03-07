'use strict';

var dashboardPage = require('./dashboard-pageobject.js');
var signinPage = require('../../auth/login-pageobject.js');

describe('Dashboard page', function(){

	dashboardPage.navigate();

	it('should be logged in to navigate to dashboard page', function () {
		signinPage.verifyLogin();

		expect(	// proper page title
			browser.getTitle() 
		).toBe( dashboardPage.title );
		
		expect(	// proper page state
			browser.getLocationAbsUrl() 
		).toBe( dashboardPage.url );
		
	});

});
