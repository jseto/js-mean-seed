'use strict';

angular.module( 'myApp.footer', [
])

.directive('footer', function () {
	return {
		restrict: 'A', //This menas that it will be used as an attribute and NOT as an element. I don't like creating custom HTML elements
		replace: false,
		templateUrl: "footer/footer.html",
		controller: 'FooterCtrl'
	}
})

.controller( 'FooterCtrl', function FooterController( $scope ) {
});

