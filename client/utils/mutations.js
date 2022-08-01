import { gql } from '@apollo/client';

export const ADD_TICKET = gql`
  mutation addTicket($name: String!, $email: String!, $password: String!) {
    addTicket(name: $name, email: $email, password: $password) {
      token
      ticket {
        _id
        name
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
