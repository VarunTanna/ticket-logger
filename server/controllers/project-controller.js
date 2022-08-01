const { Project } = require('../models');

module.exports = {
  async createProject( {body}, res) {
    const project = await Project.create(body);

    if (!project) {
      return res.status(400).json({ message: 'Unable to create project' });
    }

    res.status(200).json(project);
  },
  //delete Project
};