'use strict';

angular.module('pmtoolApp')
  .directive('headernavigation', function () {
    return {
      templateUrl: 'views/header-navigation.html',
      restrict: 'E',
      scope: {
        userinfo: "=userdata",
      },
      link: function(scope, element, attrs, $cookieStore) {
      	// scope.header = header.fetch();
        // element.text('this is the headerNavigation directive');
        // console.log(JSON.parse(localStorage.getItem('UserDetails')));
        // console.log(scope.userinfo.email);
      }
    };
  }); 