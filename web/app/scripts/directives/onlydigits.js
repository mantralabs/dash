'use strict';

/**
 * @ngdoc directive
 * @name pmtoolApp.directive:onlyDigits
 * @description
 * # onlyDigits
 */
angular.module('pmtoolApp')
  .directive('onlyDigits', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the onlyDigits directive');
      }
    };
  });
