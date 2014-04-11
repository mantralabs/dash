'use strict';

angular.module('pmtoolApp')
.controller('LoginCtrl', function ($scope, $location,Userservice) {
	
	$scope.login = function(){

		Userservice.users.get({'username':$scope.username,'password':$scope.password},function(data){
			$scope.users = data;

			console.log($scope.users);
			if(data.message==='sucesss'){
				$location.path('/home');
			}else{
				$scope.error = 'Check your username and password';
				$location.path('/');
			}

		},function(error){
			console.log(error.status);
		});
	};
})

.controller('SignupCtrl', function($scope, $location, Userservice){

	$scope.signup = function(){
		// console.log('registerd');
		console.log($scope.name);
		console.log($scope.email);
		console.log($scope.password);
		console.log($scope.terms);
		Userservice.users.save({name:$scope.name,email:$scope.email,password:$scope.password},function(data){
			console.log('response rcvd');
			$location.path('/login');
		});
	};
})

.controller('TestCtrl', function($scope,$location){
	$scope.testData = ['dhananjay','ghodke','mantra'];
	$scope.contacts=[];

});