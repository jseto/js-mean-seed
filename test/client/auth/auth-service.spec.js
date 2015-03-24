'use strict';

describe('Auth service', function() {
	var auth, http, User, LoopBackAuth, $rootScope, $window, $cookies;
	var access_token = 's:GO025w7FL6CFn4OuUGYlPwdcvcxk5yfgfghr4d6EmYJRclfkgKQk1nDYLpnnoD83';
	var userId = 's:3.kk8Ik0tsf54645retgjKsds16KBZ0BaIerG3na9fwyA';
	var loggedUser;

	beforeEach( function() {
		module('lbServices');
		module('myApp.auth');
		module('ngCookies');
	});

	beforeEach(function() { //mocks $window

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

		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			username: 'foo', 
			password: 'opensesame'
		}).respond( jasmine.response.responsePOST('foo') );
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			username: 'bar', 
			password: 'opensesame'
		}).respond( jasmine.response.responsePOST('bar') );
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			email: 'foo@example.com', 
			password: 'opensesame'
		}).respond( jasmine.response.responsePOST('foo') );
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			identity: 'foo',
			username: 'foo', 
			password: 'opensesame'
		}).respond( jasmine.response.responsePOST('foo') );
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			identity: 'foo@example.com',
			email: 'foo@example.com', 
			password: 'opensesame'
		}).respond( jasmine.response.responsePOST('foo') );
		http.when('POST','/api/users/login?include=user&rememberMe=true', {
			username: 'foo',
			password: 'opensesame'
		}).respond( jasmine.response.responsePOST('foo') );

		http.when('POST','/api/users/logout').respond( {}, function(){
			loggedUser = '';
		});

		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			username: 'foobar', 
			password: ''
		}).respond(401);
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			email: 'foobar@example.com', 
			password: ''
		}).respond(401);
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			identity: 'foobar',
			username: 'foobar', 
			password: ''
		}).respond(401);
		http.when('POST','/api/users/login?include=user&rememberMe=false', {
			identity: 'foobar@example.com',
			email: 'foobar@example.com', 
			password: ''
		}).respond(401);
		http.when('POST','/api/users/login?include=user&rememberMe=true', {
			username: 'foobar', 
			password: ''
		}).respond(401);

		http.when('GET', '/api/users/1').respond(jasmine.response.responseGET('foo'));
		http.when('GET', '/api/users/2').respond(jasmine.response.responseGET('bar'));
		http.when('GET', '/api/users/3').respond(jasmine.response.responseGET('social'));

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


	it('should be defined', function() {
		expect( auth ).toBeDefined();
	});

	it('does not call db if user already in the auth service', function() {
		auth.login({
			credentials: {
				username:'foo', 
				password:'opensesame' 
			}
		});
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
			auth.login({
				credentials: {
					username: 'foobar', 
					password:''
				}
			}, callback.success, callback.fail );
			http.flush();
			expect( auth.isLoggedIn() ).toBe(false);
			expect( auth.currentUser().email ).toBeFalsy();
			expect( $rootScope.$broadcast ).not.toHaveBeenCalledWith('loggedIn');
			expect( callback.success ).not.toHaveBeenCalled();
			expect( callback.fail ).toHaveBeenCalled();
		});

		it('should login registered user', function() {
			auth.login({
				credentials: {
					username:'foo', 
					password:'opensesame' 
				}
			}, callback.success, callback.fail );
			http.flush();
			expect( auth.isLoggedIn() ).toBe(true);
			expect( callback.success ).toHaveBeenCalled();
			expect( callback.fail ).not.toHaveBeenCalled();
		});

		it('currentUser should report logged in user', function(){
			auth.login({
				credentials: {
					username:'foo', 
					password:'opensesame' 
				}
			});
			http.flush();
			expect( auth.currentUser().email ).toBe('foo@example.com');
		});

		it('getUserName should report username', function() {
			auth.login({
				credentials: {
					username:'foo', 
					password:'opensesame' 
				}
			});
			http.flush();
			expect( auth.getUserName() ).toBe('foo');
		});

		it('should broadcast messages', function(){
			auth.login({
				credentials: {
					username:'foo', 
					password:'opensesame' 
				}
			});
			http.flush();
			expect( 
				$rootScope.$broadcast 
			).toHaveBeenCalledWith('loggedIn', jasmine.objectContaining( jasmine.response.responsePOST('foo').user ) );
			
			auth.logout();
			http.flush();
			expect( $rootScope.$broadcast ).toHaveBeenCalledWith('loggedOut');
		});

		it('should logout previous logged user', function() {
			auth.login({
				credentials: {
					username:'foo', 
					password:'opensesame' 
				}
			});
			http.flush();
			expect( 
				$rootScope.$broadcast 
			).toHaveBeenCalledWith('loggedIn', jasmine.objectContaining( jasmine.response.responsePOST('foo').user ) );
			$rootScope.$broadcast.calls.reset();

			auth.login({
				credentials: {
					username:'bar', 
					password:'opensesame' 
				}
			});
			http.flush();
			expect( $rootScope.$broadcast ).toHaveBeenCalledWith('loggedOut');
			expect( 
				$rootScope.$broadcast 
			).toHaveBeenCalledWith('loggedIn', jasmine.objectContaining( jasmine.response.responsePOST('bar').user ) );
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
			auth.login({
				credentials: {
					username:'foo', 
					password:'opensesame' 
				}
			});
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
			auth.login({
				credentials: {
					username:'foo', 
					password:'opensesame' 
				},
				rememberMe: true
			});
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
			).toHaveBeenCalledWith('loggedIn', jasmine.objectContaining( jasmine.response.responseGET('foo') ) );
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
			auth.login({
				credentials: {
					identity:'foo', 
					password:'opensesame' 
				}
			});
			http.flush();
			expect( auth.isLoggedIn() ).toBeTruthy();			
		});

		it('should log in with email', function(){
			auth.login({
				credentials: {
					identity:'foo@example.com', 
					password:'opensesame' 
				}
			});
			http.flush();
			expect( auth.isLoggedIn() ).toBeTruthy();			
		});

		it('should NOT log in bad user with username', function(){
			auth.login({
				credentials: {
					identity:'foobar', 
					password:'' 
				}
			});
			http.flush();
			expect( auth.isLoggedIn() ).toBeFalsy();			
		});

		it('should NOT log in bad user with email', function(){
			auth.login({
				credentials: {
					identity:'foobar@example.com', 
					password:'' 
				}
			});
			http.flush();
			expect( auth.isLoggedIn() ).toBeFalsy();			
		});

		it('should log with credential if credential field not empty', function() {
			auth.login({
				credentials: {
					identity:'foo', 
					username: 'not-valid',
					password:'opensesame' 
				}
			});
			http.flush();
			expect( auth.isLoggedIn() ).toBeTruthy();					
		});
	});

	describe('social login', function() {

		describe('when loging in', function() {
			it('should navigate to proper social login page', function(){
				auth.login({
					provider: 'google'
				});
				http.flush();
				expect( $window.location.assign ).toHaveBeenCalledWith('/auth/google');
			});

			it('should remove cookies when currentUser is called', function(){
				auth.login({
					provider: 'google'
				});
				http.flush();
				expect( $cookies.access_token ).toBeUndefined();
				expect( $cookies.userId ).toBeUndefined();
			});

			it('should report a user', function(){
				var user = auth.login({
					provider: 'google'
				});
				http.flush();
				expect( user.username ).toBe('social');
				expect( user.email ).toBe('social@example.com');
			});

			// describe('when social login fails', function() {
			// 	it('should not create cookies', function(){

			// 	});
			// });
		});
	});
});

