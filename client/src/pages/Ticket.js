import React from "react";
import { useQuery } from "@apollo/client";

import TicketList from "../components/TicketList";

import { QUERY_SINGLE_TICKET } from '../utils/queries';



const SingleTicket = () => {
  const { ticketId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_TICKET, {
    // pass URL parameter
    variables: { ticketId: ticketId },
  });

  const ticket = data?.ticket || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {ticket.ticketUser} <br />
        <span style={{ fontSize: '1rem' }}>
          opened this ticket {ticket.order}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {ticket.ticketTitle}
        </blockquote>
      </div>
      <div className="my-5">
        <TicketList tickets={ticket.list} />
      </div>
    
    </div>
  );
};

export default SingleTicket;
