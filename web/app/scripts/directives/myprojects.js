'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (UserService) {
    return {
		templateUrl:'views/my-projects.html',
		restrict: 'E',
		
		link: function(scope, element, attrs) {
			UserService.fetchProfile()
			.then(function(response){
				scope.user = response;
			}).catch(function(err){
				scope.error = err.message;				
			});
		}
    };
});
