'use strict';

angular.module( 'myApp.signinPanel', [
])

.config( function ( $stateProvider ) {
	$stateProvider.state( 'signin', {
		url: '/signin',
		controller: 'SigninPanelCtrl',
		templateUrl: 'auth/signin.html',
		data:{ pageTitle: 'signin' }
	});
	
	$stateProvider.state( 'signinfailed', {
		url: '/signin-failed',
		controller: 'SigninPanelCtrl',
		templateUrl: 'auth/signin-failed.html',
		data:{ pageTitle: 'signinFailed' }
	});
})

.directive('signinPanel', function () {
    return {
        restrict: 'AC', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false,
        templateUrl: 'auth/signin-panel.html',
        controller: 'SigninPanelCtrl'
    };
})

.controller( 'SigninPanelCtrl', function( $scope, $state, auth, promiseTracker ) {
	$scope.user = {};
	$scope.loginIn = promiseTracker({activationDelay:250});
	$scope.loginFailed = false;

	$scope.$watch('user.password', function( value ){
		if ( value ) {
			$scope.loginFailed = false;
		}
	});

	$scope.formClicked = function( event ){
	    //event.preventDefault();
    	event.stopPropagation();
	};

	$scope.requestLogin = function( social ) {
		var logedUser = auth.login( $scope.rememberMe, social || $scope.user, 
			function success(){
				$state.go( 'dashboard' );
			},
			function error(){
		 		$scope.user.password = '';
				$scope.loginFailed = true;
			}
		);
		$scope.loginIn.addPromise( logedUser.$promise );
	};
});

