'use strict';

angular.module('pmtoolApp')

  .directive('activities', function (Activity,$rootScope, $location, UserService, Project, $routeParams) {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      scope: {
        activities1: '=list'

      },
       link : function(scope, element, attrs) {
        scope.user = $rootScope.user;
        scope.path = $location.path();
        
        if($routeParams.id){
          Activity.fetch($routeParams.id)
          .then(function(response){
            scope.activities1 = response;
             console.log(scope.activities1);
          })
          .catch(function(err){
            scope.error = err.message;
          });
        }else{
          Activity.fetch()
          .then(function(response){
            scope.activities1 = response;
            console.log(scope.activities1);
          })
          .catch(function(err){
            scope.error = err.message;
          });
        }

        

        scope.hideShow = function(activity){
          if(scope.showCommentBox === false){
           return scope.showCommentBox = true;
          }else{
            return scope.showCommentBox = false;
          }
        }
        
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

        // scope.isActive = function(activity) {
        //   if(scope.selected === activity){
        //   return scope.selected === activity;
        //   }else{
        //     return scope.selected === !activity;
        //   }
        // };
        scope.showCommentBox = false;
        scope.addComment = function (activity) {

          var data = {"activity":activity.id,"comment":activity.comment}
          console.log(activity);
          scope.showCommentBox  =  ! scope.showCommentBox;
          
          
          Activity.addComment(data)
            .then(function(response){
              activity.comments.push(response);
               console.log("activity",response);
               console.log(activity);
               $('.commentbox').val('');
            })
            .catch(function(err){
              scope.error = err.message;
            });
          }

       }
    };
  });
