'use strict';

angular.module('pmtoolApp')
	.controller('navigationCtrl', function ($scope, $location, $rootScope, $cookieStore, UserService){

		//get the 
		$scope.user = $rootScope.user;
		
		$scope.dropdownprofile = function(){
			console.log('in');
			$(".user-profile-dd").slideToggle();
			$(".chat-box").hide();

	     // document.getElementByClassName("user-profile-dd")[0].style.['display']="block";
	   	};

		$scope.dropdownchat = function(){
			$(".chat-box").slideToggle();
			$(".user-profile-dd").hide();
		};
});