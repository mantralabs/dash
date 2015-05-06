'use strict';

angular.module('pmtoolApp')
  .service('Contact', function($http,$q) {
	// var Contact = {};
	// Contact.list = null;

	// Contact.fetch = function(){
	// 	if(!Contact.list){
	// 		Contact.list = []
	// 		$http.get('http://localhost:1337/user')
	// 		.success(function(data){
	// 			Contact.list = data;
	// 		});
	// 	}
		
	// 	return Contact;
 //  	};

 	this.fetch = function(){
		var deferred = $q.defer();
		
		$http.get('/api/user')
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}

  // 	Contact.add = function(data, callback){
  // 		if(!Contact.list){
  // 			Contact.list = [];
  // 		} 
  // 		console.log(data);
  // 		$http.post('http://localhost:1337/user', data)
  // 		.success(function(user){
		// 	Contact.list.push(data);
		// 	callback(null, Contact);
		// })
		// .error(function(error){
		// 	Contact(error);
		// })

  // 	}

  	// Contact.delete = function(userId, callback){
  	// 	if(!Contact.list){
  	// 		$http.delete('http://localhost:1337/user', userId)
	  // 		.success(function(user){
	  // 			var index = Contact.list.map(function(e) { return e.id; }).indexOf(userId);
  	// 			delete Contact.list[index];
			// 	callback(null, "sucess");
			// })
			// .error(function(error){
			// 	Contact(error);
			// })
  	// 	}
  	// }

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

  	// return Contact;
});