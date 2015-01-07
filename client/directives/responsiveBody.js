'use strict';

angular.module( 'myApp.responsiveBody', [
])

.directive('responsiveBody', function(){
	return {
		restrict: 'EA', // E = Element, A = Attribute, C = Class, M = Comment
		template: 
			'<div class="container">				'+
			'	<div class="row">					'+
			'		<div class="col-sm-1"></div>	'+
			'		<div class="col-sm-10">			'+
			'			<div ng-transclude></div>	'+
			'		</div>							'+
			'	</div>								'+
			'</div>									',
		replace: false,
		transclude: true
	};
});