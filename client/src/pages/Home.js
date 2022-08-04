import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import TicketList from '../components/TicketList';

import { QUERY_TICKETS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_TICKETS);
  const tickets = data?.tickets || [];

  const formatDate = (str) => {
    var d = new Date(str-1);
    return d.toLocaleDateString();
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
          <table className='styled-table'>
            <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Description</th>
              <th>Project</th>
              <th>Order</th>
              <th>Due Date</th>
            </tr>
            </thead>
            <tbody>
            {tickets && tickets.map((ticket) => (
             <tr>
                {console.log(ticket)}
               <td key="title"><a href={'/Ticket/'+ticket._id}>{ticket.title}</a></td>
               <td key="type">{ticket.type}</td>
               <td key="description" >{ticket.description}</td>
               <td>{ticket.project._id}</td>
               <td key="order" >{ticket.order}</td>
               <td key="duedate">{formatDate(ticket.duedate)}</td>
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