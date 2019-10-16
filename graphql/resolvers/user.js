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
    singleUser: async (args, res) => {
        try {
            const singleUser = await User.findOne({_id : args.userId});
            return user(singleUser)
        }
        catch(err){
            throw err
        }
    },
    editUser: async (args, req) => {
        User.findByIdAndUpdate(args.userId, 
            {
                $set:
                {
                    firstName: args.userInput.firstName,
                    lastName: args.userInput.lastName,
                    email: args.userInput.email,
                    address: args.userInput.address,
                    credential: args.userInput.credential
                }},{new: true}, function(err, user){
                    if(err) throw err
                    return user
                })
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
            
            Bug.find({'_id': {$in:[createdBugIds]}}, function(err,bugs){
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
            Bug.find({'_id': {$in:[assignedBugIds]}}, function(err,bugs){
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