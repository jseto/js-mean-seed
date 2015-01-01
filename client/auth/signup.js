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
		data:{ pageTitle: 'Signup' }
	});
})

.controller( 'SignupCtrl', function ( $scope, $state, User ) {
	
	$scope.user = {};

	$scope.create = function(){
		$scope.createError = false;
		User.create( $scope.user, function success( value ){
//				$state.go( 'member', { user: $scope.user.user } );
				console.log( value );
			}, function error(){
				$scope.createError = true;
			}
		);
	}

	// $scope.checkPassw = function(){
	// 	return $scope.model.password == $scope.retypePassword;
	// }
});

