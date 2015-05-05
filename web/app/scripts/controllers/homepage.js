'use strict';

angular.module('pmtoolApp')
  .controller('homePageCtrl', function ($scope, $cookieStore, Project) {

	$scope.user = $cookieStore.get('current_user');

});