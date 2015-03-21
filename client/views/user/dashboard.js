'use strict';

angular.module( 'myApp.dashboard', [
	'permission',
	'angularFileUpload'
])

.config( function ( $stateProvider ) {
	$stateProvider.state( 'dashboard', {
		url: '/dashboard',
		controller: 'DashboardCtrl',
		templateUrl: 'views/user/dashboard.html',
		data: {
			pageTitle: 'dashboard',
			permissions: {
				only: [
					'loggedIn'
				],
				redirectTo: 'login'
			}
		}
	});
})

.controller( 'DashboardCtrl', function( $scope, auth, promiseTracker, FileUploader ) {
	$scope.loadingUser = promiseTracker();
	$scope.user = auth.currentUser();
	$scope.loadingUser.addPromise( $scope.user.$promise );
	$scope.pictureFile = '';

	var imagesUrl = 'users/' + auth.currentUser().id + '/images';
	$scope.uploader = new FileUploader({
		url: imagesUrl
	});

    var uploader = $scope.uploader;

        // FILTERS

        uploader.filters.push({
            name: 'customFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                return this.queue.length < 10;
            }
        });

        // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
            uploader.uploadAll();
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
            $scope.user.picture = imagesUrl + '/' + fileItem.file.name;
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);


});

