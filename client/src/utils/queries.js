import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      email
      password
      github
      
    }
  }
`;


export const QUERY_TICKETS = gql`
  query allTickets {
    tickets {
      _id
      name
      skills
    }
  }
`;

export const QUERY_SINGLE_TICKET = gql`
  query singleTicket($ticketId: ID!) {
    ticket(ticketId: $ticketId) {
      _id
      name
      skills
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      tickets
    }
  }
`;