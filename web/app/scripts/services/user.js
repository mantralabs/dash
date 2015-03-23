'use strict';

angular.module('pmtoolApp')
  .service('Userservice', function Userservice($q, $http, $resource) {
  	// console.log(data);
  	this.signupNewUser = function (userInfo) {
  		return $http({
  			url : 'http://local.api.dash.com/user',
  			method : 'POST',
  			dataType : 'json',
    		contentType : 'application/json',
    		data : JSON.stringify(userInfo)
    	});
    };
	  this.signin = function (userInfo) {
  		// var defer = $q.defer();
  		// console.log(defer);
  		console.log(userInfo);
  		return $http({
  			url : 'http://local.api.dash.com/user/login',
  			method : 'POST',
  			dataType : 'json',
    		contentType : 'application/json',
    		data : JSON.stringify(userInfo)
    	});
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

  });
