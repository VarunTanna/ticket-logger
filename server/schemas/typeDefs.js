const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Ticket {
    _id: ID
    title: String
    description: String
    order: Int
    type: String
    duedate: String
    project: Project
    user: User
  }

  type Group {
    _id: ID
    name: String
    users: User
  }

  type Project {
    _id: ID
    name: String
    rep: String
    group: Group
    tickets: [Ticket]
  }

  type User {
    _id: ID
    email: String
    password: String
    github: String
    #groups: [Group]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
    group: [User]
    groups: [Group]
    tickets: [Ticket]!
    ticket(ticketId: ID!): Ticket
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    
  }

  type Mutation {
    addUser(email: String!, password: String!, github: String!): Auth
    #deleteUser(email: String!, password: String!, github: String!): Auth
    deleteUser: User
    updateUser(email: String!, password: String!, github: String!): Auth
    login(email: String!, password: String!): Auth

    createTicket(ticket: ID! tickets: String!): Ticket
    addTickets(ticketId: ID!, tickets: String!): Ticket
    updateTicket(ticketId: ID!, tickets: String!): Ticket
    removeTicket: Ticket

    createProject(name: String!, rep: String!, groupId: ID!): Project
   
    createGroup(name: String!): Ticket
    deleteGroup: Group
  }
`;

module.exports = typeDefs;