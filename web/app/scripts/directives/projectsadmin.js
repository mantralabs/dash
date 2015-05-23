'use strict';

angular.module('pmtoolApp')

.directive('projectsAdmin', function (Project, $rootScope, $routeParams, $cookieStore, Contact) {
  	
  	var user = $rootScope.isLoggedIn;
	var	userId= user.id;

    return {
		templateUrl:'views/projectsadmin.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
			scope.user=user;
			Project.fetch()
			.then(function(response){
				console.log(response);
				scope.projects = response;
			}).catch(function(err){
				scope.error = err.message;
			});
		}
    };
  });