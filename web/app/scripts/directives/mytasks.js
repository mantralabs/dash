'use strict';

angular.module('pmtoolApp')
  .directive('myTasks', function () {
    return {
      templateUrl:'views/my-tasks.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        // element.text('this is the mytasks directive');
      }
    };
  });
