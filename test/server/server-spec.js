'use strict';

console.log('Server tests running...');

var request = require('request');
var server = require('../../server/server.js');

var port = 3300;

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

	it('Should respond 404 OK for non existing html files', function(done) {
		request('http://localhost:'+port+'/pepepjhk.html', function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(404);
			done();
 		});
	});

	it('Should respond 401 Unautorized looking for users', function(done) {
		request('http://localhost:'+port+'/api/Users', function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(401);
			done();
 		});
	});

});



