'use strict';

angular.module('pmtoolApp')
  .service('Project', function($http) {
	var Project = {};
	Project.list = null;

	Project.fetch = function(){
		if(!Project.list){
			// $http.get('http://localhost/responses/project.php').success(function(data){
			// 	Project.list = data;
			// });
		}
		return Project;
  	};

  	Project.add = function(data){
  		if(!Project.list){
  			Project.list = [];
  			Project.list.push(data);
  		}
  	}
  	return Project;
});