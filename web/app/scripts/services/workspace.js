'use strict';

angular.module('pmtoolApp')
  .service('Workspace', function Workspace($q,$http,$resource) {
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

  });
