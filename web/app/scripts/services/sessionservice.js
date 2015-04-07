'use strict';

/**
 * @ngdoc service
 * @name pmtoolApp.sessionService
 * @description
 * # sessionService
 * Factory in the pmtoolApp.
 */
angular.module('pmtoolApp')
  .factory('sessionService', function () {
   
    // Public API here
    return{
      set:function(key, value){
          return localStorage.setItem(key, value);
      },
      get:function(){
          return localStorage.getItem(key);
      },
      destroy:function(){
          return localStorage.removeItem(key);
      }
    };
  });
