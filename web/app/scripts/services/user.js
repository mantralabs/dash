'use strict';

angular.module('pmtoolApp')
  .service('UserService', function ($q, $http, $resource, $rootScope) {

	  this.postLogin = function (user) { 

      var deferred = $q.defer();  

	    $http.post('/api/user/login', user)
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };
	
    //Sends request to API and User Logs out from the APPLICATION
    this.signout = function() {
    
      var deferred = $q.defer();  
      
      $http.get('/api/user/logout')
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    // To update the userprofile who is currently logged in
    this.updateProfile = function (userData) {

      var id = userData.id,
          deferred = $q.defer();

      $http.put('/api/user/'+id, userData)
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    //this request will be sent when user loads image in file upload elem.
    this.uploadAvatar = function(data){
        
        console.log('in', data);

        var deferred = $q.defer();
        
        $http.post('/api/avatar', data)
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

    //To fetch all the user on the App
    this.fetch = function(){

      var deferred = $q.defer();

      $http.get('/api/user')
      .success(function(response){
        deferred.resolve(response);
      }).error(function(err) {
        deferred.reject(response);
      });

      return deferred.promise;
    };

    //Fetch Particular User Logged in
    this.fetchUser = function(id){
      var deferred = $q.defer();
    
      $http.get('/api/user/'+id)
      .success(function(data){
        deferred.resolve(data);
      })
      .error(function(err){
        deferred.reject(err);
      });
      
      return deferred.promise;
    }

    // When User receive invitation in mail, then For the first time user set the Name and Password
    this.basicInfo = function(user){
      //accept the name and password as parameter and send as Object to API
      console.log('service-clnt', user);
      
      var deferred = $q.defer();
      
      $http.put('/api/basicInfo', user)
      .success(function(response){
        console.log(response);
        deferred.resolve(response);
      }).error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    //reset password or forgot password
    this.resetPasswordIntiate = function(data){
      console.log(data);

      var deferred = $q.defer();
      
      $http.post('api/resetPasswordInitiate', data)
      .success(function(result){
        console.log(result);
        deferred.resolve(result);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    //reset password or forgot password
    this.resetPassword = function(data){

      var deferred = $q.defer();
      
      $http.put('api/resetPassword', data)
      .success(function(result){
        console.log(result);
        deferred.resolve(result);
      })
      .error(function(err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };


    //to get the status of the user logged in
    this.isLoggedIn = function(){
      var deferred = $q.defer();
      
      $http.get('/api/status')
      .success(function(result){
        $rootScope.user = result;
        deferred.resolve();
      })
      .error(function(err){
        console.log('logged out status', err);
        deferred.reject(err);
      });
      
      return deferred.promise;
    };
  }
);