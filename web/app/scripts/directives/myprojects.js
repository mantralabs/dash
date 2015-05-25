'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (UserService) {
    return {
		templateUrl:'views/my-projects.html',
		restrict: 'E',
		scope: {
			projects: '=projects'
		},
		
		link: function(scope, element, attrs) {
			UserService.fetchProfile()
			.then(function(response){
				scope.projects = response.projects;
			}).catch(function(err){
				scope.error = err.message;				
			});
		}
    };
});
