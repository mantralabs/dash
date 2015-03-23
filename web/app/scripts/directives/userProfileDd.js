'use strict';

angular.module('pmtoolApp')
  .directive('userProfileDd', function () {
    return {
      templateUrl: 'views/user-profile-dd.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        // element.text('this is the user-profile-dd directive');
      } 
    };
  });