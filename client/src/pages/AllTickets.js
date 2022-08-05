import { useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import { QUERY_TICKETS } from "../utils/queries";
import { useNavigate } from 'react-router-dom';

// import { useQuery } from "@apollo/client";

// import TicketsList from "../components/TicketsList";

// import { QUERY_TICKETS } from '../utils/queries';

const TicketsList = () => {
  const {loading, data} = useQuery(QUERY_TICKETS);
  const tickets = data?.tickets || [];

  const navigate = useNavigate();

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
    return d.toLocaleDateString();
  }

  const handleDrill =  async (e) => {
    e.preventDefault();
    //console.log("handle drill",e, e.key);
    navigate('/Ticket/{e.key}');
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
    </div>
  )
}

export default TicketsList;