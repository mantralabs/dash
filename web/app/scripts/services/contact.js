'use strict';

angular.module('pmtoolApp')
  .service('Contact', function($http) {
	var Contact = {};
	Contact.list = null;

	Contact.fetch = function(){
		if(!Contact.list){
			// $http.get('http://localhost/responses/contact.php').success(function(data){
				// Contact.list = data;
				// console.log(Contact.list.length);
			// });
		}
		return Contact;
  	};

  	Contact.add = function(data){
  		if(!Contact.list){
  			Contact.list = [];
  			Contact.list.push(data);
  		}
  	}
  	return Contact;
});