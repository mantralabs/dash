'use strict';

angular.module('pmtoolApp')
  .directive('updateactivity', function () {
    return {
      templateUrl: 'views/updateactivity.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        // element.text('this is the sidebar directive');
      }
    };
  });