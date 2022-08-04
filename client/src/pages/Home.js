import React from 'react';
import { useQuery } from '@apollo/client';
import Auth from "../utils/auth";
import TicketList from '../components/TicketList';

import { QUERY_TICKETS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_TICKETS);
  const tickets = data?.tickets || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
        {Auth.loggedIn() ? (
            <>
            {loading ? (
              <div>Loading...</div>
            ) : (
              <TicketList
                tickets={tickets}
                title="Here are the current tickets..."
              />
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