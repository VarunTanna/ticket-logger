import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { QUERY_TICKETS } from "../utils/queries";
import moment from 'moment';


// import { useQuery } from "@apollo/client";

// import TicketsList from "../components/TicketsList";

// import { QUERY_TICKETS } from '../utils/queries';

const TicketsList = () => {
  const {loading, data} = useQuery(QUERY_TICKETS);
  const tickets = data?.tickets || [];

  console.log(tickets);

  if (!tickets.length) {
    return (
      <>
        <h3>No Tickets Yet</h3>
        <Link className="btn btn-lg btn-primary m-2" to="/newTicket">
        Create a Ticket
        </Link>
      </>
    );
  }

  const formatDate = (str) => {
    var d = new Date(str-1);
    console.log (str,d)
    return d.toLocaleDateString();
  }

  return (
    <div>
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
               <td key="title">{ticket.title}</td>
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
    </div>
  )
}

export default TicketsList;