'use strict';

angular.module('pmtoolApp')
.controller('workspaceCtrl',function ($scope, Workspace, $rootScope, $routeParams, $location, UserService, $cookieStore) {

	$scope.user = $rootScope.user;

	Workspace.fetch().then(function(response){
		$scope.workspaces = response;
	}).catch(function(err){
		$scope.error = err.message;
	});

	$scope.addNewWorkspace = function(data){
		Workspace.add(data).then(function(response){
			$scope.workspaces.push(response);
			$('#workspace-modal').modal('hide');
			// $('#workspace-input').val('');
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

	$scope.deleteWorkspace = function(workspaceId){
		if (window.confirm('Delete!! Are You Sure?')){
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
	}

	$scope.workspaceRedirect = function(){
		$('#project-modal').modal('hide');
		$('div').removeClass('modal-backdrop fade in')
		$location.path('/workspaces');
	}

})

.controller('getWorkspaceController', function ($scope, Workspace, $rootScope, $routeParams) {

	Workspace.fetchWorkspace($routeParams.id)
		.then(function(response){
			$scope.workspace = response;
			$scope.projects = response[0].projects;
		})
		.catch(function(err){
			console.log(err);
			$scope.error = err.message;
		});

		$scope.editWorkspace = function(workspaceName){
			Workspace.edit({"name":workspaceName})
			.then(function(response){
				// $scope.workspace = response;
				// $scope.projects = response[0].projects;
				Workspace.fetchWorkspace($routeParams.id)
					.then(function(response){
						$scope.workspace = response;
						$scope.projects = response[0].projects;
					})
					.catch(function(err){
						console.log(err);
						$scope.error = err.message;
					});
				$('#edit-workspace-modal').modal('hide');
			})
			.catch(function(err){
				$scope.error = err.message;
				console.log($scope.error);
			});
		};
	}
)