'use strict';

angular.module( 'myApp.signup', [
	'lbServices',
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

.controller( 'SignupCtrl', function ( $scope, $state, User ) {
	
	$scope.user = {};

	$scope.create = function(){
		$scope.createError = false;
		User.create( $scope.user, function success( value ) {
				$state.go( 'signupsuccess' );
			}, function error(){
				$scope.createError = true;
			}
		);
	};
});

