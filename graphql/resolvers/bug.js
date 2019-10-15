const Bug = require('../../models/bug');
const Project = require('../../models/project');
const User = require('../../models/user');

const { transformBug, transformProject } = require('./merge')


module.exports = {
    bugs: async (args, req) => {
        // if( !req.isAuth){
        //     throw new Error("Unauthenticated!!")
        // }
        try {
            const bugs = await Bug.find();
            return bugs.map(bug => {
                return transformBug(bug);
            });
        }
        catch(err){
            throw err;
        }
    }, 
    singleBug: async (args, res) => {
        try {
            const bug = await Bug.findOne({_id : args.bugId});
            return transformBug(bug)
        }
        catch(err){
            throw err
        }
    },
    createBug: async (args, req) => {
        if( !req.isAuth){
            throw new Error("Unauthenticated!!")
        }
        const fetchedProject = await Project.findOne({_id: args.projectId});
        const fetchedAssignee = await User.findById(args.assigneeId)
        const bug = new Bug({
            creator: req.userId,
            project: fetchedProject,
            assignee: fetchedAssignee,
            name: args.bugInput.name,
            description: args.bugInput.description,
            dueDate: new Date(args.bugInput.dueDate),
            status: args.bugInput.status,
            level: args.bugInput.level
        });
        // const result = await bug.save();
        // return transformBug(result);
        
        let createdBug;
        try {
        const result = await bug
            .save()
                createdBug = transformBug(result)
            const creator = await User.findById(req.userId)
            const assignee = await User.findById(args.assigneeId)
                if (!creator || !assignee){
                    throw new Error('User not found.')
                }
                creator.createdBugs.push(bug);
                assignee.assignedBugs.push(bug)
                await creator.save();
                await assignee.save();
                return createdBug;
        }
        catch(err){
                throw err
        }

    },
    
    deleteBug: async (args, req) => {
        if( !req.isAuth){
            throw new Error("Unauthenticated!!")
        }
        Bug.findByIdAndDelete(args.bugId, function(err, bug){
            User.findById(bug.creator, function(err, user){
                user.createdBugs.pull(bug)
                user.save(function(err, user){
                    if(err) throw err;
                    return user
                })
            })
            User.findById(bug.assignee, function(err, user){
                user.assignedBugs.pull(bug)
                user.save(function(err, user){
                    if(err) throw err;
                    return user
                })
            })
        })
    },

    editBug: async (args, req) => {
        const fetchedAssignee = await User.findById(args.assigneeId)
        Bug.findById(args.bugId, function(err, bug){
            console.log(bug.assignee)
            if(args.assigneeId !== bug.assignee._id){
                User.findById((bug.assignee._id), function(err,user){
                    if(!user){
                        return bug
                    } else{
                        user.assignedBugs.pull(bug)
                        user.save(function(err,user){
                            if(err) throw err
                            return user 
                        })
                    }
                    
                })
                User.findById((args.assigneeId), function(err,user){
                    user.assignedBugs.push(bug)
                    user.save(function(err,user){
                        if(err) throw err
                        return user 
                    })
                })
            }
            bug.name = args.bugInput.name;
            bug.description = args.bugInput.description;
            bug.dueDate = args.bugInput.dueDate;
            bug.assignee = fetchedAssignee;
            bug.status = args.bugInput.status;
            bug.level = args.bugInput.level
            bug.save((err, bug) => {
                if(err) throw err
                return bug
            })
        })
    }
    
};