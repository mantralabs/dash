'use strict';

angular.module('pmtoolApp')
  .controller('contactController', function ($scope, Contact) {
	console.log('in');
	$scope.contacts = Contact.fetch();
	console.log($scope.contacts);
	$scope.addNewContact = function(){
		ContactService.add($scope.contact, function(err, contact){
			console.log(contact);
			console.log(err);
		})
	}
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

	// $scope.
});