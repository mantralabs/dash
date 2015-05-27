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

	      		scope.uploadImage = function (imgElem) {
				  var el = imgElem;
				  	if(imgElem.files[0]){

			  		scope.imageUploadStatus = true;
				   	
				   	scope.imageData = {};
				   	var photofile = imgElem.files[0];
				   
				   	scope.imageData.ext = photofile.type.split("/")[1];
			    	var FR= new FileReader();
					FR.readAsDataURL(photofile);

				  	   	FR.onload = function (e) {
				  	   		
					    	scope.imageData.data = e.target.result.split(",")[1];
					    	// scope.imageData.fullFormat = e.target.result;
					    	console.log("imageData",scope.imageData);

					    		
				    	};
				    }   
			  	};	      		

	      		scope.sendActivity = function(description, projectId){
	      			var activityData = {
	      				description: description, 
	      				project: projectId
	      			};
	      			Activity.uploadImage(scope.imageData)
		     		.then(function(response){
		     			console.log('image upload',response);
	     				if(response){
			     			scope.imageUploadStatus = false;
	     				}
		     		}).catch(function(err){
						scope.imageUploadStatus = false;
		      			scope.error = err.message;
		     		});

	      			Activity.addActivity(activityData)
	      			.then(function(response){
	      				console.log('sdgfasghjd',response);
						scope.activities1.unshift(response);
						$('.list-projects').removeClass('show');
						scope.activity.description = "";
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
	      				scope.activity.description = "";
	      			}).catch(function(err){
	  					console.log(err);
	      			})
	      		}
	      	}
	    };
	}
);