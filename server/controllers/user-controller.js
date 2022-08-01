const { User, Group } = require('../models');

module.exports = {
  async createUser( {body}, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Unable to create user' });
    }

    res.status(200).json(user);
  },
  //delete user?
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId})
    .then((user) => 
    !user 
      ? res.status(404).json(({ message: 'Unable to delete user'}))
      : Group.findOneAndUpdate(
        { user: req.params.userId},
        { $pull: { user: req.params.userId}},
        { new: true }
      )
    )
   .then((group) => 
    !group 
        ? res.status(404).json({ message: 'user deleted but no group found'})
        : res.json({ message: 'User successfully deleted'})
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  },
  //update user?
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: res.params.userId},
      { $set: req.body},
      { runValidators: true, new: true}
    )
    .then((user) => 
      !user
        ? res.status(404).json({ message: 'No user with this id'})
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  }
};