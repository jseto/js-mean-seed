'use strict';

var request = require('request');
var server = require('../../server/server.js');
var project = require('../../project.conf.js');

var port = project.test.server.port;

//jasmine.getEnv().defaultTimeoutInterval = 500;

describe('Basic server responses', function() {
	var serverApp;

	beforeEach(function(){
		serverApp = server.start( port );
	});

	afterEach( function(){
		serverApp.close();
	});

	it('Should respond 200 OK for /', function(done) {
		request('http://localhost:'+port+'', function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(200);
			done();
 		});
	});

	it('Should respond 200 OK for any state', function(done) {
		request('http://localhost:'+port+'/stateA', function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(200);
			done();
 		});
	});

	it('Should respond 404 Not found for non existing css files', function(done) {
		request('http://localhost:'+port+'/a.css', function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(404);
			done();
 		});
	});

	it('Should respond 404 Not found for non existing js files', function(done) {
		request('http://localhost:'+port+'/a.js', function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(404);
			done();
 		});
	});

	it('Should respond 404 not found for non existing html files', function(done) {
		request('http://localhost:'+port+'/pepepjhk.html', function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(404);
			done();
 		});
	});

	it('Should respond 401 Unautorized looking for users', function(done) {
		request('http://localhost:'+port+'/api/users', function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(401);
			done();
 		});
	});
});

describe('Custom RESTApi endpoint "isRegistered"', function(){
	var serverApp;
	var systime = (new Date() ).getTime();
	var brandNewUser = 'foo' + systime;
 
	beforeEach(function(){
		serverApp = server.start( port );
	});

	afterEach( function(){
		serverApp.close();
	});

	it('should return 404 not found for non registered user', function(done) {
		request.get('http://localhost:'+port+'/api/users/isRegistered?username=' + brandNewUser, function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(404);
			done();
 		});
	});

	it('should return 200 found for registered user', function(done) {
		request.post('http://localhost:'+port+'/api/users', {
			form: {
				username:brandNewUser,
				password:'secret',
				email: brandNewUser + '@example.com'
			}
		}, function(error, response){
			expect( response.statusCode ).toEqual( 200 );
			request.get('http://localhost:'+port+'/api/users/isRegistered?username=' + brandNewUser, function(error, response){
				expect( error ).toBeFalsy();
				expect( response.statusCode ).toEqual(200);
				done();
	 		});
		});
	});

	it('should return 404 not found for non registered user with database populates', function(done) {
		request.post('http://localhost:'+port+'/api/users', {
			form: {
				username:'bar' + brandNewUser,
				password:'secret',
				email: brandNewUser + 'bar@example.com'
			}
		}, function(error, response){
			expect( response.statusCode ).toEqual( 200 );
			request.get('http://localhost:'+port+'/api/users/isRegistered?username=xbarr', function(error, response){
				expect( error ).toBeFalsy();
				expect( response.statusCode ).toEqual(404);
				done();
	 		});
		});

	});
});


