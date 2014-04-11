'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (Project) {
    return {
      // template: '<div></div>',
      templateUrl:'views/my-projects.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
		scope.Project = Project.fetch();
      }
    };
  });
