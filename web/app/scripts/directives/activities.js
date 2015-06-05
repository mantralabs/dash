'use strict';

angular.module('pmtoolApp')

  .directive('activities', function (Activity, $location, UserService, Project, $routeParams) {
    return {
      templateUrl: 'views/activities.html',
      restrict: 'E',
      scope: {
        activities1: '=list'

      },
       link : function(scope, element, attrs) {

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
         // scope.selected = activity; 
          var data = {"activity":activity.id}
          
          Activity.addlikesActivity(data)
            .then(function(response){

              console.log(response);
              if(response.likes.length > 0){
                // scope.selected = activity; 
                for(var i=0; i<response.likes.length; i++){
                 activity.likes.push(response.likes[i]);
                }
              }else{
                if (activity.likes.indexOf(activity.user.id)>-1){
                  // scope.selected = "xyz";
                  activity.likes.splice(activity.user.id);
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

       

        scope.likeComment = function (activity,id,comment) {
         console.log(activity,id,comment);
         var data = {"commentId":id}
         console.log(data);
         
         Activity.addlikesComment(data)
            .then(function(response){

              console.log("commentlikes",response);
              if(response.likes.length > 0){
                for(var i=0; i<response.likes.length; i++){
                 
                    comment.likes.push(response.likes[i]);
                }
              }else{
                for(var j=0; j<comment.likes.length; j++){
                  if (comment.likes.indexOf(activity.user.id)>-1){
                    comment.likes.splice(activity.user.id);
                  }
                }

              }
            
            })
            .catch(function(err){
              scope.error = err.message;
            });

        }


      }
    };
  });
