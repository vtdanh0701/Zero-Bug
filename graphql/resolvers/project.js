const Project = require('../../models/project');
const User = require('../../models/user');

const { transformProject } = require('./merge');



module.exports = {
    projects: async () => {
        try {
        const projects = await Project.find()
            return projects.map(project => {
                return transformProject(project)
        })
        }
        catch(err) {
            throw err
        }
    },
    createProject: async (args, req) => {

        // if( !req.isAuth){
        //     throw new Error("Unauthenticated!!")
        // }
        
        const userId = "5d7d6edd0617d25c4c45cde6"
        
        const project = new Project({
            name: args.projectInput.name,
            description: args.projectInput.description,
            startDate: new Date(args.projectInput.startDate),
            endDate: new Date(args.projectInput.endDate),
            creator: userId
        });
        
        let createdProject;
        try {
        const result = await project
            .save()
                createdProject = transformProject(result)
            const creator = await User.findById(userId)
                if (!creator){
                    throw new Error('User not found.')
                }
                creator.createdProjects.push(project);
                await creator.save();
                return createdProject;
        }
        catch(err){
                throw err
        } 
    },
    deleteProject: async (args, req) => {
        // if( !req.isAuth){
        //     throw new Error("Unauthenticated!!")
        // }
        // try {
        //     const project = await Project.findById(args.projectId).populate('user');
        //     const creator = user(project.creator);
        //     console.log(creator)
        //     await Project.deleteOne( {_id: args.projectId});
        //     creator.save() 
        //     return creator;
        // }
        // catch(err){
        //     throw err
        // }
        Project.findByIdAndDelete(args.projectId, function(err, project){
            User.findById(project.creator, function(err, user){
                user.createdProjects.pull(project)
                user.save(function(err, user){
                    if(err) throw err;
                    return user
                })
            })
        })
    },
    editProject: async (args, req) => {
        Project.findByIdAndUpdate(args.projectId, 
            {
                $set:
                {
                    name: args.projectInput.name,
                    startDate: args.projectInput.startDate,
                    endDate: args.projectInput.endDate,
                    description: args.projectInput.description,
                }},{new: true}, function(err, project){
                    if(err) throw err
                    return project
                })
    }
};