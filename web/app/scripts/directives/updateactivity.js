'use strict';

angular.module('pmtoolApp')

  	.directive('updateactivity', function ($rootScope, $routeParams, $location, Project, UserService, Activity) {
	    return {
	      	templateUrl: 'views/updateactivity.html',
	      	restrict: 'CE',
	      	scope: {
            	activities1: '=activities1',
            	projects: '=projects'
			},

	      	link: function(scope, element, attrs) {

	      		//for displaying popup on seect of button
	      		scope.updateActivity = function(){
	      			$(element).find('.list-projects').toggleClass('show');
	      		};	      		

	      		scope.sendActivity = function(description, projectId){
	      			var activityData = {
	      				description: description, 
	      				project: projectId
	      			};

	      			Activity.addActivity(activityData)
	      			.then(function(response){
	      				console.log('sdgfasghjd',response);
						scope.activities1.unshift(response);
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
	      				project: projectId
	      			}
	      			Activity.addActivity(activityData)
	      			.then(function(response){
	      				console.log('inside updateInProject',response);
	      				scope.activities1.unshift(response);
	      			}).catch(function(err){
	  					console.log(err);
	      			})
	      		}
	      	}
	    };
	}
);