import React from "react";
import { useQuery } from '@apollo/client';
import { QUERY_GROUPS } from "../utils/queries";
import { Link } from 'react-router-dom';

const MyGroups = () => {
  const {loading, data} = useQuery(QUERY_GROUPS);
  console.log(data);
  const groups = data?.groups || [];

  console.log(groups);

  // const groupUsers = [];
  
  // for (let i = 0; i < groups.length; i++) {
  //   let users = groups[i].users;
  //   for (let i = 0; i < users.length; i++) {
    
  //   let userEmail = users[i].email;
  //   groupUsers.push(userEmail);
  //   }
  // };

  // console.log(groupUsers);

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

  // {groups && groups.map((group) => {
  //   return (
  //     <>
  //       <table>
  //         <tr>
  //           <th>ID</th>
  //           <th>Name</th>
  //           <th>Users</th>
  //         </tr>
  //           <tr>
  //             <td>{group._id}</td>
  //             <td>{group.name}</td>
  //             {
  //               for (i=0; i < group.users.length; i++) {
  //                 let emails = [];
  //                 let email = group.users[i].email;
  //                 emails.push(email);
  //                 return <td>{emails}</td>
  //               }
  //             }
  //           </tr>
  //       </table>
  //     </>
  //   )
  // })}

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