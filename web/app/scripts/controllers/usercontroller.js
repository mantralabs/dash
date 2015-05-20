'use strict';

 
angular.module('pmtoolApp')
.controller('userController',function ($scope, $rootScope, $routeParams, $location, UserService, $cookieStore){

	$scope.user = $rootScope.user;
	console.log($scope.user);

	//User Login Method
	$scope.login = function(user){
		if(user.email && user.password){
			UserService.postLogin(user)
			.then(function(response){
				console.log(response);
				$scope.user = response;
				$location.path('/home');
			}).catch(function(err){
				$scope.error = err.message;
				$location.path('/');
			});
		}
	};

	//Logout method
	$scope.logout = function(){

		UserService.signout()
		.then(function(response){
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
		})
	};

	//edit profile method
	$scope.updateUser = function(user){

		//if user uploads the image, get the avatar image file name form the uploadImage method.
		user.avatar = $scope.avatarImageName;

		console.log("ctrl-usr",user);

		UserService.updateProfile(user)
		.then(function(response){

			$rootScope.user = response[0];
			$scope.user = response[0];
			$location.path('/profile');
		}).catch(function(err){
			$scope.error = err.message;
			$location.path('/profile');
		});
	};

	//This method is used convert image to BASE64
	$scope.uploadImage = function (imgElem) {
	  var el = imgElem;
	  	if(imgElem.files[0]){

  		$scope.imageUploadStatus = true;
	   	
	   	var imageData = {};
	   	var photofile = imgElem.files[0];
	   
	   	imageData.ext = photofile.type.split("/")[1];
    	var FR= new FileReader();
		FR.readAsDataURL(photofile);

	  	   	FR.onload = function (e) {
	  	   		
		    	imageData.data = e.target.result.split(",")[1];
		    	imageData.user = $scope.user.id;

		    		UserService.uploadAvatar(imageData)
		     		.then(function(response){
	     				if(response){
	     					console.log(response);	
			     			$scope.imageUploadStatus = false;
	     				}
		     			$scope.avatarImageName = response.name;
		     		}).catch(function(err){
						$scope.imageUploadStatus = false;
		      			$scope.error = err.message;
		     		});
	    	};
	    }   
  	};

  	$scope.deleteImage = function(data){
  		console.log(data);
  	}

  	// Fetch Particular User
  	UserService.fetchUser($scope.user.id)
	.then(function(response){
		$scope.user = response;
	}).catch(function(err){
		$scope.error = err.message;
		$location.path('/profile');
	});

	//First Time Registration Method to set Name and Password.
	$scope.basicInfo = function(data){
		var token = $routeParams.hashKey;
		var user = {name : data.name, password : data.password, hashKey : token}

		console.log(user);
		
		UserService.basicInfo(user)
		.then(function(response){
			console.log(response);
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
		})
	};
})

.controller('resetPasswordCtrl', function ($scope, $location, UserService, $routeParams){

	$scope.resetPassword = function(password){
	
		var data = {
			hashKey : $routeParams.hashKey,
			password : password
		}	
		console.log(data);
		UserService.resetPassword(data)
		.then(function(response){
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
			console.log($scope.error);
			$location.path('/resetpassword');
		});
	};

	$scope.resetPasswordIntiate = function(email){
		console.log(email);
		UserService.resetPasswordIntiate(email)
		.then(function(response){
			console.log(response);
			$location.path('/')
		}).catch(function(err){
			$scope.error = err.message;
			console.log(err);
			$location.path('/');
		});
	}
})

.controller('taskPageCtrl', function($scope,$location){
	

})
.controller('createEventCtrl', function($scope,$location){
	

})
.controller('searchResultsCtrl', function($scope,$location){
	

})
.controller('privacySettingsCtrl', function($scope,$location){
	

})
.controller('notificationSettingsCtrl', function($scope,$location){
	

})
.controller('gettingStartedCtrl', function($scope,$location){
	

})
.controller('createTaskCtrl', function($scope,$location){
	

})
.controller('contactSupportCtrl', function($scope,$location){
	

})
.controller('profilePageCtrl', function($scope,$location){
	

})

.controller('contactsPageCtrl', function($scope,$location){

})