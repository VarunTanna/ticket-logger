const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      }],
    projects: [{
      type: Schema.Types.ObjectId,
      ref: 'Project',
    }]
  });
  
  const Group = model('Group', groupSchema);
  
  module.exports = Group;
  