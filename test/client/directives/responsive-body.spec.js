'use strict';

describe('responsive-body directive', function() {
	var $compile;
	var	scope;

	var compile = function( scope, html ) {
		var element = $compile( html )(scope);
		// fire all the watches, so the scope expression {{1 + 1}} will be evaluated
		scope.$digest();
		return element;
	};

	// Load the directive module
	beforeEach(function(){
		module('myApp.responsiveBody');
	});

	// Store references to $rootScope and $compile
	// so they are available to all tests in this describe block
	beforeEach(inject(function(_$compile_, _$rootScope_){
		// The injector unwraps the underscores (_) from around the parameter names when matching
		$compile = _$compile_;
		scope = _$rootScope_;
	}));

	it('should behave properly without parameters', function() {
		var elementHtml = [
			'<div responsive-body>',
			'	<h1>Contens</h1>',
			'</div>'
		].join('\n');
		var element = compile( scope, elementHtml );
		var children = element.children().children().children();

		expect( children.eq(0).hasClass( 'col-sm-1' ) ).toBe(true);
		expect( children.eq(1).hasClass( 'col-sm-10' ) ).toBe(true);
		expect( children.eq(2).hasClass( 'col-sm-1' ) ).toBe(true);
	});

	it('should behave properly with array parameter', function() {
		var elementHtml = [
			'<div responsive-body="[2,8,2]">',
			'	<h1>Contens</h1>',
			'</div>'
		].join('\n');
		var element = compile( scope, elementHtml );
		var children = element.children().children().children();

		expect( children.eq(0).hasClass( 'col-sm-2' ) ).toBe(true);
		expect( children.eq(1).hasClass( 'col-sm-8' ) ).toBe(true);
		expect( children.eq(2).hasClass( 'col-sm-2' ) ).toBe(true);
	});

	it('should behave properly with even number parameter', function() {
		var elementHtml = [
			'<div responsive-body="6">',
			'	<h1>Contens</h1>',
			'</div>'
		].join('\n');
		var element = compile( scope, elementHtml );
		var children = element.children().children().children();

		expect( children.eq(0).hasClass( 'col-sm-3' ) ).toBe(true);
		expect( children.eq(1).hasClass( 'col-sm-6' ) ).toBe(true);
		expect( children.eq(2).hasClass( 'col-sm-3' ) ).toBe(true);
	});

	it('should behave properly with even number parameter', function() {
		var elementHtml = [
			'<div responsive-body="3">',
			'	<h1>Contens</h1>',
			'</div>'
		].join('\n');
		var element = compile( scope, elementHtml );
		var children = element.children().children().children();

		expect( children.eq(0).hasClass( 'col-sm-4' ) ).toBe(true);
		expect( children.eq(1).hasClass( 'col-sm-4' ) ).toBe(true);
		expect( children.eq(2).hasClass( 'col-sm-4' ) ).toBe(true);
	});
});
