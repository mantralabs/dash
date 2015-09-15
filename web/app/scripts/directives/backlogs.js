'use strict';

angular.module('pmtoolApp')
  .directive('backlogs', function ($location, $routeParams, $rootScope, Backlog, Sprint) {
    return {
		templateUrl:'views/backlogs.html',
		restrict: 'E',
		// scope : {
		// 	sprint :'='
		// },
		link: function(scope, element, attrs) {

			scope.user = $rootScope.user;
			var path = $location.path();
			setTimeout(function(){
			scope.sprints = Sprint.storeSprints;
			
			// scope.MyName = scope.sprints[2];
			// angular.forEach(scope.backlogs, function(val, key){
			// 	angular.forEach(scope.sprints, function(kal, pey){
			// 		if (val.sprint) {
			// 			if (val.sprint.name == kal.name) {
			// 				val.specialId = pey;
			// 			}
			// 		}else{
			// 			val.specialId = "0";
			// 		}
					
			// 	})
			// });
			console.log('scope.sprints',scope.sprints);
			},200)


			
			var fetchBacklogs = function(data){
				Backlog.fetchBacklogs(data)
				.then(function(response){
					scope.backlogs = response;
					console.log('scope.backlogs',scope.backlogs);
				}).catch(function(err){
					scope.error = err.message;
				});
			}
			if (attrs.type == 'projectPage'){
				var data = {
					project : $routeParams.id
				}
				console.log('inproject page');
				fetchBacklogs(data);
			} else if(attrs.type == 'sprintPage') {
				var data = {
					sprint : $routeParams.id
				}
				console.log('inside sprint page',data);
				fetchBacklogs(data);
			}
			scope.createBacklog = function(backlog){
				console.log('in createBacklog');
				if (attrs.type == 'projectPage'){
					var data = {
						name : backlog.name,
						description : backlog.description,
						project : $routeParams.id
					}
				} else if(attrs.type == 'sprintPage') {
					var data = {
						name : backlog.name,
						description : backlog.description,
						project : $rootScope.sprint.project.id,
						sprint : $routeParams.id
					}
				}
				console.log('data',data);
				Backlog.createBacklog(data)
				.then(function(response){
					scope.backlogs.push(response);
					$('#create-backlog-modal').modal('hide');
				}).catch(function(err){
					scope.error = err.message;
				});
			}

			scope.changeSprint = function(sprintId,backlog){
				// console.log('changeSprint sprint-->',sprint);
				console.log('changeSprint backlog-->',backlog);
				var backllogId = backlog.id;
				var data = {
					sprint : sprintId
				}
				console.log('data',data);
				Backlog.editBacklog(backllogId,data)
				.then(function(response){
					console.log('changeSprint resp',response);
				}).catch(function(err){
					scope.error = err.message;
				})
			}
		}
    };
  });
