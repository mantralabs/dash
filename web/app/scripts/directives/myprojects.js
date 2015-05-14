'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (Project, $rootScope, $routeParams, $cookieStore, Contact) {
  	
  	var user = $rootScope.user;
	var	userId= user.id;
	console.log('within myprjdhsf',userId);

    return {
		templateUrl:'views/my-projects.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
			Project.fetch().then(function(response){
				scope.projects = response;
			}).catch(function(err){
				scope.error = err.message;
			});

			Contact.fetchOther(userId).then(function(response){
				scope.contact = response;
			}).catch(function(err){
				scope.error=err.message;
			});
		}
    };
  });
