'use strict';

module.exports = function fileStore( app ) {
	var multer = require('multer');
	var fs = require('fs');
	var path = require('path');
	var project = require('../../project.conf.js');


	app.use( multer({
		changeDest: function( dest, req ){
			var pDest = picturesFolder( req.path );
			createFolder( pDest );
			return pDest;
		},
		rename: function( fieldname, filename ){
			return filename;
		}
	}));

	app.param('id', function (req, res, next) {
		next();
	});

	app.param('filename', function (req, res, next) {
		next();
	});

	app.post('/users/*', function(req, res){
		res.send('');	
	});

	app.get('/users/:id/images/:filename', function( req, res ){
		console.log('----',req.user)
		
		var user = app.model.users;

  		if ( req.isAuthenticated && req.isAuthenticated()) {
			res.sendFile( picturesFolder( req.path ) + '/' + req.params.filename );
		}
		else {
			res.sendStatus(401);
		}
	});




	//------------------------------------------------------
	// Implementation detail
	//------------------------------------------------------

	function userFolder( user ){
		return ( +user % 10 ) + '/' + user;
	}

	function createFolder( dirPath ) {
		try {
			fs.mkdirSync(dirPath);
		} catch (error) {
			if ( error.errno === 34 ) {
				createFolder( path.dirname(dirPath ) );
				createFolder( dirPath );
			}
		}
	}

	function picturesFolder( fpath ){
		var user = fpath.replace( '/users/', '' );
		user = user.slice( 0, user.indexOf('/images') );
		return project.path.fileStore + userFolder( user );
	}
};