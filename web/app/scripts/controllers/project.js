'use strict';

angular.module('pmtoolApp')
  .controller('projectController', function ($scope, $cookieStore,Task, Project, Contact,$location, $rootScope, $routeParams) {
	
	$scope.user = $rootScope.user;
	

	Project.fetch().then(function(response){
		$scope.projects = response;
	}).catch(function(err){
		$scope.error = err.message;
	});
	$( "#date" ).datepicker();
	$scope.creatingProject = false;
	$scope.addNewProject = function (data) {
		$scope.creatingProject = true;
		console.log("addNewProject",data);
		if(data){
			var userId = $scope.user.id;
			data.users = [userId];
			Project.add(data).then(function(response){
				console.log(response)
				$scope.projects.push(response);
				$scope.creatingProject = false;
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
		$('.Newproject-title').val("");
		$('.Newproject-description').val("");
		$(".Newproject-workspace option[value='']").attr('selected', true)
	}

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

})

.controller('getprojectController', function ($scope, Project, Contact, $rootScope, $routeParams, $cookieStore) {

	$scope.user = $rootScope.user;
	$scope.userIds = [];
	$scope.projectUsersList = [];
	$scope.loggedUser =  $scope.user.id;
	$scope.removedMembers = [];
	
	
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
		    for(var j=0 ; j < $scope.removedMembers.length; j++) {
		        if($scope.removedMembers[j] == item.id){
		        	 $scope.removedMembers.splice(j,1);
		        	 console.log("removedMembers",$scope.removedMembers)

		        }
		    }
	    } else {
	      // remove item
	      for(var i=0 ; i < $scope.userIds.length; i++) {
	        if($scope.userIds[i] == item.id){
	          $scope.userIds.splice(i,1);
	          $scope.removedMembers.push(item.id);
	          console.log("removedMembers",$scope.removedMembers)

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
  	  if($scope.project.users){
	      for(var i=0 ; i < $scope.project.users.length; i++) {
	        if($scope.project.users[i].id == id){
	          match = true;
	        }
	      }
	  }
      return match;
  	};

	$scope.addMemberToProject = function () {
		$scope.projectId = $routeParams.id;
		var data = {
			"users" : $scope.userIds,
			"removedMembers" : $scope.removedMembers
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


	$scope.showeditError = false;

	$scope.editProject = function (name,description,workspace) {
		console.log(workspace);
		var data = {
			name: name,
			description: description,
			workspace: workspace
		};

		if(name == undefined || description == undefined || workspace == undefined){
			$scope.showeditError = true;
		}else{
			Project.edit(data)
			.then(function(response){
				$scope.project = response;
				console.log(response);
				Project.fetchProject($routeParams.id)
				.then(function(response){
					$scope.project = response;
				}).catch(function(err){
					console.log(err);
					$scope.error = err.message;
				});
			})
			.catch(function(err){
				$scope.error=err.message;
			});
			$scope.showeditError = false;
			$('#edit-project-modal').modal('hide');

			   
			
		}
		
	};
});

