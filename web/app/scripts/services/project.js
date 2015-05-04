'use strict';

angular.module('pmtoolApp')
  .service('Project', function($http) {
	var Project = {};
	Project.list = null;

	Project.fetch = function(){
		if(!Project.list){
			$http.get('/api/project')
			.success(function(data){
				Project.list = data;
			});
		}
		return Project;
  	};

	Project.add = function(data, cb){
		console.log(Project.list);
		// data.workspace = 1;
		if(!Project.list){
						console.log('in project service');

			Project.list = [];
			// Project.list.push(data);
		}

		$http.post('/api/project', data)
		.success(function(){
      $('#project-modal').modal('hide');
			Project.list.push(data);
		});
	}
	return Project;
});