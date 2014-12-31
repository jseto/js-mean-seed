'use strict';

describe('HeaderCtrl', function(){
	var ctrl;
	var scope = {};

	beforeEach(module('myApp.header'));

	beforeEach(inject( function( $rootScope, $controller ){
		scope = $rootScope.$new();
		ctrl = $controller('HeaderCtrl', {$scope:scope});
	}));

	it('should report proper active tab', function() {
		expect(scope.activeTab).toBeDefined();
	});

});