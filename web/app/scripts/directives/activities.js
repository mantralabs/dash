'use strict';

angular.module('pmtoolApp')
  .directive('activities', function (Activity, $location, Project, $routeParams) {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        
        Activity.fetch().then(function(response){
          scope.activities = response;
		    }).catch(function(err){
		      scope.error = err.message;
		    });

        scope.path = $location.path(); 
        if(scope.path.indexOf('project')>0){
          Project.fetchProject($routeParams.id).then(function(response){
            scope.project = response;
            // angular.forEach(scope.project[0].activity, function(value, key) {
            //   var user = value.user;
            //   console.log(value.user);
            //   // console.log(key);
            //   angular.forEach(scope.project[0].users,function(users){
            //     console.log(users.id);
            //     var userId = users.id;
            //     if (userId == user){
            //       console.log(users.name);
            //       scope.project[0].activity.user_name=users.name;
            //       console.log(scope.project[0].activity.user_name);
            //     }else{
            //       console.log('admin');
            //     } 

            //   })
            // });
          }).catch(function(err){
            console.log(err);
            scope.error = err.message;
          }); 
        }
      }
    };
  });
