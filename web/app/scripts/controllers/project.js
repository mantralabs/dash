'use strict';

angular.module('pmtoolApp')
  .controller('projectController', function ($scope, $cookieStore, Project, Contact, $rootScope, $routeParams) {
	
	$scope.user = $rootScope.user;
	 // $scope.tasks = [];

	Project.fetch().then(function(response){
		$scope.projects = response;
		console.log("$scope.projects",$scope.projects)	
	}).catch(function(err){
		$scope.error = err.message;
	});

	Project.fetchTasks().then(function(response){
		$scope.tasks = response;
		console.log("$scope.tasks",$scope.tasks)	
	}).catch(function(err){
		$scope.error = err.message;
	});
$scope.assignedTask = function(){
	$scope.tasks = [];
	Project.fetchTasksAssigned().then(function(response){
		$scope.tasks = response;
		// console.log("$scope.tasksAssigned",$scope.tasksAssigned)	
	}).catch(function(err){
		$scope.error = err.message;
	});
}
$scope.myTask = function(){
	$scope.tasks = [];
	Project.fetchTasks().then(function(response){
		$scope.tasks = response;
		console.log("$scope.tasks",$scope.tasks)	
	}).catch(function(err){
		$scope.error = err.message;
	});
}
	$scope.addNewProject = function(data){
		if(data){
			var userId = $scope.user.id;
			data.users = [userId];
			console.log(data);
			Project.add(data).then(function(response){
				console.log(response);
				$scope.projects.push(response);
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
	}
	$( "#date" ).datepicker();
	$scope.fetchUsers = function(id){
		if(id){
			$scope.UsersList = [];
			Project.fetchProject(id)
			.then(function(response){
				$scope.project = response;
				for(var j=0 ; j < $scope.project.users.length; j++){
					$scope.UsersList.push($scope.project.users[j].id)
					console.log("$scope.UsersList",$scope.UsersList)
					
				}
			}).catch(function(err){
				console.log(err);
				$scope.error = err.message;
			});
		}
	}

	$scope.createTask = function(){
		console.log($scope.task);
		Project.addTask($scope.task).then(function(response){
			$scope.tasks.push(response);
			console.log(response);
			
			$('#task-modal').modal('hide');
			console.log($scope.tasks);
		}).catch(function(err){
			$scope.error = err.message;
		});
	}


	$scope.deleteProject = function(id){
		if (window.confirm('Delete!! Are You Sure?')){
			Project.delete(id).then(function(response){
				//fetch updated project list
				Project.fetch().then(function(response){
					$scope.projects = response;
				}).catch(function(err){
					$scope.error = err.message;
				});
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
	}
})

.controller('getprojectController', function ($scope, Project, Contact, $rootScope, $routeParams, $cookieStore) {

	$scope.user = $rootScope.user;
	$scope.userIds = [];
	$scope.projectUsersList = [];
	$scope.loggedUser =  $scope.user.id;
	
	
	Project.fetchProject($routeParams.id )
		.then(function(response){
			$scope.project = response;
			for(var j=0 ; j < $scope.project.users.length; j++){
				$scope.projectUsersList.push($scope.project.users[j].id)
				console.log("$scope.projectUsersList",$scope.projectUsersList)
			}
		}).catch(function(err){
			console.log(err);
			$scope.error = err.message;
		});

	
	
	//if user checked push id into array if uncheck remove from array.
	$scope.sync = function(bool, item){
	    if(bool){
	      // add item
	      $scope.userIds.push(item.id);
	    } else {
	      // remove item
	      for(var i=0 ; i < $scope.userIds.length; i++) {
	        if($scope.userIds[i] == item.id){
	          $scope.userIds.splice(i,1);
	        }
		  } 
	    }
  	};

  	$scope.itemsPush = function(){
  		for(var i=0 ; i < $scope.project.users.length; i++){
			 $scope.userIds.push($scope.project.users[i].id)
		}
  	};

  	$scope.isChecked = function(id){
  	  var match = false;
      for(var i=0 ; i < $scope.project.users.length; i++) {
        if($scope.project.users[i].id == id){
          match = true;
        }
      }
      return match;
  	};

	$scope.addMemberToProject = function(){
		$scope.projectId = $routeParams.id;
		var data = {
			"users" : $scope.userIds 
		};

		Project.addProjectMember($scope.projectId,data)
		.then(function(response){
			
			Project.fetchProject($routeParams.id)
				.then(function(response){
					console.log("fetch",response);
					$scope.project = response;
				}).catch(function(err){
					console.log(err);
					$scope.error = err.message;
				});
			// $scope.project.users.push(response);
			console.log("response",response);
			}).catch(function(err){
				$scope.error = err.message;
			});
	};


	Project.fetchProject($routeParams.id)
		.then(function(response){
			console.log("fetch",response);
			$scope.project = response;
		}).catch(function(err){
			console.log(err);
			$scope.error = err.message;
		});



	$scope.editProject = function(name,description,workspace){
		
		var data = {
			name: name,
			description: description,
			workspace: workspace
		};

		Project.edit(data)
		.then(function(response){
			$scope.project = response;
		})
		.catch(function(err){
			$scope.error=err.message;
		});
		$('#edit-project-modal').modal('hide');
	};
});

