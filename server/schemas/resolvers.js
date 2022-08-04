const { AuthenticationError } = require('apollo-server-express');
const { User, Ticket, Group, Project } = require('../models');
const { signToken } = require('../utils/auth');
const api = require('../utils/api');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, args) => {
      console.log(args);
      return User.findById(args.userId);
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    group: async (parent, args, context) => {
      return Group.find(args.users);
    },
    groups: async () => {
      return Group.find().populate('users');
    },
    tickets: async () => {
      return Ticket.find();
    },
    ticket: async (parent, { ticketId }) => {
      return Ticket.findOne({ _id: ticketId });
    },
    projects: async () => {
      return Project.find().populate('group');
    },
    project: async (parent, { ticketId }) => {
      return Project.findOne({ _id: ticketId });
    },
  },

  Mutation: {
    addUser: async (parent, { email, password, github }) => {
      console.log("calling doesGitUserExist",await api.doesGitUserExist(github));
      if(await api.doesGitUserExist(github)){
        const user = await User.create({ email, password, github });
        console.log("created", user);
        const token = signToken(user);
        return { token, user };  
      } else {
        throw new AuthenticationError('GitHub user verification failed')
      }
      
    },
    deleteUser: async (parent, { email, password, github }) => {
      console.log('attempting to delete user', email);
      const user = await User.findOneAndRemove({ email, password, github });
      console.log('deleted', user);
      const token = deleteToken(user);
      return { token, user };

    },
    updateUser: async (parent, args) => {
      const user = await User.findOneAndUpdate(
        { _id: args._id },
        { $set: {email: args.email, password: args.password, github: args.github} },
        { runValidators: true, new: true }
      )

      return user;

    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne( {email} );

      if (!user) {
        throw new AuthenticationError('No profile with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // createTicket: async (parent, args, context) => {
    //   if(context.user) {
    //     return Ticket.create({
    //       title: args.title,
    //       description: args.description,
    //       type: args.type,
    //       order: args.order,
    //       duedate: args.duedate,
    //       // project: mongoose.Types.ObjectId(args.project),
    //       project: args.project,
    //        user: context.user});
    //   }
    //   throw new AuthenticationError('No ticket created')
    // },

    createTicket: async (parent, {title,description,order,type,duedate,projectId}, context) => {
      // if(context.user) {
        let ticket = await Ticket.create({title,description,order,type,duedate,project:projectId});
        ticket = await ticket.populate('project');
        return ticket;
      // }
      // throw new AuthenticationError('No ticket created')
    },
    createProject: async (parent, {name,repo,groupId}, context) => {
      if(context.user) {
        let repoName = repo.trim();
        if(repoName.toLowerCase().startsWith('https://github.com/')){
          repoName = repoName.substring(19);
          repo = repoName;
        }
        if(await api.doesGitRepoExist(repoName)){
          let project = await Project.create({name,repo,group:groupId});
          project = await project.populate('group');
          return project;
        } else {
          throw new AuthenticationError(`Github repo ${repoName} does not exist`);
        }
      }
    },
    createGroup: async (parent, args, context) => {
      let group = await Group.create({...args});
      group = await group.populate('users');
      return group;
    },
    deleteGroup: async (parent, { groupId }, context) => {
      const group = Group.findByIdAndDelete(groupId);
      return group;
    },
    deleteProject: async (parent, {projectId}, context) => {
      const project= Project.findByIdAndDelete(projectId);
      return project;
    }
  }
};

module.exports = resolvers;