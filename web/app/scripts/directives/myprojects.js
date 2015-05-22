'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (Project, $rootScope, $routeParams, $cookieStore, Contact, UserService) {
  	
  	var user = $rootScope.user;
	var	userId= user.id;

    return {
		templateUrl:'views/my-projects.html',
		restrict: 'E',
		link: function(scope, element, attrs) {
			// scope.user=user;
			// UserService.fetchUser(userId)
			// .then(function(response){
			// 	scope.user = response;
			// 	console.log('bxv',response);
			// }).catch(function(err){
			// 	scope.error = err.message;
			// });
		}
    };
});
