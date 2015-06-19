'use strict';

angular.module('pmtoolApp')

.directive('projectsAdmin', function (Project, $rootScope, $routeParams, $cookieStore, Contact) {
  	
  	// var user = $rootScope.user;
    return {
		templateUrl:'views/projectsadmin.html',
		restrict: 'E',
		
		link: function (scope, element, attrs) {
			scope.user = $rootScope.user;
			Project.fetch()
			.then(function(response){
				scope.projects = response;
			}).catch(function(err){
				scope.error = err.message;
			});
		}
    };
  });