'use strict';

angular.module('pmtoolApp')
  .service('WorkSpace', function Workspace($q,$http,$resource) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.fetch = function () {
  		return $http({
  			// url : 'http://local.api.dash.com/user',
        url : baseUrl+'workspace',
  			method : 'Get',
  			dataType : 'json',
    		contentType : 'application/json',
    		// data : JSON.stringify(workSpaceData)
    	});
    };

    // this.createWorkspace = function(data){
    //   console.log('workspace service called');
    //   $http.put(baseUrl+'workspace/', data)
    //     .success(function(response){
    //       //API References the status message, on that we are operating for error or success
    //       if(response.status === "error"){
    //         callback(response, null)
    //       } else if(response.status === "success"){
    //         callback(null, response);
    //       }
    //     });
    // };


  });