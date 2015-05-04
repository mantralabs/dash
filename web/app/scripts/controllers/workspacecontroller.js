'use strict';

angular.module('pmtoolApp')
.controller('workspaceCtrl',function ($scope, WorkSpace) {

	$scope.addNewWorkspace = function(data){
		console.log(data);
		console.log('addNewWorkspace()');
		WorkSpace.add(data, function(err, projects){
			console.log(projects);
			console.log(err);
			// $scope.workSpaces = projects
		})
	}

	WorkSpace.fetch().then(function (list){
		$scope.workSpaces = list.data;
	})

	$scope.deleteWorkspace = function(workspaceId){
		console.log(workspaceId);
		console.log('deleteWorkspace()');
		WorkSpace.delete(workspaceId, function(err, projects){
			console.log(projects);
			console.log(err);
			$scope.workSpaces = projects
		})
	}

})
