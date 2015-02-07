'use strict';

angular.module( 'myApp.signin', [
])

.directive('signin', function () {
    return {
        restrict: 'AC', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false,
        templateUrl: 'auth/signin.html',
        controller: 'SigninCtrl'
    };
})

.controller( 'SigninCtrl', function( $scope, $state, User, promiseTracker ) {
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

	$scope.requestLogin = function() {
		var logedUser = User.login( $scope.user, 
			function success(){
				$state.go( 'dashboard' );
			},
			function error(){
		 		$scope.user.password = '';
				$scope.loginFailed = true;
			});
		$scope.loginIn.addPromise( logedUser.$promise );
	};
});

