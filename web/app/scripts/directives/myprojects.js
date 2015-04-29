'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (Project) {
    return {
		templateUrl:'views/my-projects.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
			console.log(Project);
			scope.projects = Project.fetch();
		}
    };
  });
