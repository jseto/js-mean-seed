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

.controller( 'SignupCtrl', function ( $scope, $state, User, locFilter ) {
	
	$scope.user = {};
	$scope.other = {};
	$scope.alertMessage = '';

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
			User.create( $scope.user, function success() {
					$state.go( 'signupsuccess' );
				}, function error( perror ){
					console.error( perror );
					$scope.alertMessage = locFilter('signup.createError');
					$scope.user.password='';
					$scope.other.retypePassword='';
					form.$setPristine();
				}
			);
		}
	};
});

