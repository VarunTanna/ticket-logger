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
    // users_groups: async (parent, args, context) => {
    //   return (
    //   Group.find({
    //     users: args.userId
    //   }).populate({ path: ['users', 'projects'] }).populate( { path: 'tickets', populate: 'projects' } ));
    // },
    users_groups: async (parent, args, context) => {
      let groups = await Group.find().populate('users');
      let retGroups = []
      for(let group of groups){
        for(let user of group.users){
          if ((user+'').indexOf(context.user._id)!=-1) {
            retGroups.push(group);
            break;
          }
        }
      }
      console.log("returning",retGroups)
      return retGroups;
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
    // groups: async () => {
    //   let groups = Group.find().populate('users');
    //   let test = Group.find();
    //   console.log(test);
    //   return groups;
    // },
    groups: async (parent, args, context) => {
      let groups = await Group.find().populate('users');
      let retGroups = []
      for(let group of groups){
        for(let user of group.users){
          if ((user+'').indexOf(context.user._id)!=-1) {
            retGroups.push(group);
            break;
          }
        }
      }
      console.log("returning",retGroups)
      return retGroups;
    },
    // tickets: async () => {
    //   return Ticket.find();
    // },
    tickets: async (parent, args, context) => {
      let groups = await Group.find().populate('users');
      let groupIds = []
      for(let group of groups){
        for(let user of group.users){
          if ((user+'').indexOf(context.user._id)!=-1) {
            groupIds.push(group._id+"");
            break;
          }
        }
      }
      let projectIds = []
      let projects = await Project.find().populate('group');
      for(let project of projects){
        if(groupIds.indexOf(project.group._id+"")!=-1){
          projectIds.push(project._id+"")
        }
      }
      let tickets = await Ticket.find();
      let retTickets = []
      for(let ticket of tickets){
        console.log(ticket.project+"",projectIds)
        if(projectIds.indexOf(ticket.project+"")!=-1){
          retTickets.push(ticket);
        }
      }
      console.log("returned tickets",retTickets)
      return retTickets;
    },
    ticket: async (parent, { ticketId }) => {
      return Ticket.findOne({ _id: ticketId });
    },
    // projects: async () => {
    //   return Project.find().populate('group');
    // },
    projects: async (parent, args, context) => {
      let groups = await Group.find().populate('users');
      let groupIds = []
      for(let group of groups){
        for(let user of group.users){
          if ((user+'').indexOf(context.user._id)!=-1) {
            groupIds.push(group._id+"");
            break;
          }
        }
      }
      let projects = await Project.find().populate('group');
      console.log("all of the projects", projects)
      let retProjects = []
      for(let project of projects){
        if(groupIds.indexOf(project.group._id+"")!=-1){
          retProjects.push(project)
        }
      }
      return retProjects;
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

    createTicket: async (parent, { title , description ,order , type , duedate , projectId }, context) => {
      // if(context.user) {
        let ticket = await Ticket.create( {title, description , order , type , duedate , project: projectId });
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
    deleteProject: async (parent, { projectId }, context) => {
      const project= Project.findByIdAndDelete(projectId);
      return project;
    }
  }
};

module.exports = resolvers;