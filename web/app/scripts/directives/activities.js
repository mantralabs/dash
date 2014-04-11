'use strict';

angular.module('pmtoolApp')
  .directive('activities', function () {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        // element.text('this is the activities directive');
      }
    };
  });
