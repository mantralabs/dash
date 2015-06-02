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
	      		// scope.image_name = {};
	      		//for displaying popup on seect of button
	      		scope.updateActivity = function(){
	      			$(element).find('.list-projects').toggleClass('show');
	      		};
	      		
	      		scope.uploadAttachment = function (imgElem) {
	      			
	      		
				  var el = imgElem;
				  	if(imgElem.files[0]){

			  		scope.imageUploadStatus = true;
				   	
				   	scope.imageData = {};
				   	var photofile = imgElem.files[0];
				   	scope.image_name = photofile.name;
				   var ext = photofile.name.split(".");
				   	scope.imageData.ext = ext[ext.length-1];
			    	var FR= new FileReader();
					FR.readAsDataURL(photofile);

				  	   	FR.onload = function (e) {
				  	   		scope.loader = false;
				  	   		
					    	scope.imageData.data = e.target.result.split(",")[1];
					    	// scope.imageData.fullFormat = e.target.result;
					    	console.log(e.target.result);

					    		
				    	};
				    }   
			  	};	      		

	      		scope.sendActivity = function(description, projectId){
	      			
	      			if(scope.imageData){
		      			Activity.uploadImage(scope.imageData)
			     		.then(function(response){
			     			
			     			console.log('image upload',response);
			     			scope.attachment = response.name;
			     			console.log('scope.attachment',scope.attachment);
			     			var activityData = {
			      				description: description, 
			      				project: projectId,
			      				attachment:scope.attachment
			      			};
			      			console.log('activityData',activityData);
			     			Activity.addActivity(activityData)
			      			.then(function(response){
			      				console.log('activity response',response);
								scope.activities1.unshift(response);
								$('.list-projects').removeClass('show');
								scope.activity.description = "";
								// scope.attachment = "";
			      			}).catch(function(err){
		      					console.log(err);
			      			})
		     				if(response){
				     			scope.imageUploadStatus = false;
		     				}
			     		}).catch(function(err){
							scope.imageUploadStatus = false;
			      			scope.error = err.message;
			     		});
			     	}else{
			     		var activityData = {
		      				description: description, 
		      				project: projectId,
		      			};
		      			Activity.addActivity(activityData)
		      			.then(function(response){
		      				console.log('activity response',response);
							scope.activities1.unshift(response);
							$('.list-projects').removeClass('show');
							scope.activity.description = "";
							// scope.attachment = "";
		      			}).catch(function(err){
	      					console.log(err);
		      			});
			     	}
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