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
.controller('workspaceCtrl',function ($scope, Workspace){
	
	Workspace.fetch().then(function (list){
		console.log(list.data);
		$scope.workSpaces = list.data;
	});
// var dataArray = new Array;
// for(var o in dataObject) {
//     dataArray.push(dataObject[o]);
// }
})