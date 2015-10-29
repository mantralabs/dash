'use strict';

angular.module('pmtoolApp')
  .controller('projectController', function ($scope, $cookieStore,Task, Project, Contact,$location, $rootScope, $routeParams) {
	
	$scope.user = $rootScope.user;
	$scope.projects =[];
	
	var path = $location.path();
  	if((path.indexOf('home')  > 0) || $routeParams.id || (path.indexOf('projects')  > 0)){
		Project.fetch().then(function(response){
			// $scope.projects = response;
			angular.forEach(response, function(project){
				$scope.projects.push(project);
			})
			// console.log($scope.projects);
		}).catch(function(err){
			$scope.error = err.message;
		});
    }

	$( "#date" ).datepicker();
	$scope.creatingProject = false;

	$scope.addNewProject = function (data) {
		$scope.creatingProject = true; 
		if(data){
			var userId = $scope.user.id;
			data.users = [userId];
			Project.add(data).then(function(response){
				$scope.projects.push(response);
				$scope.creatingProject = false;
				// Project.fetch().then(function(response){
				// 	$scope.projects = response;
				// 	// console.log($scope.projects);
				// 	}).catch(function(err){
				// 	$scope.error = err.message;
				// });
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

.controller('getprojectController', function ($scope,$location, Project, Contact, $rootScope, $routeParams, $cookieStore) {

	$scope.user = $rootScope.user;
	$scope.userIds = [];
	$scope.usersWithRole = [];
	$scope.projectUsersList = [];
	$scope.loggedUser =  $scope.user.id;
	$scope.removedMembers = [];
	$scope.projectUsersEmailOld = [];
	$scope.projectUsersEmailLatest = [];
	$scope.addedEmailIds = []
	$scope.removedEmailIds = [];
	$scope.memberAdded = false;
	
	Project.getRole($routeParams.id)
	.then(function(response){
		$rootScope.myRole = response.role;
		$scope.myRole = response.role;
		console.log('response getrole',$rootScope.myRole);
		// Project.storeRole =  response; 	
	}).catch(function(err){
		console.log(err);
		$scope.error = err.message;
	});

	var path = $location.path();
	// if((path.indexOf('home')  > 0) || $routeParams.id){ 
		Project.fetchProject($routeParams.id )
			.then(function(response){
				$scope.project = response;
				console.log('$scope.project',$scope.project);
				for(var j=0 ; j < $scope.project.users.length; j++){
					$scope.projectUsersList.push($scope.project.users[j].id)
					// $scope.existedprojectMembers.push($scope.project.users[j].email)
					$scope.projectUsersEmailOld.push($scope.project.users[j].email)
				}
			}).catch(function(err){
				console.log(err);
				$scope.error = err.message;
			});
	// }
    
  
    $scope.positions = [
    	{
    		name : "member"
    	},
    	{
    		name : "manager"
    	}
    ];
    // $scope.roleInProject = $scope.positions[0];
    $scope.updateroll = function(contact,roleInProject){
    	var obj = {user:contact.id,role:roleInProject}
    	var flag = false;
    	if($scope.usersWithRole.length == 0){
    		$scope.usersWithRole.push(obj);
    	} else {
    		for(var i=0 ; i < $scope.usersWithRole.length; i++) {
		        if($scope.usersWithRole[i].user == contact.id){
		        	  // $scope.usersWithRole[i].user = contact.id;
			          $scope.usersWithRole[i].role = roleInProject;
			          flag = true
			          // $scope.usersWithRole.push({user:contact.id, role:roleInProject});
		        }
		    }
		    if(!flag)
		    	$scope.usersWithRole.push(obj);	
	  	}
    }

    $scope.contactRole = function (id) {
  	  var contRole = null;
  	  var role = {}
  	 // console.log($scope.project)
  	  if($scope.project.usersRole){
	      for(var i=0 ; i < $scope.project.usersRole.length; i++) {
	        if($scope.project.usersRole[i].user == id){
	        	if($scope.project.usersRole[i].role)
	          		contRole = $scope.project.usersRole[i].role;
	          	//console.log($scope.project.usersRole[i].role);
	        }
	      }
	  }
	  
	  role.name = contRole;
	  role.user = id;
	  console.log(role);
      return role;
  	};
	$scope.sync = function (bool, roleInProject, item, index) {
		console.log('mshjfgs',roleInProject);

		if(bool){
	      $scope.userIds.push(item.id);
	      var obj = {user:item.id,role:roleInProject}
	      $scope.usersWithRole.push(obj);
	      console.log("$scope.usersWithRole",$scope.usersWithRole);
	      console.log("$scope.userIds",$scope.userIds);
	     	for(var j=0 ; j < $scope.removedMembers.length; j++) {
		        if($scope.removedMembers[j] == item.id){
		        	 $scope.removedMembers.splice(j,1);
		        }
		    }
	
	    } else {
	      // remove item
		$scope.removedMembers.push(item.id);
	      for(var i=0 ; i < $scope.userIds.length; i++) {
	        if($scope.userIds[i] == item.id){
	          $scope.userIds.splice(i,1);
	          console.log("$scope.userIds",$scope.userIds);
	         }
		  } 
		  for(var k=0 ; k < $scope.usersWithRole.length; k++) {
	        if($scope.usersWithRole[k].user == item.id){
	          $scope.usersWithRole.splice(k,1);
	          console.log("$scope.usersWithRole",$scope.usersWithRole);
	         }
		  } 

		}
  	};

	$scope.itemsPush = function () {
  		for(var i=0 ; i < $scope.project.users.length; i++){
			$scope.userIds.push($scope.project.users[i].id);
		}
		console.log($scope.project.usersRole);
		if($scope.project.usersRole.length>0){
			for(var j=0;j<$scope.project.usersRole.length;j++){
				$scope.usersWithRole.push($scope.project.usersRole[j]);
			}
		}
		console.log($scope.usersWithRole);
  	};

  	$scope.usersPush = function () {
  		for(var i=0 ; i < $scope.project.usersRole.length; i++){
			 $scope.usersWithRole.push($scope.project.usersRole[i]);;
		}
		console.log('$scope.usersWithRole',$scope.usersWithRole);
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



	$scope.updateProjectMembers = function () {
		$scope.memberAdded = true;
		$scope.projectId = $routeParams.id;
		var data = {
			"users" : $scope.userIds,
			"usersRole" : $scope.usersWithRole,
			"removedMembers" : $scope.removedMembers,
			"projectName":$scope.project.name,
			"description":$scope.project.description,
		};
		console.log("role",$scope.usersWithRole);

		Project.addProjectMember ($scope.projectId,data)
		.then(function(response){
			// $scope.$broadcast("triggerActivity");
			Project.fetchProject($routeParams.id)
				.then(function(response){
					$scope.memberAdded = false;
					$scope.existedprojectMembers = [];
					$scope.project = response;
					for(var j=0 ; j < $scope.project.users.length; j++){
						$scope.projectUsersEmailLatest.push($scope.project.users[j].email)
					}
					$scope.sendEmailUpdates();

					$scope.projectUsersEmailOld = [];
					for(var k=0 ; k < $scope.projectUsersEmailLatest.length; k++){
						$scope.projectUsersEmailOld.push($scope.projectUsersEmailLatest[k])
				    }
				    
					for(var j=0 ; j < $scope.project.users.length; j++){
						$scope.existedprojectMembers.push($scope.project.users[j].email)
					}
					}).catch(function(err){
						console.log(err);
						$scope.error = err.message;
					});
			
			}).catch(function(err){
				$scope.error = err.message;
			});

			// Project.fetchProject($routeParams.id )
			// .then(function(response){
			// 	$scope.project = response;
			// 	for(var j=0 ; j < $scope.project.users.length; j++){
			// 		$scope.projectUsersList.push($scope.project.users[j].id)
			// 	}
			// 	}).catch(function(err){
			// 		console.log(err);
			// 		$scope.error = err.message;
			// 	});
			
			$scope.removedMembers = [];
			$scope.removedEmailIds = [];
			$scope.emailIds = [];
			$scope.projectUsersEmailLatest = [];
			$scope.userIds = [];
			$scope.usersWithRole = [];


	};

	$scope.sendEmailUpdates = function(){
		//added
		for(var i=0;i<$scope.projectUsersEmailLatest.length;i++){
			if($scope.projectUsersEmailOld.indexOf($scope.projectUsersEmailLatest[i])==-1){$scope.addedEmailIds.push($scope.projectUsersEmailLatest[i]);}
		}
		console.log("added",$scope.addedEmailIds);
		//removed
		for(var j=0;j<$scope.projectUsersEmailOld.length;j++){

			if($scope.projectUsersEmailLatest.indexOf($scope.projectUsersEmailOld[j])==-1){$scope.removedEmailIds.push($scope.projectUsersEmailOld[j]);}
		}

		var data = {
			added : $scope.addedEmailIds,
			removed : $scope.removedEmailIds,
			projectName:$scope.project.name,
			description:$scope.project.description
		}

		Project.notify(data)
		.then(function(response){
			console.log(response);
		}).catch(function(err){
			console.log(err);
			$scope.error = err.message;
		});

		console.log("removed",$scope.removedEmailIds);
		$scope.addedEmailIds = [];
		$scope.removedEmailIds = [];

	}


	$scope.showeditError = false;

	$scope.editProject = function (name,description,workspace) {

		var data = {
			name: name,
			description: description,
			workspace: workspace
		};

		if(data.name == '' || data.description == '' || data.workspace == ''){
			$scope.showeditError = true;
		}else{
			Project.edit(data)
			.then(function(response){
				$scope.project = response;
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

	// $('.contacts-icons').click(function(e){
	// 	console.log($scope.usersWithRole);
	// });
});

