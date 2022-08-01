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
  //add user to group?
};