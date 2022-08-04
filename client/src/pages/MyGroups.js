import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_GROUPS } from "../utils/queries";
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { DELETE_GROUP } from "../utils/mutations";

const MyGroups = () => {
  const { loading, data, refetch } = useQuery(QUERY_GROUPS);
  console.log(data);
  const groups = data?.groups || [];

  console.log(groups);

  useEffect(function() {
    refetch();
  })

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
      <table className='styled-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Users</th>
            <th>Delete Group</th>
          </tr>
        </thead>
        {groups && groups.map((group) => (
          <tbody>
            <tr>
              <td>{group.name}</td>
              <td>
                {
                  group.users.map(user => <span className='btn m-1'>{user.email}</span>)
                }
              </td>
              <td className='text-center'>
                <a href={'nowhere/' + group._id}><img src='delete.png' alt={'Delete group ' + group.name}></img></a>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </>
  )
}

export default MyGroups;