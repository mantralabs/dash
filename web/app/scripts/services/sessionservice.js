'use strict';

/**
 * @ngdoc service
 * @name pmtoolApp.sessionService
 * @description
 * # sessionService
 * Factory in the pmtoolApp.
 */
angular.module('pmtoolApp')
  .service('sessionService', function ($cookies,$http) {
   
    // Public API here

      this.setItem = function(key, value){
          console.log(key +' '+ value);
          console.log('session');
          // return $cookies.put(key, value);
          return localStorage.setItem(key, value);
      },
      this.get = function(key){
          return $cookies.get(key);
      },
      this.destroy = function(key){
          return $cookies.remove(key);
      }
  });