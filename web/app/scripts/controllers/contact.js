'use strict';

angular.module('pmtoolApp')
  .controller('contactController', function ($scope, $rootScope, $routeParams, $cookieStore, Contact) {
	// $scope.contacts = Contact.fetch();

	$scope.user = $rootScope.user;

	Contact.fetch().then(function(response){
		$scope.contacts = response;
	}).catch(function(err){
		$scope.error = err.message;
	});

	$scope.addNewContact = function(data){

		Contact.add(data).then(function(response){
			$scope.contacts.push(response);
			// console.log(response);
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

	$scope.deleteContact = function(id){
		if (window.confirm('Delete!! Are You Sure?')){
			Contact.delete(id).then(function(response){
				Contact.fetch().then(function(response){
					$scope.contacts = response;
				}).catch(function(err){
					$scope.error = err.message;
				});
			}).catch(function(err){
				$scope.error = err.message;
			})
		}
	}

	// $scope.getOtherUserData = function(otherUserId){
	// 	console.log('inside other');
	// }

	$scope.selection=[];

	$scope.toggleSelection = function(id){
		var idx = $scope.selection.indexOf(id);

		if (idx > -1) {
			$scope.selection.splice(idx, 1);
		} else {
			$scope.selection.push(id);
		}

		console.log($scope.selection);
	}
});