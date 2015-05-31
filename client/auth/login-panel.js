'use strict';

angular.module( 'myApp.loginPanel', [
])

.config( function ( $stateProvider ) {
	$stateProvider.state( 'login', {
		url: '/login',
		controller: 'LoginPanelCtrl',
		templateUrl: 'auth/login.html',
		data:{ pageTitle: 'login' }
	});

	$stateProvider.state( 'loginfailed', {
		url: '/login-failed',
		controller: 'LoginPanelCtrl',
		templateUrl: 'auth/login-failed.html',
		data:{ pageTitle: 'loginFailed' }
	});
})

.directive('loginPanel', function () {
    return {
        restrict: 'AC',
        replace: false,
        templateUrl: 'auth/login-panel.html',
        controller: 'LoginPanelCtrl'
    };
})

.controller( 'LoginPanelCtrl', function( $scope, $state, auth, promiseTracker ) {
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
		var logedUser = auth.login({
				rememberMe: $scope.rememberMe,
				provider: social || 'local',
				credentials: $scope.user
			},
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
