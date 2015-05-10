'use strict';

angular.module('pmtoolApp')
  .directive('activities', function (Activity) {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        
        Activity.fetch().then(function(response){
        	console.log('inside activity');
			scope.activities = response;
			console.log('activity-resp',response);
		}).catch(function(err){
			scope.error = err.message;
		});
      }
    };
  });
