'use strict';

angular.module('pmtoolApp')
  .controller('homePageCtrl', function ($scope, $cookieStore, Project) {
	$scope.responseData = {};
	$scope.info = JSON.parse(localStorage.getItem('UserDetails'));
	// console.log($scope.info);

	$scope.user = $cookieStore.get('current_user');

	$scope.projects = Project.fetch();

	$scope.addNewProject = function(data){
		console.log(data);
		// console.log('addNewProject()');
		console.log($scope.projects);
		Project.add(data, function(err, project){
			console.log(project);
			console.log(err);
		})
	}
	//current user
	 // $cookieStore = $scope.user;
		// //log in user
		// if($scope.user){
		// 	var user_id = $scope.user.id ;
		// }
});