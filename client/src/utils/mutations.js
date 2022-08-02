import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation addUser($email: String!, $password: String!, $github: String!,) {
    addUser(email: $email, password: $password, github: $github, ) {
      token
      user {
        _id
        github
        email
      }
    }
  }
`;

export const ADD_TICKETS = gql`
  mutation addTickets($ticketId: ID!, $tickets: String!) {
    addSkill(ticketId: $ticketId, tickets: $tickets) {
      _id
      name
      tickets
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
        github
      }
    }
  }
`;

export const REMOVE_TICKETS = gql`
  mutation removeTickets($tickets: String!) {
    removeTickets(tickets: $tickets) {
      _id
      name
      tickets
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!, $rep: String!, $groupId: String!) {
    createProject(name: $name, rep: $rep, groupId: $groupId) {
      _id
      name
      rep
      group {
        name
      }
    }
  }
`;

export const CREATE_TICKET = gql`
  mutation createTicket($title: String!, $description: String!, $type: String!, $project: String!, $order: Int!, $duedate: String!, ) {
    createTicket(title: $title, description: $description, type: $type, project: $project, order: $order, duedate: $duedate) {
      title
      description
      type
      project
      order
      duedate
    }
  }
`;