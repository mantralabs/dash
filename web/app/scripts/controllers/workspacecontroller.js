'use strict';

// angular.module('pmtoolApp')
// .controller('workspaceCtrl', function($scope, Workspace){
// 	// $scope.dropdown = function(){
// 	// 	$(".user-profile-dd").slideToggle();
// 	// };
// 	// $scope.myWorks = function () {

// 	// }

// 	// Workspace.
// });
angular.module('pmtoolApp')
.controller('workspaceCtrl',function ($scope, WorkSpace) {
	
	WorkSpace.fetch().then(function (list){
		console.log(list.data);
		$scope.workSpaces = list.data;
	});
// var dataArray = new Array;
// for(var o in dataObject) {
//     dataArray.push(dataObject[o]);
// }
})

// .controller('addWorkspace', function ($scope, WorkSpace) {

// 	$scope.createWorkspace = function(data) {
// 		WorkSpace.createWorkspace(data, function(error, data){
// 			if(error){
// 				// $scope.error = error.message;
// 				console.log('error while saving');
// 				console.log(error);
// 			} else {
// 				console.log('data saved to Repository');
// 				console.log(data);
// 			}
// 		});

// 		// UserService.updateProfile(user ,function(error, userDataResp){
// 		// 		if(error){
// 		// 			$scope.error = error.message;
// 		// 			console.log('Error while updating');
// 		// 		} else {
// 		// 			$scope.userData = userDataResp;
// 		// 			 // console.log($scope.user);
// 		// 			$cookieStore.put('current_user',$scope.userData);
// 		// 			$location.path('/profilepage');
// 		// 		}
// 		// 	});
// 	}
// })