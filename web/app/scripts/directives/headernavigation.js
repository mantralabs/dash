'use strict';

angular.module('pmtoolApp')
  .directive('headernavigation', function () {
    return {
      templateUrl: 'views/header-navigation.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
      	// scope.header = header.fetch();
        // element.text('this is the headerNavigation directive');
      }
    };
  }); 