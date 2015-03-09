'use strict';

//Create a Loopback user from social profile

function profileToUser(provider, profile) {
	var email = profile.emails && profile.emails[0] && profile.emails[0].value;
	if (!email) {
		// Fake an e-mail
		email = (profile.username || profile.id) + '@loopback.' +
						(profile.provider || provider) + '.com';
	}
	var username = provider + '.' + (profile.username || profile.id);
//	var password = utils.generateKey('password');
	var userObj = {
		username: username,
		password: String(Math.random()).substr(2),
		email: email,
		displayName: profile.displayName,
		gender: profile.gender || profile._json.gender,
		picture: ( profile.photos && profile.photos[0].value ) || profile._json.picture,
		locale: (profile._json.locale && profile._json.locale.substr( 0, 2 ) ) || profile._json.lang,
	};
	var socialLink = profile._json.link || (provider === 'twitter' && profile.username );
	if (socialLink){
		userObj.profileLink = {};
		userObj.profileLink[ provider ] = socialLink;
	}
	return userObj;
}

module.exports = profileToUser;