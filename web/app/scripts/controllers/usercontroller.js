'use strict';

 
angular.module('pmtoolApp')
.controller('LoginCtrl',function ($scope, $rootScope, $location, UserService, $cookieStore){

	$scope.user = $cookieStore.get('current_user');
	// console.log($scope.user);

	$scope.login = function(user){
		if(user.email && user.password){
			UserService.postLogin(user ,function(error, userDataResp){
				if(error){
					$scope.error = error.data.message;
					console.log('Error while logging in');
					$location.path('/');
				} else {
					$scope.userDataResp = userDataResp;
					$cookieStore.put('current_user',userDataResp);
					$location.path('/home');
					// $cookies = $scope.userDataResp;
					console.log($cookieStore);
				}
			});
		}
	};

	$scope.logout = function(){
		console.log('signing out.....');
		// UserService.signout()
		// 	.then(function(data){
		// 		$location.path('/');
		// 	},function(error){
		// 		console.log('Error==>',error);
				
		// 	});
	
		if($cookieStore.get('current_user')){
			// var isSignedOut = UserService.signout(function(err, data){
			// console.log('is session destroyed? :', data);
			// on successful removal of session, delete the cookie ( make current user null )
			$cookieStore.remove('current_user');
			// $rootScope.isLoggedIn = false;
			$location.path('/');
			// });
		}
	};

	// $scope.save = function(user){
	// 	if(user.email && user.password){
	// 		UserService.postLogin(user ,function(error, userDataResp){
	// 			if(error){
	// 				$scope.error = error.data.message;
	// 				console.log('Error while logging in');
	// 				$location.path('/');
	// 			} else {
	// 				$scope.userDataResp = userDataResp;
	// 				$cookieStore.put('current_user',userDataResp);
	// 				$location.path('/home');
	// 				// $cookies = $scope.userDataResp;
	// 				console.log($cookieStore);
	// 			}
	// 		});
	// 	}
	// };
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


.controller('accountSettingsCtrl', function($scope,$location,UserService){
	console.log('accountSetting Control inside');	

})


.controller('navigationCtrl', function($scope, $location, UserService){
	$scope.dropdownprofile = function(){
		$(".user-profile-dd").slideToggle();
		$(".chat-box").hide();

     // document.getElementByClassName("user-profile-dd")[0].style.['display']="block";
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

.controller('userProfileCtrl', function ($scope, $routeParams, $cookieStore) {
	// $scope.id = $routeParams.id;
	// console.log($scope.id);
	$scope.user = $cookieStore.get('current_user');
	console.log($scope.user);
})
.controller('editProfileCtrl', function ($scope, $routeParams, $cookieStore) {
	// $scope.id = $routeParams.id;
	// console.log($scope.id);
	$scope.user = $cookieStore.get('current_user');
	// console.log($scope.user);
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