import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
// import User from './pages/User';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyProjects from './pages/MyProjects';
import NewProject from './pages/NewProject';
import TicketsList from './pages/Tickets';
import Header from './components/Header';
import Footer from './components/Footer';
import NewTicket from './pages/NewTicket';
import MyGroups from './pages/MyGroups';
import NewGroup from './pages/NewGroup';

// import Tickets from './pages/Tickets';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header />
          <div className="container">
            <Routes>
              <Route 
                path="/" 
                element={<Home />} 
              />
              <Route 
                path="/login" 
                element={<Login />} 
              />
              <Route 
                path="/signup" 
                element={<Signup />} 
              />
              <Route
                path="/myTickets"
                element={<TicketsList />}
              />
              <Route
                path="/newTicket"
                element={<NewTicket />}
              />
              <Route
                path="/myGroups"
                element={<MyGroups />}
                refresh='true'
              />
              <Route
                path="/newGroup"
                element={<NewGroup />}
              />
              {/* { <Route 
                path="/me" 
                element={<User />} 
              /> } 
               { <Route 
                path="/profiles/:profileId" 
                element={<Profile />} 
              /> }  */}
               {/* { <Route 
                path="/tickets" 
                element={<Tickets />} 
              />}  */}
              <Route 
                path="/newProject/" 
                element={<NewProject />} 
              />
               <Route 
                path="/MyProjects/" 
                element={<MyProjects />} 
              />
              {/* <Route 
                path="/groups/" 
                element={<Group />} 
              />  */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
