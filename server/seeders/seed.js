const db = require('../config/connection');
const { Ticket, User, Group, Project } = require('../models');
const ticketSeeds = require('./ticketsSeeds.json');
const userSeeds = require('./userSeeds.json');
const groupSeeds = require('./groupSeeds.json');
const projectSeeds = require('./projectSeeds.json');

db.once('open', async () => {
  try {
    await Ticket.deleteMany({});
    await Ticket.create(ticketSeeds);
    await User.deleteMany({});
    const users = await User.create(userSeeds);
    await Group.deleteMany({});
    const group = await Group.create(groupSeeds);
    //console.log("group: ",group);
    for (user of users){
      //console.log("user:", user);
	    group[0].users.push(user._id);
    }
    group[0].save();
    await Project.deleteMany({});
    const projects = await Project.create(projectSeeds);
    projects[0].group=group[0]._id;
    projects[0].save();
    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});