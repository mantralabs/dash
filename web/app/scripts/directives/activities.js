'use strict';

angular.module('pmtoolApp')
  .directive('activities', function (Activity, $location, UserService, Project, $routeParams) {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      scope: {
        activities1: '=list'
      },
      link : function(scope, element, attrs) {
        
        Activity.fetch().then(function(response){
          scope.activities1 = response;
		    }).catch(function(err){
		      scope.error = err.message;
		    });

        UserService.fetchProfile()
        .then(function(response){
          scope.user = response;
          console.log('activity',response);
        }).catch(function(err){
          scope.error = err.message;
        });

        scope.path = $location.path(); 

        if(scope.path.indexOf('project')>0){
          Project.fetchProject($routeParams.id)
          .then(function(response){
            scope.project = response;
          }).catch(function(err){
            console.log(err);
            scope.error = err.message;
          }); 
        }
      }
    };
  });
