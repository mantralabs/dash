'use strict';

angular.module('pmtoolApp')
  .controller('contactController', function ($scope, Contact) {
	// $scope.contacts = Contact.fetch();

	Contact.fetch().then(function(response){
		$scope.contacts = response;
	}).catch(function(err){
		$scope.error = err.message;
	});

	$scope.addNewContact = function(){
		var data = {
			email : $scope.email
		}
		Contact.add(data, function(err, contact){
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
});