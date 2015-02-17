'use strict';

var fs = require('fs');
var bower = JSON.parse( fs.readFileSync( './.bowerrc', 'utf8' ) );

var basePath = __dirname;
var path = {
	base: basePath,
	client: basePath + '/client/',
	server: basePath + '/server/',
	common: basePath + '/common/',
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

module.exports = {
	port: 3000,
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
			path.common + '**/+(*.js|*.json)'			
		],
		docFiles: [
			path.client + '**/*.js'
		],
		lessFiles: [
			path.base + '/less/**/*.less'
		]
	},
	test:{
		unit:{
			files : [
				path.bower + 'angular/angular.js',
				path.bower + 'angular-mocks/angular-mocks.js',
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
		},
		e2e: {
			files: [
				path.test.e2e + '**/*e2e-spec.js'
			]
		},
		server: {
			port: 3300,  //should be unique
			folders: [
				path.test.server
			]
		}
	}
};
