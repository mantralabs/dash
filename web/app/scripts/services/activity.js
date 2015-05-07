'use strict';

angular.module('pmtoolApp')
  .service('Activity', function Activity($q, $http, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
  
  	this.addActivity = function(activityData){
  		console.log(activityData);
  		var deferred = $q.defer();
		
		$http.post('/api/activity', activityData)
		.success(function(activity){
			console.log(activity);
			deferred.resolve(activity);
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}
  });
