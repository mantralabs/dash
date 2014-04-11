'use strict';

angular.module('pmtoolApp')
  .directive('myContacts', function (Contact) {
    return {
      templateUrl: 'views/my-contacts.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        scope.Contact = Contact.fetch();
        // console.log(scope.Contlength);
      }
    };
  });