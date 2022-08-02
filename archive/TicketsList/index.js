import React from 'react';
import { useMutation } from '@apollo/client';

import { REMOVE_TICKETS } from '../../client/src/utils/mutations';
import { QUERY_ME } from '../../client/src/utils/queries';

const TicketsList = ({ tickets, isLoggedInUser = false }) => {
  const [removeTickets, { error }] = useMutation(REMOVE_TICKETS, {
    update(cache, { data: { removeTickets } }) {
      try {
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: removeTickets },
        });
      } catch (e) {
        console.error(e);
      }
    },
  });

  const handleRemoveTicket = async (ticket) => {
    try {
      const { data } = await removeTickets({
        variables: { ticket },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!skills.length) {
    return <h3>No Tickets Yet</h3>;
  }

  return (
    <div>
      <div className="flex-row justify-space-between my-4">
        {tickets &&
          tickets.map((ticket) => (
            <div key={ticket} className="col-12 col-xl-6">
              <div className="card mb-3">
                <h4 className="card-header bg-dark text-light p-2 m-0 display-flex align-center">
                  <span>{ticket}</span>
                  {isLoggedInUser && (
                    <button
                      className="btn btn-sm btn-danger ml-auto"
                      onClick={() => handleRemoveTicket(ticket)}
                    >
                      X
                    </button>
                  )}
                </h4>
              </div>
            </div>
          ))}
      </div>
      {error && (
        <div className="my-3 p-3 bg-danger text-white">{error.message}</div>
      )}
    </div>
  );
};

export default TicketsList;
