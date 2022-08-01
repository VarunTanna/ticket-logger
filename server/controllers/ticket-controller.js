const { Ticket } = require('../models');

module.exports = {
  async createTicket( {body}, res) {
    const ticket = await Ticket.create(body);

    if (!ticket) {
      return res.status(400).json({ message: 'Unable to create ticket' });
    }

    res.status(200).json(ticket);
  },
  //delete user?
  //update user?
};