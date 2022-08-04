const { Schema, model } = require('mongoose');

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    repo: {
        type: String,
        required: true,
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },
    tickets: [{
        type: Schema.Types.ObjectId,
        ref: 'Ticket'
    }]
});

const Project = model('Project', projectSchema);

module.exports = Project;
