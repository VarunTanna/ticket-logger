import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import { useMutation } from "@apollo/client";
import { DELETE_TICKET } from "../utils/mutations";
import { QUERY_MY_TICKETS } from '../utils/queries';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_MY_TICKETS);
  const [deleteTicket, {error}] = useMutation(DELETE_TICKET);
  const tickets = data?.tickets || [];

  const formatDate = (str) => {
    if(str==315550800000){return ''}
    var d = new Date(str-1);
    return d.toLocaleDateString();
  }

  const handleDelete =  async (e) => {
    e.preventDefault();
    console.log("handle delete",e, e.key);
    const { data } =  await deleteTicket({
      variables: { ticketId: e.target.id }
    });
    window.location.reload ();
  }


  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
        {Auth.loggedIn() ? (
            <>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <div className="ticketTable">
                <h1>My Tickets</h1>
          <table className='styled-table'>
            <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Description</th>
              <th>Project</th>
              <th>Sprint #</th>
              <th>Due Date</th>
              <th>Delete Ticket</th>
            </tr>
            </thead>
            <tbody>
            {tickets && tickets.map((ticket) => (
             <tr>
                {console.log(ticket)}
               <td key="title"><a href={'/Ticket/'+ticket._id}>{ticket.title}</a></td>
               <td key="type">{ticket.type}</td>
               <td key="description" >{ticket.description}</td>
               <td>{ticket.project.name}</td>
               <td key="order" >{ticket.order}</td>
               <td key="duedate">{formatDate(ticket.duedate)}</td>
               <td><img id={ticket._id} onClick={handleDelete} src='delete.png' alt={'Delete ticket ' + ticket._id}></img></td>
             </tr>
              
            ))}
            </tbody>
          </table>
        </div>
            )}
            </>
          ) : (
            <img src='largelogo.png'/>
          )}
          

        </div>
      </div>
    </main>
  );
};

export default Home;

//making sure pull request works