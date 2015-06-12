'use strict';

angular.module('pmtoolApp')
	.controller('navigationCtrl', function ($scope, $location, $rootScope, UserService){
		$scope.user = $rootScope.user;
		$scope.dropdownprofile = function(){
			$(".user-profile-dd").slideToggle();
			$(".chat-box").hide();
	   	};

	   	$scope.dropdownnotification = function(){
			$(".user-notification-dd").slideToggle();
			$(".chat-box").hide();
			$(".user-profile-dd").hide();
	   	};

		$scope.dropdownchat = function(){
			$(".chat-box").slideToggle();
			$(".user-profile-dd").hide();
		};
	}
);