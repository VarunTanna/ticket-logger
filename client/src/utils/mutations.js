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

export const CREATE_PROJECT = gql`
  mutation createProject($name: String!, $repo: String!, $groupId: String!) {
    createProject(name: $name, repo: $repo, groupId: $groupId) {
      _id
      name
      repo
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

export const CREATE_GROUP = gql`
  mutation createGroup($name: String!, $users:[String]!) {
    createGroup(name: $name, users: $users) {
      name
      users {
        email
      } 
    }
  }
`;