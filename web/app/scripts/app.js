'use strict';

angular
  .module('pmtoolApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config([ '$routeProvider','$locationProvider',
    function($routeProvider,$locationProvider) {
    $routeProvider
      
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      
      .when('/home',{
        templateUrl :'views/home-page.html',
        controller:'homePageCtrl'
      })      

      .when('/profilepage',{
        templateUrl :'views/profilePage.html',
        controller:'userProfileCtrl'
      })

      .when('/signup',{
        templateUrl:'views/signup.html',
        controller:'SignupCtrl'
      })

      .when('/userprofile/:id',{
        templateUrl:'views/user-profile.html',
        controller:'ownUserProfileCtrl'
      }) 
      
      .when('/createevent',{
        templateUrl:'views/create-event.html',
        controller:'createEventCtrl'
      })
      
      .when('/createtask',{
        templateUrl:'views/create-task.html',
        controller:'createTaskCtrl'
      })
      
      .when('/search',{
        templateUrl:'views/search-results-page.html',
        controller:'searchResultsCtrl'
      })
      
      .when('/mytasks',{
        templateUrl:'views/task-page.html',
        controller:'taskPageCtrl'
      })
      
      .when('/privacy',{
        templateUrl:'views/privacy-settings.html',
        controller:'privacySettingsCtrl'
      })
      
      .when('/notification',{
        templateUrl:'views/notification-settings.html',
        controller:'notificationSettingsCtrl'
      })
      
      .when('/info',{
        templateUrl:'views/getting-started.html',
        controller:'gettingStartedCtrl'
      })
      
      .when('/contactsupport',{
        templateUrl:'views/contact-support.html',
        controller:'contactSupportCtrl'
      })
      
      .when('/accountsettings',{
        templateUrl:'views/account-settings.html',
        controller:'accountSettingsCtrl'
      })
      
      .when('/privacy',{
        templateUrl:'views/privacy-settings.html',
        controller:'privacyCtrl'
      })
      
      .when('/notificationsettings',{
        templateUrl:'views/notification-settings.html',
        controller:'notificationSettingsCtrl'
      })
      
      .when('/contacts',{
        templateUrl:'views/home-page3.html',
        controller:'contactsPageCtrl'
      })
      
      .when('/taskpage',{
        templateUrl:'views/task-page.html',
        controller:'taskPageCtrl'
      })

      .when('/editprofile',{
        templateUrl:'views/edit-profile.html',
        controller:'editProfileCtrl'
      })
      
      // .when('/settings',{
      //   templateUrl:'views/account-settings.html'
      //   controller:'accountSettingsCtrl'
      // })
      // .when('/addcontacts',{
      //   templateUrl:'views/add-more-contacts2.html'
      //   controller:'addContactsCtrl'
      // })
      // .when('/contactsupport',{
      //   templateUrl:'view/contact-support.html'
      //   controller:"contactSupportCtrl"
      // })

      .otherwise({
        redirectTo: '/'
      });
  }]);