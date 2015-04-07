'use strict';

angular.module('pmtoolApp')
  .directive('userProfileDd', function (Userservice,$routeParams) {
    return {
      templateUrl: 'views/user-profile-dd.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        // element.text('this is the user-profile-dd directive');
        console.log(JSON.parse(localStorage.getItem('UserDetails')));
      }
    };
  });