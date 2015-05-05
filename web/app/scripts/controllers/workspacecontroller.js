'use strict';

angular.module('pmtoolApp')
.controller('workspaceCtrl',function ($scope, Workspace) {

	Workspace.fetch().then(function(response){
		$scope.workspaces = response;
	}).catch(function(err){
		$scope.error = err.message;
	});

	$scope.addNewWorkspace = function(data){
		Workspace.add(data).then(function(response){
			$scope.workspaces.push(response);
			$('#workspace-modal').modal('hide');
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

	$scope.deleteWorkspace = function(workspaceId){
		Workspace.delete(workspaceId).then(function(response){
			console.log(response);
			Workspace.fetch().then(function(response){
				$scope.workspaces = response;
			}).catch(function(err){
				$scope.error = err.message;
			});
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

})
