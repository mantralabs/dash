'use strict';

angular.module('pmtoolApp')
  .directive('myEvents', function (Event) {
    return {
      // template: '<div></div>',
      templateUrl:'views/my-events.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.Event = Event.fetch();
      }
    };
  });
