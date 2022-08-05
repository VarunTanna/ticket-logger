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

  const retNiceValue = (valIn) => {
    if(valIn){return valIn};
    return '';
  }

  return (
    <div>
      <div className="ticketTable">
        <h1>All Tickets</h1>
          <table className='styled-table'>
            <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>User</th>
              <th>Description</th>
              <th>Project</th>
              <th>Sprint #</th>
              <th>Due Date</th>
            </tr>
            </thead>
            <tbody>
            {tickets && tickets.map((ticket) => (
             <tr id={ticket._id}>
                {/* {console.log(ticket)} */}
               <td><a href={'/Ticket/'+ticket._id}>{ticket.title}</a></td>
               <td>{ticket.type}</td>
               <td></td>
               <td>{ticket.description}</td>
               <td>{ticket.project.name}</td>
               <td>{ticket.order}</td>
               <td>{formatDate(ticket.duedate)}</td>
             </tr>
              
            ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default TicketsList;