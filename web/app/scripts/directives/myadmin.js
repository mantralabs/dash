'use strict';

angular.module('pmtoolApp')

.directive('myProjectsadmin', function (Project, $rootScope, $routeParams, $cookieStore, Contact) {
  	
  	var user = $rootScope.user;
	var	userId= user.id;

    return {
		templateUrl:'views/my-projectsadmin.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
			scope.user=user;
			console.log('myproject dir',user);
			Project.fetch().then(function(response){
					console.log(response);
					scope.projects = response;
				}).catch(function(err){
					scope.error = err.message;
				});
		}
    };
  });