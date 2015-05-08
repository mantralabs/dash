'use strict';

angular.module('pmtoolApp')
  .service('Workspace', function ($q, $http, $resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    
    this.fetch = function(){
      var deferred = $q.defer();
      
      $http.get('/api/workspace')
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
      
      $http.post('/api/workspace', data)
      .success(function(workspace){
        deferred.resolve(workspace);
      })
      .error(function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    }

    this.delete = function(id){
      var deferred = $q.defer();
      
      $http.delete('/api/workspace/'+id)
      .success(function(workspace){
        deferred.resolve(workspace);
      })
      .error(function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    }

    this.fetchWorkspace = function(id){
    var deferred = $q.defer();
    
    $http.get('/api/workspace/'+id)
    .success(function(data){
      deferred.resolve(data);
    })
    .error(function(err){
      deferred.reject(err);
    });
    
    return deferred.promise;
    }
    
  });