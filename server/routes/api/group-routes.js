const router = require('express').Router();
const { 
  createGroup
} = require('../../controllers/group-controller');

router.route('/')
  .post(createGroup);

module.exports = router;
