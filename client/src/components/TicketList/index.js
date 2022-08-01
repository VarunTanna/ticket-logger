import React from "react";
import { Link } from "react-router-dom";

const TicketList = ({ tickets, title }) => {
  if (!tickets.length) {
    return <h3>No Tickets Yet</h3>;
  }

  return (
    <div>
      <h3 className="text-primary">{title}</h3>
      <div className="flex-row justify-space-between my-4">
        {tickets &&
          tickets.map((ticket) => (
            <div key={ticket._id} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0">
                  {ticket.name} <br />
                  <span className="text-white" style={{ fontSize: "1rem" }}>
                    currently has {ticket.skills ? ticket.skills.length : 0}{" "}
                    tickets
                    {ticket.skills && ticket.skills.length === 1 ? "" : "s"}
                  </span>
                </h4>

                <Link
                  className="btn btn-block btn-squared btn-light text-dark"
                  to={`/tickets/${ticket._id}`}
                >
                  View and endorse your tickets.
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TicketList;
