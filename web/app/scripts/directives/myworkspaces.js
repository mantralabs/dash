'use strict';

angular.module('pmtoolApp')
  .directive('myWorkspaces', function (Workspace) {
    return {
      templateUrl: 'views/my-workspaces.html',
      restrict: 'E',
      
      link: function(scope, element, attrs) {
		Workspace.fetchMyWorkspace()
		.then(function(response){
			console.log(response);
			scope.myWorkspaces = response;
		})
		.catch(function(err){
			scope.error = err.message;
		});
      }
    };
  });