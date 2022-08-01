const { Group } = require('../models');

module.exports = {
  async createGroup( {body}, res) {
    const group = await Group.create(body);

    if (!group) {
      return res.status(400).json({ message: 'Unable to create group' });
    }

    res.status(200).json(group);
  },
  //delete group
  async deleteGroup ( {body}, res) {
    const group = await Group.deleteOne(body);

    if (!group) {
      return res.status(400).json({ message: 'Unable to delete group'});
    }
  },
  //add user to group?
  
};