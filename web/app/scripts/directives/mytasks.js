'use strict';

angular.module('pmtoolApp')
  .directive('myTasks', function () {
    return {
      templateUrl:'views/my-tasks.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        // element.text('this is the mytasks directive');
  //       Project.fetch().then(function(response){
		// 	$scope.projects = response;
		// }).catch(function(err){
		// 	$scope.error = err.message;
		// });

		// Project.fetchTasks().then(function(response){
		// 	console.log("fetchTasks",response)
		// 	$scope.tasks = response;
		// }).catch(function(err){
		// 	$scope.error = err.message;
		// });

		// $scope.showAssignedTask = false;
		// $scope.alltasks = true;
		// $scope.showMyTask = true;
      }
    };
  });
