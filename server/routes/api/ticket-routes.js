const router = require('express').Router();
const { 
  createTicket
} = require('../../controllers/ticket-controller');

router.route('/')
  .post(createTicket);

module.exports = router;
