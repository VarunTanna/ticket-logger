import React, { useEffect } from "react";
import { useQuery } from '@apollo/client';
import { QUERY_MY_GROUPS } from "../utils/queries";
import { Link } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import { DELETE_GROUP } from "../utils/mutations";
import { useNavigate } from 'react-router-dom';

const MyGroups = () => {
  const { loading, data, refetch } = useQuery(QUERY_MY_GROUPS);
  const [deleteGroup, {error}] = useMutation(DELETE_GROUP);
  const navigate = useNavigate();
    

  const groups = data?.users_groups || [];
 // console.log(groups);

  useEffect(function() {
    refetch();
  })

  const click = (e) => {
    console.log(e);
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

  const handleDelete =  async (e) => {
    e.preventDefault();
    console.log("handle delete",e, e.key);
    const { data } =  await deleteGroup({
      variables: { groupId: e.target.id }
    });
    navigate('/myGroups');
  }




  return (
    <>
      <Link className="btn btn-med btn-primary m-2" to="/newGroup">
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
        <tbody>
        {groups && groups.map((group) => (
          
            <tr onClick={click}>
              <td>{group.name}</td>
              <td>
                {
                  group.users.map(user => <span className='btn m-1'>{user.email}</span>)
                }
              </td>
              <td className='text-center'>
                <img id={group._id} onClick={handleDelete} src='delete.png' alt={'Delete group ' + group.name}></img>
              </td>
            </tr>
          
        ))}
        </tbody>
      </table>
    </>
  )
}

export default MyGroups;