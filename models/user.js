const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    address: {
        type: String,

    },
    credential:{
        type: String,
    },
    createdProjects: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Project'
        }
    ],
    createdBugs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Bug'
        }
    ],
    assignedBugs: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Bug'
        }
    ]
});

module.exports = mongoose.model('User', userSchema);