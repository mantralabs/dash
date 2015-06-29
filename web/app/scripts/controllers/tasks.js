'use strict';

/**
 * @ngdoc function
 * @name pmtoolApp.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the pmtoolApp
 */
angular.module('pmtoolApp')
  .controller('taskPageCtrl', function ($scope,$location,Task, Project,$rootScope, $routeParams) {
	$scope.user = $rootScope.user;
	

	Project.fetch().then(function(response){
		$scope.projects = response;
	}).catch(function(err){
		$scope.error = err.message;
	});


	Task.fetchTasks().then(function(response){
		$scope.tasks = response;
	}).catch(function(err){
		$scope.error = err.message;
	});

	$scope.showAssignedTask = false;
	$scope.alltasks = true;
	$scope.showMyTask = true;
	$( "#date" ).datepicker();

	$scope.createTask = function(name,description,project,assignedTo,duedate) {
		var data = {status:"Not started",description:description,name:name,project:project,assignedTo:assignedTo,duedate:duedate};
		if(name == undefined || description == undefined || project == undefined || assignedTo == undefined || duedate == undefined){
			alert("Please fill all details");
		}else{
			Task.addTask(data).then(function(response){
				$scope.tasks.push(response);
				$('#task-modal').modal('hide');
				$('.tasktitle').val("");
				$('.taskdesc').val("");
				$('.taskproject').val("");
				$('.taskassigned').val("");
				$('.date').val("");
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
	}

	$scope.myTask = function ($event) {
		// console.log("myTask",$event);
		if ($(event.target).parent().hasClass('task-head-nav')){
			$(event.target).siblings('li').removeClass('active-task');
			$(event.target).addClass('active-task');
		} else {
			$(event.target).siblings('li').removeClass('active-task-body');
			$(event.target).addClass('active-task-body');
		}
		$scope.showAssignedTask = false;
		$scope.showMyTask = true;
		$scope.alltasks = true;
		$scope.finished = false;
		$scope.progress = false;
		$scope.tasks = [];

		
			Task.fetchTasks().then(function(response){
				$scope.tasks = response;
			}).catch(function(err){
				$scope.error = err.message;
			});

	}

	$scope.assignedTask = function ($event) {
		// console.log("assignedTaskevent",$event);
		if ($(event.target).parent().hasClass('task-head-nav')){
			$(event.target).siblings('li').removeClass('active-task');
			$(event.target).addClass('active-task');
		} else {
			$(event.target).siblings('li').removeClass('active-task-body');
			$(event.target).addClass('active-task-body');
		}
		$scope.showMyTask = false;
		$scope.showAssignedTask = true;
		$scope.alltasks = true;
		$scope.finished = false;
		$scope.progress = false;
		$scope.tasks = [];
		
		Task.fetchTasksAssigned().then(function(response){
			$scope.tasks = response;
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

	
	$scope.inProgress = function ($event) {
		// console.log("inProgressevent",$event);
		$(event.target).siblings('li').removeClass('active-task-body');
		$(event.target).addClass('active-task-body');
		$scope.alltasks = false;
		$scope.finished = false;
		$scope.progress = true;
		$scope.inProgressTasks =[];

		angular.forEach($scope.tasks, function(task, idx) {
			if (task.status == "In progress"){
				$scope.inProgressTasks.push(task);
			}
		});
	}


	$scope.completed = function ($event) {
		// console.log("completedevent",$event);
		$(event.target).siblings('li').removeClass('active-task-body');
		$(event.target).addClass('active-task-body');
		$scope.alltasks = false;
		$scope.progress = false;
		$scope.finished = true;
		$scope.completedTasks = [];
		 angular.forEach($scope.tasks, function(task, idx) {
			if (task.status == "Completed"){
				$scope.completedTasks.push(task);
			}
		});
	}

	$scope.taskStatus = function (status, taskid) {
		var data = {"status":status}
		Task.statusUpdate(taskid,data).then(function(response){
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

})