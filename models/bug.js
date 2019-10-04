const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bugSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    prio: {
        type: Number,

    },
    description: { 
        type: String,

    },
    dueDate: { 
        type: Date,

    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project"
    }
},{ timestamps: true});

module.exports = mongoose.model('Bug', bugSchema);