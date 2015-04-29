'use strict';

angular.module('pmtoolApp')
  .service('Contact', function($http) {
	var Contact = {};
	Contact.list = null;

	Contact.fetch = function(){
		if(!Contact.list){
			$http.get('/api/user')
			.success(function(data){
				Contact.list = data;
			});
		}
		
		return Contact;
  	};

  	Contact.add = function(data, callback){
  		if(!Contact.list){
  			Contact.list = [];
  		}
  		console.log(data);
  		$http.post('/api/user', data)
  		.success(function(user){
			Contact.list.push(data);
			callback(null, Contact);
		})
		.error(function(error){
			Contact(error);
		})

  	}

  	Contact.delete = function(userId, callback){
  		if(!Contact.list){
  			$http.delete('/api/user', userId)
	  		.success(function(user){
	  			var index = Contact.list.map(function(e) { return e.id; }).indexOf(4);
  				delete Contact.list[index];
				callback(null, "sucess");
			})
			.error(function(error){
				Contact(error);
			})
  		}
  	}

  	// Contact.update = function(userId, callback){
  	// 	if(!Contact.list){
  	// 		$http.put('/api/user', userId)
	  // 		.success(function(user){

			// 	// Contact.list.indexOf();
			// 	// console.log(Contact.list.length);
			// 	callback(null, user);
			// })
			// .error(function(error){
			// 	Contact(error);
			// })
  	// 	}
  	// }

  	return Contact;
});