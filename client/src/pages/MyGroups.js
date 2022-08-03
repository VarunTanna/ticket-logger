import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_GROUPS } from "../utils/queries";
import { Link } from 'react-router-dom';

const MyGroups = () => {
  const {loading, data} = useQuery(QUERY_GROUPS);
  console.log(data);
  const groups = data?.groups || [];

  console.log(groups);

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
          <br></br>
          <th>Name</th>
          <br></br>
          <th>Users</th>
          <br></br>
        </tr>
      {groups && groups.map((group) => (
          <tr>
            <td>{group._id}</td>
            <br></br>
            <td>{group.name}</td>
            <br></br>
            {
              group.users.map(user=><td>{user.email}</td>)
            }
          </tr>
      ))}
      </table>
    </>
  )
}

export default MyGroups;