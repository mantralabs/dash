'use strict';

 
angular.module('pmtoolApp')
.controller('LoginCtrl',function ($scope, $location, UserService){
	
	$scope.login = function(user){
		// var loginDetails = {
		// 	email:$scope.email,
		// 	password:$scope.password
		// };
		
		if(user.email && user.password){
			UserService.postLogin(user ,function(error, userData){
				if(error){
					console.log('Error while logging in');
					$location.path('/');
				} else {
					$scope.userData = userData;
					console.log($scope.userData);
					$location.path('/home');
				}
			});
		}
	};
})

.controller('SignupCtrl', function($scope, $location, UserService){

	$scope.signup = function(){
		var loginDetails = {
			username:$scope.name,
			email:$scope.email,
			password:$scope.password,
			role:'1'
		};
		UserService.signupNewUser(loginDetails)
			.then(function(res){
				console.log(res);
			},function(error){
				console.log('Error==>',error);
		});  
	};
})

.controller('navigationCtrl', function($scope, $location, UserService){
	$scope.dropdownprofile = function(){
		$(".user-profile-dd").slideToggle();
		$(".chat-box").hide();

     // document.getElementByClassName("user-profile-dd")[0].style.['display']="block";
   };
   	$scope.logout = function(){
		console.log('signing out.....');
		UserService.signout()
			.then(function(data){
				$location.path('/');
			},function(error){
				console.log('Error==>',error);
				
			});
	};
	$scope.dropdownchat = function(){
		$(".chat-box").slideToggle();
    	$(".user-profile-dd").hide();
    };
 })

//homepage controller
// .controller('homePageCtrl', function ($scope) {
// 	// $scope.responseData = {};
// 	console.log('home page ctrl');
// 	$scope.info = JSON.parse(localStorage.getItem('UserDetails'));
// 	console.log($scope.info);

// })

.controller('userProfileCtrl', function ($scope,$routeParams) {
	// $scope.id = $routeParams.id;
	// console.log($scope.id);
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
.controller('editProfileCtrl', function($scope,$location){
	

})
.controller('accountSettingsCtrl', function($scope,$location){
	

})
.controller('contactsPageCtrl', function($scope,$location){

})