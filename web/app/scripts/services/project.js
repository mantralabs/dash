'use strict';

angular.module('pmtoolApp')
  .service('Project', function ($http, $q, $resource) {

	this.fetch = function(){
		var deferred = $q.defer();
		
		$http.get('/api/project')
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}

	this.add = function(data){
		var deferred = $q.defer();
		
		$http.post('/api/project', data)
		.success(function(project){
      		$('#project-modal').modal('hide');
			deferred.resolve(project);
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.delete = function(id){
      var deferred = $q.defer();
      
      $http.delete('/api/project/'+id)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    }
});