const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,

    },
    endDate: {
        type: Date,

    },
    description: {
        type: String,
        required: true
    },
    bug:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Bug'
        }
    ],
    creator: { 
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    teamMember: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true});

module.exports = mongoose.model('Project', projectSchema)