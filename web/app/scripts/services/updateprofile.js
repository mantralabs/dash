'use strict';

angular.module('pmtoolApp')
  .service('UpdateService', function UpdateService($q, $http, $resource) {
  	// console.log(data);

    this.updateProfile = function (userData, cb) {
      var userId = userData.id;
  		// return $http({
    //     url : baseUrl+'user/',
  		// 	method : 'PUT',
  		// 	dataType : 'json',
    // 		contentType : 'application/json',
    // 		data : JSON.stringify(userData)
    // 	});
  $http.put(baseUrl+'user/'+ userId,userData)
      .success(function(data){
        console.log('INFO: After update ', data);
        cb(null, data);
      })
      .error(function(data){
        cb(data, null);
      });
      // .success(function(data){
      //   console.log(data);
      //   // if(data.status === "error"){
      //   //   console.log('data');
      //   //   callback(data, null)
      //   // } else if(data.status === "success"){
      //   //   callback(null, data);
      //   //   console.log('data');
      //   // }
      // });
    };
  });