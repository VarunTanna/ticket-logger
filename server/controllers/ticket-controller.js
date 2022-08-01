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
  async deleteTicket ( {body}, res) {
    const ticket = await Ticket.deleteOne(body);

    if (!ticket) {
      return res.status(400).json({ message: 'Unable to delete ticket' });
    }
  },
  //update user?
  updateTicket (req, res) {
    Ticket.findOneAndUpdate( 
      {_id: req.params.ticketId},
      { $set: req.body},
      { runValidators: true, new: true}
    )
    .then((ticket) => 
    !ticket
      ? res.status(400).json({ message: 'no ticket with this id!'})
      : res.json(ticket)
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
  }
};