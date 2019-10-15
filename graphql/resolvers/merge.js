const Project = require('../../models/project');
const Bug = require('../../models/bug');
const User = require('../../models/user');
const { dateToString } = require('../../helpers/date');




const user = async userId => {
    try {
        const user = await User.findById(userId)
            return {...user._doc, 
                    _id: user.id, 
                    createdProjects: projects.bind(this, user.createdProjects),
                    createdBugs: bugs.bind(this, user.createdBugs),
                    assignedBugs: bugs.bind(this, user.assignedBugs)
                }
    }
    catch(err) {
        throw err
    }
}

const projects = async projectIds => {
    try {
        const projects = await Project.find({ _id: {$in: projectIds}})
        return projects.map(project => {
            return transformProject(project);
        });
    } 
    catch(err) {
        throw err
    }
}

const bugs = async bugIds => {
    try {
        const bugs = await  Bug.find({ _id: {$in: bugIds}})
        return bugs.map(bug => {
            return transformBug(bug);
        });
    } 
    catch(err) {
        throw err
    }
}

const singleProject = async projectId => {
    try {
        const project = await Project.findById(projectId);
        return transformProject(project)
    }
    catch(err){
        throw err
    }
}

const transformProject = project => { 
    return { 
        ...project._doc,
        _id: project.id,
        startDate: dateToString(project._doc.startDate),
        endDate: dateToString(project._doc.endDate),
        creator: user.bind(this, project.creator)
    }
};

const transformBug = bug => {
    console.log("bug assignee " + bug.assignee)
    return {
        ...bug._doc, 
        _id: bug.id, 
        assignee: user.bind(this, bug.assignee),
        creator: user.bind(this, bug.creator),
        dueDate: dateToString(bug._doc.dueDate),
        project: singleProject.bind(this, bug._doc.project),
        createdAt: dateToString(bug._doc.createdAt),
        updatedAt: dateToString(bug._doc.updatedAt),
    }
}
exports.transformBug = transformBug;
exports.transformProject = transformProject;
exports.user = user;
// exports.events = events;
exports.singleProject = singleProject;