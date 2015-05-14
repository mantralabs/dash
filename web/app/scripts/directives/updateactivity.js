'use strict';

angular.module('pmtoolApp')
  	.directive('updateactivity', function ($rootScope, $location, $routeParams, Project, Contact, UserService, $cookieStore, Activity) {

		var currentUser = $rootScope.currentUser;

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

				Contact.fetchOther(user).then(function(response){
					scope.contact = response;
					console.log('inside update dir',response);
						}).catch(function(err){
							scope.error=err.message;
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
							$('.list-projects').hide();
						}).catch(function(err){
							scope.error = err.message;
						});
	      			}).catch(function(err){
      					console.log(err);
	      			})
	      		}
	      		scope.path = $location.path();
	      		

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