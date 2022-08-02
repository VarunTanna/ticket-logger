import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
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
      title
    }
  }
`;

export const QUERY_SINGLE_TICKET = gql`
  query singleTicket($ticketId: ID!) {
    ticket(ticketId: $ticketId) {
      _id
      title
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

export const QUERY_GROUP_USERS = gql`
  query group {
    group {
      _id
      email
      github
    }
  }
`;

export const QUERY_GROUP_TICKETS = gql`
  query groupTickets {
    group {
      _id
      email
      github
    tickets {
      _id
      name
      tickets
    }
    } 
  }
`;

export const QUERY_ALL_USER_TICKETS = gql`
query userTickets($email: String!) {
  user(email: $email){
      _id
      email
      github
      tickets { 
      _id
      title
    }
    }
  }
`;
export const QUERY_PROJECTS = gql`
query projects{
  name
  repo
  group
  }
`;