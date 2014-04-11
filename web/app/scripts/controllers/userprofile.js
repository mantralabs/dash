'use strict';

angular.module('pmtoolApp')
  .controller('UserprofileCtrl', function ($scope,$routeParams) {
  	$scope.id = $routeParams.id;
  	console.log($scope.id);
  });
