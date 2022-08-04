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
    }
});

const Project = model('Project', projectSchema);

module.exports = Project;
