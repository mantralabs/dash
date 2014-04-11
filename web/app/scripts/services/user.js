'use strict';

angular.module('pmtoolApp')
  .service('Userservice', function Userservice($resource) {
	this.users = $resource('http://localhost/responses/index.php',{},{'login':{'method':'get'}});
	this.users = $resource('http://localhost/responses/index.php',{},{'sigup':{'method':'post'}});
  });