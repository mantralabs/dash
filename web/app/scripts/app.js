'use strict';

var resolve = {
    data:function($rootScope, $q, $http, $location,  $cookieStore){
        var deferred = $q.defer();
        var currentUser = $cookieStore.get('current_user');
        if(currentUser){
          deferred.resolve(currentUser);
        } else{
          deferred.reject();
          $location.path('/');
        }
    }
};

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
        controller:'homePageCtrl',
        resolve : resolve
      })  

      .when('/project/:id', {
        templateUrl: 'views/project.html',
        controller:'projectController',
        resolve: resolve
      })

      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller:'homePageCtrl',
        resolve: resolve
      })

      // .when('/projects/:id', {
      //   templateUrl: 'views/project.html',
      //   controller:'projectController',
      //   resolve: resolve
      // })

      .when('/profilepage',{
        templateUrl:'views/profile-page.html',
        controller:'userProfileCtrl',
        resolve: resolve
      })

      .when('/editprofile',{
        templateUrl:'views/edit-profile.html',
        controller:'editProfileCtrl',
        resolve : resolve
      })

      .when('/task-page',{
        templateUrl:'views/task-page.html',
        // controller:'taskPageCtrl',
        resolve : resolve
      })

      .when('/account-settings',{
        templateUrl:'views/account-settings.html',
        // controller:'accountSettingsCtrl',
        resolve : resolve
      })

      .when('/privacy',{
        templateUrl:'views/privacy-settings.html',
        // controller:'privacyCtrl',
        resolve : resolve
      })
      
      .when('/notification-settings',{
        templateUrl:'views/notification-settings.html',
        // controller:'notificationSettingsCtrl',
        resolve : resolve
      })

      .when('/contacts',{
        templateUrl:'views/home-page3.html',
        controller:'contactController',
        resolve : resolve
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
        controller:'createTaskCtrl',
        resolve : resolve
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
        controller:'privacySettingsCtrl',
        resolve : resolve
      })
      
      .when('/notification',{
        templateUrl:'views/notification-settings.html',
        controller:'notificationSettingsCtrl',
        resolve : resolve
      })
      
      .when('/info',{
        templateUrl:'views/getting-started.html',
        controller:'gettingStartedCtrl'
      })
      
      .when('/contactsupport',{
        templateUrl:'views/contact-support.html',
        controller:'contactSupportCtrl'
      })
      
      .when('/workspaceadd',{
        templateUrl:'views/workspace-add.html',
        controller:'addWorkspace',
        resolve : resolve
      })
      .when('/workspace',{
        templateUrl:'views/workspace-home.html',
        controller:'workspaceCtrl',
        resolve : resolve
      })
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