'use strict';

angular.module('pmtoolApp')
  .directive('sprints', function ($location, $routeParams, Sprint, $rootScope) {
    return {
		templateUrl:'views/sprints.html',
		restrict: 'E',

		// scope :{
		// 	sprint : '='
		// },

		link: function(scope, element, attrs) {
			
			setTimeout(function(){$("#datepicker-sprint-start").datepicker({ 
				autoclose: true, 
				todayHighlight: true,
				startDate: new Date()
			}).datepicker('update', new Date())},100);

			setTimeout(function(){$("#datepicker-sprint-end").datepicker({ 
				autoclose: true, 
				todayHighlight: true,
				startDate: new Date()
			}).datepicker('update', new Date())}, 100);

			var data ={
				project : $routeParams.id
			}
			console.log('data',data);
			Sprint.fetchSprints(data)
			.then(function(response){
				scope.sprints = response;
				// console.log(scope.sprints);
			}).catch(function(err){
				scope.error = err.message;
			});

			scope.createSprint = function(sprint){
				var data = {
					name : sprint.name,
					startDate : sprint.startDate,
					endDate : sprint.endDate,
					project : $routeParams.id
				}
				// console.log('data',data);
				Sprint.createSprint(data)
				.then(function(response){
					scope.sprints.push(response);
					$('#create-sprint-modal').modal('hide');
				}).catch(function(err){
					scope.error = err.message;
				});
			}
		}
    };
  });
