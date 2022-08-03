const { AuthenticationError } = require('apollo-server-express');
const { User, Ticket, Group, Project } = require('../models');
const { signToken } = require('../utils/auth');
const api = require('../utils/api');

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
      return Group.find();
    },
    tickets: async () => {
      return Ticket.find();
    },
    ticket: async (parent, { ticketId }) => {
      return Ticket.findOne({ _id: ticketId });
    },
    projects: async () => {
      return Project.find();
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

    createTicket: async (parent, args, context) => {
      if(context.user) {
        return Ticket.create({...args, user: context.user});
      }
      throw new AuthenticationError('No ticket created')
    },
    createProject: async (parent, args, context) => {
      if(context.user) {
        return Project.create(
          { _id: args._id},
          { $addToSet: { project: {...args}}},
          { new: true, runValidators: true})
      }
    },
    createGroup: async (parent, args, context) => {
      const group = await Group.create({...args, user: context.user});
      return group;
    },
  }
};

module.exports = resolvers;