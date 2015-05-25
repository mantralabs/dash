'use strict';

angular.module('pmtoolApp')

  	.directive('updateactivity', function ($rootScope, $routeParams, $location, Project, UserService, Activity) {
	    return {
	      	templateUrl: 'views/updateactivity.html',
	      	restrict: 'CE',
	      	scope: {
            	activities1: '=activities1'
			},

	      	link: function(scope, element, attrs) {

	      		//to fetch projects list to load into the dropdown
	      		Project.fetch().then(function(response){
					scope.projects = response;
				}).catch(function(err){
					scope.error = err.message;
				});

				UserService.fetchProfile()
				.then(function(response){
					scope.contact = response;
				}).catch(function(err){
					scope.error=err.message;
				});

				//get list of users
				UserService.fetch()
				.then(function(response){
					scope.users = response;
				}).catch(function(err){
					scope.error = err.message;
				});

	      		//for displaying popup on seect of button
	      		scope.updateActivity = function(){
	      			$(element).find('.list-projects').toggleClass('show');
	      		};	      		

	      		scope.sendActivity = function(description, projectId){
	      			var activityData = {
	      				description: description, 
	      				project: projectId,
	      				user: $rootScope.user.id
	      			};

	      			Activity.addActivity(activityData)
	      			.then(function(response){
						scope.activities1.push(response);
						$('.list-projects').removeClass('show');
						$('#activity-description').val("");
	      			}).catch(function(err){
      					console.log(err);
	      			})
	      		}

	      		scope.path = $location.path();
	      		
      			scope.updateInProject = function(description){
      				
	      			var projectId = $routeParams.id;
	      			var activityData = {
	      				description: description,
	      				project: projectId,
	      				user: $rootScope.user.id
	      			}
	      			Activity.addActivity(activityData)
	      			.then(function(response){
	      				console.log('inside updateInProject',response);
	      				// scope.project.activity.push(response.activity);
	      			}).catch(function(err){
	  					console.log(err);
	      			})
	      		}
	      	}
	    };
	}
);