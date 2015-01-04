'use strict';

describe('Header Navigation', function(){

	// beforeAll(function(){
	// });

	it('Should navigate to Home page', function () {
		browser.get('/');
		expect( browser.getTitle() ).toBe('Home - MyApp');
		expect( browser.getLocationAbsUrl() ).toBe('/home');
		expect( element( by.id('homeTab') ).getAttribute('class') ).toMatch(/\bactive\b/);
		expect( element( by.id('contactTab') ).getAttribute('class') ).not.toMatch(/\bactive\b/);
		expect( element( by.id('loginTab') ).getAttribute('class') ).not.toMatch(/\bactive\b/);
		console.log(element( by.id('contactTab') ).getAttribute('class'));
	});

	it('Should navigate to Contact by clicking', function() {
		element( by.id('contactTab') ).click();
		expect( browser.getTitle() ).toBe('Contact - MyApp');
		expect( browser.getLocationAbsUrl() ).toBe('/contact');
		expect( element( by.id('homeTab') ).getAttribute('class') ).not.toMatch(/\bactive\b/);
		expect( element( by.id('contactTab') ).getAttribute('class') ).toMatch(/\bactive\b/);
		expect( element( by.id('loginTab') ).getAttribute('class') ).not.toMatch(/\bactive\b/);
	});

	it('Should navigate to Home by clicking', function() {
		element( by.id('homeTab') ).click();
		expect( browser.getTitle() ).toBe('Home - MyApp');
		expect( browser.getLocationAbsUrl() ).toBe('/home');
		expect( element( by.id('homeTab') ).getAttribute('class') ).toMatch(/\bactive\b/);
		expect( element( by.id('contactTab') ).getAttribute('class') ).not.toMatch(/\bactive\b/);
		expect( element( by.id('loginTab') ).getAttribute('class') ).not.toMatch(/\bactive\b/);
	});

	it('Should navigate to Signup by clicking on popup panel', function() {
		element( by.id('loginTab') ).click();
		element( by.id('goSignup') ).click();
		expect( browser.getTitle() ).toBe('Signup - MyApp');
		expect( browser.getLocationAbsUrl() ).toBe('/signup');
		expect( element( by.id('homeTab') ).getAttribute('class') ).not.toMatch(/\bactive\b/);
		expect( element( by.id('contactTab') ).getAttribute('class') ).not.toMatch(/\bactive\b/);
		expect( element( by.id('loginTab') ).getAttribute('class') ).not.toMatch(/\bactive\b/);
	});
});
