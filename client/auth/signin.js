'use strict';

angular.module( 'myApp.signin', [
	'lbServices',
//	'ui.state',
])

.directive('signin', function () {
    return {
        restrict: 'AC', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
        replace: false,
        templateUrl: "auth/signin.html",
        controller: 'SigninCtrl'
    }
})

.controller( 'SigninCtrl', function( $scope, User ) {
		$scope.$on('loading', function(){
			$scope.loading = true;
		});

		$scope.$on('loaded', function(){
			$scope.loading = false;
		})

		$scope.requestLogin = function( identity ) {
/*			Auth.login( identity, function( user ){
				if ( user ) {
					$state.go( 'member', { user: user } );
				}
				else {
					Auth.logout();
					$scope.user.password = '';
					alert('login failed');
				}
			});
*/		}
	}
);

