import { gql } from '@apollo/client';

export const QUERY_TICKETS = gql`
  query allTickets {
    tickets {
      _id
      name
      tickets
    }
  }
`;

export const QUERY_SINGLE_TICKET = gql`
  query singleTicket($ticketId: ID!) {
    ticket(ticketId: $ticketId) {
      _id
      name
      ticket
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