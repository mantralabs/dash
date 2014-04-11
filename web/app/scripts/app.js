'use strict';

angular
  .module('pmtoolApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      .when('/home',{
        templateUrl :'views/home-page.html',
        controller:'LoginCtrl'
      })

      .when('/signup',{
        templateUrl:'views/signup.html',
        controller:'SignupCtrl'
      })

      .when('/test',{
        templateUrl:'views/test.html',
        controller:'TestCtrl'
      })

      .when('/profile1/:id',{
        templateUrl:'views/user-profile.html',
        controller:'UserprofileCtrl'
      })

      .otherwise({
        redirectTo: '/'
      });
  });
