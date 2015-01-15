'use strict';

angular.module( 'myApp.footer', [
])

.directive('footer', function () {
	return {
		scope : {
			footer: '@'
		},
		restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
		replace: false,
		templateUrl: 'views/footer/footer.html',
		controller: 'FooterCtrl'
	};
})

.controller( 'FooterCtrl', function FooterController( $scope, $timeout ) {

	//this code hides footer when changing page. It is intended to allow smooth animated page transitions
	$scope.hide = false;

	$scope.$on('$stateChangeStart', function(){
		$scope.hide=true;
	});

	$scope.$on('$stateChangeSuccess', function(){
		$timeout( function(){
			$scope.hide=false;
		}, parseInt( $scope.footer ) + 50 );
	});
});

