'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (Project) {
    return {
		templateUrl:'views/my-projects.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
			Project.fetch().then(function(response){
				scope.projects = response;
			}).catch(function(err){
				scope.error = err.message;
			});
		}
    };
  });
