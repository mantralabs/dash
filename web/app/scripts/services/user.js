'use strict';

angular.module('pmtoolApp')
  .service('UserService', function ($q, $http, $resource) {
    
    this.signup = function (userData) {
      var deferred = $q.defer();
      
      $http.post('/api/user', userData)
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    };

	  this.postLogin = function (user) { 
      var deferred = $q.defer();  
	    $http.post('/api/user/login', user)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };
	
    this.signout = function() {
      console.log('signout function is executed');
    };

    this.updateProfile = function (userData) {

      var userId = userData.id;

      var deferred = $q.defer();  
      
      $http.put('/api/user/'+userId, userData)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    this.forgotPassword = function(){
      console.log('forgot-password');
    };

    this.fetch = function(){

      var deferred = $q.defer();

      $http.get('api/user')
      .success(function(response){
        deferred.resolve(response);
      }).error(function(err) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

  }
);