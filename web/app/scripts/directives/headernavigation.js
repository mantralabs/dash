'use strict';

angular.module('pmtoolApp')
  .directive('headerNavigation', function () {
    return {
      templateUrl: 'views/header-navigation.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        // element.text('this is the headerNavigation directive');
      }
    };
  });