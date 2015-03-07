'use strict';

describe('Auth service', function() {
	var auth, http, User, LoopBackAuth, $rootScope, response, loggedUser, $window, $cookies;
	var access_token = 's:GO025w7FL6CFn4OuUGYlPwdcvcxk5yfgfghr4d6EmYJRclfkgKQk1nDYLpnnoD83';
	var userId = 's:2.kk8Ik0tsf54645retgjKsds16KBZ0BaIerG3na9fwyA';

	beforeEach( function() {
		module('lbServices');
		module('myApp.auth');
		module('ngCookies');
	});

	beforeEach(function() { //mocks $window
//		$cookies = jasmine.createSpyObj( '$cookies', ['get', 'put', 'remove'] );

		$window = { 
			location : {
				assign: jasmine.createSpy( '$window.location', ['assign'] ).and.callFake( function( data ){
					if ( data == '/auth/google' ) {
						$cookies.access_token = access_token;
						$cookies.userId = userId;
					}
					else {
						delete $cookies.access_token;
						delete $cookies.userId;
					}
				})
			},
		};


		module(function($provide) { 
        	$provide.value('$window', $window);
        });
	});

	beforeEach( inject( function( _$rootScope_, _$httpBackend_, _auth_, _User_, _LoopBackAuth_, _$cookies_ ){
		http = _$httpBackend_;
		auth = _auth_;
		User = _User_;
		LoopBackAuth = _LoopBackAuth_;
		$rootScope = _$rootScope_;
		$cookies = _$cookies_;
	}));

	beforeEach(function(){
		spyOn($rootScope, '$broadcast' );
	});

	beforeEach(function(){
		response = function( who ) {
			loggedUser = 1 + (who === 'bar');
			return {
				'id': who + 'lvCSX1juCWzSGZpWGIXlJuJjr1S5Si0rw4333IaR3tPYGiByd1QQj34kRgaSG',
				'ttl':1209600,
				'created':'2015-02-23T17:53:44.598Z',
				'userId': 1 + (who === 'bar'),
				'user':{
					'username': who,
					'email': who + '@example.com',
					'emailVerified':true,
					'id': loggedUser
				}
			};
		};

		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			username: 'foo', 
			password: 'opensesame'
		}).respond( response('foo') );
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			username: 'bar', 
			password: 'opensesame'
		}).respond( response('bar') );
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			email: 'foo@example.com', 
			password: 'opensesame'
		}).respond( response('foo') );
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			credential: 'foo',
			username: 'foo', 
			password: 'opensesame'
		}).respond( response('foo') );
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			credential: 'foo@example.com',
			email: 'foo@example.com', 
			password: 'opensesame'
		}).respond( response('foo') );
		http.when('POST','/api/users/login?include=user&rememberMe=true', {
			username: 'foo',
			password: 'opensesame'
		}).respond( response('foo') );

		http.when('POST','/api/users/logout').respond( {}, function(){
			loggedUser = '';
		});

		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			username: 'foobar', 
			password: ''
		}).respond(401);
		http.when('POST','/api/users/login?include=user&rememberMe=true', {
			username: 'foobar', 
			password: ''
		}).respond(401);

		http.when('GET', '/api/users/1').respond(response('foo'));
		http.when('GET', '/api/users/2').respond(response('bar'));
	});

	afterEach(function() {
		if (auth.isLoggedIn()){
			auth.logout();
			http.flush();
		}
		http.verifyNoOutstandingExpectation();
		http.verifyNoOutstandingRequest();
	});


	it('service should be defined', function() {
		expect( auth ).toBeDefined();
	});

	it('does not call db if user already in the auth service', function() {
		auth.login(false, { username:'foo', password:'opensesame' });
		http.flush();
		expect( auth.currentUser().email ).toBe('foo@example.com');
		//No flush. We want to be sure no request has been done when calling auth.currentUser
	});

	describe('when nobody logged and not remembered', function() {

		it('should report user not logged in', function() {
			expect( auth.isLoggedIn() ).toBe( false );
		});

		it('current user should return null user', function() {
			expect( auth.currentUser().email ).toBeFalsy();
		});

		it('should report null for getUsername', function() {
			expect( auth.getUserName() ).toBeFalsy();
		});
	});

	describe('login user', function() {
		var callback;

		beforeEach(function() {
			callback = jasmine.createSpyObj('callback',['success', 'fail']); 	
		});

		it('should NOT login unregistered user', function() {
			auth.login( false, {username:'foobar', password:''}, callback.success, callback.fail );
			http.flush();
			expect( auth.isLoggedIn() ).toBe(false);
			expect( auth.currentUser().email ).toBeFalsy();
			expect( $rootScope.$broadcast ).not.toHaveBeenCalledWith('loggedIn');
			expect( callback.success ).not.toHaveBeenCalled();
			expect( callback.fail ).toHaveBeenCalled();
		});

		it('should login registered user', function() {
			auth.login( false, { username:'foo', password:'opensesame' }, callback.success, callback.fail );
			http.flush();
			expect( auth.isLoggedIn() ).toBe(true);
			expect( callback.success ).toHaveBeenCalled();
			expect( callback.fail ).not.toHaveBeenCalled();
		});

		it('currentUser should report logged in user', function(){
			auth.login( false, { username:'foo', password:'opensesame' } );
			http.flush();
			expect( auth.currentUser().email ).toBe('foo@example.com');
		});

		it('getUserName should report username', function() {
			auth.login( false, { username:'foo', password:'opensesame' } );
			http.flush();
			expect( auth.getUserName() ).toBe('foo');
		});

		it('should broadcast messages', function(){
			auth.login( false, { username:'foo', password:'opensesame' } );
			http.flush();
			expect( 
				$rootScope.$broadcast 
			).toHaveBeenCalledWith('loggedIn', jasmine.objectContaining( response('foo').user ) );
			
			auth.logout();
			http.flush();
			expect( $rootScope.$broadcast ).toHaveBeenCalledWith('loggedOut');
		});

		it('should logout previous logged user', function() {
			auth.login( false, { username:'foo', password:'opensesame' } );
			http.flush();
			expect( 
				$rootScope.$broadcast 
			).toHaveBeenCalledWith('loggedIn', jasmine.objectContaining( response('foo').user ) );
			$rootScope.$broadcast.calls.reset();

			auth.login( false, { username:'bar', password:'opensesame' } );
			http.flush();
			expect( $rootScope.$broadcast ).toHaveBeenCalledWith('loggedOut');
			expect( 
				$rootScope.$broadcast 
			).toHaveBeenCalledWith('loggedIn', jasmine.objectContaining( response('bar').user ) );
		});

	});

	describe('using remember', function() {
		var checkStorage = function( storage ) {
			expect( storage.$LoopBack$accessTokenId ).toBeTruthy();
			expect( storage.$LoopBack$currentUserId ).toBeTruthy();
		};
		var checkNoStorage = function( storage ) {
			expect( storage.$LoopBack$accessTokenId ).toBeFalsy();
			expect( storage.$LoopBack$currentUserId ).toBeFalsy();
		};

		it('sould not remember when not rememberMe', function(){
			auth.login( false, {username:'foo', password:'opensesame'} );
			http.flush();

			checkNoStorage( localStorage );

			auth.logout();
			http.flush();

			checkNoStorage( localStorage );

			expect( LoopBackAuth.currentUserData ).toBeFalsy();
			expect( LoopBackAuth.rememberMe ).toBeFalsy();
			expect( auth.currentUser().email).toBeUndefined();
		});

		it('sould remember when rememberMe', function(){
			auth.login( true, {username:'foo', password:'opensesame'} );
			http.flush();

			checkStorage( localStorage );

			auth.clean();	//simulate close session

			var user = auth.currentUser();
			http.flush();

			expect( LoopBackAuth.currentUserData ).toBeTruthy();			
			expect( LoopBackAuth.rememberMe ).toBeTruthy();
			expect( user.email ).toBe('foo@example.com');
			expect( 
				$rootScope.$broadcast 
			).toHaveBeenCalledWith('loggedIn', jasmine.objectContaining( response('foo').user ) );
		});

		it('sould NOT remember after logout rememberMe', function(){
			checkNoStorage( localStorage );

			expect( LoopBackAuth.currentUserData ).toBeFalsy();			
			expect( LoopBackAuth.rememberMe ).toBeFalsy();
			expect( auth.currentUser().email ).toBeUndefined();
		});
	});

	describe('accepts several user identities', function(){
		it('should log in with username', function(){
			auth.login( false, {username:'foo', password:'opensesame'} );
			http.flush();
			expect( auth.isLoggedIn() ).toBeTruthy();			
		});

		it('should log in with email', function(){
			auth.login( false, {email:'foo@example.com', password:'opensesame'} );
			http.flush();
			expect( auth.isLoggedIn() ).toBeTruthy();			
		});

		it('should log in with credential as username', function(){
			auth.login( false, {credential:'foo', password:'opensesame'} );
			http.flush();
			expect( auth.isLoggedIn() ).toBeTruthy();			
		});

		it('should log in with credential as email', function(){
			auth.login( false, {credential:'foo@example.com', password:'opensesame'} );
			http.flush();
			expect( auth.isLoggedIn() ).toBeTruthy();			
		});

		it('should log only with credential if credential field not empty', function() {
			auth.login( false, {credential:'foo', username:'not valid', password:'opensesame'});
			http.flush();
			expect( auth.isLoggedIn() ).toBeTruthy();					
		});
	});

	describe('social login', function() {

		describe('when loging in', function() {
			it('should navigate to proper social login page', function(){
				auth.login( false, 'google' );
				http.flush();
				expect( $window.location.assign ).toHaveBeenCalledWith('/auth/google');
			});

			it('should remove cookies when currentUser is called', function(){
				auth.login( false, 'google' );
				http.flush();
				expect( $cookies.access_token ).toBeUndefined();
				expect( $cookies.userId ).toBeUndefined();
			});

			it('should report a user', function(){
				var user = auth.login( false, 'google' );
				http.flush();
				expect( user.username ).toBe('bar');
				expect( user.email ).toBe('bar@example.com');
			});

			// describe('when social login fails', function() {
			// 	it('should not create cookies', function(){

			// 	});
			// });
		});
	});
});

