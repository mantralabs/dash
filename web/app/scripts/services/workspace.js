'use strict';

angular.module('pmtoolApp')
  .service('WorkSpace', function ($q,$http,$resource) {
    var WorkSpace = {};
    WorkSpace.list = null;
    // AngularJS will instantiate a singleton by calling "new" on this function

    // this.add = function (workspace) {
    //   var deferred = $q.defer();
      
    //   $http.post('/api/workspace', workspace)
    //   .success(function(response){
    //     deferred.resolve(response);
    //   })
    //   .error(function(err){
    //     deferred.reject(err);
    //   });

    //   return deferred.promise;
    // };

    this.add = function(data, cb){
      if(!WorkSpace.list){
        WorkSpace.list = [];
      }
      $http.post('/api/workspace', data)
      .success(function(workspace){
        $('#workspace-modal').modal('hide');
        // WorkSpace.list.push(workspace);
        cb(null, workspace)
      });
      return WorkSpace;
    }

    this.fetch = function () {
  		return $http({
        url : '/api/workspace',
  			method : 'Get',
  			dataType : 'json',
    		contentType : 'application/json',
    	});
    }

    this.delete = function(workspaceId, callback){
      if(!WorkSpace.list){
        console.log(workspaceId);
        $http.delete('/api/workspace/'+workspaceId)
          .success(function(workspace){
            var index = WorkSpace.list.map(function(ele) { return ele.id; }).indexOf(workspaceId);
            delete WorkSpace.list[index];
            callback(null, "sucess");
          })
        .error(function(error){
        // WorkSpace(error);
      })
      }
    }

  });