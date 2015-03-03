'use strict';

var walk = require('walk');

var fs = require('fs');
var bower = JSON.parse( fs.readFileSync( './.bowerrc', 'utf8' ) );

var basePath = __dirname;
var path = {
	base: basePath,
	client: basePath + '/client/',
	server: basePath + '/server/',
//	common: basePath + '/common/',
	test: {
		base: basePath + '/test/',
		client: basePath + '/test/client/',
		server: basePath + '/test/server/',
		e2e: basePath + '/test/client/',
	},
	bower: basePath + '/' + bower.directory + '/',
	docs: basePath + '/docs/',
	coverage: basePath + '/coverage/'
};

var buildSuites = function(){
	var suites = {};
	var options = {};
	options.listeners = {};

	options.listeners.directories = function(root, dirArray, next ){
		dirArray.forEach( function( value ){
			var pre = root.substr( root.indexOf(path.test.client)+ path.test.client.length );
			pre += pre? ':' : '';
			suites[ pre + value.name ] = root + '/' + value.name + '/**/*e2e-spec.js';
		});
		next();
	};

	walk.walkSync( path.test.client.slice(0,-1), options );

	return suites;
};

var karmaPreprocessors = {};
karmaPreprocessors[ path.test.base + '**/*.html' ] = 'ng-html2js';
karmaPreprocessors[ path.base + '/{client,client/!(models|bower_components)/**}/*.js' ] = 'coverage';

module.exports = {
	port: 3000,
	testPort: 3003,
	proxy: {
		host: 'http://localhost',
		port: 3030
	},
	path: path,
	appLess: path.base + '/less/app.less',
	appCss: path.client,
	watch: {
		servedFiles: [
			path.client + '**/+(*.js|*.html|*.css)',
			'!' + path.bower + '**/+(*.js|*.html|*.css)',			//excluded
		],
		serverFiles: [
			path.server + '**/+(*.js|*.json|*.ejs|*.jade)',
		],
		docFiles: [
			path.client + '**/*.js'
		],
		lessFiles: [
			path.base + '/less/**/*.less'
		],
		modelFiles: [
			path.base + '/common/models/**/+(*.js|*.json)'
		]
	},
	test:{
		unit:{
			files : [
				path.bower + 'angular/angular.js',
				path.bower + 'angular-mocks/angular-mocks.js',
				path.bower + 'angular-resource/angular-resource.js',
				path.bower + 'js-lib/lib/**/*.js',
				path.client + 'views/**/*.js',
				path.client + 'auth/**/*.js',
				path.client + 'models/**/*.js',
				path.client + 'directives/**/*.js',
				path.client + '*.js',
				path.test.client + '/**/*.js'
			],
			exclude : [
				path.test.client + '**/*.conf.js',
				path.test.client + '**/*e2e-spec.js',
				path.test.client + '**/*pageobject.js'
		    ],
		    preprocessors: karmaPreprocessors
		},
		e2e: {
			files: [
				path.test.e2e + '**/*e2e-spec.js'
			],
			suites: buildSuites()
		},
		server: {
			port: 3300,  //should be unique
			folders: [
				path.test.server
			]
		}
	}
};
