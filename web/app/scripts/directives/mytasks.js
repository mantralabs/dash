'use strict';

angular.module('pmtoolApp')
  .directive('myTasks', function ($location,$routeParams) {
    return {
        templateUrl:'views/my-tasks.html',
        restrict: 'E',
        link: function(scope, element, attrs) {
        	scope.path=$location.path();
        	if($routeParams.id){
        	scope.projId= $routeParams.id;
        	}
        }
    };
  });
