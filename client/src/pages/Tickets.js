import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { QUERY_TICKETS } from "../utils/queries";
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

  return (
    <div>
      <div className="ticketTable">
          <table>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Description</th>
              <th>Project</th>
              <th>Order</th>
              <th>Due-Date</th>
            </tr>
            {tickets && tickets.map((ticket) => (
             <tr>
               <td key="title">{ticket.title}</td>
               <td key="type">{ticket.type}</td>
               <td key="description" >{ticket.description}</td>
               {/* <td>{ticket.project._id}</td> */}
               <td key="order" >{ticket.order}</td>
               <td key="dudate">{ticket.duedate}</td>
             </tr> 
            ))}
          </table>
        </div>
    </div>
  )
}

export default TicketsList;