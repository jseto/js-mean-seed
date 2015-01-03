'use strict';

describe('HeaderCtrl', function(){

	beforeEach(function(){
		browser.get('index.html');
	});

	it('Test array key', function () {
		expect( browser.getTitle() ).toBe('Home - MyApp');
	});
});
