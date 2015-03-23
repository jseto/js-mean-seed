'use strict';

angular.module( 'myApp.auth', [
	'lbServices', 
	'ngCookies'
])
.factory( 'auth', function( $rootScope, $q, $cookies, $window, User, LoopBackAuth, $http ){
	var _user = null;
	var _username = '';

	var getCurrentUser = function(_user, defer){
		//var cookies = $cookies.getAll();   //only available on Angular v.1.4.0
		if ( $cookies.access_token ){
			LoopBackAuth.currentUserId = $cookies.userId.substr( 2, $cookies.userId.indexOf('.')-2 );
			LoopBackAuth.accessTokenId = $cookies.access_token.substr( 2, 64 );
			delete $cookies.userId;
			delete $cookies.access_token;
			LoopBackAuth.save();
		}

		User.getCurrent( 
			function success( data ){
				var dataUser;
				if ( data.user ){
					dataUser = data.user;
				}
				else {
					dataUser = data;
				}
				angular.extend( _user, dataUser );
				defer.resolve( dataUser );
				_user.$resolved = true;
				_username = _user.username;
				$rootScope.$broadcast('loggedIn', _user );
			},
			function error( data ){
				defer.reject( data );
				_user.$resolved = true;
			}
		);
	};

	return {
		login: function( rememberMe, userCredentials, success, error ){
			this.logout();
			
			var defer = $q.defer();

			_user = {};
			_user.$promise = defer.promise;
			_user.$resolved = false;
			if ( typeof userCredentials === 'string' ){
				//social login
				$window.location.assign( '/auth/' + userCredentials );
				getCurrentUser(_user, defer);
			}
			else {
				if ( userCredentials.credential ) {
					if ( userCredentials.credential.indexOf('@') > 0 ){
						userCredentials.email = userCredentials.credential;
					} 
					else {
						userCredentials.username = userCredentials.credential;	
					}
				}

				User.login({
						rememberMe: rememberMe || false
					}, 
					userCredentials, 
					function _success( data ){
						angular.extend( _user, data.user );
						defer.resolve( data.user );
						_user.$resolved = true;
						_username = _user.username;
						$rootScope.$broadcast('loggedIn', _user );
						if ( success ) success( data );
					}, 
					function _error( data ){
						defer.reject( data );
						_user.$resolved = true;
						if ( error ) error( data );
					}
				);
			}
			return _user;
		},

		logout: function() {
			if ( _user ) {
				User.logout();
				this.clean();
//				$window.location.assign( '/auth/logout' );
				$http.get('/auth/logout')
				$rootScope.$broadcast('loggedOut' );
    		}
		},

		isLoggedIn: function() {
//			this.currentUser();
			return _username !== '';
		},

		currentUser: function(){
			if ( !_user || $cookies.access_token ) {
				var defer = $q.defer();

				_user = {};
				_user.$promise = defer.promise;
				_user.$resolved = false;
				getCurrentUser(_user,defer);
			}
			return _user;
		},

		getUserName: function() {
			return _username;
		},

		clean: function(){		//public for testing purposes
			_user = null;
			_username = '';
		}
	};
});