'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (Project, $rootScope, $routeParams, $cookieStore, Contact, UserService) {
  	
  	var user = $rootScope.isLoggedIn;
	var	userId= user.id;

    return {
		templateUrl:'views/my-projects.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
			UserService.fetchProfile()
				.then(function(response){
					scope.user = response;
					console.log("scope.loginUser",scope.loginUser);
				}).catch(function(err){
					scope.error = err.message;
				
			});
		}
    };
});
