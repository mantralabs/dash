'use strict';

angular.module('pmtoolApp')
  .controller('homePageCtrl', function ($scope, $cookieStore, Project) {
	$scope.responseData = {};
	$scope.info = JSON.parse(localStorage.getItem('UserDetails'));
	// console.log($scope.info);


	$scope.user = $cookieStore.get('current_user');
	console.log($scope.user);

	$scope.projects = Project.fetch();

	console.log('Home Page controller');
	$scope.addNewProject = function(){
		console.log($scope.project);
		Project.add($scope.project, function(err, project){
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