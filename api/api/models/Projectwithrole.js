/**
* Projectwithrole.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    tableName: "projectwithrole",

  attributes: {
  	role :{
  		type : 'string',
  		enum: ['member', 'pm']
  	},
  	user : {
  		model : 'User'
  	},
    project: {
      model: 'Project'
    }
  },
    delete : function (removedUsers, projectId, cb){
        console.log('hftjh',removedUsers);
        _.each(removedUsers, function(removedUserId) {
            console.log('removedUserId',removedUserId);
            Projectwithrole.destroy({project:projectId, user:removedUserId}).exec(function(err,Projectwithrole){
                if(!err){
                    cb(null,{msg:'member deleted', status:200});
                } else {
                    cb(err);
                }
            });
        });
    },

    add: function(data, cb){
        var projectId = data.project;
        var flag = false;
        
        Projectwithrole.find({project:projectId}).exec(function(err,response){
            if(!err){
                if(response && response.length > 0){
                    _.each(response,function(Projectwithrole, idx) {
                        if(Projectwithrole.user == data.user){
                            flag = true;
                            Projectwithrole.update({user: data.user}, data, function(err, result){
                                if(!err){
                                    cb(null, result)
                                } else {
                                    cb(err);
                                }
                            })
                        }
                        if(idx == (response.length - 1)){
                            if(flag == false){
                                Projectwithrole.create(data, function(err, result){
                                    if(!err){
                                        cb(null, result);
                                    }else{
                                        cb(err);
                                    }
                                });
                            }
                        }
                    });
                } else {
                    console.log('no project user');
                    Projectwithrole.create(data, function(err, result){
                        if(!err){
                            console.log('Projectwithrole created',result);
                            cb(null, result);
                        }else{
                            cb(err);
                        }
                    });
                }
            } else {
                cb(err);
            }
        });
    },
    
    getRoleInProject : function(userId, projectId, cb){
        Projectwithrole.findOne({project:projectId, user:userId}).exec(function(err,response){
            if(!err){
                cb(null,response);
            }
            else{
                cb(err);
            }
        })
    }
  
};

