'use strict';

angular.module('pmtoolApp')
  .controller('projectController', function ($scope, $cookieStore, Project, Contact, $rootScope, $routeParams) {
	
	$scope.user = $rootScope.user;

	Project.fetch().then(function(response){
		$scope.projects = response;
	}).catch(function(err){
		$scope.error = err.message;
	});

	$scope.addNewProject = function(data){

		Project.add(data).then(function(response){
			$scope.projects.push(response);
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
// })

// .controller('getprojectController', function ($scope, Project, Contact, $rootScope, $routeParams, $cookieStore) {

	$scope.user = $rootScope.user;
	$scope.userIds = [];
	
	//if user checked push id into array if uncheck remove from array.
	$scope.sync = function(bool, item){
	    if(bool){
	      // add item
	      $scope.userIds.push(item.id); 
	    } else {
	      // remove item
	      console.log($scope.userIds.length);
	      for(var i=0 ; i < $scope.userIds.length; i++) {
	        if($scope.userIds[i] == item.id){
	          $scope.userIds.splice(i,1);
	        }
	      }      
	    }
  	};

  	//is checked method is used to send checkbox result true/false on checked for checkbox.
  	$scope.isChecked = function(id){
      var match = false;
      for(var i=0 ; i < $scope.userIds.length; i++) {
        if($scope.userIds[i].id == id){
          match = true;
        }
      }
      return match;
  	};

	$scope.addMemberToProject = function(){
		// console.log($scope.userIds);
		$scope.projectId = $routeParams.id;
		var data = {
			"users" : $scope.userIds
		};

		Project.addProjectMember($scope.projectId,data).then(function(response){
				console.log(response);
			}).catch(function(err){
				$scope.error = err.message;
			});
	};

	if($routeParams.id){
	Project.fetchProject($routeParams.id).then(function(response){
			$scope.project = response;
		}).catch(function(err){
			console.log(err);
			$scope.error = err.message;
		});
	}

	$scope.editProject = function(name,description,workspace){
		Project.edit({name,description,workspace})
		.then(function(response){
			$scope.project = response;
		})
		.catch(function(err){
			$scope.error=err.message;
		})
		$('#edit-project-modal').modal('hide');
	}

});

