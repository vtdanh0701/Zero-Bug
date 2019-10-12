const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Project {
    _id: ID!
    name: String!
    startDate: String!
    endDate: String!
    description: String!
    bug: [Bug]
    creator: User!
    teamMember: [User]
    projectManager: User
}
type Bug {
    _id: ID!
    name: String! 
    prio: Int
    description: String
    dueDate: String
    creator: User
    assignee: User
    project: Project
}

type User {
    _id: ID!
    email: String!
    password: String
    firstName: String
    lastName: String
    address: String
    credential: String
    createdProjects: [Project!]
    createdBugs: [Bug]
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input ProjectInput {
    name: String!
    startDate: String
    endDate: String
    description: String!

}

input BugInput{
    name: String! 
    prio: Int
    description: String
    dueDate: String
}

input UserInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
    address: String
    credential: String
}

type RootQuery {
    users: [User!]!
    projects: [Project!]!
    singleProject(projectId: ID!): Project!
    bugs: [Bug!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation{
    createProject(projectInput: ProjectInput): Project
    deleteProject(projectId: ID!): [Project]
    editProject(projectId: ID!, projectInput: ProjectInput): Project
    createBug(projectId: ID!, bugInput: BugInput): Bug!
    deleteBug(bugId: ID!): Bug
    createUser(userInput: UserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)