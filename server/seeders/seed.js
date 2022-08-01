const db = require('../config/connection');
const { Ticket } = require('../models');
const ticketSeeds = require('./ticketsSeeds.json');

db.once('open', async () => {
  try {
    await Ticket.deleteMany({});
    await Ticket.create(ticketSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});