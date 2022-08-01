const db = require('../config/connection');
const { Ticket, User, Group, Project } = require('../models');
const ticketSeeds = require('./ticketsSeeds.json');
const userSeeds = require('./userSeeds.json');
db.once('open', async () => {
  try {
    await Ticket.deleteMany({});
    await Ticket.create(ticketSeeds);
    await User.deleteMany({});
    const users = await User.create(userSeeds);
    await Group.deleteMany({});
    const group = await Group.create(groupSeeds);
    for (user of users){
	Group.users.push(user._id)
    }
    Group.save();
    await Project.deleteMany({});
    await Project.create(projectSeeds);
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});