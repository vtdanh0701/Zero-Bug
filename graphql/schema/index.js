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
    description: String
    dueDate: String
    status: String
    level: String
    creator: User
    assignee: User
    project: Project
    createdAt: String
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
    assignedBugs: [Bug]
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
    description: String
    dueDate: String
    status: String
    level: String
}

input UserInput {
    email: String!
    password: String!
    firstName: String
    lastName: String
    address: String
    credential: String
}
input EditUserInput{
    email: String
    firstName: String
    lastName: String
    address: String
    credential: String
}

type RootQuery {
    users: [User!]!
    singleUser(userId: ID!): User!
    projects: [Project!]!
    singleProject(projectId: ID!): Project!
    bugs: [Bug!]!
    singleBug(bugId: ID!): Bug!
    login(email: String!, password: String!): AuthData!
}

type RootMutation{
    createProject(projectInput: ProjectInput): Project
    deleteProject(projectId: ID!): [Project]
    editProject(projectId: ID!, projectInput: ProjectInput): Project
    createBug(projectId: ID!,assigneeId: ID, bugInput: BugInput): Bug!
    editBug(bugId: ID!,assigneeId: ID, bugInput: BugInput): Bug!
    deleteBug(bugId: ID!): Bug
    createUser(userInput: UserInput): User
    deleteUser(userId: ID!): User
    editUser(userId: ID!, userInput: EditUserInput): User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)