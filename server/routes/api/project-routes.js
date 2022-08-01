const router = require('express').Router();
const { 
  createProject
} = require('../../controllers/project-controller');

router.route('/')
  .post(createProject);

module.exports = router;
