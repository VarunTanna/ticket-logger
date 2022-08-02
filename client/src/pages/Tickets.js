import React from "react";
import { useQuery } from "@apollo/client";

import TicketsList from "../components/TicketsList";

import { QUERY_TICKETS } from '../utils/queries';

const TicketsList = ({
  tickets,
  title,
  showTitle = true,
  showUser = true,
}) => {
  if (!tickets.length) {
    return <h3>No Tickets Yet</h3>
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
               <td>{ticket.title}</td>
               <td>{ticket.type}</td>
               <td>{ticket.description}</td>
               <td>{ticket.project}</td>
               <td>{ticket.order}</td>
               <td>{ticket.duedate}</td>
             </tr> 
            ))}
          </table>
        </div>
    </div>
  )
}

export default TicketsList;