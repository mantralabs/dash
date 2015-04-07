'use strict';

 
angular.module('pmtoolApp')
.controller('LoginCtrl', function ($scope, $location,Userservice) {	
	$scope.login = function(){
		// console.log('in');
		var loginDetails = {
			email:$scope.email,
			password:$scope.password
		};
		Userservice.signin(loginDetails)
			.then(function(res){
				console.log(res);
				localStorage.setItem('UserDetails',JSON.stringify(res.data.data));
				$location.path('/home');
			},function(error){
				console.log('Error==>',error);
				// console.log(data);
		});
	};
})

.controller('SignupCtrl', function($scope, $location, Userservice){

	$scope.signup = function(){
		var loginDetails = {
			username:$scope.name,
			email:$scope.email,
			password:$scope.password,
			role:'1'
		};
		Userservice.signupNewUser(loginDetails)
			.then(function(res){
				console.log(res);
			},function(error){
				console.log('Error==>',error);
		});  
	};
}) 


.controller('TestCtrl', function($scope,$location){
	$scope.testData = ['dhananjay','ghodke','mantra'];
	$scope.contacts=[];

})


.controller('navigationCtrl', function($scope, $location, Userservice){
	$scope.dropdownprofile = function(){
		$(".user-profile-dd").slideToggle();
		$(".chat-box").hide();

     // document.getElementByClassName("user-profile-dd")[0].style.['display']="block";
   };
   	$scope.logout = function(){
		console.log('signing out.....');
		Userservice.signout()
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