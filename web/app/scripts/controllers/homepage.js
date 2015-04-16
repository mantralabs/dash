'use strict';

angular.module('pmtoolApp')
  .controller('homePageCtrl', function ($scope,$cookieStore) {
	$scope.responseData = {};
	$scope.info = JSON.parse(localStorage.getItem('UserDetails'));
	// console.log($scope.info);


	$scope.user = $cookieStore.get('current_user');
	console.log($scope.user);

	console.log('Home Page controller');
	//current user
	 // $cookieStore = $scope.user;
		// //log in user
		// if($scope.user){
		// 	var user_id = $scope.user.id ;
		// }
});