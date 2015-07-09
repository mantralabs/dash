'use strict';

 
angular.module('pmtoolApp')
.controller('userController',function ($scope, $rootScope, $routeParams, $location, UserService, $cookieStore){

	//User Login Method
	$scope.loggingIn = false;
	$scope.login = function (user) {
		$scope.loggingIn = true;
		if(user.email && user.password){
			UserService.postLogin(user)
			.then(function(response){
				$scope.user = response;
				$scope.loggingIn = false;
				$location.path('/home');
			}).catch(function(err){
				$scope.loggingIn = false;
				$scope.error = err.message;
				$location.path('/');
			});
		}
	};

	//Logout method
	$scope.logout = function () {

		UserService.signout()
		.then(function(response){
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
		});
	};

	//edit profile method
	$scope.updateUser = function (user) {

		console.log('inside user contrl',user);
		//if user uploads the image, get the avatar image file name form the uploadImage method.
		user.avatar = $scope.avatarImageName;

		UserService.updateProfile(user)
		.then(function(response){
			console.log("res",response)
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
          				console.log('response',response);
	     				if(response){
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

  	// $scope.deleteImage = function (data) {
  	// };

  	
  	var path = $location.path();
  	if((path.indexOf('profile')  > 0) && $routeParams.id){
	  	UserService.fetchUser($routeParams.id)
		.then(function(profile){
			$scope.profile = profile;
		}).catch(function(err){
			$scope.error = err.message;
			$location.path('/profile');
		});
	}
	
	//First Time Registration Method to set Name and Password.
	$scope.basicInfo = function (data) {

		var user = {
			name : data.name, 
			password : data.password, 
			hashKey : $routeParams.hashKey
		};

		UserService.basicInfo(user)
		.then(function(response){
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
		});
	};

	if($rootScope.user){
		UserService.fetchProfile()
		.then(function(response){
			$scope.user = response;
		}).catch(function(err){
			$scope.error = err.message;
		});
	}
})

.controller('resetPasswordCtrl', function ($scope, $location, UserService, $routeParams){

	$scope.resetPassword = function (password) {
	
		var data = {
			hashKey : $routeParams.hashKey,
			password : password
		};

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
		UserService.resetPasswordIntiate(email)
		.then(function(response){
			$location.path('/notifyemail');
		}).catch(function(err){
			$scope.error = err.message;
			console.log(err);
			$location.path('/');
		});
	}
})


