const router = require('express').Router();
const userRoutes = require('./user-routes');
const groupRoutes = require('./group-routes');
const projectRoutes = require('./project-routes');
const ticketRoutes = require('./ticket-routes');

router.use('/user', userRoutes);
router.use('/group', groupRoutes);
router.use('/project', projectRoutes);
router.use('/ticket', ticketRoutes);

module.exports = router;
