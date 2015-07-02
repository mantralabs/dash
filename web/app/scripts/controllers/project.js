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
	$scope.emailIds = []
	$scope.existedprojectMembers = [];
	$scope.projectUsersList = [];
	$scope.loggedUser =  $scope.user.id;
	$scope.removedMembers = [];
	
	
	Project.fetchProject($routeParams.id )
		.then(function(response){
			$scope.project = response;
			console.log($scope.project);
			for(var j=0 ; j < $scope.project.users.length; j++){
				$scope.projectUsersList.push($scope.project.users[j].id)
				$scope.existedprojectMembers.push($scope.project.users[j].email)
			}
		}).catch(function(err){
			console.log(err);
			$scope.error = err.message;
		});

	// for(var l=0; l<$scope.project.users.length; l++){
	// 	$scope.existedprojectMembers.push($scope.project.users[l].email);
	// 	console.log($scope.existedprojectMembers);
	// }

	
	
	//if user checked push id into array if uncheck remove from array.
	$scope.sync = function (bool, item) {

		console.log(item.id);
	    if(bool){
	      // add item
	      $scope.userIds.push(item.id);
	      $scope.emailIds.push(item.email);
	      console.log("bool",$scope.emailIds);
		    for(var j=0 ; j < $scope.removedMembers.length; j++) {
		        if($scope.removedMembers[j] == item.id){
		        	 $scope.removedMembers.splice(j,1);
		        	 console.log("removedMembers",$scope.removedMembers)

		        }
		    }
	    } else {
	      // remove item

	      
	      $scope.removedMembers.push(item.id);
	      for(var i=0 ; i < $scope.userIds.length; i++) {
	        if($scope.userIds[i] == item.id){
	          $scope.userIds.splice(i,1);
	          console.log("removedMembers",$scope.removedMembers)
	         

	        }
		  } 

		  for(var k=0 ; k < $scope.emailIds.length; k++){
		  	if($scope.emailIds[k] == item.email)
	      	$scope.emailIds.splice(k,1);
	      	console.log("uncheck",$scope.emailIds)
	      }

	    }
  	};





  	// for(var i=0 ; i < $scope.userIds.length; i++) {
	  //       if($scope.userIds[i] == item.id){
	  //         $scope.userIds.splice(i,1);
	  //         $scope.removedMembers.push(item.id);
	  //         console.log("removedMembers",$scope.removedMembers)
	  //       }
		 //  }
		 //  for(var k=0 ; k < $scope.emailIds.length; k++){
		 //  	for(var l=0; l<$scope.project.users.length; l++){
		 //  		console.log("compare",$scope.project.users[l].email);
			//   	if($scope.emailIds[k] == item.email){
		 //          $scope.emailIds.splice(k,1);
		 //          console.log($scope.emailIds);
		 //        }
		 //        if($scope.project.users[l].email.indexOf($scope.emailIds) ){
		 //        	$scope.emailIds.splice(l,1);
		 //        }
	  //   	}
		 //  }

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
		for (var i = 0; i < $scope.existedprojectMembers.length; i++) {
            for (var j = 0; j < $scope.emailIds.length; j++) {
				if ($scope.existedprojectMembers[i] == $scope.emailIds[j]) {
                	$scope.emailIds.splice(j, 1);
                }else{
                	$scope.emailIds;
                }
                        
            }
        }

		$scope.projectId = $routeParams.id;
		var data = {
			"users" : $scope.userIds,
			"removedMembers" : $scope.removedMembers,
			"emailIds": $scope.emailIds,
			"projectName":$scope.project.name,
			"description":$scope.project.description,
		};
		console.log(data);

		Project.addProjectMember($scope.projectId,data)
		.then(function(response){
			console.log(response);
			Project.fetchProject($routeParams.id)
				.then(function(response){
					$scope.existedprojectMembers = [];
					$scope.project = response;
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

			$scope.removedMembers = [];
			$scope.emailIds = [];
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

