'use strict';

 
angular.module('pmtoolApp')
.controller('LoginCtrl',function ($scope, $rootScope, $routeParams, $location, UserService, $cookieStore){

	// $scope.user = $rootScope.user;	

	$scope.login = function(user){
		if(user.email && user.password){
			UserService.postLogin(user)
			.then(function(userDataResp){
				$scope.user = userDataResp;
				$location.path('/home');
			}).catch(function(err){
				$scope.error = err.message;
				$location.path('/');
			});
		}
	};

	$scope.logout = function(){

		UserService.signout()
		.then(function(response){
			$location.path('/');
			console.log(response);
		}).catch(function(err){
			$scope.error = err.message;
		})
	};

	$scope.setPassword = function(data){

		var id = $routeParams.id;

		UserService.setPassword(id,data)
		.then(function(response){
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
		})
	};
})

.controller('editProfileCtrl', function ($scope, $location, $routeParams, $cookieStore, UserService, $rootScope) {

	// $scope.user = $rootScope.user;
	
	//edit profile method
	$scope.updateUser = function(user){

		user.avatar = $scope.avatarImageName;

		UserService.updateProfile(user)
		.then(function(response){
			console.log(response);
			$rootScope.user = response[0];
			$scope.user = response[0];
			// $rootScope.user = response;
			// $scope.user = response;
			$location.path('/profile');
		}).catch(function(err){
			$scope.error = err.message;
			console.log($scope.error);
			$location.path('/profile');
		});
	};

	//This method is used convert image to BASE64
	$scope.uploadImage = function (imgElem) {
	  var el = imgElem;
	  	if(imgElem.files[0]){
	   	var imageData = {};
	   	var photofile = imgElem.files[0];
	   
	   	imageData.ext = photofile.type.split("/")[1];
    	var FR= new FileReader();
		FR.readAsDataURL(photofile);

	  	   	FR.onload = function (e) {
		    	imageData.data = e.target.result.split(",")[1];
		    	imageData.user = $scope.user.id;
		    	console.log(imageData);

		    		UserService.uploadAvatar(imageData)
		     		.then(function(response){
		     			console.log(response);
		     			$scope.avatarImageName = response.name;
		     		}).catch(function(err){
		      			$scope.error = err.message;
		     		});
	    	};
	   }   
  	};
})

.controller('accountSettingsCtrl', function ($scope,$location,UserService){
	console.log('accountSetting Control inside');	

})

.controller('userProfileCtrl', function ($scope, $routeParams, $rootScope, $cookieStore, UserService, Contact, $location) {
	$scope.user = $rootScope.user;

	var id = $scope.user.id;
	
	UserService.fetchUser(id)
	.then(function(response){
		$scope.user = response;
	}).catch(function(err){
		$scope.error = err.message;
		$location.path('/profile');
	});
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