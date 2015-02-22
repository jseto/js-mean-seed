'use strict';
var loopback = require('loopback');
var boot = require('loopback-boot');
var path = require('path');
var app = module.exports = loopback();

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

// attempt to build the providers/passport config
var passportConfig = {};
try {
	passportConfig = require('../server/providers.json');
} catch (err) {
	console.trace(err);
	process.exit(1); // fatal
}

// ---------------------------------------------
// -- Add your pre-processing middleware here --
// ---------------------------------------------
var helmet = require('helmet');
app.use(helmet()); //deals with security issues

// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

var clientPath = path.resolve(__dirname, '../client');

app.use( loopback.static( clientPath));

// boot scripts mount components like REST API
boot(app, __dirname);

// The access token is only available after boot
app.use(loopback.token({
  model: app.models.accessToken
}));

app.use(loopback.cookieParser(app.get('cookieSecret')));
app.use(loopback.session({
	secret: 'kitty',
	saveUninitialized: true,
	resave: true
}));

passportConfigurator.init();

passportConfigurator.setupModels({
	userModel: app.models.user,
	userIdentityModel: app.models.userIdentity,
	userCredentialModel: app.models.userCredential
});

for (var s in passportConfig) {
	var c = passportConfig[s];
	c.session = c.session !== false;
	passportConfigurator.configureProvider(s, c);
}

//var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.all('/*', function(req, res) {
	if ( req.path.indexOf('.') < 0 ) {
  		res.sendFile('index.html',{ root: clientPath });
 	}
 	else {
	  res.sendStatus(404);
 	}
});

// Requests that get this far won't be handled
// by any middleware. Convert them into a 404 error
// that will be handled later down the chain.
app.use(loopback.urlNotFound());

// The ultimate error handler.
app.use(loopback.errorHandler());

app.start = function(port) {
  	return app.listen(port,function() {
		if (process.send){
			process.send({ message: 'started'});
		} 
		else {
	    	app.emit('started');
	    }
	    console.log('Web server listening at: %s', app.get('url'));
  	})
  	.on('error', function( error ){
		if (process.send){
			process.send({ 
				message: 'error',
				error: error
			});
		}
		else{
			app.emit('error', error );
		}
  	});
};

// start the server if `$ node server.js`
if (require.main === module) {
	var port = process.argv[2] || 3000;
	app.start( port );
}
