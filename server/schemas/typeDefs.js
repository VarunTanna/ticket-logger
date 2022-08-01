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
    name: String
    users: User
  }

  type Project {
    name: String
    rep: String
    group: Group
  }

  type User {
    email: String
    password: String
    github: String
  }

  type Auth {
    token: ID!
    ticket: Ticket
  }

  type Query {
    tickets: [Ticket]!
    ticket(ticketId: ID!): Ticket
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    me: Ticket
  }

  type Mutation {
    addTicket(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addTickets(ticketId: ID!, tickets: String!): Ticket
    removeTicket: Ticket
    removeTickets(tickets: String!): Ticket
  }
`;

module.exports = typeDefs;