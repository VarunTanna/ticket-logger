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

export const QUERY_ALL_USERS = gql`
  query users {
    users {
      _id
      email
      github
    }
  }
`;

export const QUERY_TICKETS = gql`
  query tickets {
    tickets {
      _id
      title
      type
      description
      order
      duedate
      user {
        _id
        email
        github
      }
      project {
        _id
        name
      }
    }
  }
`;

export const QUERY_MY_TICKETS = gql`
  query my_tickets {
    tickets {
      _id
      title
      type
      description
      order
      duedate
      user {
        _id
        email
        github
      }
      project {
        _id
        name
      }
    }
  }
`;

export const QUERY_SINGLE_TICKET = gql`
  query ticket($ticketId: ID!) {
    ticket(ticketId: $ticketId) {
      _id
      title
      description
      order
      type
      duedate
      project {
        name
      }
    }
  }
`;

export const QUERY_MY_GROUPS = gql`
  query users_groups {
    users_groups {
    _id
    name
    users {
      email
      }
    }
  }
`;



// export const QUERY_MY_GROUPS = gql`
//   query users_groups {
//     users_groups {
//       _id
//       name
//       users {
//         email
//       }
//     }
//   }
// `;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      tickets
    }
  }
`;

export const QUERY_GROUPS = gql`
  query groups {
    groups {
      _id
      name
      users {
        email

      }
    }
  }
`;

export const QUERY_GROUP_USERS = gql`
  query group {
    users {
      _id
      email
      github
    }
  }
`;

// export const QUERY_GROUP_TICKETS = gql`
//   query groupTickets {
//     group {
//       _id
//       email
//       github
//     tickets {
//       _id
//       name
//       tickets
//     }
//     } 
//   }
// `;

// export const QUERY_ALL_USER_TICKETS = gql`
// query userTickets($email: String!) {
//   user(email: $email){
//       _id
//       email
//       github
//       tickets { 
//       _id
//       title
//     }
//     }
//   }
// `;

export const QUERY_PROJECTS = gql`
  query projects {
    projects {
      _id
      name
      repo
      group{name} 
    }
  }
`;

// export const QUERY_PROJECTS = gql`
//   query projects {
//     projects {
//       _id
//       name
//       repo
//       group{
//       _id
//       name
//       }
//     }
//   }
// `;