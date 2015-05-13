'use strict';

 
angular.module('pmtoolApp')
.controller('LoginCtrl',function ($scope, $rootScope, $routeParams, $location, UserService, $cookieStore){

	$rootScope.user = $cookieStore.get('current_user');
	$scope.user = $rootScope.user;	

	$scope.login = function(user){
		if(user.email && user.password){
			UserService.postLogin(user)
			.then(function(userDataResp){
				$scope.userData = userDataResp;
				$cookieStore.put('current_user',$scope.userData);
				$location.path('/home');
			}).catch(function(err){
				$scope.error = err.message;
				$location.path('/');
			});
		}
	};

	$scope.logout = function(){
		console.log('signing out.....');

		if($cookieStore.get('current_user')){
			$cookieStore.remove('current_user');
			$location.path('/');
		}
	};

	$scope.setPassword = function(data){
		var id = $routeParams.id;
		// var data = {id, password}

		UserService.setPassword(id,data)
		.then(function(response){
			$location.path('/');
		}).catch(function(err){
			$scope.error = err.message;
		})
	};

	
})

.controller('SignupCtrl', function ($scope, $location, UserService){

	$scope.signup = function(){
		var loginDetails = {
			username: $scope.name,
			email: $scope.email,
			password: $scope.password
		};

		UserService.signup(loginDetails, function(error, data){
			if (!error) {
				$location.path('/');
			} else {
				console.log(error);
			}
		})
	};
})

.controller('editProfileCtrl', function ($scope,$location, $routeParams, $rootScope, $cookieStore,UserService) {
	
	$scope.user = $cookieStore.get('current_user');
	
	$scope.updateUser = function(user){
		UserService.updateProfile(user)
		.then(function(userDataResp){
			$scope.userData = userDataResp;
			$cookieStore.put('current_user',$scope.user);
			$location.path('/profile');
		}).catch(function(err){
			$scope.error = err.message;
			console.log($scope.error);
			$location.path('/profile');
		});
	};
})

.controller('accountSettingsCtrl', function ($scope,$location,UserService){
	console.log('accountSetting Control inside');	

})

.controller('userProfileCtrl', function ($scope, $routeParams, $cookieStore,Contact) {
	$scope.user = $cookieStore.get('current_user');
	$scope.userId = $routeParams.id;

	Contact.fetchOther($scope.userId).then(function(response){
		$scope.contact = response;
	}).catch(function(err){
		$scope.error=err.message;
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