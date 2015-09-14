'use strict';

angular.module('pmtoolApp')
	.controller('sprintCtrl', function ($scope, $routeParams, $location, Sprint, $rootScope) {

	var getSprint = function(){
  		Sprint.getSprintDetails($routeParams.id)
	  	.then(function(response){
	  		$rootScope.sprint = response;
	  		// $scope.sprint = $rootScope.sprint;
	  		console.log('$rootScope.sprint',$rootScope.sprint);
	  		$scope.editSprintData = response;
	  		// $scope.backlogs = response.backlogs;
	  	}).catch(function(err){
	  		$scope.error = err.message;
	  	});
  	}
  	getSprint();

});