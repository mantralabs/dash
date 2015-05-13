'use strict';

angular.module('pmtoolApp')
  	.directive('updateactivity', function ($rootScope, $location, $routeParams, Project, Contact, UserService, $cookieStore, Activity) {

		var user= $cookieStore.get('current_user').id;
	    
	    return {
	      	templateUrl: 'views/updateactivity.html',
	      	restrict: 'CE',
	  //     	scope: {
   //          	projects: '=projects'
			// },
	      	link: function(scope, element, attrs) {
	      		element.bind('click', function(event) {
	      			// console.log('even triggred');
	      		});

	      		//to fetch projects list to load into the dropdown
	      		Project.fetch().then(function(response){
					scope.projects = response;
					// console.log(response);
				}).catch(function(err){
					scope.error = err.message;
				});

				//get list of users
				UserService.fetch().then(function(response){
					scope.users = response;
					// console.log(response);
				}).catch(function(err){
					scope.error = err.message;
				});

	      		//for displaying popup on seect of button
	      		scope.updateActivity = function(){
	      			$(element).find('.list-projects').toggleClass('show');
	      		};
	      		

	      		scope.selectedProject = function(description,project){
	      			var activityData = {description,project,user}
	      			Activity.addActivity(activityData).then(function(response){
	      				console.log(response);
	      				Activity.fetch().then(function(response){
							scope.activities = response;
						}).catch(function(err){
							scope.error = err.message;
						});
	      			}).catch(function(err){
      					console.log(err);
	      			})
	      		}
	      		var path = $location.path();
	      		if (path.indexOf('home')>0){
	      			$('#project-page-btn').hide();
	      			$('#home-page-btn').show();
	      		}
	      		else if (path.indexOf('project')>0){
	      			$('#home-page-btn').hide();
	      			$('#project-page-btn').show();
	      		}
	      		
      			scope.update = function(description){
	      			console.log('inside update');
	      			var project = $routeParams.id;
	      			var activityData = {description,project,user}
	      			console.log(activityData);
	      			Activity.addActivity(activityData).then(function(response){
	      				console.log(response);
	      				Activity.fetch().then(function(response){
							scope.activities = response;
						}).catch(function(err){
							scope.error = err.message;
						});
	      			}).catch(function(err){
	  					console.log(err);
	      			})
	      		}
	      	}

	    };
	}
);