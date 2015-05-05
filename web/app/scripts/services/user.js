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
	
  // this.users = $resource('http://localhost/responses/index.php',{},{'login':{'method':'get'}});
	// this.users = $resource('http://localhost/responses/index.php',{},{'signup':{'method':'post'}});
     this.signout = function() {
      console.log('signout function is executed');
      
      // return $http({
      //   url : 'http://local.api.dash.com/user/logout',
      //   method : 'POST',
      // });
    };


    this.updateProfile = function (userData, cb) {

      console.log('user service in');
    
      var userId = userData.id;
      
      $http.put('/api/user/'+userId,userData)
      .success(function(data){
        console.log('INFO: After update ', data);
        cb(null, data);
      })
      .error(function(data){
        cb(data, null);
      });
    };

    this.forgotPassword = function(){
      console.log('forgot-password');
      
    };

  });