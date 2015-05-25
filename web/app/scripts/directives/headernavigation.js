'use strict';

angular.module('pmtoolApp')
  .directive('headernavigation', function () {
    return {
      templateUrl: 'views/header-navigation.html',
      restrict: 'E',
      
      link: function(scope, element, attrs, $cookieStore) {
      }
    };
  }); 