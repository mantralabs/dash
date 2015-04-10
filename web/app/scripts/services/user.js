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

	  this.postLogin = function (user, callback) {
	    $http.post(baseUrl+'user/login', user)
      .success(function(response){
        //API References the status message, on that we are operating for error or success
        if(response.status === "error"){
          callback(response, null)
        } else if(response.status === "success"){
          callback(null, response);
        }
      });

    //   this.editProfile = function (user, callback) {
    //   $http.post(baseUrl+'user', user)
    //   .success(function(response){
    //     //API References the status message, on that we are operating for error or success
    //     if(response.status === "error"){
    //       callback(response, null)
    //     } else if(response.status === "success"){
    //       callback(null, response);
    //     }
    //   });

    //   // enabale this error function later - When APT return type is changed.
    //   // .error(function(data){
    //   //   console.log(data);
    //   //   callback(data, null)
    //   // });
    // };
	
  // this.users = $resource('http://localhost/responses/index.php',{},{'login':{'method':'get'}});
	// this.users = $resource('http://localhost/responses/index.php',{},{'signup':{'method':'post'}});
     this.signout = function() {
      console.log('signout function is executed');
      
      // return $http({
      //   url : 'http://local.api.dash.com/user/logout',
      //   method : 'POST',
      // });
    };



    this.forgotPassword = function(){
      console.log('forgot-password');
      
    }

  });