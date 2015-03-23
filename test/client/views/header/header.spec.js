'use strict';

describe('HeaderCtrl', function(){
	var ctrl, auth, http, $window;
	var scope = {};

	beforeEach(module('myApp.header'));

	
	beforeEach(function() { //mocks $window

		$window = { 
			location : {
				assign: jasmine.createSpy( '$window.location', ['assign'] )
			},
		};

		module(function($provide) { 
        	$provide.value('$window', $window);
        });
	});

	beforeEach(inject( function( $rootScope, $controller, _$httpBackend_, _auth_ ){
		scope = $rootScope.$new();
		ctrl = $controller('HeaderCtrl', {$scope:scope});
		auth = _auth_;
		http = _$httpBackend_;
	}));

	it('should report proper active tab', function() {
		expect(
			scope.activeTab
		).toBeDefined();
		
		scope.$emit( '$stateChangeSuccess', { name: 'test' } );

		expect(
			scope.activeTab('test')
		).toBeTruthy();

		expect(
			scope.activeTab('fail')
		).toBe('');
	});

	describe('user tab', function() {

		beforeEach(function() {
			http.when('POST','/api/users/login?include=user&rememberMe=false', {
				username: 'foo', 
				password: 'opensesame'
			}).respond( jasmine.response.responsePOST('foo') );

			http.when('POST','/api/users/login?include=user&rememberMe=false', {
				username: 'social', 
				password: 'opensesame'
			}).respond( jasmine.response.responsePOST('social') );
		
			http.when('POST','/api/users/logout').respond( {}, function(){
			});

			http.when('GET', '/auth/logout').respond(200);
		});

		afterEach(function() {
			if (auth.isLoggedIn()){
				auth.logout();
				http.flush();
			}
			http.verifyNoOutstandingExpectation();
			http.verifyNoOutstandingRequest();
		});

		it('should show logged in member in user tab', function(){
			auth.login( false, { username:'social', password:'opensesame' } );
			http.flush();
			expect( scope.username ).toBe('social');
			expect( scope.loggedIn ).toBe( true );
		});

		it('should construct displayName if empty for logged in member in user tab', function(){
			auth.login( false, { username:'foo', password:'opensesame' } );
			http.flush();
			expect( scope.username ).toBe('foo');
		});

		it('should not show userTab when logged out', function(){
			expect( scope.loggedIn ).toBeFalsy();
		})
	});

});