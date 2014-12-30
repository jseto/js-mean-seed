'use strict';
var loopback = require('loopback');
var boot = require('loopback-boot');
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

// Set up the /favicon.ico
app.use(loopback.favicon());

// request pre-processing middleware
app.use(loopback.compress());


// ---------------------------------------------
// -- Add your pre-processing middleware here --
// ---------------------------------------------


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

var path = require('path');
var appClientPath = path.resolve(__dirname, '../app');
app.use(loopback.static( appClientPath ));

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
