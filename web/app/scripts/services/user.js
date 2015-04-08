'use strict';

angular.module('pmtoolApp')
  .service('UserService', function UserService($q, $http, $resource) {
  	// console.log(data);

    this.signupNewUser = function (userData) {
  		return $http({
  			// url : 'http://local.api.dash.com/user',
        url : baseUrl+'user/',
  			method : 'POST',
  			dataType : 'json',
    		contentType : 'application/json',
    		data : JSON.stringify(userData)
    	});
    };

	  this.postLogin = function (userData, callback) {
	    $http.post(baseUrl+'user/login', userData)
      .success(function(data){
        //API References the status message, on that we are operating for error or success
        if(data.status === "error"){
          callback(data, null)
        } else if(data.status === "success"){
          callback(null, data);
        }
      });

      // enabale this error function later - When APT return type is changed.
      // .error(function(data){
      //   console.log(data);
      //   callback(data, null)
      // });
    };
	
  // this.users = $resource('http://localhost/responses/index.php',{},{'login':{'method':'get'}});
	// this.users = $resource('http://localhost/responses/index.php',{},{'signup':{'method':'post'}});
     this.signout = function() {
      console.log('signout function is executed');
      return $http({
        url : 'http://local.api.dash.com/user/logout',
        method : 'POST',
      });
    };

    this.forgotPassword = function(){
      console.log('forgot-password');
      
    }

  });