'use strict';

angular.module('pmtoolApp')
  .directive('activities', function (Activity) {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        
        Activity.fetch().then(function(response){
			scope.activities = response;
		}).catch(function(err){
			scope.error = err.message;
		});
      }
    };
  });
