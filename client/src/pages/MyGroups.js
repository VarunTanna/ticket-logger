import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_GROUPS } from "../utils/queries";
import { Link } from 'react-router-dom';

const MyGroups = () => {
  const groups = useQuery(QUERY_GROUPS);
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
      <table>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Users</th>
        </tr>
        {groups && groups.map((group) => (
          <tr>
            <td>{group._id}</td>
            <td>{group.name}</td>
            <td>{group.users}</td>
          </tr>
        ))}
      </table>
    </>
  )
}

export default MyGroups;