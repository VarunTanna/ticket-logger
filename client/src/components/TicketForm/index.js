import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../../utils/auth';

import { ADD_TICKETS } from '../../utils/mutations';

const TicketForm = ({ ticketId }) => {
    const [tickets, setTickets] = useState('');
  
    const [addTickets, { error }] = useMutation(ADD_TICKETS);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
  
      try {
        const data = await addTickets({
          variables: { ticketId, tickets },
        });
  
        setTickets('');
      } catch (err) {
        console.error(err);
      }
    };
  
    return (
      <div>
        <h4>Checkout your tickets!</h4>
  
        {Auth.loggedIn() ? (
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                placeholder="Endorse some skills..."
                value={tickets}
                className="form-input w-100"
                onChange={(event) => setTickets(event.target.value)}
              />
            </div>
  
            <div className="col-12 col-lg-3">
              <button className="btn btn-info btn-block py-3" type="submit">
                Tickets
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        ) : (
          <p>
            You need to be logged in to see the tickets. Please{' '}
            <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
          </p>
        )}
      </div>
    );
  };
  
  export default TicketForm;
  

