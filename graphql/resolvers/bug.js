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
        // if( !req.isAuth){
        //     throw new Error("Unauthenticated!!")
        // }
        const fetchedProject = await Project.findOne({_id: args.projectId});
        const bug = new Bug({
            creator: '5d7a8c8f5208dc3626545784',
            project: fetchedProject,
            name: args.bugInput.name
        });
        // const result = await bug.save();
        // return transformBug(result);
        
        let createdBug;
        try {
        const result = await bug
            .save()
                createdBug = transformBug(result)
            const creator = await User.findById("5d7a8c8f5208dc3626545784")
                if (!creator){
                    throw new Error('User not found.')
                }
                creator.createdBugs.push(bug);
                await creator.save();
                return createdBug;
        }
        catch(err){
                throw err
        } 
    },
    
    deleteBug: async (args, req) => {
        // if( !req.isAuth){
        //     throw new Error("Unauthenticated!!")
        // }
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