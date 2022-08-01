const { Schema, model } = require('mongoose');

const groupSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
      }]
  });
  
  const Group = model('Group', groupSchema);
  
  module.exports = Group;
  