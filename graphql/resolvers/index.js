const authResolver = require('./auth');
const projectResolver = require('./project');
const bugResolver = require('./bug');
const userResolver = require('./user');



const rootResolver = { 
    ...authResolver,
    ...projectResolver,
    ...bugResolver,
    ...userResolver
};

module.exports = rootResolver;