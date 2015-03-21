'use strict';

var request = require('request');
var fs = require('fs');

var server = require('../../server/server.js');
var project = require('../../project.conf.js');

var port = project.test.server.port;

describe('Upload', function(){
	var serverApp;

	var formData = {
		my_file: fs.createReadStream( project.path.test.base  + 'data/test.jpg'),
	};

	beforeEach(function(){
		serverApp = server.start( port, true );
	});

	afterEach( function(){
		serverApp.close();
	});

	it('should store a image', function( done ) {
		request.post('http://localhost:'+port+'/users/4/images', {
			formData: formData,
		}, function(error, response){
			expect( error ).toBeFalsy();
			expect( response.statusCode ).toEqual(200);
			done();
 		});
	});

	it('should NOT retrieve an image if not loggedIn', function( done ) {
		request.get('http://localhost:'+port+'/users/4/images/test.jpg', function(error, response){
			expect( response.statusCode ).toEqual(401);
			done();
 		});
	});

	it('should retrieve an stored image', function( done ) {
		request.post('http://localhost:'+ port + '/api/users/login?include=user&rememberMe=false',{
			form: {
					credential: 'foo',
					password: 'opensesame',
					username: 'foo'
			}
		}, function( error, response ){
			request({
				method: 'GET',
				uri: 'http://localhost:'+port+'/users/4/images/test.jpg',
				headers: {
					Authorization: JSON.parse(response.body).id
				}
			}, function(error, response){
				expect( error ).toBeFalsy();
				expect( response.statusCode ).toEqual(200);
				done();
	 		});
		});
	});
});


