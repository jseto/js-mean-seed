'use strict';

var homePage = require('../home/home-pageobject.js');
var headerPage = require('./header-pageobject.js');
var contactPage = require('../contact/contact-pageobject.js');


describe('Header Navigation', function(){

	it('Should navigate to Home page', function () {
		browser.get('/');

		expect(
			browser.getTitle()
		).toBe( homePage.title );

		expect(
			browser.getLocationAbsUrl()
		).toBe( homePage.url );

		homePage.navigate();

		expect(
			browser.getLocationAbsUrl()
		).toBe( homePage.url );

		expect(
			headerPage.homeTab.getAttribute('class')
		).toMatch( headerPage.tabActive );

		expect(
			headerPage.contactTab.getAttribute('class')
		).not.toMatch( headerPage.tabActive );

		expect(
			headerPage.loginTab.getAttribute('class')
		).not.toMatch( headerPage.tabActive );

		expect(
			headerPage.loginPanel.isDisplayed()
		).not.toBeTruthy();
	});

	it('Should navigate to Contact by clicking', function() {
		headerPage.click( headerPage.contactTab );

		expect(
			browser.getTitle()
		).toBe( contactPage.title );

		expect(
			browser.getLocationAbsUrl()
		).toBe( contactPage.url );

		expect(
			headerPage.homeTab.getAttribute('class')
		).not.toMatch( headerPage.tabActive );

		expect(
			headerPage.contactTab.getAttribute('class')
		).toMatch( headerPage.tabActive );

		expect(
			headerPage.loginTab.getAttribute('class')
		).not.toMatch( headerPage.tabActive );

		expect(
			headerPage.loginPanel.isDisplayed()
		).not.toBeTruthy();
	});

	it('Should show Signup panel', function() {
		headerPage.click( headerPage.loginTab );
		browser.sleep(100);
		expect(
			headerPage.loginPanel.isDisplayed()
		).toBeTruthy();
	});

	it('Should navigate to home clicking the logo', function(){
		headerPage.logoTab.click();

		expect(
			browser.getTitle()
		).toBe( homePage.title );

		expect(
			browser.getLocationAbsUrl()
		).toBe( homePage.url );

		expect(
			headerPage.homeTab.getAttribute('class')
		).toMatch( headerPage.tabActive );

		expect(
			headerPage.contactTab.getAttribute('class')
		).not.toMatch( headerPage.tabActive );

		expect(
			headerPage.loginTab.getAttribute('class')
		).not.toMatch( headerPage.tabActive );

		expect(
			headerPage.loginPanel.isDisplayed()
		).not.toBeTruthy();
	});
});
