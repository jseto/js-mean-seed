'use strict';

angular.module( 'myApp.signup', [
	'lbServices',
	'ajoslin.promise-tracker',
	'ui.router'
])

.config( function ( $stateProvider ) {
	$stateProvider.state( 'signup', {
		url: '/signup',
		controller: 'SignupCtrl',
		templateUrl: 'auth/signup.html',
		data:{ pageTitle: 'signup' }
	});

	$stateProvider.state( 'signupsuccess', {
		url: '/signup-success',
		controller: 'SignupCtrl',
		templateUrl: 'auth/signup-success.html',
		data:{ pageTitle: 'signupsuccess' }
	});

	$stateProvider.state( 'verified', {
		url: '/verified',
		controller: 'SignupCtrl',
		templateUrl: 'auth/verified.html',
		data:{ pageTitle: 'login' }
	});
})

.controller( 'SignupCtrl', function ( $scope, $state, User, locFilter, promiseTracker ) {
	
	$scope.user = {};
	$scope.other = {};

	$scope.alertMessage = '';
	$scope.creatingUser = new promiseTracker();
	$scope.lookingForUser = new promiseTracker();

	$scope.checkValidity = function( form ){
		if ( form.$invalid ){
			if ( $scope.user.agreedTerms ) {
				$scope.alertMessage = locFilter('validationErrors.any');
			}
			else {
				$scope.alertMessage = locFilter('validationErrors.terms');	
			}
		}
	};

	$scope.create = function( form ){
		if ( form.$valid ) {
			$scope.createError = false;
			var newUser = User.create( $scope.user, function success() {
					$state.go( 'signupsuccess' );
				}, function error( pError ){
					console.error( pError );
					var error = pError.data.error;
					$scope.alertMessage = locFilter('signup.createError') + ' \n' + error.status + ' - ' + error.message;
					$scope.user.password='';
					$scope.other.retypePassword='';
				}
			);
			$scope.creatingUser.addPromise( newUser.$promise );
		}
	};

	$scope.isUserUnique = function( value ) {
		var result = User.isRegistered( {username:value} );
		$scope.lookingForUser.addPromise( result.$promise );
		return result.$promise;
	};
});

