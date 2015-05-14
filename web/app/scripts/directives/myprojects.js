'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (Project, $routeParams, $cookieStore, Contact) {
  	var userId= $cookieStore.get('current_user').id;
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
