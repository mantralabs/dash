'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (Project) {
    return {
      templateUrl:'views/my-projects.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
    		scope.projects = Project.fetch();
      }
    };
  });
