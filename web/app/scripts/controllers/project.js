'use strict';

angular.module('pmtoolApp')
  .controller('projectController', function ($scope, $cookieStore, Project, Contact, $rootScope, $routeParams) {
	
	$scope.user = $rootScope.user;
	

	Project.fetch().then(function(response){
		$scope.projects = response;
	}).catch(function(err){
		$scope.error = err.message;
	});

	Project.fetchTasks().then(function(response){
		console.log("fetchTasks",response)
		$scope.tasks = response;
	}).catch(function(err){
		$scope.error = err.message;
	});

	$scope.showAssignedTask = false;
	$scope.alltasks = true;
	$scope.showMyTask = true;

	
	$scope.addNewProject = function (data) {
		if(data){
			var userId = $scope.user.id;
			data.users = [userId];
			Project.add(data).then(function(response){
				$scope.projects.push(response);
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
	}

	$( "#date" ).datepicker();

	$scope.fetchUsers = function (id) {
		if(id){
			$scope.UsersList = [];
			Project.fetchProject(id)
			.then(function(response){
				$scope.project = response;
				for(var j=0 ; j < $scope.project.users.length; j++){
					$scope.UsersList.push($scope.project.users[j].id)
					
				}
			}).catch(function(err){
				console.log(err);
				$scope.error = err.message;
			});
		}
	}

	$scope.deleteProject = function (id) {
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


	$scope.createTask = function() {
		
		$scope.task.status = "Not started";
		Project.addTask($scope.task).then(function(response){
			$scope.tasks.push(response);
			console.log(response);
			$('#task-modal').modal('hide');
			// $scope.assignedTask();
		}).catch(function(err){
			$scope.error = err.message;
		});

	}

	$scope.myTask = function ($event) {
		console.log("myTask",$event);
		if ($(event.target).parent().hasClass('task-head-nav')){
			$(event.target).siblings('li').removeClass('active-task');
			$(event.target).addClass('active-task');
		} else {
			$(event.target).siblings('li').removeClass('active-task-body');
			$(event.target).addClass('active-task-body');
		}
		$scope.showAssignedTask = false;
		$scope.showMyTask = true;
		$scope.alltasks = true;
		$scope.finished = false;
		$scope.progress = false;
		$scope.tasks = [];
		Project.fetchTasks().then(function(response){
			$scope.tasks = response;
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

	$scope.assignedTask = function ($event) {
		console.log("assignedTaskevent",$event);
		if ($(event.target).parent().hasClass('task-head-nav')){
			$(event.target).siblings('li').removeClass('active-task');
			$(event.target).addClass('active-task');
		} else {
			$(event.target).siblings('li').removeClass('active-task-body');
			$(event.target).addClass('active-task-body');
		}
		$scope.showMyTask = false;
		$scope.showAssignedTask = true;
		$scope.alltasks = true;
		$scope.finished = false;
		$scope.progress = false;
		$scope.tasks = [];
		Project.fetchTasksAssigned().then(function(response){
			$scope.tasks = response;
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

	
	$scope.inProgress = function ($event) {
		console.log("inProgressevent",$event);
		$(event.target).siblings('li').removeClass('active-task-body');
		$(event.target).addClass('active-task-body');
		$scope.alltasks = false;
		$scope.finished = false;
		$scope.progress = true;
		$scope.inProgressTasks =[];

		angular.forEach($scope.tasks, function(task, idx) {
			if (task.status == "In progress"){
				$scope.inProgressTasks.push(task);
			}
		});
	}


	$scope.completed = function ($event) {
		console.log("completedevent",$event);
		$(event.target).siblings('li').removeClass('active-task-body');
		$(event.target).addClass('active-task-body');
		$scope.alltasks = false;
		$scope.progress = false;
		$scope.finished = true;
		$scope.completedTasks = [];
		 angular.forEach($scope.tasks, function(task, idx) {
			if (task.status == "Completed"){
				$scope.completedTasks.push(task);
			}
		});
	}

	$scope.taskStatus = function (status, taskid) {
		var data = {"status":status}
		Project.statusUpdate(taskid,data).then(function(response){
		}).catch(function(err){
			$scope.error = err.message;
		});
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
			}
		}).catch(function(err){
			console.log(err);
			$scope.error = err.message;
		});

	
	
	//if user checked push id into array if uncheck remove from array.
	$scope.sync = function (bool, item) {
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

  	$scope.itemsPush = function () {
  		for(var i=0 ; i < $scope.project.users.length; i++){
			 $scope.userIds.push($scope.project.users[i].id)
		}
  	};

  	$scope.isChecked = function (id) {
  	  var match = false;
      for(var i=0 ; i < $scope.project.users.length; i++) {
        if($scope.project.users[i].id == id){
          match = true;
        }
      }
      return match;
  	};

	$scope.addMemberToProject = function () {
		$scope.projectId = $routeParams.id;
		var data = {
			"users" : $scope.userIds 
		};

		Project.addProjectMember($scope.projectId,data)
		.then(function(response){
			
			Project.fetchProject($routeParams.id)
				.then(function(response){
					$scope.project = response;
				}).catch(function(err){
					console.log(err);
					$scope.error = err.message;
				});
			
			}).catch(function(err){
				$scope.error = err.message;
			});
	};


	Project.fetchProject($routeParams.id)
		.then(function(response){
			$scope.project = response;
		}).catch(function(err){
			console.log(err);
			$scope.error = err.message;
		});



	$scope.editProject = function (name,description,workspace) {
		
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

