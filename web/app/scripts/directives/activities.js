 'use strict';

angular.module('pmtoolApp')

  .directive('activities', function (Activity,$rootScope, $location, UserService, Project, $routeParams) {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      scope: {
        activities1: '=list'
      },
       link : function (scope, element, attrs) {
        scope.user = $rootScope.user;
        scope.path = $location.path();
        
        if($routeParams.id){
          Activity.fetch($routeParams.id)
          .then(function(response){
            scope.activities1 = response;
            // console.log("withparams",scope.activities1)
          })
          .catch(function(err){
            scope.error = err.message;
          });
        }else{
          Activity.fetch()
          .then(function(response){
            scope.activities1 = response;
            // console.log("withoutparams",scope.activities1)
          })
          .catch(function(err){
            scope.error = err.message;
          });
        }

        if(scope.user.role == "admin"){
            $('#activities').css({'height': '686px' });
            $('#acts').css({'height': '636px'});
          }else{
            $('#activities').css({'height': '463px' });
            $('#acts').css({'height': '409px'});
          }
       
        $(document).ready(function(){
          $("html").niceScroll({cursorwidth: '10px', autohidemode: false, zindex: 999 });
          $("#acts").niceScroll({cursorwidth: '10px', autohidemode: false, zindex: 999 });
        });
        
        
          
        

       


         // scope.$on("triggerActivity",function(){
         //  console.log("Im active now in activity")
         //    Activity.fetch()
         //    .then(function(response){
         //      scope.activities1 = response;
         //      console.log(scope.activities1);
         //    })
         //    .catch(function(err){
         //      scope.error = err.message;
         //    });
         // });

        scope.likeActivity = function (activity) {
         
          var data = {"activity":activity.id}
          
          Activity.addlikesActivity(data)
            .then(function(response){

              if(activity.likes.indexOf(scope.user.id) == -1){
               activity.likes.push(scope.user.id);

              }else{
                if (activity.likes.indexOf(scope.user.id) >-1){
                 var i = activity.likes.indexOf(scope.user.id);
                 activity.likes.splice(i,1);
                 }
              }
            
            })
            .catch(function(err){
              scope.error = err.message;
            });

        }


        scope.likeComment = function (activity,id,comment) {
         console.log(activity,id,comment);
         var data = {"commentId":id}
        
         
         Activity.addlikesComment(data)
            .then(function(response){

             if(comment.likes.indexOf(scope.user.id) == -1){
                comment.likes.push(scope.user.id);
              }
              else{

                if (comment.likes.indexOf(scope.user.id)>-1){
                    var i = comment.likes.indexOf(scope.user.id);
                    comment.likes.splice(i,1);
                  }
              }
            
            })
            .catch(function(err){
              scope.error = err.message;
            });

        }

        scope.ActivityDelete =  function (activity,id) {
          console.log(id);
          var data = {"activityId":id}
          Activity.deleteActivity(data)
          .then(function(response){
              Activity.fetch($routeParams.id)
              .then(function(response){
                scope.activities1 = response;
              })
              .catch(function(err){
                scope.error = err.message;
              });
        
          })
          .catch(function(err){
            scope.error = err.message;
          });
        }

        
        scope.addComment = function (activity) {

          var data = {"activity":activity.id,"comment":activity.comment}
          Activity.addComment(data)
            .then(function(response){
              console.log("comments",response)
              activity.comments.push(response);
               
               $('.commentbox').val('');
            })
            .catch(function(err){
              scope.error = err.message;
            });
          }

       }
    };
  });
