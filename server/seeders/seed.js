const db = require('../config/connection');
const { Ticket, User, Group, Project } = require('../models');
const ticketSeeds = require('./ticketsSeeds.json');
const userSeeds = require('./userSeeds.json');

db.once('open', async () => {
  try {
    await Ticket.deleteMany({});
    await Ticket.create(ticketSeeds);
    await User.deleteMany({});
    await User.create(userSeeds);
    await Group.deleteMany({});
    await Group.create(groupSeeds);
    await Project.deleteMany({});
    await Project.create(projectSeeds);
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});