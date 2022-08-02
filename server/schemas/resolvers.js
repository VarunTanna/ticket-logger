const { AuthenticationError } = require('apollo-server-express');
const { User, Ticket, Group, Project } = require('../models');
const { signToken } = require('../utils/auth');

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
    project: async () => {
      return Project.find();
    },
    projects: async (parent, { ticketId }) => {
      return Project.findOne({ _id: ticketId });
    },
  },

  Mutation: {
    addUser: async (parent, { email, password, github }) => {
      console.log("attempting to create user", email);
      const user = await User.create({ email, password, github });
      console.log("created",user);
      const token = signToken(user);
      return { token, user };
    },
    addTicket: async (parent, { name, email, password }) => {
      const ticket = await Ticket.create({ name, email, password });
      const token = signToken(ticket);

      return { token, ticket };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

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

    // Add a third argument to the resolver to access data in our `context`
    addTickets: async (parent, { ticketsId, tickets }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return Ticket.findOneAndUpdate(
          { _id: ticketsId },
          {
            $addToSet: { tickets: tickets },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
    // Set up mutation so a logged in user can only remove their profile and no one else's
    removeTicket: async (parent, args, context) => {
      if (context.user) {
        return Ticket.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeTicket: async (parent, { ticket }, context) => {
      if (context.user) {
        return Ticket.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { ticket: ticket } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // createTicket: async (parent, {ticketId, ticket }, context) => {
    //   if(context.user) {
    //     return Ticket.create(
    //       { _id: ticketId},
    //       { $addToSet: { ticket: ticket}},
    //       { new: true, runValidators: true}
    //     );
    //   }
    //   throw new AuthenticationError('No ticket created')
    // },
    createTicket: async (parent, args, context) => {
      if(context.user) {
        return Ticket.create({...args, user: context.user});
      }
      throw new AuthenticationError('No ticket created')
    },
    createProject: async (parent, {projectId, project}, context) => {
      if(context.user) {
        return Project.create(
          { _id: projectId},
          { $addToSet: { project: project}},
          { new: true, runValidators: true}
        );
      }
      throw new AuthenticationError('No ticket created')
    }
  }
};

module.exports = resolvers;
