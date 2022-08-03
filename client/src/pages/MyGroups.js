import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_GROUPS } from "../utils/queries";
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { DELETE_GROUP } from "../utils/mutations";

const MyGroups = () => {
  const {loading, data} = useQuery(QUERY_GROUPS);
  console.log(data);
  const groups = data?.groups || [];

  console.log(groups);

  const [deleteGroup, { error }] = useMutation(DELETE_GROUP);

  const handleDelete = (id) => {
    let group = deleteGroup({
      variables: { groupId: id }
    });
    return group;
  };

  if (!groups.length) {
    return (
      <>
        <h3>No Groups Yet</h3>
        <Link className="btn btn-lg btn-primary m-2" to="/newGroup">
        Create a Group
        </Link>
      </>
    );
  }
  
  return (
    <>
        <Link className="btn btn-lg btn-primary m-2" to="/newGroup">
        Create a Group
        </Link>
      <table>
        <tr>
          <th>ID</th>
          
          <th>Name</th>
          
          <th>Users</th>
          
          <th>Delete</th>
        </tr>
      {groups && groups.map((group) => (
          <tr>
            <td>{group._id}</td>
            
            <td>{group.name}</td>
            
            {
              group.users.map(user=><td>{user.email}</td>)
            }
            
            <td><button className="delete" onClick={handleDelete(group._id)}>delete</button></td>
          </tr>
      ))}
      </table>
    </>
  )
}

export default MyGroups;