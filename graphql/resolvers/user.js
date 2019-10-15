const User = require('../../models/user');
const Project = require('../../models/project');
const Bug = require('../../models/bug');
const { user }  = require('./merge')

module.exports = {
    users: async () => {
        try {
        const users = await User.find()
            return users.map(result => {
                return user(result)
        })
        }
        catch(err) {
            throw err
        }
    },
    deleteUser: async (args, req) => {
        if( !req.isAuth){
            throw new Error("Unauthenticated!!")
        }
        User.findByIdAndDelete(args.userId, function(err,user){
            console.log(user)
            const projectIds = user.createdProjects
            const createdBugIds = user.createdBugs
            const assignedBugIds = user.assignedBugs

            console.log("project ID: " + projectIds)
            if(projectIds.length === 0){
                return user
            } else{
                Project.find({'_id': {$in:[projectIds]}}, function(err,project){
                    project.creator.pull(user)
                    project.save(function(err,project){
                        if(err) throw err
                        return project
                    })  
                })
            }
            
            Bug.find({'_id': {$in:[bugIds]}}, function(err,bugs){
                if(bugs.length === 0){
                    return 
                } else {
                    for(i = 0; i <= bugs.length; i++){
                        bug[i].creator.pull(user)
                        bug[i].save(function(err,bug){
                            if(err) throw err
                            return bug
                        })
                    }
                }
                
            })
            Bug.find({'_id': {$in:[user.assignedBugs]}}, function(err,bugs){
                if(bugs.length === 0){
                    return 
                } else {
                    for(i = 0; i <= bugs.length; i++){
                        bug[i].assignee.pull(user)
                        bug[i].save(function(err,bug){
                            if(err) throw err
                            return bug
                        })
                    }
                    
                }
            })
        })
    }
}