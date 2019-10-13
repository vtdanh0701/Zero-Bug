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
    createBug: async (args, req) => {
        if( !req.isAuth){
            throw new Error("Unauthenticated!!")
        }
        const fetchedProject = await Project.findOne({_id: args.projectId});
        const fetchedAssignee = await User.findOne({_id: args.assigneeId})
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
        try {
            const bug = await Bug.findById(args.bugId).populate('project');
            const project = transformProject(bug.project);
            await Bug.deleteOne( {_id: args.bugId});
            return project;
        }
        catch(err){
            throw err
        }
    }
};