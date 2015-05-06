'use strict';

angular.module('pmtoolApp')
  .controller('homePageCtrl', function ($scope, $cookieStore, $rootScope, Project) {

	$rootScope.user = $cookieStore.get('current_user');
	// console.log($rootScope.user);
});