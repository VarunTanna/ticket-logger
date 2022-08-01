import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation addUser($email: String!, $password: String!, $github: String!,) {
    addUser(email: $email, password: $password, github: $github, ) {
      token
      user {
        _id
        email
        github
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
      ticket {
        _id
        name
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
