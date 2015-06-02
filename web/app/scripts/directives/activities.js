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
        
        scope.path = $location.path();
        
        if($routeParams.id){
          Activity.fetch($routeParams.id)
          .then(function(response){
            scope.activities1 = response;
             console.log(scope.activities1);
          })
          .catch(function(err){
            scope.error = err.message;
          });
        }else{
          Activity.fetch()
          .then(function(response){
            scope.activities1 = response;
          })
          .catch(function(err){
            scope.error = err.message;
          });
        }
        
        scope.addVote = function (activity) {
          
          scope.likes = [];
          var data = {"activity":activity.id}
          
          Activity.addlikes(data)
            .then(function(response){
              console.log(response);
              scope.likes.push(response.likes[0]);
              console.log(scope.likes);
            })
            .catch(function(err){
              scope.error = err.message;
            });

        }


      }
    };
  });
